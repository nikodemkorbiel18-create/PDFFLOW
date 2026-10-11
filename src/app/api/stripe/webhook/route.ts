import { NextRequest, NextResponse } from "next/server";
import { stripe, getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { sendProWelcomeEmail, sendCancellationEmail } from "@/lib/email";
import Stripe from "stripe";

type DbStatus = "active" | "canceled" | "past_due" | "trialing";

interface SubscriptionRow {
  user_id: string;
  plan: string;
  status: string;
  stripe_subscription_id: string | null;
  current_period_end: string | null;
}

// Map every Stripe status onto what the DB check constraint allows.
// past_due keeps Pro while Stripe retries the card.
function mapStatus(status: Stripe.Subscription.Status): { plan: "pro" | "free"; status: DbStatus } {
  switch (status) {
    case "active":
      return { plan: "pro", status: "active" };
    case "trialing":
      return { plan: "pro", status: "trialing" };
    case "past_due":
      return { plan: "pro", status: "past_due" };
    case "incomplete":
    case "paused":
      return { plan: "free", status: "past_due" };
    default: // canceled, unpaid, incomplete_expired
      return { plan: "free", status: "canceled" };
  }
}

// Newer Stripe API versions moved current_period_end onto subscription items.
function getPeriodEnd(subscription: Stripe.Subscription): string | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ts = subscription.items?.data?.[0]?.current_period_end ?? (subscription as any).current_period_end;
  return ts ? new Date(ts * 1000).toISOString() : null;
}

function customerIdOf(customer: string | Stripe.Customer | Stripe.DeletedCustomer | null): string | null {
  if (!customer) return null;
  return typeof customer === "string" ? customer : customer.id;
}

async function findRow(userId: string | null, customerId: string | null): Promise<SubscriptionRow | null> {
  const admin = getSupabaseAdmin();
  const query = admin
    .from("subscriptions")
    .select("user_id, plan, status, stripe_subscription_id, current_period_end");

  const { data, error } = userId
    ? await query.eq("user_id", userId).maybeSingle()
    : await query.eq("stripe_customer_id", customerId).maybeSingle();

  if (error) throw error;
  return data;
}

// Resolve which PDFflow user a subscription belongs to.
async function resolveUserId(subscription: Stripe.Subscription): Promise<string | null> {
  if (subscription.metadata?.user_id) return subscription.metadata.user_id;

  const customerId = customerIdOf(subscription.customer);
  const row = await findRow(null, customerId);
  if (row) return row.user_id;

  if (customerId) {
    const customer = await getStripe().customers.retrieve(customerId);
    if (!customer.deleted && customer.metadata?.supabase_user_id) {
      return customer.metadata.supabase_user_id;
    }
  }
  return null;
}

// Pre-annual-plan buyers paid once for "lifetime" Pro: plan pro, no subscription ID.
function isLegacyLifetime(row: SubscriptionRow | null): boolean {
  return !!row && row.plan === "pro" && !row.stripe_subscription_id && !row.current_period_end;
}

async function syncSubscription(subscription: Stripe.Subscription): Promise<SubscriptionRow | null> {
  const userId = await resolveUserId(subscription);
  if (!userId) {
    // Throwing makes Stripe retry and flags the event in the dashboard so a paying
    // customer never silently goes without access.
    throw new Error(`No PDFflow user found for subscription ${subscription.id}`);
  }

  const existing = await findRow(userId, null);
  const mapped = mapStatus(subscription.status);

  if (mapped.plan === "free") {
    // Ignore downgrades from an old/other subscription while a different one is live,
    // and never downgrade a legacy lifetime purchase.
    const otherSubIsCurrent =
      existing?.stripe_subscription_id && existing.stripe_subscription_id !== subscription.id;
    if (otherSubIsCurrent || isLegacyLifetime(existing)) {
      return existing;
    }
  }

  const row = {
    user_id: userId,
    plan: mapped.plan,
    status: mapped.status,
    stripe_customer_id: customerIdOf(subscription.customer),
    stripe_subscription_id: mapped.plan === "pro" ? subscription.id : null,
    current_period_end: mapped.plan === "pro" ? getPeriodEnd(subscription) : null,
  };

  const { error } = await getSupabaseAdmin()
    .from("subscriptions")
    .upsert(row, { onConflict: "user_id" });
  if (error) throw error;

  return existing;
}

async function getUserContact(userId: string): Promise<{ email?: string; name?: string }> {
  const { data } = await getSupabaseAdmin()
    .from("profiles")
    .select("email, full_name")
    .eq("id", userId)
    .maybeSingle();
  return { email: data?.email, name: data?.full_name ?? undefined };
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing webhook signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== "subscription" || !session.subscription) break;
        if (session.payment_status === "unpaid") break; // subscription events will follow

        const subscriptionId =
          typeof session.subscription === "string" ? session.subscription : session.subscription.id;
        const subscription = await getStripe().subscriptions.retrieve(subscriptionId);
        const previous = await syncSubscription(subscription);

        // Best-effort welcome email, only on the first upgrade
        const userId = subscription.metadata?.user_id || session.client_reference_id;
        if (userId && previous?.plan !== "pro") {
          const { email, name } = await getUserContact(userId);
          if (email) await sendProWelcomeEmail(email, name).catch(console.error);
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await syncSubscription(subscription);

        // Confirm cancellations so customers have a record of them
        const previousAttributes = event.data.previous_attributes as Partial<Stripe.Subscription> | undefined;
        const justScheduledCancel =
          subscription.cancel_at_period_end && previousAttributes?.cancel_at_period_end === false;
        if (justScheduledCancel) {
          const userId = await resolveUserId(subscription);
          if (userId) {
            const { email, name } = await getUserContact(userId);
            const endDate = getPeriodEnd(subscription) ?? undefined;
            if (email) await sendCancellationEmail(email, name, endDate).catch(console.error);
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        await syncSubscription(event.data.object as Stripe.Subscription);
        break;
      }

      case "invoice.payment_failed": {
        // Status changes arrive via customer.subscription.updated (past_due/unpaid)
        const invoice = event.data.object as Stripe.Invoice;
        console.warn(`Payment failed for customer: ${customerIdOf(invoice.customer)}`);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    // Non-2xx so Stripe retries the event
    console.error(`Webhook handler error for ${event.type} (${event.id}):`, error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}

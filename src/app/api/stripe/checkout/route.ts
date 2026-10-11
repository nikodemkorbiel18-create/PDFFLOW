import { NextRequest, NextResponse } from "next/server";
import { stripe, getPriceId, PriceType } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const PRICE_TYPES: PriceType[] = ["monthly", "annual"];

export async function POST(request: NextRequest) {
  try {
    const { priceType } = await request.json();

    if (!PRICE_TYPES.includes(priceType)) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }

    // Get the current user
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to subscribe" },
        { status: 401 }
      );
    }

    const admin = getSupabaseAdmin();

    // The Stripe customer ID lives on the subscriptions row (created for every user on signup)
    const { data: existing, error: lookupError } = await admin
      .from("subscriptions")
      .select("plan, status, stripe_customer_id, stripe_subscription_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (lookupError) throw lookupError;

    // Don't let someone pay twice for the same thing
    if (existing?.plan === "pro" && existing.status !== "canceled") {
      return NextResponse.json(
        { error: "You already have PDFflow Pro. Manage your plan from Settings > Account." },
        { status: 409 }
      );
    }

    let customerId = existing?.stripe_customer_id as string | null | undefined;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      const { error: saveError } = await admin
        .from("subscriptions")
        .upsert(
          { user_id: user.id, stripe_customer_id: customerId },
          { onConflict: "user_id" }
        );
      if (saveError) throw saveError;
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: getPriceId(priceType), quantity: 1 }],
      client_reference_id: user.id,
      // Put the user ID on the subscription itself so every later
      // subscription event can be matched to the right account.
      subscription_data: {
        metadata: { user_id: user.id, price_type: priceType },
      },
      metadata: { user_id: user.id, price_type: priceType },
      success_url: `${siteUrl}/dashboard?checkout=success`,
      cancel_url: `${siteUrl}/pricing?checkout=canceled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again or contact hello@pdfflow.space." },
      { status: 500 }
    );
  }
}

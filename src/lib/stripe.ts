import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      typescript: true,
    });
  }
  return stripeInstance;
}

// Legacy export for backwards compatibility
export const stripe = {
  get customers() { return getStripe().customers; },
  get checkout() { return getStripe().checkout; },
  get subscriptions() { return getStripe().subscriptions; },
  get webhooks() { return getStripe().webhooks; },
  get billingPortal() { return getStripe().billingPortal; },
};

// Price IDs - create these in your Stripe Dashboard (Products > Add Product > Add Price)
// Monthly: $4.99/month recurring subscription
// Annual: $39.99/year recurring subscription
// Throws instead of falling back to a placeholder so a missing env var fails loudly at checkout.
export type PriceType = "monthly" | "annual";

export function getPriceId(priceType: PriceType): string {
  const priceId =
    priceType === "annual"
      ? process.env.STRIPE_PRICE_ANNUAL
      : process.env.STRIPE_PRICE_MONTHLY;
  if (!priceId) {
    throw new Error(`Stripe price for "${priceType}" is not configured`);
  }
  return priceId;
}

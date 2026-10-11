import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Service-role client for trusted server code (Stripe webhook, checkout).
// Bypasses RLS, so never import this from client components.
let adminInstance: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!adminInstance) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    // No anon-key fallback: RLS would silently reject the writes and paying
    // customers would never be upgraded.
    if (!url || !serviceRoleKey) {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");
    }
    adminInstance = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return adminInstance;
}

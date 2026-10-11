import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Returns a path that is safe to append to our own origin after login.
// `next` comes from the URL, so anyone can craft it (e.g. "@evil.com" or
// "//evil.com") to bounce a freshly signed-in user off-site.
function getSafeRedirectPath(next: string | null): string {
  // Must be a single-slash relative path: rejects "@evil.com", "//evil.com",
  // "/\evil.com" (browsers treat "\" as "/") and anything with control chars.
  if (!next || !next.startsWith("/") || next.startsWith("//") || /[\\\x00-\x1f]/.test(next)) {
    return "/";
  }
  return next;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error_description = searchParams.get("error_description");
  const next = getSafeRedirectPath(searchParams.get("next"));

  // Handle OAuth errors from provider
  if (error_description) {
    console.error("OAuth error:", error_description);
    return NextResponse.redirect(`${origin}/?auth_error=${encodeURIComponent(error_description)}`);
  }

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Session exchange error:", error.message);
      return NextResponse.redirect(`${origin}/?auth_error=${encodeURIComponent(error.message)}`);
    }

    if (data.user) {
      // Check if user has completed onboarding (has a name set)
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", data.user.id)
        .single();

      // If no name, redirect to onboarding
      if (!profile?.full_name) {
        return NextResponse.redirect(`${origin}/onboarding`);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return to homepage on error
  return NextResponse.redirect(`${origin}/?auth_error=no_code`);
}

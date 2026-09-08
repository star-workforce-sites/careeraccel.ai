import { NextRequest, NextResponse } from "next/server";

// A/B variant bucketing (Vercel's documented Edge Middleware pattern:
// https://vercel.com/kb/guide/ab-testing-on-vercel).
//
// Assigns a visitor to a variant on first hit, stores it in a cookie, and
// serves that same variant on every subsequent request — no client-side
// flicker. Every landing page currently ships with a single variant ("a"),
// so this is infrastructure for when a second variant is added later; it
// does nothing observable until then.

const COOKIE_NAME = "lp_variant";
const VARIANTS = ["a"] as const;
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export const config = {
  // Only run on the landing pages themselves — skip static assets, the
  // Next.js internals, and API-less misc files.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};

export function proxy(req: NextRequest) {
  const existing = req.cookies.get(COOKIE_NAME)?.value;
  const variant =
    existing && (VARIANTS as readonly string[]).includes(existing)
      ? existing
      : VARIANTS[Math.floor(Math.random() * VARIANTS.length)];

  const res = NextResponse.next();

  if (existing !== variant) {
    res.cookies.set(COOKIE_NAME, variant, {
      maxAge: COOKIE_MAX_AGE_SECONDS,
      path: "/",
      sameSite: "lax",
    });
  }

  // Expose the variant to the page via a request header so server
  // components can read it without re-parsing cookies.
  res.headers.set("x-lp-variant", variant);

  return res;
}

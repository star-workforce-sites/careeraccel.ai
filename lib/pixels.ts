"use client";

// Ad pixel wiring — see careeraccel.ai project handoff, section 8.
//
// Pixel IDs are intentionally NOT hardcoded (they weren't provided/confirmed
// when this was built). Set them as env vars before deploying a page that
// needs conversion tracking:
//   NEXT_PUBLIC_META_PIXEL_ID   - Meta (Facebook) Pixel ID
//   NEXT_PUBLIC_GOOGLE_ADS_ID   - Google Ads / gtag conversion ID (e.g. AW-XXXXXXXXX)
//
// Both scripts are loaded globally in app/layout.tsx via next/script and are
// no-ops if their env var isn't set. fireLeadEvent() below fires the "Lead"
// event on CTA click; the matching Purchase/Signup conversion event fires
// from starworkforcesolutions.com itself once the tagged session completes
// signup/checkout (standard cross-domain ad-attribution pattern).

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function fireLeadEvent({ campaign }: { campaign: string }) {
  if (typeof window === "undefined") return;

  if (window.fbq) {
    window.fbq("track", "Lead", { content_category: campaign });
  }

  if (window.gtag && process.env.NEXT_PUBLIC_GOOGLE_ADS_ID) {
    window.gtag("event", "conversion", {
      send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
      content_category: campaign,
    });
  }

  if (!window.fbq && !window.gtag) {
    console.warn(
      "[pixels] Lead event not sent — no ad pixel scripts are loaded (pixel IDs not configured)."
    );
  }
}

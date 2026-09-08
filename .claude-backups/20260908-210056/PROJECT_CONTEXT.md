# careeraccel.ai — Project Context

## What this is

A pure ads-landing microsite. One page per ad campaign, each with one job:
get a click on its CTA button that sends the visitor to
`starworkforcesolutions.com` (signup or a specific plan/checkout link).

## What this is NOT

Not a second copy of the main app. No login, no user accounts, no database,
no Stripe integration, no shared code with `sws-job-seeker-platform` beyond
maybe a logo/font file. Any feature that would need the main app's data or
auth belongs on the main app — the CTA just sends the visitor there.

## Why this repo is separate from `sws-job-seeker-platform`

These pages get rewritten constantly for A/B testing. Coupling that churn to
the main app's build/release process would risk production on every
headline tweak. Full isolation removes that risk.

## Current state (as of this build)

- **Live page:** `/ai-recruiter` — the first landing page, built per the
  original handoff spec.
- **Root path (`/`)** redirects to `starworkforcesolutions.com` — it isn't a
  campaign page.
- **A/B middleware** (`middleware.ts`) is wired and assigns/persists an
  `lp_variant` cookie, but only one variant (`"a"`) exists today, so it's a
  no-op in practice until a second variant is added.
- **Ad pixels** (Meta Pixel, Google Ads gtag) are wired in `app/layout.tsx`
  but read their IDs from env vars (`NEXT_PUBLIC_META_PIXEL_ID`,
  `NEXT_PUBLIC_GOOGLE_ADS_ID`) that are NOT yet set — see `.env.example`.
  Until they're set in Vercel, `fireLeadEvent()` no-ops with a console
  warning.
- **Not yet done:** the main-app change to capture `utm_*` + `lp_variant` at
  `/auth/register` and persist them on the signup/subscription record. This
  is additive and lives in `sws-job-seeker-platform`, not here — tracked as
  a follow-up, sequenced after this microsite's UTM param shape is final.

## Conventions (same as the main repo)

- Scripts are written and run by Claude; you review the diff and push.
  Nothing is auto-pushed.
- Every CTA must go through the shared `components/CtaButton.tsx` — it's
  the only thing that appends `utm_source`, `utm_medium`, `utm_campaign`,
  and `lp_variant` to the outbound link. Never link to
  `starworkforcesolutions.com` directly from a page.

## Adding the next landing page

1. Add a new route under `app/<feature-slug>/page.tsx` (see
   `app/ai-recruiter/page.tsx` as the template).
2. Use `Hero` + `CtaButton` with a unique `campaign` string.
3. Point `ctaDestinationPath` at the right main-app URL (`/auth/register` or
   a specific plan/checkout deep link).
4. No middleware or pixel changes needed — both are already global.

## Deploy

Vercel project (separate from `v0-job-seeker-platform`), auto-deploy on
push to `main`. DNS for `careeraccel.ai` / `www.careeraccel.ai` still needs
to be pointed at Vercel in Dynadot (see original handoff doc, §3) once this
is ready to go live.

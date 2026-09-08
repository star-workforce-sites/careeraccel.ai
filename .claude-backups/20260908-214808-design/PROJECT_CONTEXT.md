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
- **A/B routing** (`proxy.ts` — Next.js 16 renamed the `middleware.ts`
  convention to `proxy.ts`) is wired and assigns/persists an `lp_variant`
  cookie, but only one variant (`"a"`) exists today, so it's a no-op in
  practice until a second variant is added.
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
- **Compliance: describe the mechanism, never promise the outcome.** The
  actual business is a resume distribution service — AI matches roles and
  a recruiter actively distributes/advocates for a candidate's resume. It
  does not promise interviews, offers, or being hired. No page's copy may
  imply an outcome guarantee (e.g. "gets you hired," "faster time-to-offer,"
  "pushes your application forward"). It's fine to say what the service
  *does* (matches roles, distributes resumes, gives a dedicated recruiter
  contact); never what it *guarantees will happen as a result*. This is a
  standing rule for every current and future page, not a one-time fix.

## Adding the next landing page

1. Add a new route under `app/<feature-slug>/page.tsx` (see
   `app/ai-recruiter/page.tsx` as the template).
2. Use `Hero` + `CtaButton` with a unique `campaign` string.
3. Point `ctaDestinationPath` at the right main-app URL (`/auth/register` or
   a specific plan/checkout deep link).
4. No middleware or pixel changes needed — both are already global.

## Change log

- **Compliance/copy fix (`/ai-recruiter`):** the page originally implied
  outcome guarantees ("AI finds the roles. A recruiter gets you hired.",
  "preps you for interviews, and pushes your application forward.",
  "Faster time-to-offer") and the `<title>`/meta description said "Get
  Matched Faster" / "land your next role faster." All rewritten to describe
  the actual mechanism (AI-matched leads + active resume distribution to
  the recruiter network + a dedicated recruiter contact) with no promised
  outcome. `components/Hero.tsx` was checked and is fully prop-driven with
  no hardcoded copy, so nothing there needed changing — but it's still the
  shared component every future page's headline flows through, so keep
  outcome language out of whatever headline/subheadline props a new page
  passes it. Confirmed by repo-wide grep (`hired|guarantee|promise|land
  your|faster|pushes your application|time-to-offer`) that no other file
  had the pattern. `CtaButton.tsx`, `proxy.ts`, `lib/pixels.ts`, and the
  root `/` redirect were intentionally left untouched — out of scope for
  this fix.
- **Dark-on-dark contrast fix:** a leftover `prefers-color-scheme: dark`
  block in `app/globals.css` was overriding the page's fixed light theme
  for visitors with OS dark mode on, due to Tailwind v4's cascade-layer
  behavior. Removed; page is now light-theme regardless of visitor setting.

## Deploy

Vercel project (separate from `v0-job-seeker-platform`), auto-deploy on
push to `main`. DNS for `careeraccel.ai` / `www.careeraccel.ai` still needs
to be pointed at Vercel in Dynadot (see original handoff doc, §3) once this
is ready to go live.

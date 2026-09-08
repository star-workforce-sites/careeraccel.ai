# careeraccel.ai — Implementation Summary (AI + Recruiter landing page)

**Repo:** `github.com/star-workforce-sites/careeraccel.ai`
**Live:** `careeraccel-ai.vercel.app` (production domain `careeraccel.ai` not yet pointed via DNS)
**Latest commit:** `b2ffdb7` — "Fix dark-on-dark contrast: remove OS dark-mode CSS override"

## What this project is

A standalone ads-landing microsite, separate from `sws-job-seeker-platform` (own repo, own Vercel project, own deploy pipeline). It has no login, no database, and no shared code with the main app beyond styling conventions. Its only job: get a visitor to click a CTA that sends them to `starworkforcesolutions.com`.

## Stack

- Next.js 16 (App Router), static-first — no API routes, no DB client, no auth libraries.
- Tailwind CSS v4.
- TypeScript.
- Deployed on Vercel, auto-deploy on push to `main`.

## Routes

| Path | Behavior |
|---|---|
| `/` | Immediately redirects to `starworkforcesolutions.com`. Root isn't a campaign page — every ad links directly to a feature route. |
| `/ai-recruiter` | The one live landing page. Hero, three feature cards, two "Get Matched Free" CTAs. |

## File-by-file

- **`app/layout.tsx`** — root layout. Sets `<body class="bg-white text-zinc-900">` (fixed light theme). Conditionally injects Meta Pixel and Google Ads gtag `<Script>` tags, but only if `NEXT_PUBLIC_META_PIXEL_ID` / `NEXT_PUBLIC_GOOGLE_ADS_ID` env vars are set — **neither is set yet**, so no pixels currently fire in production.
- **`app/globals.css`** — Tailwind import + font-family theme token. As of the latest commit, deliberately has *no* `prefers-color-scheme: dark` handling (see "Bug fixed" below).
- **`app/page.tsx`** — root route, `redirect()` to the main app.
- **`app/ai-recruiter/page.tsx`** — the landing page content: headline, subheadline, feature copy, CTA destination (`/auth/register`), campaign tag (`ai_recruiter`).
- **`components/Hero.tsx`** — reusable hero section (eyebrow, headline, subheadline, CTA) for this and future pages.
- **`components/CtaButton.tsx`** — the single shared CTA component. Every outbound link to the main app must go through it. On click it appends `utm_source=careeraccel_ai`, `utm_medium=landing_page`, `utm_campaign=<per-page value>`, and `lp_variant=<A/B cookie value>` to the destination URL, then fires `fireLeadEvent()`.
- **`lib/pixels.ts`** — wraps `fbq`/`gtag` calls behind a `fireLeadEvent({campaign})` function. No-ops (with a console warning) if no pixel script is loaded.
- **`proxy.ts`** (Next.js 16's renamed `middleware.ts`) — A/B bucketing per Vercel's documented pattern: assigns a visitor to a variant on first hit, persists it in an `lp_variant` cookie for 30 days, exposes it via an `x-lp-variant` response header. Currently only one variant (`"a"`) exists, so this runs but has no visible effect until a second variant is added.
- **`PROJECT_CONTEXT.md`** — in-repo running-state doc (what's live, what's deferred, conventions), same pattern as the main repo's context file.
- **`.env.example`** — documents the two pixel-ID env vars that need real values before ad tracking works.

## Content currently on `/ai-recruiter`

- Eyebrow: "AI + Recruiter"
- Headline: "AI finds the roles. A recruiter gets you hired."
- Subheadline: "CareerAccel pairs smart job matching with dedicated recruiter support, so you spend less time searching and more time interviewing."
- CTA button text (x2): "Get Matched Free" → `starworkforcesolutions.com/auth/register`
- Three feature cards:
  1. **AI-matched roles, daily** — "Our AI scans thousands of openings and surfaces the ones that actually fit your background — no more scrolling job boards."
  2. **A real recruiter in your corner** — "Get paired with a human recruiter who advocates for you, preps you for interviews, and pushes your application forward."
  3. **Faster time-to-offer** — "Candidates using AI + Recruiter together move through the pipeline faster than either tool alone."
- Closing section: "Ready to move faster?" / "Sign up free and get matched with roles and a recruiter today." / CTA repeated.

## Bug found and fixed today

**Symptom:** page rendered with near-black text on a near-black background (unreadable) for visitors with OS/browser dark mode enabled.

**Root cause (confirmed by inspecting live computed styles in Chrome DevTools via `getComputedStyle`, not guessed):** the Next.js boilerplate's leftover `body { background: var(--background); color: var(--foreground) }` rule in `globals.css`, combined with a `@media (prefers-color-scheme: dark)` block, flipped those CSS variables to near-black/near-white when a visitor's OS was in dark mode. Because Tailwind v4 utilities (`bg-white`, `text-zinc-900`) live inside a CSS cascade layer, that plain unlayered rule always overrode them regardless of specificity — producing dark background + dark text.

**Fix:** removed the dark-mode media query and the plain `body` background/color rule entirely. This is a fixed-light-theme marketing page by design, so it no longer responds to visitor OS theme at all. Commit `b2ffdb7`.

## Deployment status / known issue history

1. First Vercel import was blocked: "commit author did not have contributing access… Hobby Plan does not support collaboration for private repositories." Confirmed via Vercel Community reports that this is a **Vercel-team-membership check on the commit author's linked GitHub/Vercel account**, unrelated to repo age or GitHub org permissions.
2. Resolved by deleting and re-importing the Vercel project under the correct account/flow — deployment now succeeds (status: Ready).
3. Contrast bug (above) found post-deploy, fixed, committed locally, and needs one more `git push` from your own Git Bash (this sandbox's shell has no GitHub credentials, so pushes have to happen from your machine) to go live.

## Still outstanding (unchanged from original handoff)

- Push commit `b2ffdb7` from your local Git Bash (`git pull && git push origin main`).
- Set `NEXT_PUBLIC_META_PIXEL_ID` / `NEXT_PUBLIC_GOOGLE_ADS_ID` in Vercel once you have real IDs from your ad accounts.
- Point `careeraccel.ai` / `www.careeraccel.ai` DNS (Dynadot) at this Vercel project.
- Build the `signup_source` capture on `sws-job-seeker-platform`'s `/auth/register` to close the attribution loop (captures `utm_*` + `lp_variant`).
- Decide whether `/` should keep redirecting to the main app or show a page, once there are multiple campaigns.

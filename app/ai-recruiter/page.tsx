import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CtaButton from "@/components/CtaButton";
import FeatureCard from "@/components/FeatureCard";

export const metadata: Metadata = {
  title: "AI + Recruiter — AI Job Matching & Resume Distribution | CareerAccel.ai",
  description:
    "AI-matched job leads plus active resume distribution to our recruiter network, with a dedicated recruiter contact for your search.",
};

const CAMPAIGN = "ai_recruiter";
const CTA_DESTINATION = "/auth/register";

const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const FEATURES = [
  {
    title: "AI-matched roles, daily",
    body: "Our AI scans thousands of openings and surfaces the ones that actually fit your background — no more scrolling job boards.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
        <circle cx="12" cy="12" r="3.25" />
      </svg>
    ),
  },
  {
    title: "A real recruiter in your corner",
    body: "Your resume is actively distributed to recruiters in our network, and you get a dedicated recruiter contact for your search.",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="8" r="3.25" />
        <path d="M5.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
      </svg>
    ),
  },
  {
    title: "Broader recruiter reach",
    body: "AI-matched leads and active resume distribution work together, putting your resume in front of more recruiters than applying on your own.",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="6" cy="12" r="2.25" />
        <circle cx="18" cy="6" r="2.25" />
        <circle cx="18" cy="18" r="2.25" />
        <path d="M8.1 11.1l7.8-4.2M8.1 12.9l7.8 4.2" />
      </svg>
    ),
  },
];

export default function AiRecruiterPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero
        eyebrow="AI + Recruiter"
        headline="AI-matched roles. Your resume, actively distributed to recruiters."
        headlineHighlight="actively distributed"
        subheadline="CareerAccel combines AI job matching with active resume distribution to our recruiter network, plus a dedicated recruiter contact for your search."
        ctaLabel="Get Matched Free"
        ctaDestinationPath={CTA_DESTINATION}
        campaign={CAMPAIGN}
      />

      <section className="relative mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                body={feature.body}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden px-6 pb-28 pt-8 sm:pb-36">
        <div className="mesh-bg opacity-60" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--text)] sm:text-3xl">
            Ready to expand your reach?
          </h2>
          <p className="mt-3 max-w-lg text-[var(--text-muted)]">
            Sign up free for AI-matched roles and active resume distribution
            to our recruiter network.
          </p>
          <div className="mt-8">
            <CtaButton
              label="Get Matched Free"
              destinationPath={CTA_DESTINATION}
              campaign={CAMPAIGN}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

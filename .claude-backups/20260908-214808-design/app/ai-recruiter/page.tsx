import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CtaButton from "@/components/CtaButton";

export const metadata: Metadata = {
  title: "AI + Recruiter — AI Job Matching & Resume Distribution | CareerAccel.ai",
  description:
    "AI-matched job leads plus active resume distribution to our recruiter network, with a dedicated recruiter contact for your search.",
};

const CAMPAIGN = "ai_recruiter";
const CTA_DESTINATION = "/auth/register";

const FEATURES = [
  {
    title: "AI-matched roles, daily",
    body: "Our AI scans thousands of openings and surfaces the ones that actually fit your background — no more scrolling job boards.",
  },
  {
    title: "A real recruiter in your corner",
    body: "Your resume is actively distributed to recruiters in our network, and you get a dedicated recruiter contact for your search.",
  },
  {
    title: "Broader recruiter reach",
    body: "AI-matched leads and active resume distribution work together, putting your resume in front of more recruiters than applying on your own.",
  },
];

export default function AiRecruiterPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero
        eyebrow="AI + Recruiter"
        headline="AI-matched roles. Your resume, actively distributed to recruiters."
        subheadline="CareerAccel combines AI job matching with active resume distribution to our recruiter network, plus a dedicated recruiter contact for your search."
        ctaLabel="Get Matched Free"
        ctaDestinationPath={CTA_DESTINATION}
        campaign={CAMPAIGN}
      />

      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-zinc-200 p-6">
              <h2 className="text-lg font-semibold text-zinc-900">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm text-zinc-600">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 pb-24 text-center">
        <h2 className="text-2xl font-bold text-zinc-900">
          Ready to expand your reach?
        </h2>
        <p className="mt-3 max-w-lg text-zinc-600">
          Sign up free for AI-matched roles and active resume distribution to
          our recruiter network.
        </p>
        <div className="mt-8">
          <CtaButton
            label="Get Matched Free"
            destinationPath={CTA_DESTINATION}
            campaign={CAMPAIGN}
          />
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CtaButton from "@/components/CtaButton";

export const metadata: Metadata = {
  title: "AI + Recruiter — Get Matched Faster | CareerAccel.ai",
  description:
    "Combine AI-powered job matching with real recruiter support to land your next role faster.",
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
    body: "Get paired with a human recruiter who advocates for you, preps you for interviews, and pushes your application forward.",
  },
  {
    title: "Faster time-to-offer",
    body: "Candidates using AI + Recruiter together move through the pipeline faster than either tool alone.",
  },
];

export default function AiRecruiterPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero
        eyebrow="AI + Recruiter"
        headline="AI finds the roles. A recruiter gets you hired."
        subheadline="CareerAccel pairs smart job matching with dedicated recruiter support, so you spend less time searching and more time interviewing."
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
          Ready to move faster?
        </h2>
        <p className="mt-3 max-w-lg text-zinc-600">
          Sign up free and get matched with roles and a recruiter today.
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

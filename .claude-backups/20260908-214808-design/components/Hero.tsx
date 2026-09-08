import CtaButton from "@/components/CtaButton";

type HeroProps = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaDestinationPath: string;
  campaign: string;
};

export default function Hero({
  eyebrow,
  headline,
  subheadline,
  ctaLabel,
  ctaDestinationPath,
  campaign,
}: HeroProps) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-32">
      <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
        {eyebrow}
      </span>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
        {headline}
      </h1>
      <p className="mt-6 max-w-xl text-lg text-zinc-600">{subheadline}</p>
      <div className="mt-10">
        <CtaButton
          label={ctaLabel}
          destinationPath={ctaDestinationPath}
          campaign={campaign}
        />
      </div>
    </section>
  );
}

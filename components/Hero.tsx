import CtaButton from "@/components/CtaButton";

type HeroProps = {
  eyebrow: string;
  headline: string;
  /**
   * A substring of `headline` to render with the accent gradient (e.g. the
   * one word/phrase you want to stand out). Must match `headline` exactly;
   * if it doesn't match, the whole headline just renders in the solid
   * color -- no crash, no silent typo trap.
   */
  headlineHighlight?: string;
  subheadline: string;
  ctaLabel: string;
  ctaDestinationPath: string;
  campaign: string;
};

function renderHeadline(headline: string, highlight?: string) {
  if (!highlight || !headline.includes(highlight)) {
    return headline;
  }
  const index = headline.indexOf(highlight);
  const before = headline.slice(0, index);
  const after = headline.slice(index + highlight.length);
  return (
    <>
      {before}
      <span className="gradient-text">{highlight}</span>
      {after}
    </>
  );
}

export default function Hero({
  eyebrow,
  headline,
  headlineHighlight,
  subheadline,
  ctaLabel,
  ctaDestinationPath,
  campaign,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="mesh-bg" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-28 text-center sm:py-36">
        <span
          className="animate-fade-in-up mb-6 inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium"
          style={{
            borderColor: "var(--accent-border)",
            background: "var(--accent-soft)",
            color: "#c9c2ff",
          }}
        >
          {eyebrow}
        </span>
        <h1
          className="animate-fade-in-up font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          {renderHeadline(headline, headlineHighlight)}
        </h1>
        <p
          className="animate-fade-in-up mt-6 max-w-xl text-lg text-[var(--text-muted)]"
          style={{ animationDelay: "160ms" }}
        >
          {subheadline}
        </p>
        <div
          className="animate-fade-in-up mt-10"
          style={{ animationDelay: "240ms" }}
        >
          <CtaButton
            label={ctaLabel}
            destinationPath={ctaDestinationPath}
            campaign={campaign}
          />
        </div>
      </div>
    </section>
  );
}

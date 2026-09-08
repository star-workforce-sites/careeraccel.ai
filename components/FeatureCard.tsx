import type { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  body: string;
};

/**
 * Shared feature-card style for every landing page. Uses the `card-elevated`
 * token class from globals.css (background/border/hover elevation + glow) so
 * the look stays consistent as more pages are added -- change it once there,
 * every page's cards update.
 */
export default function FeatureCard({ icon, title, body }: FeatureCardProps) {
  return (
    <div className="card-elevated rounded-2xl p-6">
      <div
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
      >
        {icon}
      </div>
      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--text)]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
        {body}
      </p>
    </div>
  );
}

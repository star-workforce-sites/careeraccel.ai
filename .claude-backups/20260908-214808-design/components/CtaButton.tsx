"use client";

import { fireLeadEvent } from "@/lib/pixels";

type CtaButtonProps = {
  /** Path on starworkforcesolutions.com, e.g. "/auth/register" or a checkout deep link. */
  destinationPath: string;
  campaign: string;
  label: string;
  className?: string;
};

const MAIN_APP_ORIGIN = "https://starworkforcesolutions.com";
const UTM_SOURCE = "careeraccel_ai";
const UTM_MEDIUM = "landing_page";

function readVariantCookie(): string {
  if (typeof document === "undefined") return "unknown";
  const match = document.cookie.match(/(?:^|; )lp_variant=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "unknown";
}

/**
 * The single shared CTA component every landing page must use. Centralizing
 * it here means UTM + variant params can never be forgotten on a new page —
 * see careeraccel.ai project handoff, section 7.
 */
export default function CtaButton({
  destinationPath,
  campaign,
  label,
  className,
}: CtaButtonProps) {
  const handleClick = () => {
    fireLeadEvent({ campaign });
  };

  const buildHref = () => {
    const url = new URL(destinationPath, MAIN_APP_ORIGIN);
    url.searchParams.set("utm_source", UTM_SOURCE);
    url.searchParams.set("utm_medium", UTM_MEDIUM);
    url.searchParams.set("utm_campaign", campaign);
    url.searchParams.set("lp_variant", readVariantCookie());
    return url.toString();
  };

  return (
    <a
      href={destinationPath}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
        window.location.href = buildHref();
      }}
      className={
        className ??
        "inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700"
      }
    >
      {label}
    </a>
  );
}

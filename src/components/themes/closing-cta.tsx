import Link from "next/link";

import { CtaPanel, CtaSecondaryLink } from "@/components/ui/cta-panel";
import { MetallicButton } from "@/components/ui/metallic-button";
import { siteConfig } from "@/config/site";

const linkClass =
  "font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark";

/** Closing prompt for the Themes page. */
export function ThemesClosingCta() {
  return (
    <section
      aria-labelledby="themes-cta-heading"
      className="relative overflow-clip px-6 pt-12 pb-24 lg:px-12"
    >
      <CtaPanel>
        <h2
          id="themes-cta-heading"
          className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl"
        >
          Pick a theme. Make it yours. Publish when you&apos;re ready.
        </h2>
        <p className="mb-10 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
          No code needed. Nothing goes live until you say so.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <MetallicButton label="Start Free Trial" href={siteConfig.adminSignUpUrl} />
          <CtaSecondaryLink href="/features">Explore all features</CtaSecondaryLink>
        </div>
        <p className="mt-8 text-sm text-slate-600">
          Questions about themes?{" "}
          <Link href="/faq#customize-storefront" className={linkClass}>
            Read the FAQ
          </Link>{" "}
          or{" "}
          <Link href="/contact" className={linkClass}>
            contact our team
          </Link>
          .
        </p>
      </CtaPanel>
    </section>
  );
}

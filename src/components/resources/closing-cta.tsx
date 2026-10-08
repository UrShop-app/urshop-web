import Link from "next/link";

import { CtaPanel, CtaSecondaryLink } from "@/components/ui/cta-panel";
import { MetallicButton } from "@/components/ui/metallic-button";
import { siteConfig } from "@/config/site";

/** Closing prompt for the Resources page. */
export function ResourcesClosingCta() {
  return (
    <section
      aria-labelledby="resources-cta-heading"
      className="relative overflow-clip px-6 pt-16 pb-24 lg:px-12"
    >
      <CtaPanel>
        <h2
          id="resources-cta-heading"
          className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl"
        >
          Learn by building
        </h2>
        <p className="mb-10 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
          The fastest way to learn is to start. More resources are on the way.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <MetallicButton label="Start Free Trial" href={siteConfig.adminSignUpUrl} />
          <CtaSecondaryLink href="/features">Explore features</CtaSecondaryLink>
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Want a topic covered?{" "}
          <Link
            href="/contact"
            className="font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-dark"
          >
            Contact UrShop
          </Link>
        </p>
      </CtaPanel>
    </section>
  );
}

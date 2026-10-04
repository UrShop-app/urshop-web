import Link from "next/link";

import { CtaPanel, CtaSecondaryLink } from "@/components/ui/cta-panel";
import { MetallicButton } from "@/components/ui/metallic-button";
import { siteConfig } from "@/config/site";

const linkClass =
  "font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark";

/** Closing prompt for the Integrations page. */
export function IntegrationsClosingCta() {
  return (
    <section
      aria-labelledby="integrations-cta-heading"
      className="relative overflow-clip px-6 pt-12 pb-24 lg:px-12"
    >
      <CtaPanel>
        <h2
          id="integrations-cta-heading"
          className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl"
        >
          Connect the tools you already use
        </h2>
        <p className="mb-10 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
          Open your store, then add bKash, your couriers and SMS when you&apos;re ready.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <MetallicButton label="Start Free Trial" href={siteConfig.adminSignUpUrl} />
          <CtaSecondaryLink href="/contact">Talk to our team</CtaSecondaryLink>
        </div>
        <p className="mt-8 text-sm text-slate-600">
          Explore{" "}
          <Link href="/features" className={linkClass}>
            all features
          </Link>
          ,{" "}
          <Link href="/themes" className={linkClass}>
            themes
          </Link>{" "}
          or the{" "}
          <Link href="/faq#integrations" className={linkClass}>
            FAQ
          </Link>
          .
        </p>
      </CtaPanel>
    </section>
  );
}

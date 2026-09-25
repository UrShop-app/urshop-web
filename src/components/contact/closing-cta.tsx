import { CtaPanel, CtaSecondaryLink } from "@/components/ui/cta-panel";
import { MetallicButton } from "@/components/ui/metallic-button";

/** Closing prompt for visitors who'd rather explore than write. */
export function ContactClosingCta() {
  return (
    <section
      aria-labelledby="contact-cta-heading"
      className="relative overflow-clip px-6 pt-8 pb-24 lg:px-12"
    >
      <CtaPanel>
        <h2
          id="contact-cta-heading"
          className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl"
        >
          Rather try it yourself?
        </h2>
        <p className="mb-10 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
          Set up your store, add your products and see how UrShop fits the way you sell. You can
          still write to us whenever a question comes up.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <MetallicButton label="Start Free Trial" href="/pricing" />
          <CtaSecondaryLink href="/features">Explore features</CtaSecondaryLink>
        </div>
      </CtaPanel>
    </section>
  );
}

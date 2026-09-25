import { Icon } from "@/components/ui/icon";
import { ShopGrid, type ShopGridBeam, type ShopGridTile } from "@/components/ui/shop-grid";
import { siteConfig } from "@/config/site";

import { CopyEmailButton } from "./copy-email-button";

// Kept clear of the headline column; `sm:hidden` tiles fill the narrow mobile viewport instead.
const heroTiles: ReadonlyArray<ShopGridTile> = [
  { x: -11, y: 2, delay: -4 },
  { x: -13, y: 7, delay: -1 },
  { x: -7, y: 10, delay: -6.5 },
  { x: -5, y: 1, delay: -8 },
  { x: 7, y: 1, delay: -3 },
  { x: 12, y: 6, delay: -5.5 },
  { x: 8, y: 11, delay: -2 },
  { x: -3, y: 13, delay: -7, className: "sm:hidden" },
  { x: 3, y: 0, delay: -4.5, className: "sm:hidden" },
];

const heroBeams: ReadonlyArray<ShopGridBeam> = [
  { axis: "x", at: 5, delay: -3, duration: 11 },
  { axis: "y", at: -10, delay: -6, duration: 10 },
  { axis: "y", at: 11, delay: -1, duration: 12 },
];

/** Shop-grid backdrop behind the hero and header, rendered by the page (see home `HeroBackdrop`). */
export function ContactHeroBackdrop() {
  return (
    <ShopGrid
      tiles={heroTiles}
      beams={heroBeams}
      className="shop-grid-hero inset-x-0 top-0 z-0 h-[680px] md:h-[780px]"
    />
  );
}

export function ContactHero() {
  return (
    <section
      aria-labelledby="contact-hero-heading"
      className="relative px-6 pt-14 pb-12 sm:pt-16 sm:pb-16 lg:px-12"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="liquid-pill mb-8 inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
          Contact
        </span>
        <h1
          id="contact-hero-heading"
          className="mb-6 text-4xl leading-[1.15] font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-6xl"
        >
          Talk to the <span className="cyan-underline px-1">UrShop</span> team
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Whether you&apos;re thinking about opening a shop, need help with the one you run, or have
          an idea for working together, this is the place to reach us.
        </p>

        <div
          className="liquid-glass mt-10 flex w-full max-w-md flex-col items-center gap-3 rounded-3xl p-3 sm:w-auto sm:max-w-none sm:flex-row sm:rounded-full sm:py-2 sm:pr-2 sm:pl-3"
          style={{ border: "1.5px solid rgba(255, 255, 255, 0.9)" }}
        >
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="group flex min-w-0 items-center gap-3 rounded-full px-2 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
          >
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
              style={{ background: "linear-gradient(135deg, #08c0d8 0%, #0284c7 100%)" }}
            >
              <Icon name="mail" />
            </span>
            <span className="text-left">
              <span className="block text-[11px] font-bold tracking-[0.18em] text-slate-500 uppercase">
                Email us
              </span>
              <span className="block text-base font-extrabold text-slate-900 underline decoration-brand/40 decoration-2 underline-offset-4 transition-colors group-hover:decoration-brand sm:text-lg">
                {siteConfig.supportEmail}
              </span>
            </span>
          </a>
          <CopyEmailButton email={siteConfig.supportEmail} />
        </div>

        <a
          href="#contact-form"
          className="mt-5 text-sm font-semibold text-slate-600 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-slate-900 hover:decoration-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
        >
          Or send a message with the form below
        </a>
      </div>
    </section>
  );
}

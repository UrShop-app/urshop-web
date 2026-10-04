import { Icon } from "@/components/ui/icon";
import { MetallicButton } from "@/components/ui/metallic-button";
import { ShopGrid, type ShopGridBeam, type ShopGridTile } from "@/components/ui/shop-grid";
import { siteConfig } from "@/config/site";

import { ThemeMorphDemo } from "./theme-morph-demo";

// Kept clear of the headline column; `sm:hidden` tiles fill the narrow mobile viewport instead.
const heroTiles: ReadonlyArray<ShopGridTile> = [
  { x: -13, y: 3, delay: -2.5 },
  { x: -10, y: 8, delay: -6 },
  { x: -6, y: 1, delay: -4.5 },
  { x: 6, y: 1, delay: -1 },
  { x: 10, y: 6, delay: -7 },
  { x: 13, y: 10, delay: -3.5 },
  { x: -3, y: 13, delay: -5, className: "sm:hidden" },
  { x: 3, y: 0, delay: -8, className: "sm:hidden" },
];

const heroBeams: ReadonlyArray<ShopGridBeam> = [
  { axis: "x", at: 3, delay: -3, duration: 10 },
  { axis: "x", at: 12, delay: -7, duration: 12 },
  { axis: "y", at: -11, delay: -5, duration: 9 },
  { axis: "y", at: 11, delay: -1, duration: 11 },
];

/** Shop-grid backdrop behind the hero and header, rendered by the page (see home `HeroBackdrop`). */
export function ThemesHeroBackdrop() {
  return (
    <ShopGrid
      tiles={heroTiles}
      beams={heroBeams}
      className="shop-grid-hero inset-x-0 top-0 z-0 h-[760px] md:h-[880px]"
    />
  );
}

export function ThemesHero() {
  return (
    <section
      id="themes-hero"
      aria-labelledby="themes-hero-heading"
      className="relative px-6 pt-14 pb-16 sm:pt-16 sm:pb-20 lg:px-12"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="liquid-pill mb-8 inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
          Themes
        </span>
        <h1
          id="themes-hero-heading"
          className="mb-6 text-4xl leading-[1.15] font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-6xl"
        >
          Shape a storefront that looks like <span className="cyan-underline px-1">your brand</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Pick a theme, make it yours and publish when it&apos;s ready. Your products, orders and
          checkout stay exactly the same.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <MetallicButton label="Start Free Trial" href={siteConfig.adminSignUpUrl} />
          <a
            href="#make-it-yours"
            className="glass-btn inline-flex h-11.5 items-center gap-2 rounded-full pr-6 pl-4 text-sm font-bold text-slate-700 transition-all duration-300 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
          >
            <Icon name="palette" className="text-brand" />
            See it in action
          </a>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-5xl sm:mt-16">
        <ThemeMorphDemo />
      </div>
    </section>
  );
}

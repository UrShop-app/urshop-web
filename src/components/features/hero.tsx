import { Icon } from "@/components/ui/icon";
import { MetallicButton } from "@/components/ui/metallic-button";
import { ShopGrid, type ShopGridBeam, type ShopGridTile } from "@/components/ui/shop-grid";

import { featureAreas } from "./areas";
import { SearchLink } from "./search-link";

// Kept clear of the headline column; `sm:hidden` tiles fill the narrow mobile viewport instead.
const heroTiles: ReadonlyArray<ShopGridTile> = [
  { x: -13, y: 2, delay: -2 },
  { x: -9, y: 7, delay: -6.5 },
  { x: -12, y: 11, delay: -4 },
  { x: -5, y: 1, delay: -8 },
  { x: 5, y: 1, delay: -1 },
  { x: 10, y: 4, delay: -5 },
  { x: 12, y: 9, delay: -7.5 },
  { x: 8, y: 12, delay: -3 },
  { x: -4, y: 3, delay: -3.5, className: "sm:hidden" },
  { x: 3, y: 14, delay: -6, className: "sm:hidden" },
];

const heroBeams: ReadonlyArray<ShopGridBeam> = [
  { axis: "x", at: 3, delay: -2, duration: 10 },
  { axis: "x", at: 11, delay: -6, duration: 12 },
  { axis: "y", at: -11, delay: -4, duration: 9 },
  { axis: "y", at: 9, delay: -1, duration: 11 },
];

/** Shop-grid backdrop behind the hero and header, rendered by the page (see home `HeroBackdrop`). */
export function FeaturesHeroBackdrop() {
  return (
    <ShopGrid
      tiles={heroTiles}
      beams={heroBeams}
      className="shop-grid-hero inset-x-0 top-0 z-0 h-[760px] md:h-[880px]"
    />
  );
}

export function FeaturesHero() {
  return (
    <section id="features-hero" className="relative px-6 pt-14 pb-12 sm:pt-16 lg:px-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="liquid-pill mb-8 inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
          Features
        </span>
        <h1 className="mb-6 text-4xl leading-[1.15] font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-6xl">
          Everything you need to run your <span className="cyan-underline px-1">online shop</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Build your store, take cash on delivery or bKash, book couriers and see what sells, all
          from one dashboard.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <MetallicButton label="Start Free Trial" href="/pricing" />
          <SearchLink className="glass-btn inline-flex h-11.5 items-center gap-2 rounded-full pr-6 pl-4 text-sm font-bold text-slate-700 transition-all duration-300 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark">
            <Icon name="search" className="text-brand" />
            Search all features
          </SearchLink>
        </div>
      </div>

      <nav aria-label="Feature areas" className="mx-auto mt-12 max-w-4xl">
        <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {featureAreas.map((area) => (
            <li key={area.id}>
              <a
                href={`#${area.id}`}
                className="glass-btn inline-flex items-center gap-2 rounded-full py-2 pr-4 pl-3 text-sm font-bold text-slate-700 transition-all duration-300 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
              >
                <Icon name={area.icon} className="text-brand" />
                {area.navLabel}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

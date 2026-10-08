import { ShopGrid, type ShopGridBeam, type ShopGridTile } from "@/components/ui/shop-grid";

import { ResourceSearchField } from "./resource-discovery";

// Kept clear of the headline column; `sm:hidden` tiles fill the narrow mobile viewport instead.
const heroTiles: ReadonlyArray<ShopGridTile> = [
  { x: -11, y: 2, delay: -2 },
  { x: -8, y: 8, delay: -6 },
  { x: -5, y: 0, delay: -4.5 },
  { x: 7, y: 1, delay: -1 },
  { x: 10, y: 6, delay: -7 },
  { x: 8, y: 10, delay: -3.5 },
  { x: -3, y: 12, delay: -5.5, className: "sm:hidden" },
  { x: 3, y: 0, delay: -8, className: "sm:hidden" },
];

const heroBeams: ReadonlyArray<ShopGridBeam> = [
  { axis: "x", at: 3, delay: -4, duration: 12 },
  { axis: "y", at: -9, delay: -2, duration: 10 },
  { axis: "y", at: 9, delay: -6, duration: 11 },
];

/** Shop-grid backdrop behind the hero and header, rendered by the page (see home `HeroBackdrop`). */
export function ResourcesHeroBackdrop() {
  return (
    <ShopGrid
      tiles={heroTiles}
      beams={heroBeams}
      className="shop-grid-hero inset-x-0 top-0 z-0 h-[680px] md:h-[780px]"
    />
  );
}

export function ResourcesHero() {
  return (
    // z-20 keeps the search suggestions above the featured section.
    <section
      aria-labelledby="resources-hero-heading"
      className="relative z-20 px-6 pt-14 pb-10 sm:pt-16 sm:pb-14 lg:px-12"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="liquid-pill mb-8 inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
          Resources
        </span>
        <h1
          id="resources-hero-heading"
          className="mb-6 text-4xl leading-[1.15] font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-6xl"
        >
          Learn to launch, run and <span className="cyan-underline px-1">grow</span> your online
          store
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Quick, practical help for selling online in Bangladesh.
        </p>
        <ResourceSearchField className="mt-10 w-full max-w-2xl" />
      </div>
    </section>
  );
}

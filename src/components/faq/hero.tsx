import { ShopGrid, type ShopGridBeam, type ShopGridTile } from "@/components/ui/shop-grid";

import { FaqSearchField } from "./faq-search";

// Kept clear of the headline column; `sm:hidden` tiles fill the narrow mobile viewport instead.
const heroTiles: ReadonlyArray<ShopGridTile> = [
  { x: -12, y: 3, delay: -3 },
  { x: -9, y: 9, delay: -7 },
  { x: -6, y: 1, delay: -5 },
  { x: 6, y: 2, delay: -1.5 },
  { x: 11, y: 5, delay: -6 },
  { x: 9, y: 11, delay: -4 },
  { x: -4, y: 12, delay: -2.5, className: "sm:hidden" },
  { x: 4, y: 0, delay: -8, className: "sm:hidden" },
];

const heroBeams: ReadonlyArray<ShopGridBeam> = [
  { axis: "x", at: 4, delay: -2, duration: 11 },
  { axis: "y", at: -10, delay: -5, duration: 10 },
  { axis: "y", at: 10, delay: -1, duration: 12 },
];

/** Shop-grid backdrop behind the hero and header, rendered by the page (see home `HeroBackdrop`). */
export function FaqHeroBackdrop() {
  return (
    <ShopGrid
      tiles={heroTiles}
      beams={heroBeams}
      className="shop-grid-hero inset-x-0 top-0 z-0 h-[680px] md:h-[780px]"
    />
  );
}

export function FaqHero() {
  return (
    <section
      aria-labelledby="faq-hero-heading"
      className="relative px-6 pt-14 pb-8 sm:pt-16 sm:pb-12 lg:px-12"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="liquid-pill mb-8 inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
          FAQ
        </span>
        <h1
          id="faq-hero-heading"
          className="mb-6 text-4xl leading-[1.15] font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-6xl"
        >
          Your questions about UrShop, <span className="cyan-underline px-1">answered</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Straight answers about opening your store, taking payments, delivery and what your
          shoppers see. Search for a topic or browse by category.
        </p>
        <FaqSearchField className="mt-10 w-full max-w-2xl text-left" />
      </div>
    </section>
  );
}

import { ShopGrid, type ShopGridBeam, type ShopGridTile } from "@/components/ui/shop-grid";

// Kept clear of the headline column; `sm:hidden` tiles fill the narrow mobile viewport instead.
const heroTiles: ReadonlyArray<ShopGridTile> = [
  { x: -12, y: 1, delay: -3 },
  { x: -10, y: 6, delay: -7 },
  { x: -13, y: 10, delay: -1.5 },
  { x: -6, y: 2, delay: -5.5 },
  { x: 6, y: 2, delay: -2.5 },
  { x: 11, y: 5, delay: -6 },
  { x: 9, y: 10, delay: -8.5 },
  { x: -4, y: 12, delay: -4, className: "sm:hidden" },
  { x: 4, y: 1, delay: -6.5, className: "sm:hidden" },
];

const heroBeams: ReadonlyArray<ShopGridBeam> = [
  { axis: "x", at: 4, delay: -4, duration: 11 },
  { axis: "y", at: -9, delay: -2, duration: 10 },
  { axis: "y", at: 10, delay: -6, duration: 12 },
];

/** Shop-grid backdrop behind the hero and header, rendered by the page (see home `HeroBackdrop`). */
export function AboutHeroBackdrop() {
  return (
    <ShopGrid
      tiles={heroTiles}
      beams={heroBeams}
      className="shop-grid-hero inset-x-0 top-0 z-0 h-[720px] md:h-[820px]"
    />
  );
}

const AT_A_GLANCE: ReadonlyArray<{ term: string; detail: string }> = [
  {
    term: "What it is",
    detail: "An ecommerce platform: your storefront, checkout and a merchant dashboard in one.",
  },
  {
    term: "Who it's for",
    detail: "Shops, brands and creators selling online in Bangladesh.",
  },
  {
    term: "Where your shop lives",
    detail: "On a hosted UrShop address or your own domain, under your own brand.",
  },
];

export function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative px-6 pt-14 pb-16 sm:pt-16 sm:pb-20 lg:px-12"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="liquid-pill mb-8 inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
          About UrShop
        </span>
        <h1
          id="about-hero-heading"
          className="mb-6 text-4xl leading-[1.15] font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-6xl"
        >
          We&apos;re making it <span className="cyan-underline px-1">simpler</span> to run an online
          shop in Bangladesh
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          UrShop brings your storefront, orders, payments and deliveries into one place, so you can
          spend less time on busywork and more time on the business itself.
        </p>
      </div>

      <dl
        className="liquid-glass reveal mx-auto mt-14 grid max-w-6xl gap-6 rounded-3xl p-6 sm:p-8 md:grid-cols-3 md:gap-0"
        style={{ borderRadius: "28px" }}
      >
        {AT_A_GLANCE.map((item) => (
          <div
            key={item.term}
            className="md:border-l md:border-slate-200/80 md:px-8 md:first:border-l-0 md:first:pl-2 md:last:pr-2"
          >
            <dt className="text-[12px] font-bold tracking-[0.18em] text-brand-dark uppercase">
              {item.term}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
              {item.detail}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

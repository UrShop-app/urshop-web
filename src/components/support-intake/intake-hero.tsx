import type { CSSProperties, ReactNode } from "react";

import { Icon, type IconName } from "@/components/ui/icon";
import { ShopGrid, type ShopGridBeam, type ShopGridTile } from "@/components/ui/shop-grid";

// Same quiet composition as the Contact hero: tiles kept clear of the headline column.
const heroTiles: ReadonlyArray<ShopGridTile> = [
  { x: -11, y: 2, delay: -4 },
  { x: -13, y: 7, delay: -1 },
  { x: -7, y: 10, delay: -6.5 },
  { x: 7, y: 1, delay: -3 },
  { x: 12, y: 6, delay: -5.5 },
  { x: 8, y: 11, delay: -2 },
  { x: 3, y: 0, delay: -4.5, className: "sm:hidden" },
];

const heroBeams: ReadonlyArray<ShopGridBeam> = [
  { axis: "x", at: 5, delay: -3, duration: 11 },
  { axis: "y", at: 11, delay: -1, duration: 12 },
];

/** Shop-grid backdrop behind the hero and header, rendered by the page. */
export function IntakeHeroBackdrop() {
  return (
    <ShopGrid
      tiles={heroTiles}
      beams={heroBeams}
      className="shop-grid-hero inset-x-0 top-0 z-0 h-[520px] md:h-[600px]"
    />
  );
}

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

export type IntakeHighlight = { icon: IconName; label: string };

export function IntakeHero({
  eyebrow,
  title,
  intro,
  highlights,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  /** Short reassurances shown as pills under the intro. */
  highlights: ReadonlyArray<IntakeHighlight>;
}) {
  return (
    <section
      aria-labelledby="intake-hero-heading"
      className="relative px-6 pt-12 pb-10 sm:pt-16 sm:pb-14 lg:px-12"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="liquid-pill intake-rise mb-7 inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
          {eyebrow}
        </span>
        <h1
          id="intake-hero-heading"
          className="intake-rise mb-5 text-4xl leading-[1.15] font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-6xl"
          style={delay(0.06)}
        >
          {title}
        </h1>
        <p
          className="intake-rise mx-auto max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
          style={delay(0.12)}
        >
          {intro}
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {highlights.map((item, index) => (
            <li
              key={item.label}
              className="liquid-pill intake-rise inline-flex items-center gap-2 rounded-full py-1.5 pr-4 pl-2.5 text-sm font-semibold text-slate-700"
              style={delay(0.2 + index * 0.07)}
            >
              <Icon name={item.icon} className="text-brand" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

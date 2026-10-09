import { DiaText } from "@/components/ui/dia-text";
import { PersonAvatar, type PersonPortrait } from "@/components/ui/person-avatar";

import { HeroSignup } from "./hero-signup";
import { ShopGrid, type ShopGridBeam, type ShopGridTile } from "@/components/ui/shop-grid";

const eyebrowAvatars: readonly PersonPortrait[] = ["hijab", "panjabi", "founder"];

// Kept clear of the headline column; `sm:hidden` tiles fill the narrow mobile viewport instead.
const heroTiles: ReadonlyArray<ShopGridTile> = [
  { x: -12, y: 3, delay: -1 },
  { x: -8, y: 8, delay: -6 },
  { x: -14, y: 10, delay: -3.5 },
  { x: -6, y: 14, delay: -8 },
  { x: -3, y: 1, delay: -4.5 },
  { x: 4, y: 0, delay: -9 },
  { x: 9, y: 3, delay: -7 },
  { x: 11, y: 7, delay: -2 },
  { x: 6, y: 11, delay: -5.5 },
  { x: 13, y: 12, delay: -0.5 },
  { x: -4, y: 4, delay: -2.5, className: "sm:hidden" },
  { x: 3, y: 15, delay: -7.5, className: "sm:hidden" },
];

const heroBeams: ReadonlyArray<ShopGridBeam> = [
  { axis: "x", at: 2, delay: -1, duration: 9 },
  { axis: "x", at: 10, delay: -5, duration: 11 },
  { axis: "y", at: -10, delay: -3, duration: 8 },
  { axis: "y", at: 8, delay: -6.5, duration: 10 },
  { axis: "y", at: 14, delay: -1.5, duration: 12 },
];

/**
 * Shop-grid backdrop behind the hero and the header. Rendered by the page, not inside `Hero`,
 * so it isn't clipped by the hero section and continues under the floating header.
 */
export function HeroBackdrop() {
  return (
    <ShopGrid
      tiles={heroTiles}
      beams={heroBeams}
      className="shop-grid-hero inset-x-0 top-0 z-0 h-[880px] md:h-[1000px]"
    />
  );
}

function EarningBadge({
  category,
  amount,
  portrait,
  emoji,
  color,
  className,
}: {
  category: string;
  amount: string;
  portrait: PersonPortrait;
  emoji: string;
  color: string;
  className: string;
}) {
  return (
    <div
      className={`hero-earning-badge hidden items-center gap-4 rounded-full px-6 py-3.5 transition-all duration-300 hover:scale-105 hover:rotate-0 xl:flex ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.76)",
        backdropFilter: "blur(24px) saturate(180%)",
        border: "1.5px solid rgba(255, 255, 255, 0.95)",
        boxShadow:
          "0 20px 45px -12px rgba(2, 132, 199, 0.16), inset 0 1.5px 2px rgba(255, 255, 255, 1)",
      }}
    >
      <div className="relative shrink-0">
        <div
          className="flex size-12 items-center justify-center overflow-hidden rounded-full shadow-inner ring-2 ring-white"
          style={{ backgroundColor: color }}
        >
          <PersonAvatar portrait={portrait} size={48} className="size-full object-cover" />
        </div>
        <div className="absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full bg-white text-xs shadow-sm ring-2 ring-white">
          {emoji}
        </div>
      </div>
      <div className="text-left">
        <p className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">{category}</p>
        <p className="text-base leading-snug font-extrabold tracking-tight text-slate-900">
          {amount} <span className="text-xs font-medium text-slate-500">example sales</span>
        </p>
      </div>
    </div>
  );
}

/** Primary marketing message and inactive address-selection affordance. */
export function Hero() {
  return (
    <section className="relative w-full overflow-hidden px-6 pt-16 pb-28 lg:px-12">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <EarningBadge
          category="APPAREL BRAND"
          amount="৳34,200"
          portrait="jamdani"
          emoji="🛍️"
          color="#E0F2FE"
          className="pointer-events-none absolute top-10 -left-12 z-10 -rotate-3"
        />
        <EarningBadge
          category="DIGITAL CREATOR"
          amount="৳18,650"
          portrait="creator"
          emoji="💻"
          color="#FEF3C7"
          className="hero-earning-badge-right pointer-events-none absolute top-10 -right-12 z-10 rotate-3"
        />

        <div className="liquid-pill mb-8 inline-flex items-center gap-3 rounded-full px-4 py-1.5">
          <div className="flex -space-x-2">
            {eyebrowAvatars.map((avatar) => (
              <PersonAvatar
                key={avatar}
                portrait={avatar}
                size={20}
                className="size-5 rounded-full object-cover ring-2 ring-white"
              />
            ))}
          </div>
          <span className="text-xs font-semibold tracking-tight text-slate-700">
            Launch your online shop in under 5 minutes
          </span>
        </div>

        <h1 className="mb-6 max-w-4xl text-4xl leading-[1.15] font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Start selling
          <span className="block">
            <span className="cyan-underline relative inline-block px-1">
              <DiaText
                words={["products", "digitals", "anything"]}
                duration={2400}
                className="min-w-0 text-slate-900"
              />
              <span className="text-slate-900"> online</span>
            </span>
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed font-normal text-slate-600 sm:text-lg">
          The simplest way for online shops to manage orders and delivery.
        </p>
        <HeroSignup />
      </div>
    </section>
  );
}

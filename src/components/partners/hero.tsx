import { Icon, type IconName } from "@/components/ui/icon";
import { MetallicButton } from "@/components/ui/metallic-button";
import { PauseOffscreen } from "@/components/ui/pause-offscreen";
import { ShopGrid, type ShopGridBeam, type ShopGridTile } from "@/components/ui/shop-grid";
import { cn } from "@/lib/utils";

import { BRAND_GRADIENT, CardLabel, Flow, Hub, at, partnershipContactHref } from "./kit";

const heroTiles: ReadonlyArray<ShopGridTile> = [
  { x: -13, y: 2, delay: -2.5 },
  { x: -10, y: 7, delay: -6 },
  { x: -6, y: 1, delay: -4.5 },
  { x: 5, y: 1, delay: -1 },
  { x: 9, y: 6, delay: -7.5 },
  { x: 13, y: 3, delay: -3.5 },
  { x: -3, y: 12, delay: -5, className: "sm:hidden" },
  { x: 3, y: 0, delay: -8, className: "sm:hidden" },
];

const heroBeams: ReadonlyArray<ShopGridBeam> = [
  { axis: "x", at: 5, delay: -3, duration: 11 },
  { axis: "y", at: -10, delay: -1, duration: 10 },
  { axis: "y", at: 11, delay: -5, duration: 12 },
];

/** Shop-grid backdrop behind the hero and header, rendered by the page (see home `HeroBackdrop`). */
export function PartnersHeroBackdrop() {
  return (
    <ShopGrid
      tiles={heroTiles}
      beams={heroBeams}
      className="shop-grid-hero inset-x-0 top-0 z-0 h-[760px] md:h-[880px]"
    />
  );
}

type Side = {
  id: "partner" | "urshop";
  label: string;
  items: ReadonlyArray<{ icon: IconName; label: string }>;
};

const PARTNER_SIDE: Side = {
  id: "partner",
  label: "You bring",
  items: [
    { icon: "groups", label: "Clients" },
    { icon: "public", label: "Markets" },
    { icon: "share", label: "Distribution" },
    { icon: "hub", label: "Technology" },
  ],
};

const URSHOP_SIDE: Side = {
  id: "urshop",
  label: "UrShop brings",
  items: [
    { icon: "storefront", label: "Platform" },
    { icon: "code", label: "Engineering" },
    { icon: "layers", label: "Product" },
    { icon: "rocket_launch", label: "Delivery" },
  ],
};

const OUTCOMES: ReadonlyArray<{ icon: IconName; label: string }> = [
  { icon: "storefront", label: "New merchants" },
  { icon: "public", label: "New markets" },
  { icon: "trending_up", label: "Software revenue" },
  { icon: "work", label: "Client work" },
];

function SideCard({ side, className }: { side: Side; className?: string }) {
  const isPartner = side.id === "partner";
  return (
    <div
      className={cn(
        "liquid-glass-card rounded-3xl p-4 text-left sm:p-5",
        isPartner ? "partners-from-start" : "partners-from-end",
        className,
      )}
      style={{ ...at(isPartner ? 0.1 : 0.3), borderRadius: "24px" }}
    >
      <div className="flex items-center justify-between gap-2">
        <CardLabel className={isPartner ? undefined : "text-brand-dark"}>{side.label}</CardLabel>
        {isPartner ? null : (
          <span className="size-2 rounded-full" style={{ background: BRAND_GRADIENT }} />
        )}
      </div>
      <ul className="mt-3 space-y-1.5 sm:space-y-2">
        {side.items.map((item, index) => (
          <li
            key={item.label}
            className={cn(
              "demo-in flex items-center gap-2 rounded-xl px-2 py-1.5 text-xs font-bold sm:gap-2.5 sm:px-2.5 sm:text-sm",
              isPartner ? "bg-white/80 text-slate-700" : "bg-brand-light/70 text-slate-800",
            )}
            style={at((isPartner ? 0.45 : 0.6) + index * 0.12)}
          >
            <Icon
              name={item.icon}
              className={cn("-my-1 shrink-0 scale-75", isPartner ? "text-slate-400" : "text-brand")}
            />
            <span className="min-w-0">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OpportunityCard() {
  return (
    <div
      className="demo-pop relative mx-auto w-fit rounded-full border border-white px-5 py-2.5 text-center shadow-[0_18px_36px_-14px_rgba(2,132,199,0.45)]"
      style={{ ...at(1.9), background: BRAND_GRADIENT }}
    >
      <span
        className="partners-glow pointer-events-none absolute -inset-2 rounded-full bg-brand/25 blur-md"
        aria-hidden="true"
      />
      <span className="relative flex items-center gap-2 text-sm font-extrabold whitespace-nowrap text-white sm:text-base">
        <Icon name="handshake" className="-my-1" />A shared opportunity
      </span>
    </div>
  );
}

/** The opportunity splitting into what partnerships create. */
function Outcomes() {
  return (
    <div className="relative mx-auto max-w-3xl">
      {/* Stem, then a bar across the four branch centres. */}
      <span className="mx-auto block h-5 w-px bg-brand/40" />
      <span
        className="demo-grow absolute top-5 right-1/4 left-1/4 block h-px origin-center bg-brand/40 sm:right-[12.5%] sm:left-[12.5%]"
        style={at(2.3)}
      />
      <ul className="grid grid-cols-2 gap-y-3 sm:grid-cols-4">
        {OUTCOMES.map((outcome, index) => (
          <li key={outcome.label} className="flex flex-col items-center">
            <Flow
              axis="y"
              delay={2.6 + index * 0.3}
              className={cn("h-7 w-4", index > 1 && "max-sm:hidden")}
            />
            <span
              className="demo-pop inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 shadow-[0_6px_16px_-8px_rgba(2,132,199,0.3)] sm:text-[13px]"
              style={at(2.5 + index * 0.15)}
            >
              <Icon name={outcome.icon} className="-my-1 scale-75 text-brand" />
              {outcome.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Two businesses meeting around UrShop and opening a shared opportunity. */
function PartnershipBridge() {
  return (
    <div aria-hidden="true" className="select-none">
      {/* Tablet and up: the two sides either side of UrShop. */}
      <div className="mx-auto hidden max-w-3xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:grid">
        <SideCard side={PARTNER_SIDE} className="h-full" />
        <div className="flex items-center self-center">
          <Flow className="h-4 w-10 lg:w-16" delay={1} />
          <Hub className="demo-pop" style={at(0)} />
          <Flow reverse className="h-4 w-10 lg:w-16" delay={1.2} />
        </div>
        <SideCard side={URSHOP_SIDE} className="h-full" />
      </div>

      {/* Phones: the two sides above UrShop. */}
      <div className="md:hidden">
        <div className="grid grid-cols-2 gap-3">
          <SideCard side={PARTNER_SIDE} />
          <SideCard side={URSHOP_SIDE} />
        </div>
        <div className="grid grid-cols-2">
          <Flow axis="y" className="mx-auto h-8 w-4" delay={1} />
          <Flow axis="y" className="mx-auto h-8 w-4" delay={1.2} />
        </div>
        <Hub size="sm" className="demo-pop mx-auto" style={at(0)} />
      </div>

      <Flow axis="y" className="mx-auto h-9 w-4 md:h-10" delay={1.6} />
      <OpportunityCard />
      <Outcomes />
    </div>
  );
}

export function PartnersHero() {
  return (
    <section
      aria-labelledby="partners-hero-heading"
      className="relative px-6 pt-14 pb-14 sm:pt-16 lg:px-12"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="liquid-pill mb-8 inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
          Partners
        </span>
        <h1
          id="partners-hero-heading"
          className="mb-6 text-4xl leading-[1.15] font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-6xl"
        >
          Build with us. Sell with us. <span className="cyan-underline px-1">Grow</span> with us.
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          You bring clients, markets or technology. We bring the platform and the engineers.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <MetallicButton label="Talk partnership" href={partnershipContactHref()} />
          <a
            href="#ways"
            className="glass-btn inline-flex h-11.5 items-center gap-2 rounded-full pr-6 pl-4 text-sm font-bold text-slate-700 transition-all duration-300 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
          >
            <Icon name="call_split" className="text-brand" />
            Explore ways to partner
          </a>
        </div>
      </div>

      <PauseOffscreen className="mx-auto mt-12 max-w-5xl sm:mt-14">
        <PartnershipBridge />
        <p className="sr-only">
          Two sides meet around UrShop. A partner brings clients, markets, distribution or
          technology; UrShop brings the platform, engineering, product and delivery. Together they
          open a shared opportunity: new merchants, new markets, software revenue and client work.
        </p>
      </PauseOffscreen>
    </section>
  );
}

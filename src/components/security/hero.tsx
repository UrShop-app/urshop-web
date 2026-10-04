import Image from "next/image";

import icon from "@/assets/icon.png";
import { Icon, type IconName } from "@/components/ui/icon";
import { MetallicButton } from "@/components/ui/metallic-button";
import { ShopGrid, type ShopGridBeam, type ShopGridTile } from "@/components/ui/shop-grid";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { at } from "./demo-kit";
import { PauseOffscreen } from "./pause-offscreen";

const heroTiles: ReadonlyArray<ShopGridTile> = [
  { x: -13, y: 3, delay: -2 },
  { x: -9, y: 7, delay: -6 },
  { x: -6, y: 1, delay: -4 },
  { x: 6, y: 2, delay: -1.5 },
  { x: 10, y: 6, delay: -7 },
  { x: 13, y: 10, delay: -3 },
  { x: -3, y: 13, delay: -5, className: "sm:hidden" },
  { x: 3, y: 0, delay: -8, className: "sm:hidden" },
];

const heroBeams: ReadonlyArray<ShopGridBeam> = [
  { axis: "x", at: 4, delay: -4, duration: 12 },
  { axis: "y", at: -11, delay: -2, duration: 10 },
  { axis: "y", at: 11, delay: -6, duration: 11 },
];

/** Shop-grid backdrop behind the hero and header, rendered by the page (see home `HeroBackdrop`). */
export function SecurityHeroBackdrop() {
  return (
    <ShopGrid
      tiles={heroTiles}
      beams={heroBeams}
      className="shop-grid-hero inset-x-0 top-0 z-0 h-[760px] md:h-[880px]"
    />
  );
}

// Geometry in the SVG's 1000 × 540 viewBox. Layers are drawn from the store outwards; the
// controls sit on either side and connect to the outer layer.
const VIEW = { width: 1000, height: 540 };
const CENTER = { x: 500, y: 270 };
const LAYERS = [
  { width: 340, height: 236, radius: 34, delay: 0.25 },
  { width: 410, height: 316, radius: 42, delay: 0.5 },
  { width: 480, height: 396, radius: 50, delay: 0.75 },
] as const;
const OUTER = LAYERS[2];

type Control = {
  id: string;
  title: string;
  fact: string;
  icon: IconName;
  side: "left" | "right";
  y: number;
  /** Seconds after load when this control switches on. */
  delay: number;
};

// Every fact is backed by src/data/features.ts or src/data/faq.ts (see the section below it).
const CONTROLS: ReadonlyArray<Control> = [
  {
    id: "account",
    title: "Account",
    fact: "Two-factor sign-in",
    icon: "key",
    side: "left",
    y: 130,
    delay: 1.1,
  },
  {
    id: "publishing",
    title: "Publishing",
    fact: "Private until published",
    icon: "publish",
    side: "right",
    y: 130,
    delay: 1.4,
  },
  {
    id: "staff",
    title: "Staff access",
    fact: "Only what you allow",
    icon: "badge",
    side: "left",
    y: 270,
    delay: 1.7,
  },
  {
    id: "domain",
    title: "Domain & HTTPS",
    fact: "Verified, then HTTPS",
    icon: "https",
    side: "right",
    y: 270,
    delay: 2,
  },
  {
    id: "data",
    title: "Store data",
    fact: "Scoped to your store",
    icon: "database",
    side: "left",
    y: 410,
    delay: 2.3,
  },
  {
    id: "payments",
    title: "Payments",
    fact: "Your own bKash account",
    icon: "account_balance_wallet",
    side: "right",
    y: 410,
    delay: 2.6,
  },
];

const CONTROL_X = { left: 120, right: 880 };
const CONTROL_HALF_WIDTH = 110;

/** Rounded rectangle centred on the store, as a path so `pathLength` works everywhere. */
function layerPath({ width, height, radius }: { width: number; height: number; radius: number }) {
  const left = CENTER.x - width / 2;
  const top = CENTER.y - height / 2;
  const right = left + width;
  const bottom = top + height;
  return [
    `M${left + radius} ${top}`,
    `H${right - radius}`,
    `A${radius} ${radius} 0 0 1 ${right} ${top + radius}`,
    `V${bottom - radius}`,
    `A${radius} ${radius} 0 0 1 ${right - radius} ${bottom}`,
    `H${left + radius}`,
    `A${radius} ${radius} 0 0 1 ${left} ${bottom - radius}`,
    `V${top + radius}`,
    `A${radius} ${radius} 0 0 1 ${left + radius} ${top}`,
    "Z",
  ].join(" ");
}

function connectorPath(control: Control) {
  const outerEdge =
    control.side === "left" ? CENTER.x - OUTER.width / 2 : CENTER.x + OUTER.width / 2;
  const chipEdge =
    control.side === "left"
      ? CONTROL_X.left + CONTROL_HALF_WIDTH
      : CONTROL_X.right - CONTROL_HALF_WIDTH;
  return control.side === "left"
    ? `M${chipEdge} ${control.y} H${outerEdge}`
    : `M${outerEdge} ${control.y} H${chipEdge}`;
}

/** A control switching on: its icon tile turns brand-coloured and a status dot pops in. */
function ControlChip({ control, className }: { control: Control; className?: string }) {
  return (
    <div
      className={cn(
        "liquid-glass-card demo-in flex items-center gap-2.5 rounded-2xl p-3",
        className,
      )}
      style={{ ...at(control.delay - 0.35), borderRadius: "18px" }}
    >
      <span className="relative grid size-9 shrink-0 place-items-center *:[grid-area:1/1]">
        <span
          className="demo-out grid size-9 place-items-center rounded-xl bg-slate-100 text-slate-400"
          style={at(control.delay)}
        >
          <Icon name={control.icon} className="scale-90" />
        </span>
        <span
          className="demo-pop grid size-9 place-items-center rounded-xl bg-brand-light text-brand-dark"
          style={at(control.delay)}
        >
          <Icon name={control.icon} className="scale-90" />
        </span>
        <span
          className="demo-pop absolute -top-1 -right-1 size-3 rounded-full border-2 border-white bg-emerald-500"
          style={at(control.delay + 0.15)}
        />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[10.5px] font-bold tracking-[0.12em] text-slate-500 uppercase">
          {control.title}
        </span>
        <span className="block text-[13px] leading-snug font-bold text-slate-800">
          {control.fact}
        </span>
      </span>
    </div>
  );
}

const DASHBOARD_NAV = ["Orders", "Products", "Customers", "Storefront", "Payments"];

/** The merchant dashboard at the centre: a sketch, not the real admin UI. */
function StoreSurface({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "demo-in overflow-hidden rounded-3xl border border-white bg-white/95 shadow-[0_28px_56px_-20px_rgba(2,132,199,0.32),0_2px_8px_-2px_rgba(15,23,42,0.06)]",
        className,
      )}
      style={at(0)}
    >
      <div className="flex items-center gap-2 border-b border-slate-200/70 px-3.5 py-2.5">
        <Image src={icon} alt="" sizes="32px" className="h-5 w-auto" />
        <span className="text-[13px] font-extrabold text-slate-900">Your store</span>
        <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
          Dashboard
        </span>
      </div>
      <div className="grid grid-cols-[5.6rem_minmax(0,1fr)] gap-3 p-3">
        <ul className="space-y-1">
          {DASHBOARD_NAV.map((item, index) => (
            <li
              key={item}
              className={cn(
                "rounded-md px-2 py-0.5 text-[10px] font-semibold",
                index === 0 ? "bg-brand-light text-brand-dark" : "text-slate-500",
              )}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="flex min-w-0 flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            {[0, 1].map((cell) => (
              <span key={cell} className="rounded-lg bg-slate-50 p-2">
                <span className="block h-1.5 w-8 rounded-full bg-slate-200" />
                <span className="mt-1.5 block h-2.5 w-12 rounded-full bg-slate-300" />
              </span>
            ))}
          </div>
          {[0.9, 0.7, 0.8].map((width, row) => (
            <span key={row} className="flex items-center gap-2 rounded-lg bg-slate-50 px-2 py-1.5">
              <span className="size-3 shrink-0 rounded bg-slate-200" />
              <span
                className="block h-1.5 rounded-full bg-slate-200"
                style={{ width: `${width * 70}%` }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Layers drawn around the store, then six controls switching on. CSS + SVG only. */
function ProtectionLayers() {
  return (
    <div aria-hidden="true" className="select-none">
      {/* Laptop and up: layered boundary with controls either side. */}
      <div className="relative mx-auto hidden aspect-[1000/540] max-w-5xl lg:block">
        <svg
          viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
          className="absolute inset-0 size-full overflow-visible"
        >
          <defs>
            <linearGradient id="security-layer" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#08c0d8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          {LAYERS.map((layer, index) => (
            <g key={index}>
              <path
                d={layerPath(layer)}
                fill={index === 0 ? "rgba(224, 242, 254, 0.35)" : "none"}
                stroke="#e2e8f0"
                strokeWidth="1.5"
                strokeDasharray="4 7"
              />
              <path
                d={layerPath(layer)}
                pathLength={1}
                className="demo-draw"
                style={at(layer.delay)}
                fill="none"
                stroke="url(#security-layer)"
                strokeWidth="2"
              />
              {/* A slow brightening wave travels outwards once everything is on. */}
              <path
                d={layerPath(layer)}
                className="security-layer-wave"
                style={{ animationDelay: `${3.2 + index * 0.45}s` }}
                fill="none"
                stroke="#08c0d8"
                strokeWidth="3"
              />
            </g>
          ))}
          {CONTROLS.map((control) => (
            <g key={control.id}>
              <path
                d={connectorPath(control)}
                pathLength={1}
                className="demo-draw"
                style={at(control.delay - 0.2)}
                fill="none"
                stroke="#08c0d8"
                strokeOpacity="0.6"
                strokeWidth="2"
              />
              <circle
                className="demo-pop"
                style={{
                  ...at(control.delay),
                  transformOrigin: "center",
                  transformBox: "fill-box",
                }}
                cx={
                  control.side === "left" ? CENTER.x - OUTER.width / 2 : CENTER.x + OUTER.width / 2
                }
                cy={control.y}
                r="5"
                fill="#08c0d8"
              />
            </g>
          ))}
        </svg>

        <StoreSurface className="absolute top-1/2 left-1/2 w-[28%] -translate-x-1/2 -translate-y-1/2" />

        {CONTROLS.map((control) => (
          <div
            key={control.id}
            className="absolute w-[22%] -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(CONTROL_X[control.side] / VIEW.width) * 100}%`,
              top: `${(control.y / VIEW.height) * 100}%`,
            }}
          >
            <ControlChip control={control} />
          </div>
        ))}
      </div>

      {/* Phones and tablets: the store above its controls. */}
      <div className="lg:hidden">
        <StoreSurface className="mx-auto max-w-xs" />
        <div className="mt-6 grid gap-2.5 sm:grid-cols-2 md:grid-cols-3">
          {CONTROLS.map((control) => (
            <ControlChip key={control.id} control={control} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SecurityHero() {
  return (
    <section
      aria-labelledby="security-hero-heading"
      className="relative px-6 pt-14 pb-14 sm:pt-16 lg:px-12"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="liquid-pill mb-8 inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
          Security
        </span>
        <h1
          id="security-hero-heading"
          className="mb-6 text-4xl leading-[1.15] font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-6xl"
        >
          Clear control over <span className="cyan-underline px-1">your store</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Decide who can access what, what goes live and how shoppers reach you.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <MetallicButton label="Start Free Trial" href={siteConfig.adminSignUpUrl} />
          <a
            href="#access"
            className="glass-btn inline-flex h-11.5 items-center gap-2 rounded-full pr-6 pl-4 text-sm font-bold text-slate-700 transition-all duration-300 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
          >
            <Icon name="admin_panel_settings" className="text-brand" />
            See how access works
          </a>
        </div>
      </div>

      <PauseOffscreen className="mx-auto mt-12 max-w-5xl sm:mt-14">
        <ProtectionLayers />
        <p className="sr-only">
          Your store dashboard at the centre, surrounded by layers of control: two-factor sign-in
          for your account, staff who see only what you allow, store data scoped to your store,
          storefront changes that stay private until published, verified domains with HTTPS, and
          payments into your own bKash merchant account.
        </p>
      </PauseOffscreen>
    </section>
  );
}

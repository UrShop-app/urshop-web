import type { CSSProperties, ReactNode } from "react";

import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import type { DemoAutoplay } from "./use-demo-autoplay";

/*
 * Building blocks for the Themes page demos. A demo is a marketing sketch of real behaviour
 * (see src/data/features.ts and the theme inspection): it may simplify the product UI, but it
 * never shows a control, option or capability the product doesn't have. Store content is
 * clearly example content ("Your brand"), never a real or invented merchant.
 */

export const BRAND_GRADIENT = "linear-gradient(135deg, #08c0d8 0%, #0284c7 100%)";

/** Example catalogue shared by every demo, so the same products appear in every presentation. */
export const EXAMPLE_PRODUCTS = [
  { name: "Handloom saree", price: "৳3,450", colors: ["#fecdd3", "#e11d48"], shape: "fabric" },
  { name: "Cotton panjabi", price: "৳1,890", colors: ["#bae6fd", "#0284c7"], shape: "shirt" },
  { name: "Terracotta vase", price: "৳1,250", colors: ["#fed7aa", "#c2410c"], shape: "vase" },
  { name: "Jute tote", price: "৳890", colors: ["#d9f99d", "#4d7c0f"], shape: "tote" },
  { name: "Brass lamp", price: "৳2,300", colors: ["#fde68a", "#b45309"], shape: "lamp" },
  { name: "Ceramic mug", price: "৳650", colors: ["#ddd6fe", "#6d28d9"], shape: "mug" },
] as const;

/** The example store's look in each theme family. */
export const THEME_LOOKS = {
  classic: {
    background: "#ffffff",
    ink: "#0f172a",
    muted: "#64748b",
    accent: "#0f766e",
    soft: "#f1f5f9",
    radius: "0.45em",
  },
  aura: {
    background: "#faf6f1",
    ink: "#2b211c",
    muted: "#7c6a5f",
    accent: "#9a4b2f",
    soft: "#efe6dc",
    radius: "0em",
  },
} as const;

export type ExampleProduct = (typeof EXAMPLE_PRODUCTS)[number];

const SHAPES: Record<ExampleProduct["shape"], ReactNode> = {
  fabric: (
    <>
      <rect x="9" y="11" width="22" height="5" rx="1" />
      <rect x="9" y="18" width="22" height="5" rx="1" opacity=".8" />
      <rect x="9" y="25" width="22" height="5" rx="1" opacity=".6" />
    </>
  ),
  shirt: (
    <path d="M14 10 9 13l2.5 5 2.5-1.2V31h12V16.8l2.5 1.2L31 13l-5-3c-1 2-3 3-6 3s-5-1-6-3Z" />
  ),
  vase: <path d="M16 9h8v3c0 2 4 4 4 10 0 6-3 9-8 9s-8-3-8-9c0-6 4-8 4-10V9Z" />,
  tote: (
    <>
      <path d="M11 16h18l-2 16H13l-2-16Z" />
      <path d="M15.5 16v-3a4.5 4.5 0 0 1 9 0v3" fill="none" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  lamp: (
    <>
      <path d="M13 9h14l4 11H9l4-11Z" />
      <rect x="19" y="20" width="2" height="9" />
      <rect x="14" y="29" width="12" height="2.5" rx="1.25" />
    </>
  ),
  mug: (
    <>
      <rect x="10" y="13" width="16" height="17" rx="2.5" />
      <path d="M26 17h2.5a3.5 3.5 0 0 1 0 7H26" fill="none" stroke="currentColor" strokeWidth="2" />
    </>
  ),
};

/** Stylised product photo: a gradient with the product's silhouette. Fills its parent. */
export function ProductArt({
  product,
  className,
  style,
}: {
  product: ExampleProduct;
  className?: string;
  style?: CSSProperties;
}) {
  const [from, to] = product.colors;
  return (
    <span
      className={cn("relative block overflow-hidden", className)}
      style={{ background: `linear-gradient(150deg, ${from} 0%, ${to} 130%)`, ...style }}
    >
      <span className="absolute -top-1/4 -left-1/4 size-3/4 rounded-full bg-white/25 blur-md" />
      <svg
        viewBox="0 0 40 40"
        className="absolute inset-0 m-auto h-1/2 w-1/2 text-white/85 drop-shadow-sm"
        fill="currentColor"
      >
        {SHAPES[product.shape]}
      </svg>
    </span>
  );
}

/** Small line icons for inside the mock storefronts (Material icons are fixed at 24px). */
const GLYPHS = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </>
  ),
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  home: <path d="M4 11 12 4l8 7v9h-5v-6H9v6H4v-9Z" />,
  grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  grip: <path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01" strokeWidth="3.2" />,
} as const;

export function Glyph({
  name,
  className,
  style,
}: {
  name: keyof typeof GLYPHS;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-[1em] shrink-0", className)}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {GLYPHS[name]}
    </svg>
  );
}

export function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("flex gap-[0.1em] text-amber-400", className)}>
      {[0, 1, 2, 3, 4].map((star) => (
        <svg key={star} viewBox="0 0 24 24" className="size-[1em]" fill="currentColor">
          <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />
        </svg>
      ))}
    </span>
  );
}

/** Placeholder text line, sized in em so it scales with the mock. */
export function Line({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <span
      className={cn("block h-[0.5em] rounded-full bg-current opacity-15", className)}
      style={style}
    />
  );
}

/**
 * Scales its contents with its own width: everything inside is sized in `em`, and the font size
 * follows the container (`cqw`), so a mock looks the same at every viewport, just smaller.
 */
export function ScaledMock({
  children,
  className,
  scale = 1.5,
}: {
  children: ReactNode;
  className?: string;
  /** Font size as a percentage of the container width. */
  scale?: number;
}) {
  return (
    <div aria-hidden="true" className={cn("@container select-none", className)}>
      <div className="h-full" style={{ fontSize: `clamp(6px, ${scale}cqw, 15px)` }}>
        {children}
      </div>
    </div>
  );
}

/** Browser window chrome around a mock storefront. */
export function BrowserFrame({
  address,
  children,
  className,
}: {
  address: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-white bg-white/80 shadow-[0_32px_64px_-24px_rgba(2,132,199,0.28),0_2px_8px_-2px_rgba(15,23,42,0.06)] backdrop-blur",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-slate-200/70 bg-white/90 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-slate-200" />
          <span className="size-2.5 rounded-full bg-slate-200" />
          <span className="size-2.5 rounded-full bg-slate-200" />
        </span>
        <span className="mx-auto flex h-7 min-w-0 items-center gap-2 truncate rounded-full bg-slate-100 px-4 text-xs font-semibold text-slate-500">
          {address}
        </span>
        <span className="w-12" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}

/** Pause/play for an autoplaying demo. Hidden under reduced motion, where demos don't play. */
export function AutoplayButton({ demo, className }: { demo: DemoAutoplay; className?: string }) {
  if (demo.reducedMotion) return null;
  return (
    <button
      type="button"
      onClick={demo.toggleAutoplay}
      className={cn(
        "inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 pr-3.5 pl-2 text-xs font-bold text-slate-600 transition-colors hover:border-slate-300 hover:bg-white hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark",
        className,
      )}
    >
      <Icon name={demo.isAutoplayOn ? "pause" : "play_arrow"} className="text-brand" />
      {demo.isAutoplayOn ? "Pause demo" : "Play demo"}
    </button>
  );
}

/** Row of mutually exclusive options (a toolbar of toggle buttons). */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
  size = "md",
}: {
  label: string;
  options: ReadonlyArray<{ value: T; label: ReactNode; icon?: IconName; ariaLabel?: string }>;
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/80 p-1",
        className,
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            aria-label={option.ariaLabel}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full font-bold whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark",
              size === "sm" ? "h-7 px-2.5 text-[11px]" : "h-8 px-3.5 text-xs",
              isActive ? "text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
            )}
            style={isActive ? { background: BRAND_GRADIENT } : undefined}
          >
            {option.icon ? <Icon name={option.icon} /> : null}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/** Small uppercase label used in the mock editor panels. */
export function PanelLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn("text-[10px] font-bold tracking-[0.16em] text-slate-400 uppercase", className)}
    >
      {children}
    </p>
  );
}

/** Small example homepage in one brand color, for thumbnails and previews. Sized in em. */
export function MiniStore({
  accent,
  serif = false,
  className,
}: {
  accent: string;
  serif?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-[0.7em] bg-white p-[0.9em] text-slate-900",
        className,
      )}
    >
      <div className="flex items-center gap-[0.4em]">
        <span
          className="size-[1.1em] rounded-[0.3em] transition-colors duration-500"
          style={{ background: accent }}
        />
        <span className={cn("text-[0.9em] font-bold", serif && "font-serif font-normal")}>
          Your brand
        </span>
        <span className="ml-auto text-[1em] text-slate-400">
          <Glyph name="bag" />
        </span>
      </div>
      <div
        className="flex min-h-[4.5em] flex-1 flex-col justify-center rounded-[0.5em] px-[0.9em] text-white transition-colors duration-500"
        style={{ background: accent }}
      >
        <span
          className={cn("text-[1.1em] leading-tight font-bold", serif && "font-serif font-normal")}
        >
          New arrivals
        </span>
        <span className="mt-[0.4em] h-[1.4em] w-[4.5em] rounded-full bg-white/90" />
      </div>
      <div className="grid grid-cols-3 gap-[0.5em]">
        {EXAMPLE_PRODUCTS.slice(1, 4).map((product) => (
          <ProductArt
            key={product.name}
            product={product}
            className="aspect-square rounded-[0.4em]"
          />
        ))}
      </div>
    </div>
  );
}

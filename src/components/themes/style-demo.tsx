"use client";

import { useId, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import {
  AutoplayButton,
  EXAMPLE_PRODUCTS,
  Glyph,
  PanelLabel,
  ProductArt,
  ScaledMock,
  Segmented,
} from "./demo-kit";
import { useDemoAutoplay } from "./use-demo-autoplay";

const COLORS = [
  { value: "#0f766e", name: "Teal" },
  { value: "#6d28d9", name: "Violet" },
  { value: "#be185d", name: "Rose" },
  { value: "#1e293b", name: "Ink" },
] as const;

const FONTS = {
  sans: { family: "var(--font-sans)", label: "Sans-serif" },
  serif: { family: "ui-serif, Georgia, 'Times New Roman', serif", label: "Serif" },
  geometric: { family: "var(--font-stat)", label: "Geometric" },
} as const;

type StyleState = {
  color: string;
  font: keyof typeof FONTS;
  density: "compact" | "spacious";
  corners: "sharp" | "rounded";
  headline: string;
};

type Field = keyof StyleState;

// Each frame changes one thing, so the visitor can follow cause and effect.
const FRAMES: ReadonlyArray<StyleState> = [
  {
    color: COLORS[0].value,
    font: "sans",
    density: "compact",
    corners: "sharp",
    headline: "New arrivals are here",
  },
  {
    color: COLORS[1].value,
    font: "sans",
    density: "compact",
    corners: "sharp",
    headline: "New arrivals are here",
  },
  {
    color: COLORS[1].value,
    font: "serif",
    density: "compact",
    corners: "sharp",
    headline: "New arrivals are here",
  },
  {
    color: COLORS[1].value,
    font: "serif",
    density: "spacious",
    corners: "sharp",
    headline: "New arrivals are here",
  },
  {
    color: COLORS[1].value,
    font: "serif",
    density: "spacious",
    corners: "rounded",
    headline: "New arrivals are here",
  },
  {
    color: COLORS[1].value,
    font: "serif",
    density: "spacious",
    corners: "rounded",
    headline: "Made by hand, made to last",
  },
];

const FIELD_ORDER: ReadonlyArray<Field> = ["color", "font", "density", "corners", "headline"];

function changedField(step: number): Field | null {
  const current = FRAMES[step];
  const previous = FRAMES[step - 1];
  if (!current || !previous) return null;
  return FIELD_ORDER.find((field) => current[field] !== previous[field]) ?? null;
}

/** The example homepage, styled entirely from the editor state. */
function StylePreview({ state }: { state: StyleState }) {
  const spacious = state.density === "spacious";
  const vars = {
    "--accent": state.color,
    "--r": state.corners === "rounded" ? "1.1em" : "0.15em",
    "--pad": spacious ? "2em" : "1.2em",
    "--gap": spacious ? "1.6em" : "0.8em",
    fontFamily: FONTS[state.font].family,
  } as CSSProperties;
  const ease = "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white text-slate-900" style={vars}>
      <p className={cn("bg-[var(--accent)] py-[0.45em] text-center text-[0.8em] text-white", ease)}>
        New collection out now
      </p>
      <div className={cn("flex items-center gap-[1.2em] px-[var(--pad)] py-[0.9em]", ease)}>
        <span className="flex items-center gap-[0.5em] text-[1.2em] font-bold">
          <span className={cn("size-[1.2em] rounded-[var(--r)] bg-[var(--accent)]", ease)} />
          Your brand
        </span>
        <span className="ml-auto hidden gap-[1.2em] text-[0.85em] text-slate-500 @md:flex">
          <span>Shop</span>
          <span>Categories</span>
          <span>About</span>
        </span>
        <span className="ml-auto flex gap-[0.9em] text-[1.2em] @md:ml-0">
          <Glyph name="search" />
          <Glyph name="bag" />
        </span>
      </div>
      <div
        className={cn(
          "mx-[var(--pad)] flex shrink-0 flex-col justify-center overflow-hidden rounded-[var(--r)] p-[var(--pad)] text-white",
          spacious ? "min-h-[12em]" : "min-h-[9em]",
          ease,
        )}
        style={{
          background: `linear-gradient(125deg, var(--accent) 0%, color-mix(in oklab, var(--accent) 55%, white) 100%)`,
        }}
      >
        <span className="block max-w-[14em] text-[1.9em] leading-[1.1] font-bold">
          {state.headline || " "}
        </span>
        <span className="mt-[0.5em] block text-[0.9em] opacity-85">
          Discover this week&apos;s picks
        </span>
        <span
          className={cn(
            "mt-[1em] inline-flex w-fit rounded-[var(--r)] bg-white px-[1.1em] py-[0.55em] text-[0.85em] font-bold text-[var(--accent)]",
            ease,
          )}
        >
          Shop now
        </span>
      </div>
      <p className={cn("px-[var(--pad)] pt-[var(--gap)] text-[1.15em] font-bold", ease)}>
        Best sellers
      </p>
      <div className={cn("grid grid-cols-4 gap-[var(--gap)] px-[var(--pad)] pt-[0.7em]", ease)}>
        {EXAMPLE_PRODUCTS.slice(1, 5).map((product) => (
          <div key={product.name} className="min-w-0">
            <ProductArt
              product={product}
              className={cn("aspect-square rounded-[var(--r)]", ease)}
            />
            <p className="mt-[0.5em] truncate text-[0.85em] font-semibold">{product.name}</p>
            <p className="flex items-center justify-between text-[0.8em] text-slate-500">
              {product.price}
              <span
                className={cn(
                  "flex size-[1.7em] items-center justify-center rounded-[var(--r)] bg-[var(--accent)] text-white",
                  ease,
                )}
              >
                +
              </span>
            </p>
          </div>
        ))}
      </div>
      <div
        className={cn("grid grid-cols-2 gap-[var(--gap)] px-[var(--pad)] pt-[var(--gap)]", ease)}
      >
        {["Sarees", "Home decor"].map((label, index) => (
          <span
            key={label}
            className={cn(
              "flex h-[5em] items-center justify-between rounded-[var(--r)] px-[1.2em] text-white",
              ease,
            )}
            style={{
              background:
                index === 0 ? "var(--accent)" : "color-mix(in oklab, var(--accent) 35%, #0f172a)",
            }}
          >
            <span className="text-[1.05em] font-bold">{label}</span>
            <span className="text-[0.8em] underline underline-offset-2">Shop</span>
          </span>
        ))}
      </div>
      <div
        className={cn(
          "mt-auto grid grid-cols-[1.4fr_1fr_1fr] gap-[1.5em] px-[var(--pad)] py-[1.2em] text-white/60",
          ease,
        )}
        style={{ background: "color-mix(in oklab, var(--accent) 22%, #0f172a)" }}
      >
        <span className="space-y-[0.5em]">
          <span className="block text-[0.95em] font-bold text-white">Your brand</span>
          <span className="block h-[0.45em] w-4/5 rounded-full bg-current opacity-40" />
        </span>
        {[0, 1].map((column) => (
          <span key={column} className="space-y-[0.5em]">
            <span className="block h-[0.45em] w-1/2 rounded-full bg-current" />
            <span className="block h-[0.45em] w-3/4 rounded-full bg-current opacity-40" />
            <span className="block h-[0.45em] w-2/3 rounded-full bg-current opacity-40" />
          </span>
        ))}
      </div>
    </div>
  );
}

function ControlGroup({
  label,
  highlighted,
  children,
}: {
  label: string;
  highlighted: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-3 transition-[background-color,box-shadow] duration-500",
        highlighted ? "bg-brand-light/70 shadow-[inset_0_0_0_1.5px_rgba(8,192,216,0.45)]" : "",
      )}
    >
      <PanelLabel className="mb-2">{label}</PanelLabel>
      {children}
    </div>
  );
}

/**
 * Theme editor sketch: brand color, font, spacing density, corner style and hero text, with the
 * preview reacting live. Autoplay changes one setting at a time; any control takes over.
 */
export function StyleDemo() {
  const headlineId = useId();
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, {
    durations: [2400, 1900, 1900, 1900, 1900, 3000],
    reducedMotionStep: FRAMES.length - 1,
  });
  const [custom, setCustom] = useState<StyleState | null>(null);
  const frame = FRAMES[demo.step] ?? FRAMES[0]!;
  const state = demo.isAutoplayOn || !custom ? frame : custom;
  const highlight = demo.isAutoplayOn ? changedField(demo.step) : null;

  const update = <K extends Field>(field: K, value: StyleState[K]) => {
    setCustom({ ...state, [field]: value });
    demo.stop();
  };

  return (
    <div ref={demoRef} className="grid gap-4 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:gap-6">
      <div className="order-last rounded-3xl border border-white bg-white/90 p-2 shadow-glass lg:order-none">
        <div className="flex items-center justify-between gap-2 px-3 pt-2 pb-1">
          <p className="text-sm font-bold text-slate-900">Theme settings</p>
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">
            Draft
          </span>
        </div>

        <ControlGroup label="Brand color" highlighted={highlight === "color"}>
          <div role="group" aria-label="Brand color" className="flex gap-2.5">
            {COLORS.map((color) => {
              const isActive = state.color === color.value;
              return (
                <button
                  key={color.value}
                  type="button"
                  aria-pressed={isActive}
                  aria-label={color.name}
                  onClick={() => update("color", color.value)}
                  className={cn(
                    "size-8 cursor-pointer rounded-full transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark",
                    isActive && "ring-2 ring-slate-900 ring-offset-2",
                  )}
                  style={{ background: color.value }}
                />
              );
            })}
          </div>
        </ControlGroup>

        <ControlGroup label="Font" highlighted={highlight === "font"}>
          <Segmented
            label="Font"
            value={state.font}
            onChange={(value) => update("font", value)}
            options={(Object.keys(FONTS) as Array<keyof typeof FONTS>).map((font) => ({
              value: font,
              ariaLabel: `${FONTS[font].label} font`,
              label: (
                <span className="text-sm" style={{ fontFamily: FONTS[font].family }}>
                  Aa
                </span>
              ),
            }))}
          />
        </ControlGroup>

        <ControlGroup label="Spacing" highlighted={highlight === "density"}>
          <Segmented
            label="Spacing"
            value={state.density}
            onChange={(value) => update("density", value)}
            options={[
              { value: "compact", label: "Compact" },
              { value: "spacious", label: "Spacious" },
            ]}
          />
        </ControlGroup>

        <ControlGroup label="Corners" highlighted={highlight === "corners"}>
          <Segmented
            label="Corners"
            value={state.corners}
            onChange={(value) => update("corners", value)}
            options={[
              { value: "sharp", label: "Sharp" },
              { value: "rounded", label: "Rounded" },
            ]}
          />
        </ControlGroup>

        <ControlGroup label="Hero headline" highlighted={highlight === "headline"}>
          <label htmlFor={headlineId} className="sr-only">
            Hero headline
          </label>
          <input
            id={headlineId}
            type="text"
            value={state.headline}
            maxLength={36}
            onChange={(event) => update("headline", event.target.value)}
            className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
          />
        </ControlGroup>

        <div className="flex items-center justify-between gap-2 px-3 pt-1 pb-2">
          <p className="text-[11px] leading-snug text-slate-500">
            Font choices depend on the theme.
          </p>
          <AutoplayButton demo={demo} />
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white bg-white shadow-[0_32px_64px_-24px_rgba(2,132,199,0.28)]">
        <ScaledMock
          className="aspect-[4/3.6] sm:aspect-[16/11] lg:aspect-auto lg:h-full"
          scale={1.5}
        >
          <StylePreview state={state} />
        </ScaledMock>
      </div>
    </div>
  );
}

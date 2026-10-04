"use client";

import { useId, useRef, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

import {
  AutoplayButton,
  BrowserFrame,
  EXAMPLE_PRODUCTS,
  Glyph,
  ProductArt,
  ScaledMock,
  Stars,
  THEME_LOOKS,
} from "./demo-kit";
import { useDemoAutoplay } from "./use-demo-autoplay";

const PRODUCT = EXAMPLE_PRODUCTS[0];
const SIZES = ["Free size", "Gift box"];

/** Classic product page: square gallery, dense buy box, ratings up front. */
function ClassicProductPage() {
  const look = THEME_LOOKS.classic;
  return (
    <div className="h-full p-[1.8em]" style={{ background: look.background, color: look.ink }}>
      <p className="text-[0.8em]" style={{ color: look.muted }}>
        Home / Sarees / {PRODUCT.name}
      </p>
      <div className="mt-[1em] grid grid-cols-[0.85fr_1fr] gap-[1.8em]">
        <div>
          <ProductArt
            product={PRODUCT}
            className="aspect-square"
            style={{ borderRadius: look.radius }}
          />
          <div className="mt-[0.7em] grid grid-cols-4 gap-[0.5em]">
            {[0, 1, 2, 3].map((thumb) => (
              <ProductArt
                key={thumb}
                product={PRODUCT}
                className={cn("aspect-square", thumb > 0 && "opacity-60")}
                style={{ borderRadius: look.radius }}
              />
            ))}
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-[1.7em] leading-tight font-extrabold">{PRODUCT.name}</p>
          <p className="mt-[0.5em] flex items-center gap-[0.5em] text-[0.85em]">
            <Stars />
            <span style={{ color: look.muted }}>Reviews</span>
          </p>
          <p className="mt-[0.8em] flex items-baseline gap-[0.6em]">
            <span className="text-[1.6em] font-extrabold">{PRODUCT.price}</span>
            <span className="text-[0.9em] line-through" style={{ color: look.muted }}>
              ৳3,900
            </span>
            <span
              className="rounded-[0.3em] px-[0.5em] py-[0.15em] text-[0.75em] font-bold text-white"
              style={{ background: "#e11d48" }}
            >
              Sale
            </span>
          </p>
          <p className="mt-[1.1em] text-[0.8em] font-semibold" style={{ color: look.muted }}>
            Option
          </p>
          <div className="mt-[0.4em] flex gap-[0.5em]">
            {SIZES.map((size, index) => (
              <span
                key={size}
                className="rounded-[0.4em] border px-[0.8em] py-[0.4em] text-[0.8em] font-semibold"
                style={
                  index === 0
                    ? { borderColor: look.accent, color: look.accent }
                    : { borderColor: "#e2e8f0" }
                }
              >
                {size}
              </span>
            ))}
          </div>
          <div className="mt-[1.2em] flex gap-[0.6em]">
            <span
              className="flex flex-1 items-center justify-center rounded-[0.45em] py-[0.8em] text-[0.9em] font-bold text-white"
              style={{ background: look.accent }}
            >
              Add to cart
            </span>
            <span
              className="flex aspect-square items-center justify-center rounded-[0.45em] border px-[0.7em] text-[1.1em]"
              style={{ borderColor: "#e2e8f0" }}
            >
              <Glyph name="heart" />
            </span>
          </div>
          <div
            className="mt-[1.1em] rounded-[0.45em] p-[0.8em] text-[0.8em]"
            style={{ background: look.soft, color: look.muted }}
          >
            Delivery inside and outside Dhaka
          </div>
          <p className="mt-[1.3em] text-[0.85em] font-bold">You may also like</p>
          <div className="mt-[0.5em] grid grid-cols-3 gap-[0.6em]">
            {EXAMPLE_PRODUCTS.slice(1, 4).map((product) => (
              <span key={product.name} className="min-w-0">
                <ProductArt
                  product={product}
                  className="aspect-square"
                  style={{ borderRadius: look.radius }}
                />
                <span className="mt-[0.3em] block truncate text-[0.75em] font-semibold">
                  {product.name}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Aura product page: tall portrait image, serif type, generous space. */
function AuraProductPage() {
  const look = THEME_LOOKS.aura;
  return (
    <div
      className="grid h-full grid-cols-[1fr_1fr]"
      style={{ background: look.background, color: look.ink }}
    >
      <ProductArt product={PRODUCT} className="h-full" />
      <div className="flex min-w-0 flex-col justify-center px-[2.4em]">
        <p className="text-[0.75em] tracking-[0.22em] uppercase" style={{ color: look.muted }}>
          Sarees
        </p>
        <p className="mt-[0.4em] font-serif text-[2.3em] leading-[1.05]">{PRODUCT.name}</p>
        <p className="mt-[0.7em] text-[1.05em]" style={{ color: look.muted }}>
          {PRODUCT.price}
        </p>
        <div className="mt-[1.4em] flex gap-[0.6em]">
          {SIZES.map((size, index) => (
            <span
              key={size}
              className="border px-[1em] py-[0.45em] text-[0.8em]"
              style={{ borderColor: index === 0 ? look.ink : "#e4d8cc" }}
            >
              {size}
            </span>
          ))}
        </div>
        <span
          className="mt-[1.4em] flex items-center justify-center py-[0.95em] text-[0.85em] tracking-[0.16em] text-white uppercase"
          style={{ background: look.ink }}
        >
          Add to cart
        </span>
        <span className="mt-[0.9em] flex items-center gap-[0.5em] text-[0.85em]">
          <Glyph name="heart" /> Save to wishlist
        </span>
        <div
          className="mt-[1.4em] divide-y border-y text-[0.85em]"
          style={{ borderColor: "#e4d8cc" }}
        >
          {["Details", "Delivery", "Reviews"].map((row) => (
            <p
              key={row}
              className="flex justify-between py-[0.6em]"
              style={{ borderColor: "#e4d8cc" }}
            >
              {row}
              <span style={{ color: look.muted }}>+</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

const SWEEP = [50, 18, 82, 50];

/**
 * The same product page in Classic (left of the handle) and Aura (right). The handle sweeps
 * once on its own; dragging it, or the arrow keys, take over.
 */
export function CompareDemo() {
  const inputId = useId();
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, { durations: [1600, 2200, 2200, 2600] });
  const [manualSplit, setManualSplit] = useState<number | null>(null);
  const split = demo.isAutoplayOn || manualSplit === null ? (SWEEP[demo.step] ?? 50) : manualSplit;
  const isSweeping = demo.isAutoplayOn;

  return (
    <div ref={demoRef}>
      <BrowserFrame address="Same product · different themes">
        <div className="relative">
          <ScaledMock className="aspect-[4/3] sm:aspect-[16/10]" scale={1.35}>
            <div className="relative h-full">
              <div className="absolute inset-0">
                <ClassicProductPage />
              </div>
              <div
                className={cn(
                  "absolute inset-0",
                  isSweeping &&
                    "transition-[clip-path] duration-[1100ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
                )}
                style={{ clipPath: `inset(0 0 0 ${split}%)` }}
              >
                <AuraProductPage />
              </div>
            </div>
          </ScaledMock>

          {/* Handle */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-y-0 w-0",
              isSweeping &&
                "transition-[left] duration-[1100ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
            )}
            style={{ left: `${split}%` } as CSSProperties}
          >
            <span className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.08)]" />
            <span className="absolute top-1/2 left-0 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg ring-1 ring-slate-900/5">
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m9 7-5 5 5 5M15 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-bold text-white">
            Classic
          </span>
          <span className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-[#2b211c]/85 px-3 py-1 text-xs font-bold text-white">
            Aura
          </span>

          <label htmlFor={inputId} className="sr-only">
            Compare the Classic and Aura product page
          </label>
          <input
            id={inputId}
            type="range"
            min={0}
            max={100}
            value={Math.round(split)}
            aria-valuetext={`${Math.round(split)}% Classic shown`}
            onChange={(event) => {
              setManualSplit(Number(event.target.value));
              demo.stop();
            }}
            className="absolute inset-0 size-full cursor-ew-resize touch-pan-y opacity-0"
          />
        </div>
      </BrowserFrame>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
        <p className="text-sm text-slate-600">Drag the handle to compare the same product.</p>
        <AutoplayButton demo={demo} />
      </div>
    </div>
  );
}

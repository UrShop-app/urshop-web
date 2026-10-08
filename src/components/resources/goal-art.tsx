import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import bkash from "@/assets/partners/bkash.png";
import pathao from "@/assets/partners/pathao.png";
import redx from "@/assets/partners/redx.png";
import steadfast from "@/assets/partners/steadfast.png";
import { Icon } from "@/components/ui/icon";
import type { ResourceGoalId } from "@/data/resources";
import { cn } from "@/lib/utils";

/*
 * Small looping sketches, one per goal (decorative; the tile's title is the text). Abstract
 * shapes and real labels only: no fake numbers, names or screenshots. Animations are the `art-*`
 * classes in globals.css ("Resources page"); the resting style is the finished state, so reduced
 * motion shows a still picture. Wrap a group of them in `PauseOffscreen`.
 */

function delay(seconds: number): CSSProperties {
  return { "--d": `${seconds}s` } as CSSProperties;
}

/** Each goal gets its own tint, so the white sketch pieces stand out and tiles are told apart. */
const TONES = {
  cyan: "from-cyan-100 via-sky-50 to-cyan-200/80",
  indigo: "from-indigo-100 via-violet-50 to-indigo-200/80",
  amber: "from-amber-100 via-orange-50 to-amber-200/70",
  rose: "from-rose-100 via-pink-50 to-rose-200/70",
  emerald: "from-emerald-100 via-teal-50 to-emerald-200/70",
  slate: "from-slate-200/80 via-sky-50 to-blue-200/70",
} as const;

function Frame({
  children,
  tone,
  className,
}: {
  children: ReactNode;
  tone: keyof typeof TONES;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br ring-1 ring-black/[0.04] select-none ring-inset",
        TONES[tone],
        className,
      )}
    >
      <div className="art-grid pointer-events-none absolute inset-0" />
      {children}
    </div>
  );
}

function Line({ className }: { className?: string }) {
  return <span className={cn("block h-1.5 rounded-full bg-slate-200", className)} />;
}

/** A checklist that ticks itself off: sign up, add products, go live. */
function StartArt() {
  const steps = ["Sign up", "Add products", "Go live"];
  return (
    <Frame tone="cyan">
      <div className="relative w-[72%] rounded-xl bg-white p-3 shadow-[0_12px_28px_-14px_rgba(2,132,199,0.4)]">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="size-4 rounded-md bg-linear-to-br from-brand to-brand-dark" />
          <Line className="w-14" />
          <span
            className="art-loop-in ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 ring-1 ring-emerald-200"
            style={delay(2.1)}
          >
            Live
          </span>
        </div>
        <ul className="space-y-1.5">
          {steps.map((step, index) => (
            <li key={step} className="flex items-center gap-2">
              <span className="relative grid size-4 place-items-center rounded-full border-2 border-slate-200">
                <span
                  className="art-loop-in absolute -inset-0.5 grid place-items-center rounded-full bg-brand text-white"
                  style={delay(0.4 + index * 0.6)}
                >
                  <svg viewBox="0 0 12 12" className="size-2.5" fill="none">
                    <path d="M2.5 6.2 5 8.5l4.5-5" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </span>
              <span className="text-[10px] font-semibold text-slate-600">{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

/** A mini storefront whose brand color changes as a swatch is picked. */
function DesignArt() {
  return (
    <Frame tone="indigo">
      <div className="relative w-[72%] overflow-hidden rounded-xl bg-white shadow-[0_12px_28px_-14px_rgba(2,132,199,0.4)]">
        <div className="flex gap-1 border-b border-slate-100 px-2 py-1.5">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="size-1.5 rounded-full bg-slate-200" />
          ))}
        </div>
        <div className="p-2">
          <div className="art-palette flex h-9 flex-col justify-center gap-1 rounded-lg bg-brand px-2">
            <span className="h-1.5 w-12 rounded-full bg-white/90" />
            <span className="h-1 w-8 rounded-full bg-white/60" />
          </div>
          <div className="mt-1.5 grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((card) => (
              <span key={card} className="h-6 rounded-md bg-slate-100" />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute right-[9%] bottom-3 flex gap-1.5 rounded-full bg-white p-1 shadow-md">
        <span className="size-3.5 rounded-full bg-brand" />
        <span className="size-3.5 rounded-full bg-indigo-500" />
        <span className="size-3.5 rounded-full bg-amber-500" />
        <span className="art-ring absolute top-0.5 left-0.5 size-4.5 rounded-full ring-2 ring-slate-900" />
      </div>
    </Frame>
  );
}

/** Orders arriving and moving from pending to delivered. */
function OrdersArt() {
  const rows = [
    { status: "Pending", tone: "bg-amber-50 text-amber-700 ring-amber-200" },
    { status: "Confirmed", tone: "bg-sky-50 text-sky-700 ring-sky-200" },
    { status: "Delivered", tone: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  ];
  return (
    <Frame tone="amber">
      <ul className="w-[76%] space-y-1.5">
        {rows.map((row, index) => (
          <li
            key={row.status}
            className="art-loop-in flex items-center gap-2 rounded-lg bg-white p-1.5 shadow-[0_6px_16px_-10px_rgba(2,132,199,0.45)]"
            style={delay(0.3 + index * 0.5)}
          >
            <span className="grid size-6 place-items-center rounded-md bg-brand-light text-brand-dark">
              <Icon name="inventory_2" className="scale-[0.6]" />
            </span>
            <span className="flex-1 space-y-1">
              <Line className="w-3/4" />
              <Line className="w-1/2 bg-slate-100" />
            </span>
            <span
              className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-bold ring-1", row.tone)}
            >
              {row.status}
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/** Paid with bKash or cash, then a parcel driving to the customer with a local courier. */
function DeliveryArt() {
  return (
    <Frame tone="rose" className="flex-col gap-3">
      <div className="flex items-center gap-1.5">
        <span className="flex h-6 items-center rounded-md bg-white px-1.5 shadow-sm">
          <Image src={bkash} alt="" sizes="40px" className="h-3.5 w-auto" />
        </span>
        <span className="flex h-6 items-center rounded-md bg-slate-900 px-2 text-[9px] font-bold text-white">
          COD
        </span>
      </div>
      <div className="relative h-7 w-[72%]">
        <span className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-slate-300" />
        <span className="art-truck absolute top-0 left-0 grid size-7 place-items-center rounded-full bg-linear-to-br from-brand to-brand-dark text-white shadow-md">
          <Icon name="local_shipping" className="scale-[0.65]" />
        </span>
        <span className="absolute top-0 -right-1 grid size-7 place-items-center text-rose-500">
          <span className="art-pulse absolute inset-1 rounded-full bg-rose-400/40" />
          <Icon name="location_on" className="relative scale-[0.8]" />
        </span>
      </div>
      <div className="flex items-center gap-2 opacity-80">
        {[pathao, redx, steadfast].map((logo) => (
          <Image key={logo.src} src={logo} alt="" sizes="48px" className="h-3 w-auto" />
        ))}
      </div>
    </Frame>
  );
}

/** Bars rising and a trend line drawing (no values), with the channels that feed them. */
function GrowArt() {
  const bars = [38, 52, 46, 70, 86];
  return (
    <Frame tone="emerald">
      <div className="relative flex h-20 w-[64%] items-end gap-2 rounded-xl bg-white px-3 pt-3 pb-2 shadow-[0_12px_28px_-14px_rgba(2,132,199,0.4)]">
        {bars.map((height, index) => (
          <span
            key={index}
            className="art-bar flex-1 rounded-t-md bg-linear-to-t from-brand-dark to-brand"
            style={{ height: `${height}%`, ...delay(index * 0.25) }}
          />
        ))}
        <svg
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="absolute inset-x-3 top-2 h-10"
        >
          <path
            className="art-draw"
            d="M2 34 L26 24 L50 28 L74 12 L98 4"
            pathLength="1"
            fill="none"
            stroke="#0f172a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      {[
        { label: "SEO", className: "top-4 left-[8%]", at: 0 },
        { label: "Pixel", className: "top-5 right-[7%]", at: 1.2 },
        { label: "SMS", className: "bottom-4 left-[12%]", at: 2.4 },
      ].map((chip) => (
        <span
          key={chip.label}
          className={cn(
            "art-float absolute rounded-full bg-white px-2 py-0.5 text-[9px] font-bold text-slate-700 shadow-md ring-1 ring-slate-100",
            chip.className,
          )}
          style={delay(chip.at)}
        >
          {chip.label}
        </span>
      ))}
    </Frame>
  );
}

/** A shield with team members' access switching on and off around it. */
function TrustArt() {
  return (
    <Frame tone="slate" className="gap-4">
      <div className="space-y-2">
        {[0, 1.3].map((at) => (
          <div
            key={at}
            className="flex items-center gap-1.5 rounded-lg bg-white p-1.5 shadow-[0_6px_16px_-10px_rgba(2,132,199,0.45)]"
          >
            <span className="size-4 rounded-full bg-slate-200" />
            <Line className="w-8" />
            <span
              className="art-toggle-track relative h-3.5 w-6 rounded-full bg-brand"
              style={delay(at)}
            >
              <span
                className="art-toggle-knob absolute top-0.5 left-3 size-2.5 rounded-full bg-white shadow"
                style={delay(at)}
              />
            </span>
          </div>
        ))}
      </div>
      <div className="relative grid size-16 place-items-center">
        <span className="art-pulse absolute inset-0 rounded-full bg-brand/25" />
        <span className="relative grid size-14 place-items-center rounded-full bg-linear-to-br from-brand to-brand-dark text-white shadow-[0_12px_24px_-10px_rgba(2,132,199,0.8)]">
          <Icon name="verified_user" />
        </span>
        <span className="absolute -right-1 -bottom-1 rounded-full bg-slate-900 px-1.5 py-0.5 text-[8px] font-bold text-white">
          2FA
        </span>
      </div>
    </Frame>
  );
}

const ART: Readonly<Record<ResourceGoalId, () => ReactNode>> = {
  "start-selling": StartArt,
  "design-storefront": DesignArt,
  "products-orders": OrdersArt,
  "payments-delivery": DeliveryArt,
  "marketing-growth": GrowArt,
  "trust-control": TrustArt,
};

export function GoalArt({ goal }: { goal: ResourceGoalId }) {
  const Art = ART[goal];
  return <Art />;
}

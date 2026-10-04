"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useRef } from "react";
import type { ReactNode } from "react";

import { AutoplayButton } from "@/components/ui/demo-controls";
import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import { BRAND_GRADIENT, MiniStore, ScaledMock } from "./demo-kit";
import { useDemoAutoplay } from "@/lib/use-demo-autoplay";

const LIVE_ACCENT = "#0f766e";
const DRAFT_ACCENT = "#6d28d9";

const STEPS: ReadonlyArray<{ id: string; label: string; icon: IconName; caption: string }> = [
  {
    id: "edit",
    label: "Edit",
    icon: "edit",
    caption: "Change your theme as a private draft. Shoppers keep seeing your live store.",
  },
  {
    id: "preview",
    label: "Preview",
    icon: "desktop_windows",
    caption:
      "Check the draft at desktop, tablet and phone sizes. Cart and checkout are off in previews.",
  },
  {
    id: "share",
    label: "Share",
    icon: "link",
    caption: "Send a view-only preview link, or a QR code where available. Links expire.",
  },
  {
    id: "save",
    label: "Save",
    icon: "save",
    caption: "Save the draft and come back to it. Your live store is still unchanged.",
  },
  {
    id: "publish",
    label: "Publish",
    icon: "publish",
    caption: "Publish when you're happy. Shoppers see the new design.",
  },
];

/** Decorative QR-style pattern (not a scannable code). */
function QrPattern() {
  const size = 21;
  const cells: Array<[number, number]> = [];
  let seed = 7;
  const isFinder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      if (!isFinder(x, y) && seed % 3 === 0) cells.push([x, y]);
    }
  }
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" fill="currentColor" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="white" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="currentColor" />
    </g>
  );
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="size-full text-slate-900"
      shapeRendering="crispEdges"
    >
      {finder(0, 0)}
      {finder(size - 7, 0)}
      {finder(0, size - 7)}
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
      ))}
    </svg>
  );
}

function Pill({ tone, children }: { tone: "draft" | "live" | "neutral"; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold",
        tone === "draft" && "bg-amber-50 text-amber-800",
        tone === "live" && "bg-emerald-50 text-emerald-700",
        tone === "neutral" && "bg-slate-100 text-slate-600",
      )}
    >
      {tone === "live" ? <span className="size-1.5 rounded-full bg-emerald-500" /> : null}
      {children}
    </span>
  );
}

function StoreCard({ label, pill, accent }: { label: string; pill: ReactNode; accent: string }) {
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-slate-500">{label}</span>
        {pill}
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200/70 shadow-sm">
        <ScaledMock className="aspect-[4/3]" scale={5.2}>
          <MiniStore accent={accent} />
        </ScaledMock>
      </div>
    </div>
  );
}

function StepVisual({ step }: { step: string }) {
  switch (step) {
    case "edit":
      return (
        <div className="flex gap-4">
          <StoreCard label="Live store" pill={<Pill tone="live">Live</Pill>} accent={LIVE_ACCENT} />
          <StoreCard
            label="Your draft"
            pill={<Pill tone="draft">Draft</Pill>}
            accent={DRAFT_ACCENT}
          />
        </div>
      );
    case "preview":
      return (
        <div className="flex items-end justify-center gap-3 sm:gap-5">
          {(
            [
              ["w-[52%]", "aspect-[16/10]", "rounded-xl"],
              ["w-[26%]", "aspect-[3/4]", "rounded-2xl"],
              ["w-[16%]", "aspect-[9/17]", "rounded-2xl"],
            ] as const
          ).map(([width, aspect, radius]) => (
            <div key={width} className={cn(width, "rounded-[1.1rem] bg-slate-900 p-1")}>
              <div className={cn("overflow-hidden bg-white", radius)}>
                <ScaledMock className={aspect} scale={7}>
                  <MiniStore accent={DRAFT_ACCENT} />
                </ScaledMock>
              </div>
            </div>
          ))}
        </div>
      );
    case "share":
      return (
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-stretch">
          <div className="w-full flex-1 space-y-3 rounded-2xl border border-slate-200/70 bg-white p-4">
            <p className="text-xs font-bold text-slate-500">Preview link</p>
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700">
              <Icon name="link" className="text-brand" />
              <span className="min-w-0 flex-1 truncate">Private preview of your draft</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill tone="neutral">View only</Pill>
              <Pill tone="draft">Expires</Pill>
            </div>
          </div>
          <div className="w-32 shrink-0 rounded-2xl border border-slate-200/70 bg-white p-3">
            <QrPattern />
          </div>
        </div>
      );
    case "save":
      return (
        <div className="flex gap-4">
          <StoreCard
            label="Live store"
            pill={<Pill tone="live">Live · unchanged</Pill>}
            accent={LIVE_ACCENT}
          />
          <StoreCard
            label="Your draft"
            pill={<Pill tone="neutral">Saved</Pill>}
            accent={DRAFT_ACCENT}
          />
        </div>
      );
    default:
      return (
        <div className="mx-auto max-w-sm">
          <StoreCard
            label="Live store"
            pill={<Pill tone="live">Published</Pill>}
            accent={DRAFT_ACCENT}
          />
        </div>
      );
  }
}

/** Edit → Preview → Share → Save → Publish, one stage at a time. */
export function PublishFlowDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, {
    durations: [2800, 3000, 2800, 2400, 3200],
    reducedMotionStep: 0,
  });
  const active = STEPS[demo.step] ?? STEPS[0]!;

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={demoRef}
        className="rounded-3xl border border-white bg-white/90 p-4 shadow-glass sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ol className="flex flex-1 items-center gap-1 sm:gap-2" aria-label="Publishing steps">
            {STEPS.map((step, index) => {
              const isActive = index === demo.step;
              const isDone = index < demo.step;
              return (
                <li key={step.id} className="flex flex-1 items-center gap-1 sm:gap-2">
                  <button
                    type="button"
                    aria-current={isActive ? "step" : undefined}
                    onClick={() => demo.goTo(index)}
                    className={cn(
                      "flex shrink-0 cursor-pointer flex-col items-center gap-1 rounded-2xl px-1.5 py-1 text-[11px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark sm:flex-row sm:gap-2 sm:px-3 sm:text-xs",
                      isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-9 items-center justify-center rounded-full transition-colors duration-300",
                        isActive || isDone ? "text-white" : "bg-slate-100 text-slate-400",
                      )}
                      style={isActive || isDone ? { background: BRAND_GRADIENT } : undefined}
                    >
                      <Icon name={step.icon} />
                    </span>
                    {step.label}
                  </button>
                  {index < STEPS.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="relative hidden h-0.5 flex-1 overflow-hidden rounded-full bg-slate-200 sm:block"
                    >
                      <span
                        className={cn(
                          "absolute inset-0 origin-left transition-transform duration-700",
                          isDone ? "scale-x-100" : "scale-x-0",
                        )}
                        style={{ background: BRAND_GRADIENT }}
                      />
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <AutoplayButton demo={demo} />
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-center">
          <div aria-hidden="true" className="grid min-h-[15rem] items-center select-none">
            <AnimatePresence initial={false}>
              <motion.div
                key={active.id}
                className="[grid-area:1/1]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <StepVisual step={active.id} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div aria-live="polite">
            <p className="text-lg font-extrabold text-slate-900">{active.label}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{active.caption}</p>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

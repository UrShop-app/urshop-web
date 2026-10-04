"use client";

import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "motion/react";
import { useRef } from "react";

import { AutoplayButton } from "@/components/ui/demo-controls";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import { MiniStore, ScaledMock } from "./demo-kit";
import { useDemoAutoplay } from "@/lib/use-demo-autoplay";

type Version = { number: number; accent: string; serif: boolean; note?: string };

const PUBLISHED: ReadonlyArray<Version> = [
  { number: 14, accent: "#6d28d9", serif: true },
  { number: 13, accent: "#be185d", serif: false },
  { number: 12, accent: "#0f766e", serif: false },
  { number: 11, accent: "#1e293b", serif: false },
];
const TARGET = PUBLISHED[2]!;
const RESTORED: Version = { ...TARGET, number: 15, note: `Restored from version ${TARGET.number}` };

// 0: history · 1: pick an older version · 2: press Restore · 3: it's back on top as the current one.
const DURATIONS = [2200, 2200, 1200, 3400];

/** Version history sketch: preview an older published version and restore it. */
export function VersionsDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, { durations: DURATIONS, reducedMotionStep: 3 });
  const step = demo.step;
  const versions = step >= 3 ? [RESTORED, ...PUBLISHED] : PUBLISHED;
  const current = versions[0]!;
  const selected = step === 1 || step === 2 ? TARGET : current;

  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}>
      <div
        ref={demoRef}
        className="rounded-3xl border border-white bg-white/90 p-4 shadow-glass sm:p-5"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Icon name="history" className="text-brand" />
            Published versions
          </p>
          <AutoplayButton demo={demo} />
        </div>

        <div
          aria-hidden="true"
          className="mt-4 grid gap-4 select-none sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
        >
          <LayoutGroup id="versions">
            <ul className="space-y-1.5">
              <AnimatePresence initial={false} mode="popLayout">
                {versions.slice(0, 4).map((version, index) => {
                  const isCurrent = index === 0;
                  const isSelected = version === selected && !isCurrent;
                  return (
                    <motion.li
                      key={version.number}
                      layout
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border px-3 py-2.5 transition-colors duration-300",
                        isSelected
                          ? "border-brand/40 bg-brand-light/60"
                          : isCurrent
                            ? "border-emerald-200 bg-emerald-50/60"
                            : "border-transparent bg-slate-50",
                      )}
                    >
                      <span
                        className="size-7 shrink-0 rounded-lg transition-colors"
                        style={{ background: version.accent }}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold whitespace-nowrap text-slate-800">
                          Version {version.number}
                        </span>
                        <span className="block truncate text-xs text-slate-500">
                          {version.note ?? (isCurrent ? "Latest publish" : "Published earlier")}
                        </span>
                      </span>
                      {isCurrent ? (
                        <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                          <span className="size-1.5 rounded-full bg-emerald-500" />
                          Current
                        </span>
                      ) : isSelected ? (
                        <span
                          className={cn(
                            "flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold text-white transition-transform duration-200",
                            step === 2 && "scale-90",
                          )}
                          style={{
                            background: "linear-gradient(135deg, #08c0d8 0%, #0284c7 100%)",
                          }}
                        >
                          <Icon name="restore" className="scale-75" />
                          Restore
                        </span>
                      ) : null}
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </LayoutGroup>

          <div>
            <p className="mb-2 text-xs font-bold text-slate-500">
              {selected === current ? "Current design" : `Previewing version ${selected.number}`}
            </p>
            <div className="overflow-hidden rounded-2xl border border-slate-200/70 shadow-sm">
              <ScaledMock className="aspect-[4/3]" scale={5}>
                <MiniStore accent={selected.accent} serif={selected.serif} />
              </ScaledMock>
            </div>
          </div>
        </div>

        <p className="mt-4 flex items-center gap-2 border-t border-slate-200/70 pt-3 text-xs text-slate-500">
          <Icon name="check_circle" className="scale-75 text-brand" />
          The latest 20 published versions are kept, ready to restore.
        </p>
        <p className="sr-only">
          A list of published theme versions. An older version is selected, previewed and restored,
          and appears at the top of the list as the current version.
        </p>
      </div>
    </MotionConfig>
  );
}

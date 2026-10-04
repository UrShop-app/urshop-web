"use client";

import { useRef, type ReactNode } from "react";

import { AutoplayButton } from "@/components/ui/demo-controls";
import { Icon, type IconName } from "@/components/ui/icon";
import { useDemoAutoplay } from "@/lib/use-demo-autoplay";
import { cn } from "@/lib/utils";

import { BRAND_GRADIENT, DemoFrame, Pill } from "./demo-kit";

type Look = { accent: string; headline: string };

const ORIGINAL: Look = { accent: "#0f766e", headline: "New arrivals" };
const REDESIGN: Look = { accent: "#7c3aed", headline: "Eid collection" };

// 0: draft = live · 1: edit the private draft · 2: preview it at phone size · 3: publish ·
// 4: restore the earlier published version.
const DURATIONS = [2200, 2600, 2600, 3000, 3600];

const CAPTIONS = [
  "Live store and draft start the same.",
  "Edit the draft. Shoppers see no change.",
  "Preview it at phone size.",
  "Publish. Now shoppers see it.",
  "Changed your mind? Restore an earlier version.",
];

const DEVICES: ReadonlyArray<{ id: string; icon: IconName }> = [
  { id: "desktop", icon: "desktop_windows" },
  { id: "tablet", icon: "tablet_mac" },
  { id: "phone", icon: "smartphone" },
];

/** A small example storefront in one look. Example content only. */
function MiniStorefront({ look, narrow = false }: { look: Look; narrow?: boolean }) {
  return (
    <div
      className={cn(
        "mx-auto flex flex-col gap-2 rounded-xl bg-white p-2.5 transition-[max-width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        narrow ? "max-w-[8.5rem]" : "max-w-full",
      )}
    >
      <div className="flex items-center gap-1.5">
        <span
          className="size-3 rounded-[4px] transition-colors duration-500"
          style={{ background: look.accent }}
        />
        <span className="text-[10px] font-bold text-slate-800">Your brand</span>
        <span className="ml-auto h-1.5 w-6 rounded-full bg-slate-200" />
      </div>
      <div
        className="flex h-14 flex-col justify-center rounded-lg px-2.5 text-white transition-colors duration-500"
        style={{ background: look.accent }}
      >
        <span className="text-[11px] leading-tight font-bold">{look.headline}</span>
        <span className="mt-1 h-2 w-10 rounded-full bg-white/85" />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((tile) => (
          <span key={tile} className="aspect-square rounded-md bg-slate-100" />
        ))}
      </div>
    </div>
  );
}

function Panel({
  title,
  icon,
  badge,
  highlighted,
  children,
}: {
  title: string;
  icon: IconName;
  badge: ReactNode;
  highlighted?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl border p-3 transition-colors duration-500",
        highlighted ? "border-brand/40 bg-brand-light/40" : "border-slate-200/70 bg-slate-50",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <Icon name={icon} className="scale-75 text-brand" />
          {title}
        </span>
        {badge}
      </div>
      {children}
    </div>
  );
}

type Version = { number: number; look: Look; note: string };

/** Live store vs private draft: nothing changes for shoppers until Publish; restore undoes it. */
export function DraftLiveDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, { durations: DURATIONS, reducedMotionStep: 1 });
  const step = demo.step;

  const draft = step >= 1 && step <= 3 ? REDESIGN : ORIGINAL;
  const live = step === 3 ? REDESIGN : ORIGINAL;

  const versions: ReadonlyArray<Version> = [
    ...(step === 4 ? [{ number: 16, look: ORIGINAL, note: "Restored from version 14" }] : []),
    ...(step >= 3 ? [{ number: 15, look: REDESIGN, note: "Published" }] : []),
    { number: 14, look: ORIGINAL, note: "Published earlier" },
  ];

  return (
    <div ref={demoRef}>
      <DemoFrame
        title="Theme"
        icon={<Icon name="palette" className="text-brand" />}
        actions={<AutoplayButton demo={demo} />}
      >
        <div aria-hidden="true" className="mt-4 select-none">
          <div className="grid gap-3 sm:grid-cols-2">
            <Panel
              title="Live store"
              icon="storefront"
              highlighted={step === 3 || step === 4}
              badge={<Pill tone="success">Shoppers see this</Pill>}
            >
              <MiniStorefront look={live} />
            </Panel>
            <Panel
              title="Private draft"
              icon="visibility_off"
              highlighted={step === 1 || step === 2}
              badge={
                step === 2 ? (
                  <span className="flex gap-0.5 rounded-full bg-white p-0.5 shadow-sm">
                    {DEVICES.map((device) => (
                      <span
                        key={device.id}
                        className={cn(
                          "grid size-6 place-items-center rounded-full",
                          device.id === "phone" ? "text-white" : "text-slate-400",
                        )}
                        style={device.id === "phone" ? { background: BRAND_GRADIENT } : undefined}
                      >
                        <Icon name={device.icon} className="scale-[0.6]" />
                      </span>
                    ))}
                  </span>
                ) : (
                  <Pill tone="neutral">Only you</Pill>
                )
              }
            >
              <MiniStorefront look={draft} narrow={step === 2} />
            </Panel>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl bg-slate-50 p-2.5">
            <span
              className={cn(
                "inline-flex h-8 items-center gap-1 rounded-full px-3.5 text-xs font-bold text-white transition-[transform,opacity] duration-300",
                step === 3 ? "scale-95" : "",
                step >= 1 && step <= 3 ? "opacity-100" : "opacity-40",
              )}
              style={{ background: BRAND_GRADIENT }}
            >
              <Icon name="publish" className="scale-[0.6]" />
              Publish
            </span>
            <span className="mx-1 h-5 w-px bg-slate-200" />
            <ul className="flex min-w-0 flex-1 flex-wrap gap-1.5">
              {versions.map((version, index) => (
                <li
                  key={version.number}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] font-semibold",
                    index === 0
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-slate-200 bg-white text-slate-500",
                  )}
                >
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: version.look.accent }}
                  />
                  v{version.number}
                  <span className="hidden font-normal sm:inline">· {version.note}</span>
                  {index === 0 ? <span className="font-bold">· Current</span> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DemoFrame>

      <p aria-live="polite" className="mt-4 px-1 text-sm text-slate-600">
        {CAPTIONS[step]}
      </p>
    </div>
  );
}

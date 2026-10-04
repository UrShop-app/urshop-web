"use client";

import { useRef } from "react";

import { AutoplayButton } from "@/components/ui/demo-controls";
import { Icon, type IconName } from "@/components/ui/icon";
import { useDemoAutoplay } from "@/lib/use-demo-autoplay";
import { cn } from "@/lib/utils";

import { Card, DemoFrame, PendingPill, Pill } from "./demo-kit";

// Example addresses only.
const DOMAIN = "yourbrand.com";
const HOSTED = "yourbrand.urshop.app";

// 0: add your domain · 1: verify it · 2: verified, HTTPS being set up · 3: connected on HTTPS.
const DURATIONS = [2200, 2800, 2200, 3800];

const STAGES: ReadonlyArray<{ label: string; icon: IconName }> = [
  { label: "Domain", icon: "language" },
  { label: "Verify", icon: "domain_verification" },
  { label: "HTTPS", icon: "https" },
  { label: "Connected", icon: "storefront" },
];

const CAPTIONS = [
  "Add a domain you own.",
  "Verify it by following the steps.",
  "Verified. HTTPS is set up.",
  "Live on your domain, over HTTPS.",
];

/** Domain → verify → HTTPS → connected, with the shopper's address bar at the end. */
export function DomainDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, { durations: DURATIONS, reducedMotionStep: 3 });
  const step = demo.step;

  return (
    <div ref={demoRef}>
      <DemoFrame
        title="Domains"
        icon={<Icon name="language" className="text-brand" />}
        actions={<AutoplayButton demo={demo} />}
      >
        <div aria-hidden="true" className="mt-4 space-y-3 select-none">
          {/* Stage track */}
          <ol className="grid grid-cols-4 gap-1.5">
            {STAGES.map((stage, index) => {
              const isDone = index < step || step === STAGES.length - 1;
              const isCurrent = index === step && !isDone;
              return (
                <li key={stage.label} className="flex flex-col items-center gap-1.5 text-center">
                  <span
                    className={cn(
                      "grid size-9 place-items-center rounded-xl transition-colors duration-500",
                      isDone && "bg-brand-light text-brand-dark",
                      isCurrent && "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
                      !isDone && !isCurrent && "bg-slate-100 text-slate-400",
                    )}
                  >
                    <Icon name={stage.icon} className="scale-75" />
                  </span>
                  <span
                    className={cn(
                      "text-[11px] font-bold transition-colors duration-500",
                      isDone || isCurrent ? "text-slate-800" : "text-slate-400",
                    )}
                  >
                    {stage.label}
                  </span>
                </li>
              );
            })}
          </ol>

          <Card className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold text-slate-500">
                  Custom domain
                </span>
                <span className="block truncate font-mono text-sm font-bold text-slate-800">
                  {DOMAIN}
                </span>
              </span>
              {step === 0 ? <Pill tone="neutral">Not verified</Pill> : null}
              {step === 1 ? <PendingPill>Verifying</PendingPill> : null}
              {step === 2 ? <PendingPill>Setting up HTTPS</PendingPill> : null}
              {step === 3 ? <Pill tone="success">Connected · Main</Pill> : null}
            </div>
            <ul className="space-y-1.5">
              {["Update your domain's settings as shown", "Wait for the check to pass"].map(
                (task, index) => (
                  <li
                    key={task}
                    className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-2 text-xs text-slate-600"
                  >
                    <span
                      className={cn(
                        "grid size-4 shrink-0 place-items-center rounded-full text-[10px] font-black transition-colors duration-500",
                        step >= 2 || (step === 1 && index === 0)
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-200 text-transparent",
                      )}
                    >
                      ✓
                    </span>
                    {task}
                  </li>
                ),
              )}
            </ul>
            <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-2.5">
              <span className="truncate font-mono text-xs text-slate-500">{HOSTED}</span>
              <Pill tone="success">Still works</Pill>
            </div>
          </Card>

          {/* What a shopper sees */}
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <span
              className={cn(
                "grid size-6 shrink-0 place-items-center rounded-full transition-colors duration-500",
                step === 3 ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-300",
              )}
            >
              <Icon name="lock" className="scale-[0.6]" />
            </span>
            <span className="min-w-0 truncate font-mono text-xs">
              <span
                className={cn(
                  "transition-colors duration-500",
                  step === 3 ? "text-emerald-700" : "text-slate-300",
                )}
              >
                https://
              </span>
              <span className={step === 3 ? "text-slate-800" : "text-slate-300"}>{DOMAIN}</span>
            </span>
            <span
              className={cn(
                "ml-auto shrink-0 text-[11px] font-bold transition-opacity duration-500",
                step === 3 ? "text-emerald-700 opacity-100" : "opacity-0",
              )}
            >
              Secure connection
            </span>
          </div>
        </div>
      </DemoFrame>

      <p aria-live="polite" className="mt-4 px-1 text-sm text-slate-600">
        {CAPTIONS[step]}
      </p>
    </div>
  );
}

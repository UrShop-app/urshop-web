"use client";

import { useRef } from "react";

import { AutoplayButton } from "@/components/ui/demo-controls";
import { Icon } from "@/components/ui/icon";
import { useDemoAutoplay } from "@/lib/use-demo-autoplay";
import { cn } from "@/lib/utils";

import { BRAND_GRADIENT, Card, DemoFrame, PendingPill, Pill } from "./demo-kit";

// Example order and courier record.
const ORDER = { number: "#1042", total: "৳2,340" } as const;
const HISTORY = { delivered: 14, cancelled: 3 } as const;

// 0: a new COD order · 1: check the customer's courier history · 2: the record, as information ·
// 3: the merchant decides.
const DURATIONS = [2000, 1600, 3200, 3600];

const CAPTIONS = [
  "A new cash-on-delivery order arrives.",
  "Check the customer's courier history.",
  "See the record. It's information, not a verdict.",
  "You decide. Fraud Checker never cancels orders by itself.",
];

/** Order → courier history → merchant reviews → merchant decides. */
export function OrderReviewDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, { durations: DURATIONS, reducedMotionStep: 2 });
  const step = demo.step;
  const total = HISTORY.delivered + HISTORY.cancelled;

  return (
    <div ref={demoRef}>
      <DemoFrame
        title="Orders"
        icon={<Icon name="receipt_long" className="text-brand" />}
        actions={<AutoplayButton demo={demo} />}
      >
        <div aria-hidden="true" className="mt-4 space-y-3 select-none">
          <Card className="flex items-center justify-between gap-3">
            <span className="min-w-0">
              <span className="block text-sm font-bold text-slate-800">
                Order {ORDER.number} · {ORDER.total}
              </span>
              <span className="block text-xs text-slate-500">
                Cash on delivery · Example customer
              </span>
            </span>
            {step === 3 ? (
              <Pill tone="success">Confirmed</Pill>
            ) : (
              <Pill tone="neutral">Pending</Pill>
            )}
          </Card>

          <Card className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Icon name="fact_check" className="scale-75 text-brand" />
                Courier delivery record
              </span>
              {step === 0 ? <Pill tone="neutral">Not checked</Pill> : null}
              {step === 1 ? <PendingPill>Checking</PendingPill> : null}
              {step >= 2 ? <Pill tone="pending">Medium risk</Pill> : null}
            </div>

            <div
              className={cn(
                "space-y-2 transition-opacity duration-500",
                step >= 2 ? "opacity-100" : "opacity-30",
              )}
            >
              {[
                { label: "Delivered", value: HISTORY.delivered, color: "bg-emerald-400" },
                { label: "Cancelled", value: HISTORY.cancelled, color: "bg-rose-300" },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-2 text-xs">
                  <span className="w-16 shrink-0 font-semibold text-slate-600">{row.label}</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <span
                      className={cn(
                        "block h-full origin-left rounded-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                        row.color,
                      )}
                      style={{
                        width: `${(row.value / total) * 100}%`,
                        transform: step >= 2 ? "scaleX(1)" : "scaleX(0)",
                      }}
                    />
                  </span>
                  <span className="w-6 text-right font-bold text-slate-700 tabular-nums">
                    {step >= 2 ? row.value : "–"}
                  </span>
                </div>
              ))}
              <p className="text-[11px] text-slate-400">
                From the connected courier-history service
              </p>
            </div>
          </Card>

          <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-slate-50 p-2.5">
            <span className="mr-auto text-xs font-bold text-slate-700">Your decision</span>
            <span className="inline-flex h-8 items-center rounded-full border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-600">
              Cancel order
            </span>
            <span
              className={cn(
                "inline-flex h-8 items-center gap-1 rounded-full px-3.5 text-xs font-bold text-white transition-[transform,opacity] duration-300",
                step === 3 ? "scale-95" : "",
                step >= 2 ? "opacity-100" : "opacity-40",
              )}
              style={{ background: BRAND_GRADIENT }}
            >
              {step === 3 ? "✓ Confirmed" : "Confirm order"}
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

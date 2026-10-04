"use client";

import Image from "next/image";
import { useRef } from "react";

import bkash from "@/assets/partners/bkash.png";
import { AutoplayButton } from "@/components/ui/demo-controls";
import { useDemoAutoplay } from "@/lib/use-demo-autoplay";
import { cn } from "@/lib/utils";

import { BRAND_GRADIENT, Card, EXAMPLE_ORDER, Pill } from "./demo-bits";

// 0: not connected · 1: checking the account · 2: connected, bKash appears at checkout · 3: paid.
const DURATIONS = [2200, 1600, 2600, 3400];

function Spinner() {
  return (
    <span className="size-3.5 animate-spin rounded-full border-2 border-amber-300 border-t-transparent motion-reduce:animate-none" />
  );
}

/**
 * bKash, from the merchant's side: connect the account, then bKash shows at checkout and payments
 * are confirmed on the order. Until it's connected, checkout offers cash on delivery only.
 */
export function BkashDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, { durations: DURATIONS, reducedMotionStep: 3 });
  const step = demo.step;
  const isConnected = step >= 2;

  return (
    <div ref={demoRef}>
      <div aria-hidden="true" className="grid gap-4 select-none sm:grid-cols-2">
        {/* Settings */}
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <Image src={bkash} alt="" sizes="96px" className="h-7 w-auto" />
            {step === 0 ? <Pill tone="neutral">Not connected</Pill> : null}
            {step === 1 ? (
              <Pill tone="pending">
                <Spinner />
                Checking
              </Pill>
            ) : null}
            {isConnected ? <Pill tone="success">Connected</Pill> : null}
          </div>
          <div className="space-y-2">
            {["Merchant account", "Account details"].map((field) => (
              <div key={field}>
                <p className="mb-1 text-[11px] font-semibold text-slate-500">{field}</p>
                <span
                  className={cn(
                    "block h-8 rounded-lg border transition-colors duration-500",
                    step === 0 ? "border-slate-200 bg-slate-50" : "border-slate-200 bg-white",
                  )}
                >
                  <span
                    className={cn(
                      "ml-3 block h-2 translate-y-3 rounded-full bg-slate-300 transition-[width] duration-700",
                      step === 0 ? "w-0" : "w-2/3",
                    )}
                  />
                </span>
              </div>
            ))}
          </div>
          <span
            className={cn(
              "mt-auto grid h-9 place-items-center rounded-full text-xs font-bold transition-colors duration-500",
              isConnected ? "bg-emerald-50 text-emerald-700" : "text-white",
            )}
            style={isConnected ? undefined : { background: BRAND_GRADIENT }}
          >
            {isConnected ? "✓ Ready for checkout" : step === 1 ? "Checking…" : "Connect bKash"}
          </span>
        </Card>

        {/* Checkout */}
        <Card className="flex flex-col gap-3">
          <p className="text-sm font-bold text-slate-900">Checkout · payment</p>
          <span className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700">
            <span
              className={cn(
                "size-3.5 rounded-full border-2",
                isConnected ? "border-slate-300" : "border-[5px] border-brand",
              )}
            />
            Cash on delivery
          </span>
          <span
            className={cn(
              "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm font-semibold text-slate-800 transition-[opacity,transform,border-color] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none",
              isConnected
                ? "translate-y-0 border-brand opacity-100 ring-1 ring-brand"
                : "translate-y-2 border-slate-200 opacity-0",
            )}
          >
            <span className={cn("size-3.5 rounded-full border-[5px] border-brand")} />
            <Image src={bkash} alt="" sizes="64px" className="h-4 w-auto" />
            bKash
          </span>
          <div className="mt-auto flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
            <span className="text-xs font-semibold text-slate-600">
              Order {EXAMPLE_ORDER.number} · {EXAMPLE_ORDER.total}
            </span>
            {step < 2 ? <Pill tone="neutral">Cash on delivery</Pill> : null}
            {step === 2 ? <Pill tone="pending">Waiting for bKash</Pill> : null}
            {step === 3 ? <Pill tone="success">Paid</Pill> : null}
          </div>
        </Card>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
        <p aria-live="polite" className="text-sm text-slate-600">
          {isConnected
            ? "Connected: bKash now shows at checkout."
            : "Not connected yet: checkout offers cash on delivery."}
        </p>
        <AutoplayButton demo={demo} />
      </div>
    </div>
  );
}

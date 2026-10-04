"use client";

import { useRef, type CSSProperties } from "react";

import { AutoplayButton, Segmented } from "@/components/ui/demo-controls";
import { Icon, type IconName } from "@/components/ui/icon";
import { useDemoAutoplay } from "@/lib/use-demo-autoplay";
import { cn } from "@/lib/utils";

import { BRAND_GRADIENT, Card, Pill, at } from "./demo-bits";

const EVENTS = [
  { id: "view", label: "Page view" },
  { id: "cart", label: "Add to cart" },
  { id: "purchase", label: "Purchase" },
] as const;

type EventId = (typeof EVENTS)[number]["id"];

const DESTINATIONS: ReadonlyArray<{ name: string; detail: string; icon: IconName }> = [
  { name: "Meta Pixel", detail: "+ Conversions API", icon: "ads_click" },
  { name: "TikTok Pixel", detail: "+ Events API", icon: "ads_click" },
  { name: "Google Tag Manager", detail: "Your container", icon: "tune" },
];

/** The example product page, with the action behind the current event highlighted. */
function Storefront({ event }: { event: EventId }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="size-4 rounded bg-teal-700" />
        <span className="text-sm font-bold text-slate-900">Your brand</span>
      </div>
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden rounded-xl transition-shadow duration-500",
          event === "view" && "ring-2 ring-brand ring-offset-2",
        )}
        style={{ background: "linear-gradient(150deg, #fecdd3 0%, #e11d48 130%)" }}
      >
        <span className="absolute inset-0 m-auto h-1/3 w-1/3 rounded-lg bg-white/70" />
      </div>
      <p className="text-sm font-semibold text-slate-800">Handloom saree · ৳3,450</p>
      <div className="grid grid-cols-2 gap-2">
        <span
          className={cn(
            "grid h-9 place-items-center rounded-full border border-slate-200 text-xs font-bold text-slate-700 transition-shadow duration-500",
            event === "cart" && "ring-2 ring-brand ring-offset-2",
          )}
        >
          Add to cart
        </span>
        <span
          className={cn(
            "grid h-9 place-items-center rounded-full text-xs font-bold text-white transition-shadow duration-500",
            event === "purchase" && "ring-2 ring-brand ring-offset-2",
          )}
          style={{ background: BRAND_GRADIENT }}
        >
          Place order
        </span>
      </div>
    </Card>
  );
}

/**
 * Store events going to the merchant's ad and tag tools. The visitor can pick an event; every
 * destination receives it. Factual only: no attribution or performance claims.
 */
export function EventsDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, { durations: [2600, 2600, 3000] });
  const event = EVENTS[demo.step] ?? EVENTS[0];

  return (
    <div ref={demoRef}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Segmented
          label="Store event"
          value={event.id}
          onChange={(value) => demo.goTo(EVENTS.findIndex((item) => item.id === value))}
          options={EVENTS.map((item) => ({ value: item.id, label: item.label }))}
        />
        <AutoplayButton demo={demo} />
      </div>

      <div
        aria-hidden="true"
        className="grid items-center gap-3 select-none md:grid-cols-[minmax(0,0.9fr)_6rem_minmax(0,1fr)] md:gap-0"
      >
        <Storefront event={event.id} />

        {/* Phones: one connector. Wider: one line per destination. */}
        <div className="flow-line flow-line-y mx-auto h-12 w-4 md:hidden">
          <span key={event.id} className="flow-shot" />
        </div>
        <div className="hidden h-full flex-col justify-around md:flex">
          {DESTINATIONS.map((destination, index) => (
            <div key={destination.name} className="flow-line h-4">
              <span
                key={event.id}
                className="flow-shot"
                style={{ "--flow-delay": `${0.2 + index * 0.12}s` } as CSSProperties}
              />
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {DESTINATIONS.map((destination, index) => (
            <Card key={destination.name} className="flex items-center gap-3 py-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600">
                <Icon name={destination.icon} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-slate-900">
                  {destination.name}
                </span>
                <span className="block truncate text-xs text-slate-500">{destination.detail}</span>
              </span>
              <span key={event.id} className="demo-pop" style={at(1 + index * 0.12)}>
                <Pill tone="brand">{event.label}</Pill>
              </span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

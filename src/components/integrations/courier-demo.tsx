"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, type CSSProperties } from "react";

import pathao from "@/assets/partners/pathao.png";
import redx from "@/assets/partners/redx.png";
import steadfast from "@/assets/partners/steadfast.png";
import { AutoplayButton } from "@/components/ui/demo-controls";
import { useDemoAutoplay } from "@/lib/use-demo-autoplay";
import { cn } from "@/lib/utils";

import { Card, PressButton, StatusSwap, at } from "./demo-bits";

const COURIERS: ReadonlyArray<{ id: string; name: string; logo: StaticImageData }> = [
  { id: "pathao", name: "Pathao", logo: pathao },
  { id: "redx", name: "RedX", logo: redx },
  { id: "steadfast", name: "Steadfast", logo: steadfast },
];

const ORDERS = ["#1042", "#1043", "#1044"];

/**
 * Delivery: select orders, book them with the chosen courier (one of the three supported), and
 * watch statuses come back. Each courier tab replays the flow.
 */
export function CourierDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, { durations: [4200, 4200, 4200] });
  const courier = COURIERS[demo.step] ?? COURIERS[0]!;

  return (
    <div ref={demoRef}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div
          role="group"
          aria-label="Courier"
          className="inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/80 p-1"
        >
          {COURIERS.map((item, index) => {
            const isActive = item.id === courier.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                aria-label={item.name}
                onClick={() => demo.goTo(index)}
                className={cn(
                  "flex h-10 w-24 cursor-pointer items-center justify-center rounded-full px-3 transition-[background-color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark",
                  isActive
                    ? "bg-white shadow-[0_4px_14px_-4px_rgba(2,132,199,0.4)] ring-2 ring-brand"
                    : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0",
                )}
              >
                <Image
                  src={item.logo}
                  alt=""
                  sizes="96px"
                  className="max-h-6 w-auto max-w-full object-contain"
                />
              </button>
            );
          })}
        </div>
        <AutoplayButton demo={demo} />
      </div>

      {/* Remounted per courier so the flow replays. */}
      <div
        key={courier.id}
        aria-hidden="true"
        className="grid items-center gap-3 select-none md:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] md:gap-0"
      >
        <Card className="space-y-2">
          <p className="text-sm font-bold text-slate-900">Ready to ship</p>
          {ORDERS.map((order, index) => (
            <div
              key={order}
              className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm"
            >
              <span className="flex items-center gap-2.5 font-semibold text-slate-700">
                <span className="grid size-4 place-items-center rounded border border-slate-300 bg-white">
                  <span
                    className="demo-pop size-full rounded-[3px] bg-brand"
                    style={at(0.2 + index * 0.2)}
                  />
                </span>
                {order}
              </span>
              <span className="text-xs text-slate-400">Confirmed</span>
            </div>
          ))}
          <PressButton
            label={`Book ${ORDERS.length} with ${courier.name}`}
            doneLabel="Booked"
            pressAt={1.1}
            className="w-full"
          />
        </Card>

        <div className="flow-line flow-line-y-sm mx-auto h-12 w-4 md:h-4 md:w-full">
          {[0, 0.15, 0.3].map((delay) => (
            <span
              key={delay}
              className="flow-shot"
              style={{ "--flow-delay": `${1.4 + delay}s` } as CSSProperties}
            />
          ))}
        </div>

        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-900">Shipments</p>
            <Image
              src={courier.logo}
              alt=""
              sizes="96px"
              className="max-h-5 w-auto object-contain"
            />
          </div>
          {ORDERS.map((order, index) => (
            <div
              key={order}
              className="demo-in flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm"
              style={at(1.9 + index * 0.15)}
            >
              <span className="font-semibold text-slate-700">{order}</span>
              <StatusSwap
                from={{ tone: "neutral", label: "Booked" }}
                to={{ tone: "brand", label: "In transit" }}
                seconds={2.9 + index * 0.2}
              />
            </div>
          ))}
          <p className="demo-in pt-1 text-xs text-slate-500" style={at(3.2)}>
            Statuses sync from {courier.name}.
          </p>
        </Card>
      </div>
    </div>
  );
}

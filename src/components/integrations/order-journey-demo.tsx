"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, type ReactNode } from "react";

import bkash from "@/assets/partners/bkash.png";
import pathao from "@/assets/partners/pathao.png";
import redx from "@/assets/partners/redx.png";
import steadfast from "@/assets/partners/steadfast.png";
import { AutoplayButton } from "@/components/ui/demo-controls";
import { Icon, type IconName } from "@/components/ui/icon";
import { useDemoAutoplay } from "@/lib/use-demo-autoplay";
import { cn } from "@/lib/utils";

import {
  BRAND_GRADIENT,
  Card,
  EXAMPLE_ORDER,
  MessageBubble,
  PhoneFrame,
  Pill,
  PressButton,
  StatusSwap,
  at,
} from "./demo-bits";

function CheckoutVisual() {
  return (
    <Card className="mx-auto max-w-sm space-y-3">
      <p className="text-sm font-bold text-slate-900">Checkout</p>
      {["Name", "Mobile", "Address"].map((field) => (
        <div key={field} className="flex items-center gap-3">
          <span className="w-16 text-xs text-slate-500">{field}</span>
          <span className="h-7 flex-1 rounded-lg border border-slate-200 bg-slate-50" />
        </div>
      ))}
      <p className="pt-1 text-xs font-bold text-slate-500">Payment</p>
      <div className="space-y-1.5">
        <span className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600">
          <span className="size-3.5 rounded-full border-2 border-slate-300" />
          Cash on delivery
        </span>
        <span className="relative flex items-center gap-2.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800">
          <span
            className="demo-pop absolute inset-0 rounded-xl ring-2 ring-brand"
            style={at(0.7)}
          />
          <span className="grid size-3.5 place-items-center rounded-full border-2 border-brand">
            <span className="demo-pop size-1.5 rounded-full bg-brand" style={at(0.7)} />
          </span>
          <Image src={bkash} alt="" sizes="64px" className="h-4 w-auto" />
          bKash
        </span>
      </div>
      <PressButton label="Place order" doneLabel="Order placed" pressAt={1.6} className="w-full" />
    </Card>
  );
}

function PaymentVisual() {
  return (
    <Card className="mx-auto max-w-sm space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-slate-900">Order {EXAMPLE_ORDER.number}</p>
        <span className="text-sm font-bold text-slate-900">{EXAMPLE_ORDER.total}</span>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
        <span className="flex items-center gap-2 text-sm text-slate-600">
          <Image src={bkash} alt="" sizes="64px" className="h-5 w-auto" />
          Payment
        </span>
        <StatusSwap
          from={{ tone: "pending", label: "Waiting for bKash" }}
          to={{ tone: "success", label: "Paid" }}
          seconds={1.3}
        />
      </div>
      <p className="demo-in text-xs text-slate-500" style={at(1.6)}>
        Confirmed by bKash and recorded on the order.
      </p>
    </Card>
  );
}

function OrderVisual() {
  return (
    <Card className="mx-auto max-w-md space-y-2">
      <p className="text-sm font-bold text-slate-900">Orders</p>
      {[
        { number: EXAMPLE_ORDER.number, highlight: true },
        { number: "#1041", highlight: false },
        { number: "#1040", highlight: false },
      ].map((row) => (
        <div
          key={row.number}
          className={cn(
            "flex items-center justify-between rounded-xl px-3 py-2 text-sm",
            row.highlight ? "bg-brand-light/60 ring-1 ring-brand/30" : "bg-slate-50 text-slate-500",
          )}
        >
          <span className="font-semibold">{row.number}</span>
          {row.highlight ? (
            <StatusSwap
              from={{ tone: "pending", label: "Pending" }}
              to={{ tone: "brand", label: "Confirmed" }}
              seconds={1}
            />
          ) : (
            <Pill tone="neutral">Delivered</Pill>
          )}
        </div>
      ))}
      <p
        className="demo-in flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600"
        style={at(1.7)}
      >
        <Icon name="forum" className="scale-75 text-brand" />
        Order-confirmed SMS sent through BulkSMSBD
      </p>
    </Card>
  );
}

const COURIERS: ReadonlyArray<{ name: string; logo: StaticImageData }> = [
  { name: "Pathao", logo: pathao },
  { name: "RedX", logo: redx },
  { name: "Steadfast", logo: steadfast },
];

function CourierVisual() {
  return (
    <Card className="mx-auto max-w-sm space-y-3">
      <p className="text-sm font-bold text-slate-900">Book shipment</p>
      <div className="grid grid-cols-3 gap-2">
        {COURIERS.map((courier, index) => (
          <span
            key={courier.name}
            className="relative flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-2"
          >
            {index === 0 ? (
              <span
                className="demo-pop absolute inset-0 rounded-xl ring-2 ring-brand"
                style={at(0.6)}
              />
            ) : null}
            <Image
              src={courier.logo}
              alt={courier.name}
              sizes="96px"
              className="max-h-6 w-auto max-w-full object-contain"
            />
          </span>
        ))}
      </div>
      <PressButton
        label="Book with Pathao"
        doneLabel="Shipment booked"
        pressAt={1.4}
        className="w-full"
      />
    </Card>
  );
}

function TrackingVisual() {
  const steps = ["Order placed", "Confirmed", "With courier", "Delivered"];
  return (
    <Card className="mx-auto max-w-sm">
      <p className="text-sm font-bold text-slate-900">Track order {EXAMPLE_ORDER.number}</p>
      <ol className="mt-3 space-y-2.5">
        {steps.map((step, index) => {
          const done = index < 2;
          const active = index === 2;
          return (
            <li key={step} className="flex items-center gap-3 text-sm">
              <span
                className={cn(
                  "relative grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-bold",
                  done || active ? "text-white" : "bg-slate-100 text-slate-400",
                  active && "demo-pop",
                )}
                style={
                  done || active
                    ? { background: BRAND_GRADIENT, ...(active ? at(0.8) : {}) }
                    : undefined
                }
              >
                {done ? "✓" : index + 1}
              </span>
              <span
                className={cn(done || active ? "font-semibold text-slate-800" : "text-slate-400")}
              >
                {step}
              </span>
              {active ? (
                <Pill tone="brand" className="demo-in ml-auto" style={at(1.1)}>
                  Synced from courier
                </Pill>
              ) : null}
            </li>
          );
        })}
      </ol>
    </Card>
  );
}

function DeliveredVisual() {
  return (
    <PhoneFrame title="Your brand">
      <MessageBubble className="demo-in opacity-70" style={at(0.1)}>
        Your order {EXAMPLE_ORDER.number} is confirmed.
      </MessageBubble>
      <MessageBubble className="demo-in" style={at(0.9)}>
        Your order {EXAMPLE_ORDER.number} has been delivered. Thank you for shopping with us!
      </MessageBubble>
    </PhoneFrame>
  );
}

type Stage = {
  id: string;
  label: string;
  icon: IconName;
  service: ReactNode;
  caption: string;
  visual: ReactNode;
};

const STAGES: ReadonlyArray<Stage> = [
  {
    id: "checkout",
    label: "Checkout",
    icon: "shopping_cart_checkout",
    service: "Your storefront",
    caption: "A shopper checks out as a guest and picks bKash or cash on delivery.",
    visual: <CheckoutVisual />,
  },
  {
    id: "payment",
    label: "Payment",
    icon: "payments",
    service: <Image src={bkash} alt="bKash" sizes="80px" className="h-5 w-auto" />,
    caption: "bKash confirms the payment and the order is marked paid.",
    visual: <PaymentVisual />,
  },
  {
    id: "order",
    label: "Order",
    icon: "receipt_long",
    service: "Dashboard + BulkSMSBD",
    caption: "The order lands in your dashboard. Confirm it and the customer gets an SMS.",
    visual: <OrderVisual />,
  },
  {
    id: "courier",
    label: "Courier",
    icon: "local_shipping",
    service: "Pathao · RedX · Steadfast",
    caption: "Book the shipment with your connected courier, right from the order.",
    visual: <CourierVisual />,
  },
  {
    id: "tracking",
    label: "Tracking",
    icon: "route",
    service: "Courier status sync",
    caption: "Courier updates sync back, and the shopper follows along on their tracking page.",
    visual: <TrackingVisual />,
  },
  {
    id: "delivered",
    label: "Delivered",
    icon: "check_circle",
    service: "BulkSMSBD",
    caption: "Delivered. The customer gets an SMS from your store.",
    visual: <DeliveredVisual />,
  },
];

/** One order followed from checkout to delivery, through every connected service. */
export function OrderJourneyDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, {
    durations: STAGES.map(() => 3400),
    reducedMotionStep: 0,
  });
  const index = demo.step;
  const stage = STAGES[index] ?? STAGES[0]!;
  const last = STAGES.length - 1;

  return (
    <div
      ref={demoRef}
      className="liquid-glass-card rounded-3xl p-4 sm:p-7"
      style={{ borderRadius: "28px" }}
    >
      {/* Rail */}
      <div className="relative sm:pt-9">
        <span
          aria-hidden="true"
          className="absolute top-[1.375rem] right-[calc(100%/12)] left-[calc(100%/12)] h-0.5 overflow-hidden rounded-full bg-slate-200 sm:top-[3.625rem]"
        >
          <span
            className="absolute inset-0 origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ background: BRAND_GRADIENT, transform: `scaleX(${index / last})` }}
          />
        </span>
        <ol className="relative grid grid-cols-6" aria-label="Order journey">
          {STAGES.map((item, itemIndex) => {
            const isActive = itemIndex === index;
            const isDone = itemIndex < index;
            return (
              <li key={item.id} className="flex justify-center">
                <button
                  type="button"
                  aria-current={isActive ? "step" : undefined}
                  onClick={() => demo.goTo(itemIndex)}
                  className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl px-1 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
                >
                  <span
                    className={cn(
                      "grid size-11 place-items-center rounded-full border-2 transition-[background-color,border-color,color,transform] duration-300",
                      isActive
                        ? "scale-110 border-transparent text-white shadow-[0_8px_20px_-6px_rgba(8,192,216,0.6)]"
                        : isDone
                          ? "border-transparent text-white"
                          : "border-slate-200 bg-white text-slate-400 group-hover:text-slate-700",
                    )}
                    style={isActive || isDone ? { background: BRAND_GRADIENT } : undefined}
                  >
                    <Icon name={item.icon} />
                  </span>
                  <span
                    className={cn(
                      "text-[11px] font-bold sm:text-xs",
                      isActive ? "text-slate-900" : "text-slate-500",
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        {/* The order travelling along the rail. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 hidden -translate-x-1/2 items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-bold text-white shadow-lg transition-[left] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:flex"
          style={{ left: `${((index + 0.5) / STAGES.length) * 100}%` }}
        >
          {EXAMPLE_ORDER.number}
        </span>
      </div>

      {/* Stage */}
      <div className="mt-8 grid items-center gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-10">
        <div aria-hidden="true" className="min-h-[17rem] select-none">
          <div key={stage.id} className="demo-in">
            {stage.visual}
          </div>
        </div>
        <div aria-live="polite">
          <p className="text-[11px] font-bold tracking-[0.16em] text-slate-500 uppercase">
            Step {index + 1} of {STAGES.length}
          </p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
            {stage.label}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
            {stage.caption}
          </p>
          <p className="mt-4 inline-flex min-h-9 items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-1.5 text-xs font-bold text-slate-700">
            <span className="text-slate-400">Connected:</span>
            {stage.service}
          </p>
          <div className="mt-5">
            <AutoplayButton demo={demo} />
          </div>
        </div>
      </div>
    </div>
  );
}

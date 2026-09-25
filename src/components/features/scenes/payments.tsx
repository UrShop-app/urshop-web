import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import bkash from "@/assets/partners/bkash.png";
import pathao from "@/assets/partners/pathao.png";
import redx from "@/assets/partners/redx.png";
import steadfast from "@/assets/partners/steadfast.png";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import {
  Bar,
  Check,
  Label,
  Panel,
  PressButton,
  SceneFrame,
  Stack,
  Toggle,
  TypedField,
  at,
} from "./scene-kit";

function Radio({ selectAt }: { selectAt?: number }) {
  return (
    <Stack className="size-4 shrink-0 place-items-center rounded-full border-2 border-slate-300 bg-white">
      {selectAt !== undefined ? (
        <>
          <span
            className="demo-pop size-4 rounded-full border-2 border-brand"
            style={at(selectAt)}
          />
          <span className="demo-pop size-1.5 rounded-full bg-brand" style={at(selectAt)} />
        </>
      ) : null}
    </Stack>
  );
}

function PaymentOption({
  children,
  hint,
  selectAt,
  className,
}: {
  children: ReactNode;
  hint?: ReactNode;
  selectAt?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5",
        className,
      )}
    >
      <Radio selectAt={selectAt} />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-xs font-bold text-slate-800">{children}</span>
        {hint ? <span className="mt-0.5 block text-[10px] text-slate-500">{hint}</span> : null}
      </span>
    </div>
  );
}

/** Choosing cash on delivery at checkout. Secure COD is shown as switched on per store. */
export function CodScene() {
  return (
    <SceneFrame>
      <Panel className="space-y-2">
        <Label className="mb-3">Payment</Label>
        <PaymentOption selectAt={0.6} hint="Pay in cash when the order arrives" className="demo-in">
          <Icon name="payments" className="text-brand-dark" />
          Cash on delivery
        </PaymentOption>
        <PaymentOption className="demo-in" hint="Only when the shop has connected bKash">
          <Image src={bkash} alt="" sizes="96px" className="h-5 w-auto" />
        </PaymentOption>
        <PaymentOption className="demo-in" hint="Delivery fee now by bKash, the rest in cash">
          Secure COD
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800 ring-1 ring-amber-200 ring-inset">
            On request
          </span>
        </PaymentOption>
      </Panel>
      <Panel className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-600">Pay on delivery</span>
          <Bar className="w-16 bg-slate-300" />
        </div>
        <PressButton label="Place order" doneLabel="Order placed" pressAt={1.8} />
      </Panel>
    </SceneFrame>
  );
}

/** Paying with bKash, the payment confirmed, and a refund from the dashboard. */
export function BkashScene() {
  return (
    <SceneFrame>
      <Panel className="flex items-center gap-3">
        <Radio selectAt={0.4} />
        <Image src={bkash} alt="" sizes="96px" className="h-7 w-auto" />
        <span className="ml-auto text-[10px] font-semibold text-slate-500">
          To your merchant account
        </span>
      </Panel>
      <Panel className="demo-in" style={at(1)}>
        <Stack className="items-center">
          <span
            className="demo-out flex items-center gap-2 text-xs font-semibold text-slate-500"
            style={at(2)}
          >
            <span className="flex gap-1">
              <span className="size-1.5 animate-pulse rounded-full bg-[#E2136E]" />
              <span className="size-1.5 animate-pulse rounded-full bg-[#E2136E] [animation-delay:150ms]" />
              <span className="size-1.5 animate-pulse rounded-full bg-[#E2136E] [animation-delay:300ms]" />
            </span>
            Waiting for bKash…
          </span>
          <span
            className="demo-in flex items-center gap-2 text-xs font-bold text-emerald-700"
            style={at(2)}
          >
            <Check />
            Payment confirmed by bKash
          </span>
        </Stack>
      </Panel>
      <Panel className="demo-in space-y-3" style={at(2.5)}>
        <div className="flex items-center justify-between">
          <Label>Dashboard · Order #1042</Label>
          <Stack className="justify-items-end text-[10px] font-bold">
            <span
              className="demo-out rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700"
              style={at(3.6)}
            >
              Paid · bKash
            </span>
            <span
              className="demo-pop rounded-full bg-slate-100 px-2 py-0.5 text-slate-600"
              style={at(3.6)}
            >
              Refunded
            </span>
          </Stack>
        </div>
        <div className="flex items-center gap-3">
          <span className="size-9 shrink-0 rounded-lg bg-slate-100" />
          <span className="min-w-0 flex-1 space-y-1.5">
            <Bar className="w-2/3" />
            <Bar className="w-1/3" />
          </span>
          <span
            className="demo-press rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-bold text-slate-700"
            style={at(3.3)}
          >
            Refund
          </span>
        </div>
      </Panel>
    </SceneFrame>
  );
}

const COURIERS: ReadonlyArray<{ name: string; logo: StaticImageData; className: string }> = [
  { name: "Pathao", logo: pathao, className: "h-6 w-auto" },
  { name: "Steadfast", logo: steadfast, className: "h-5 w-auto max-w-full object-contain" },
  { name: "RedX", logo: redx, className: "h-6 w-auto rounded" },
];

/** Booking a courier for an order and seeing its status sync back. */
export function CourierScene() {
  const pickAt = 1;
  return (
    <SceneFrame>
      <Panel className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-brand-light text-brand-dark">
          <Icon name="receipt_long" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-bold text-slate-800">Order #1042</span>
          <Bar className="mt-1.5 w-28" />
        </span>
        <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-700">
          Confirmed
        </span>
      </Panel>
      <Panel className="space-y-3">
        <Label>Book with</Label>
        <div className="grid grid-cols-3 gap-2">
          {COURIERS.map((courier, index) => (
            <Stack
              key={courier.name}
              className="h-12 place-items-center rounded-xl border border-slate-200 bg-white px-2"
            >
              <Image src={courier.logo} alt="" sizes="96px" className={courier.className} />
              {index === 1 ? (
                <span
                  className="demo-pop size-full rounded-xl ring-2 ring-brand ring-offset-1"
                  style={at(pickAt)}
                />
              ) : null}
            </Stack>
          ))}
        </div>
        <PressButton label="Book shipment" doneLabel="Shipment booked" pressAt={1.8} />
      </Panel>
      <Panel className="demo-in flex items-center gap-3" style={at(2.6)}>
        <span className="demo-live relative size-2.5 shrink-0 rounded-full bg-brand" />
        <span className="min-w-0 flex-1 text-xs font-semibold text-slate-700">
          Status synced from Steadfast
        </span>
        <Icon name="local_shipping" className="text-brand-dark" />
      </Panel>
    </SceneFrame>
  );
}

/** Setting inside/outside Dhaka charges and a per-product override. */
export function DeliveryRatesScene() {
  return (
    <SceneFrame>
      <Panel className="space-y-3">
        <Label>Delivery charges</Label>
        <div className="grid grid-cols-2 gap-2">
          <TypedField label="Inside Dhaka" placeholder="৳" value="৳60" start={0.4} />
          <TypedField label="Outside Dhaka" placeholder="৳" value="৳120" start={0.9} />
        </div>
      </Panel>
      <Panel className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Product override</Label>
          <Toggle onAt={1.6} />
        </div>
        <div className="demo-in flex items-center gap-3" style={at(1.9)}>
          <span className="size-9 shrink-0 rounded-lg bg-slate-100" />
          <Bar className="w-1/3" />
          <TypedField placeholder="৳" value="৳150" start={2.2} className="ml-auto w-20" />
        </div>
        <div className="demo-in flex gap-1.5" style={at(2.5)}>
          {["Weight", "Dimensions"].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600"
            >
              {chip}
            </span>
          ))}
        </div>
      </Panel>
      <Panel className="demo-in flex items-start gap-3" style={at(3)}>
        <Icon name="local_shipping" className="text-brand-dark" />
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-bold text-slate-800">
            Delivery policy on every product page
          </span>
          <Bar className="mt-2 w-full" />
          <Bar className="mt-1.5 w-2/3" />
        </span>
      </Panel>
    </SceneFrame>
  );
}

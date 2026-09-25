import type { CSSProperties } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import {
  BRAND_GRADIENT,
  Bar,
  Check,
  Chevron,
  Label,
  Panel,
  PressButton,
  SceneFrame,
  Stack,
  TypedField,
  at,
  between,
  typed,
} from "./scene-kit";

/** A product being filled in: name, sale price, options, then a CSV import. */
export function ProductScene() {
  const name = "Cotton panjabi";
  return (
    <SceneFrame>
      <Panel className="flex gap-3 sm:gap-4">
        <span
          className="flex size-24 shrink-0 items-center justify-center rounded-xl text-white sm:size-28"
          style={{ background: BRAND_GRADIENT }}
        >
          <Icon name="shopping_bag" />
        </span>
        <div className="min-w-0 flex-1 space-y-2.5">
          <Label>Product</Label>
          <p
            className="demo-type text-sm font-bold whitespace-nowrap text-slate-800"
            style={typed(0.3, name)}
          >
            {name}
          </p>
          <p className="demo-in flex items-baseline gap-2" style={at(1.2)}>
            <span className="text-base font-extrabold text-brand-dark">৳1,190</span>
            <span className="text-xs text-slate-400 line-through">৳1,450</span>
            <span className="rounded-full bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-600">
              Sale
            </span>
          </p>
          <span
            className="demo-in flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700"
            style={at(1.5)}
          >
            <span className="size-1.5 rounded-full bg-emerald-500" />
            In stock
          </span>
        </div>
      </Panel>
      <Panel className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-10 text-[11px] font-semibold text-slate-500">Size</span>
          <span className="flex gap-1.5">
            {["S", "M", "L", "XL"].map((size, index) => (
              <span
                key={size}
                className={cn(
                  "demo-pop flex h-7 min-w-7 items-center justify-center rounded-lg border px-1.5 text-[11px] font-bold",
                  index === 1
                    ? "border-brand bg-brand-light text-brand-dark"
                    : "border-slate-200 text-slate-600",
                )}
                style={at(1.9 + index * 0.12)}
              >
                {size}
              </span>
            ))}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-10 text-[11px] font-semibold text-slate-500">Color</span>
          <span className="flex gap-2">
            {["#0f172a", "#f8fafc", "#0e7490"].map((color, index) => (
              <span
                key={color}
                className="demo-pop size-6 rounded-full border border-slate-300"
                style={{ ...at(2.4 + index * 0.12), background: color }}
              />
            ))}
          </span>
        </div>
      </Panel>
      <Panel>
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-2 font-semibold text-slate-700">
            <Icon name="inventory_2" className="text-slate-400" />
            products.csv
          </span>
          <Stack className="text-[11px] font-bold">
            <span className="demo-out text-slate-400" style={at(3.9)}>
              Importing…
            </span>
            <span className="demo-in flex items-center gap-1.5 text-emerald-700" style={at(3.9)}>
              <Check />
              Imported
            </span>
          </Stack>
        </div>
        <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-slate-100">
          <span
            className="demo-grow block h-full rounded-full"
            style={{ ...at(2.9), background: BRAND_GRADIENT }}
          />
        </span>
      </Panel>
    </SceneFrame>
  );
}

function SelectField({
  placeholder,
  value,
  start,
}: {
  placeholder: string;
  value: string;
  start: number;
}) {
  return (
    <Stack className="h-8 min-w-0 items-center rounded-lg border border-slate-200 bg-slate-50 px-2 text-[10px] font-semibold">
      <span
        className="demo-out flex items-center justify-between gap-1 text-slate-400"
        style={at(start)}
      >
        <span className="truncate">{placeholder}</span>
        <Chevron />
      </span>
      <span
        className="demo-in flex items-center justify-between gap-1 text-slate-800"
        style={at(start)}
      >
        <span className="truncate">{value}</span>
        <Chevron />
      </span>
    </Stack>
  );
}

/** A guest filling in checkout; the delivery fee appears once the address is complete. */
export function CheckoutScene() {
  return (
    <SceneFrame>
      <Panel className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <Label>Checkout</Label>
          <span className="text-[10px] font-semibold text-slate-400">No account needed</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <TypedField label="Name" placeholder="Your name" value="Nusrat Jahan" start={0.3} />
          <TypedField label="Mobile" placeholder="01XXXXXXXXX" value="01712 000000" start={1.1} />
        </div>
        <div>
          <p className="mb-1 text-[11px] font-semibold text-slate-500">Address</p>
          <div className="grid grid-cols-3 gap-1.5">
            <SelectField placeholder="Division" value="Chattogram" start={1.9} />
            <SelectField placeholder="District" value="Cox's Bazar" start={2.2} />
            <SelectField placeholder="Upazila" value="Teknaf" start={2.5} />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-slate-200 px-2.5 py-2 text-[11px]">
          <span className="font-semibold text-slate-500">Payment</span>
          <span className="flex items-center gap-1.5 font-bold text-slate-800">
            <Icon name="payments" className="text-brand-dark" />
            Cash on delivery
          </span>
        </div>
        <div className="space-y-2 border-t border-slate-200/70 pt-3 text-[11px]">
          <div className="flex items-center justify-between text-slate-500">
            Subtotal
            <Bar className="w-14" />
          </div>
          <div className="flex items-center justify-between text-slate-500">
            Delivery
            <Stack>
              <span className="demo-out text-[10px] text-slate-400" style={at(2.9)}>
                Add your address
              </span>
              <span className="demo-pop justify-self-end" style={at(2.9)}>
                <Bar className="w-10 bg-brand/50" />
              </span>
            </Stack>
          </div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            Total
            <span className="demo-grow" style={at(3.1)}>
              <Bar className="h-2.5 w-16 bg-slate-300" />
            </span>
          </div>
        </div>
        <PressButton label="Place order" doneLabel="Order placed" pressAt={3.8} />
      </Panel>
    </SceneFrame>
  );
}

const ORDERS = ["#1041", "#1042", "#1043", "#1044"];

const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-700",
  Confirmed: "bg-sky-50 text-sky-700",
  Delivered: "bg-emerald-50 text-emerald-700",
} as const;

function StatusChip({
  status,
  className,
  style,
}: {
  status: keyof typeof STATUS_STYLES;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={cn(
        "justify-self-end rounded-full px-2 py-0.5 text-[10px] font-bold",
        STATUS_STYLES[status],
        className,
      )}
      style={style}
    >
      {status}
    </span>
  );
}

/** An order moving through its statuses, then its invoice. */
export function OrdersScene() {
  return (
    <SceneFrame>
      <Panel className="space-y-1">
        <div className="mb-2 flex items-center justify-between">
          <Label>Orders</Label>
          <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
            Export CSV
          </span>
        </div>
        {ORDERS.map((order, index) => (
          <div
            key={order}
            className={cn(
              "demo-in grid grid-cols-[3rem_1.5rem_minmax(0,1fr)_5.5rem] items-center gap-2 rounded-xl px-2 py-2",
              index === 0 && "bg-brand-light/50",
            )}
            style={at(0.2 + index * 0.12)}
          >
            <span className="text-[11px] font-bold text-slate-700">{order}</span>
            <span className="size-6 rounded-full bg-slate-100" />
            <Bar className="w-3/4" />
            {index === 0 ? (
              <Stack className="justify-items-end">
                <StatusChip status="Pending" className="demo-out" style={at(1.4)} />
                <StatusChip status="Confirmed" className="demo-in-out" style={between(1.4, 2.5)} />
                <StatusChip status="Delivered" className="demo-pop" style={at(2.5)} />
              </Stack>
            ) : (
              <StatusChip
                status={index === 1 ? "Confirmed" : index === 2 ? "Delivered" : "Pending"}
              />
            )}
          </div>
        ))}
      </Panel>
      <Panel className="demo-in" style={at(3.1)}>
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-brand-light text-brand-dark">
            <Icon name="receipt_long" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-bold text-slate-800">Invoice #1041</span>
            <Bar className="mt-1.5 w-24" />
          </span>
          <span className="flex gap-1.5">
            <span className="rounded-full border border-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-600">
              Print
            </span>
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
              style={{ background: BRAND_GRADIENT }}
            >
              PDF
            </span>
          </span>
        </div>
      </Panel>
    </SceneFrame>
  );
}

/** A coupon typed in the cart, verified, and the discount applied. */
export function CouponScene() {
  return (
    <SceneFrame>
      <Panel className="space-y-2.5">
        <Label>Cart</Label>
        {[0, 1].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <span className="size-8 shrink-0 rounded-lg bg-slate-100" />
            <span className="min-w-0 flex-1 space-y-1.5">
              <Bar className="w-2/3" />
              <Bar className="w-1/3" />
            </span>
            <Bar className="w-10 bg-slate-300" />
          </div>
        ))}
      </Panel>
      <Panel className="space-y-3">
        <div className="flex gap-2">
          <Stack className="h-9 flex-1 items-center rounded-lg border border-dashed border-brand/50 bg-brand-cyan-light/50 px-3 text-xs">
            <span className="demo-out text-slate-400" style={at(0.5)}>
              Coupon code
            </span>
            <span
              className="demo-type font-bold tracking-wider text-brand-dark"
              style={typed(0.5, "EID20")}
            >
              EID20
            </span>
          </Stack>
          <span
            className="demo-press flex h-9 items-center rounded-lg bg-slate-900 px-4 text-xs font-bold text-white"
            style={at(1.4)}
          >
            Apply
          </span>
        </div>
        <p
          className="demo-in flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700"
          style={at(1.7)}
        >
          <Check />
          Code applied
        </p>
      </Panel>
      <Panel className="space-y-2 text-[11px]">
        <div className="flex items-center justify-between text-slate-500">
          Subtotal
          <Bar className="w-16" />
        </div>
        <div
          className="demo-in flex items-center justify-between font-semibold text-emerald-700"
          style={at(2.1)}
        >
          Discount
          <span>−20%</span>
        </div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          Total
          <Stack className="justify-items-end">
            <Bar className="demo-out h-2.5 w-20 bg-slate-300" style={at(2.4)} />
            <Bar className="demo-in h-2.5 w-14 bg-slate-300" style={at(2.4)} />
          </Stack>
        </div>
        <p
          className="demo-in flex items-center gap-1.5 border-t border-slate-200/70 pt-2 text-[10px] text-slate-500"
          style={at(2.9)}
        >
          <Icon name="lock" className="text-slate-400" />
          Checked again when the order is placed
        </p>
      </Panel>
    </SceneFrame>
  );
}

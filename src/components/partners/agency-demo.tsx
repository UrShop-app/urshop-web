"use client";

import { useRef, type ReactNode } from "react";

import { AutoplayButton } from "@/components/ui/demo-controls";
import { Icon, type IconName } from "@/components/ui/icon";
import { useDemoAutoplay } from "@/lib/use-demo-autoplay";
import { cn } from "@/lib/utils";

import { BRAND_GRADIENT, CardLabel, Flow, at } from "./kit";

/*
 * An agency's client work on UrShop, step by step. A sketch: the client and stores are examples,
 * and the store steps only use capabilities in features.ts (preset-themes, product-management,
 * page-builder, custom-domains, ad-pixels, blog, sms-marketing, staff-permissions,
 * bkash-payments, cod-payment, courier-integrations). There is no agency console in it.
 */

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function AgencyBadge() {
  return (
    <span className="flex items-center gap-2">
      <span
        className="grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-extrabold text-white"
        style={{ background: "#0f172a" }}
      >
        YA
      </span>
      <span className="text-sm font-bold text-slate-900">Your agency</span>
    </span>
  );
}

function Check({ delay }: { delay: number }) {
  return (
    <span
      className="demo-pop ml-auto flex justify-center items-center size-5 shrink-0 rounded-full text-white"
      style={{ ...at(delay), background: BRAND_GRADIENT }}
    >
      <Icon name="check" className="scale-[0.6]" />
    </span>
  );
}

function WinVisual() {
  const proposal = ["Setup", "Design", "Marketing", "Management"];
  return (
    <Card className="mx-auto max-w-sm space-y-4">
      <AgencyBadge />
      <div
        className="demo-in flex items-center gap-3 rounded-xl border border-brand/30 bg-brand-light/50 p-3"
        style={at(0.3)}
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-brand-dark">
          <Icon name="storefront" className="scale-90" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-slate-900">Example client</span>
          <span className="block text-xs text-slate-500">Fashion brand, selling online</span>
        </span>
        <span
          className="demo-pop rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700"
          style={at(1.1)}
        >
          Signed
        </span>
      </div>
      <div>
        <CardLabel>Your proposal</CardLabel>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {proposal.map((item, index) => (
            <li
              key={item}
              className="demo-in rounded-full border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-bold text-slate-700"
              style={at(1.3 + index * 0.12)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

const BUILD_STEPS: ReadonlyArray<{ icon: IconName; label: string }> = [
  { icon: "palette", label: "Theme chosen and styled" },
  { icon: "inventory_2", label: "Products and categories added" },
  { icon: "dashboard_customize", label: "Pages built with the page builder" },
  { icon: "language", label: "Their own domain connected" },
];

function BuildVisual() {
  return (
    <Card className="mx-auto max-w-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-slate-900">Client store</span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
          on UrShop
        </span>
      </div>
      <ul className="mt-3 space-y-2">
        {BUILD_STEPS.map((step, index) => (
          <li
            key={step.label}
            className="demo-in flex items-center gap-2.5 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700"
            style={at(0.15 + index * 0.35)}
          >
            <Icon name={step.icon} className="scale-75 text-brand" />
            {step.label}
            <Check delay={0.45 + index * 0.35} className="scale-75" />
          </li>
        ))}
      </ul>
      <div className="demo-pop mt-3 flex justify-end" style={at(2)}>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Published
        </span>
      </div>
    </Card>
  );
}

const SERVICES: ReadonlyArray<{ icon: IconName; label: string }> = [
  { icon: "search", label: "SEO & blog content" },
  { icon: "ads_click", label: "Meta & TikTok ads" },
  { icon: "campaign", label: "Social media" },
  { icon: "forum", label: "SMS campaigns" },
];

function ServiceChip({ service, delay }: { service: (typeof SERVICES)[number]; delay: number }) {
  return (
    <span
      className="demo-pop flex items-center justify-center gap-1.5 rounded-xl border border-slate-900/10 bg-slate-900 px-2.5 py-2 text-[12px] font-bold text-white"
      style={at(delay)}
    >
      <Icon name={service.icon} className="-my-1 scale-75 text-brand" />
      {service.label}
    </span>
  );
}

function ServicesVisual() {
  const [first, second, third, fourth] = SERVICES;
  return (
    <div className="mx-auto max-w-sm">
      <div className="grid grid-cols-2 gap-2">
        {first ? <ServiceChip service={first} delay={0.3} /> : null}
        {second ? <ServiceChip service={second} delay={0.55} /> : null}
      </div>
      <div className="grid grid-cols-2">
        <Flow axis="y" className="mx-auto h-6 w-4" delay={0.6} />
        <Flow axis="y" className="mx-auto h-6 w-4" delay={0.9} />
      </div>
      <Card className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-light text-brand-dark">
          <Icon name="storefront" className="scale-90" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-slate-900">Client store</span>
          <span className="block text-xs text-slate-500">Running on UrShop</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </Card>
      <div className="grid grid-cols-2">
        <Flow axis="y" reverse className="mx-auto h-6 w-4" delay={1.1} />
        <Flow axis="y" reverse className="mx-auto h-6 w-4" delay={1.4} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {third ? <ServiceChip service={third} delay={0.8} /> : null}
        {fourth ? <ServiceChip service={fourth} delay={1.05} /> : null}
      </div>
    </div>
  );
}

const ACCESS: ReadonlyArray<{ icon: IconName; label: string; allowed: boolean }> = [
  { icon: "inventory_2", label: "Products", allowed: true },
  { icon: "receipt_long", label: "Orders", allowed: true },
  { icon: "palette", label: "Storefront design", allowed: true },
  { icon: "account_balance_wallet", label: "Payments", allowed: false },
];

function ManageVisual() {
  return (
    <Card className="mx-auto max-w-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <Icon name="group" className="scale-90 text-brand" />
          Staff · Client store
        </span>
      </div>
      <div
        className="demo-in mt-3 flex items-center gap-3 rounded-xl bg-slate-50 p-2.5"
        style={at(0.2)}
      >
        <span
          className="grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-extrabold text-white"
          style={{ background: "#0f172a" }}
        >
          YA
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-slate-800">Your agency team</span>
          <span className="block truncate text-xs text-slate-500">team@youragency.example</span>
        </span>
        <span className="grid text-[11px] font-bold *:[grid-area:1/1]">
          <span
            className="demo-out rounded-full bg-amber-50 px-2 py-0.5 text-amber-800"
            style={at(1.6)}
          >
            Invited
          </span>
          <span
            className="demo-pop flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700"
            style={at(1.6)}
          >
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Staff
          </span>
        </span>
      </div>
      <CardLabel className="mt-4">Access chosen by the store owner</CardLabel>
      <ul className="mt-2 grid grid-cols-2 gap-1.5">
        {ACCESS.map((area, index) => (
          <li
            key={area.label}
            className={cn(
              "demo-in flex items-center gap-1.5 rounded-xl border px-2.5 py-2 text-[12px] font-bold",
              area.allowed
                ? "border-brand/30 bg-brand-light/50 text-slate-800"
                : "border-dashed border-slate-200 bg-slate-50/60 text-slate-400",
            )}
            style={at(0.5 + index * 0.15)}
          >
            <Icon
              name={area.allowed ? area.icon : "lock"}
              className={cn("-my-1 scale-75", area.allowed ? "text-brand" : "text-slate-400")}
            />
            {area.label}
          </li>
        ))}
      </ul>
    </Card>
  );
}

const CLIENT_STORES = ["Fashion brand", "Home décor shop", "Grocery store"];

function RunVisual() {
  return (
    <div className="mx-auto max-w-sm">
      <div className="flex items-center justify-between gap-3">
        <AgencyBadge />
        <span className="text-xs font-semibold text-slate-500">Example clients</span>
      </div>
      <ul className="mt-3 space-y-2">
        {CLIENT_STORES.map((store, index) => (
          <li key={store} className="demo-in" style={at(0.15 + index * 0.25)}>
            <Card className="flex items-center gap-3 p-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-light text-brand-dark">
                <Icon name="storefront" className="scale-75" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-slate-900">{store}</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Icon name="receipt_long" className="scale-[0.6]" />
                  <Icon name="payments" className="scale-[0.6]" />
                  <Icon name="local_shipping" className="scale-[0.6]" />
                </span>
              </span>
              <span
                className="demo-pop inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700"
                style={at(0.6 + index * 0.25)}
              >
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Live
              </span>
            </Card>
          </li>
        ))}
      </ul>
      <div className="demo-in mt-3 rounded-2xl bg-slate-900 p-3" style={at(1.4)}>
        <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase">
          <Icon name="autorenew" className="-my-1 scale-75 text-brand" />
          Ongoing from your agency
        </span>
        <span className="mt-2 flex flex-wrap gap-1.5">
          {["Management", "Marketing", "Support"].map((item, index) => (
            <span
              key={item}
              className="demo-pop rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-white"
              style={at(1.7 + index * 0.15)}
            >
              {item}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

type Stage = {
  id: string;
  label: string;
  icon: IconName;
  caption: string;
  visual: ReactNode;
};

const STAGES: ReadonlyArray<Stage> = [
  {
    id: "win",
    label: "Win a client",
    icon: "handshake",
    caption: "You win the client and set your own fees.",
    visual: <WinVisual />,
  },
  {
    id: "build",
    label: "Build on UrShop",
    icon: "storefront",
    caption: "Set up their store: theme, products, pages and domain.",
    visual: <BuildVisual />,
  },
  {
    id: "services",
    label: "Add your services",
    icon: "campaign",
    caption: "Add SEO, ads, social and SMS campaigns on top.",
    visual: <ServicesVisual />,
  },
  {
    id: "manage",
    label: "Manage the account",
    icon: "manage_accounts",
    caption: "The owner adds your team as staff. You stay their contact.",
    visual: <ManageVisual />,
  },
  {
    id: "run",
    label: "Grow together",
    icon: "trending_up",
    caption: "The store runs on UrShop. The ongoing work stays with you.",
    visual: <RunVisual />,
  },
];

/** An agency's client work on UrShop, from winning the client to the recurring service. */
export function AgencyDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, {
    durations: STAGES.map(() => 4200),
    reducedMotionStep: STAGES.length - 1,
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
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute top-[1.375rem] right-[10%] left-[10%] h-0.5 overflow-hidden rounded-full bg-slate-200"
        >
          <span
            className="absolute inset-0 origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ background: BRAND_GRADIENT, transform: `scaleX(${index / last})` }}
          />
        </span>
        <ol className="relative grid grid-cols-5" aria-label="Agency partnership, step by step">
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
                      "text-[11px] leading-tight font-bold max-sm:sr-only sm:text-xs",
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
      </div>

      {/* Stage */}
      <div className="mt-8 grid items-center gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10">
        <div aria-hidden="true" className="flex min-h-[19rem] items-center select-none">
          <div key={stage.id} className="demo-in w-full">
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
          <div className="mt-5">
            <AutoplayButton demo={demo} />
          </div>
        </div>
      </div>
    </div>
  );
}

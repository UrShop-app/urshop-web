import Image from "next/image";
import type { ReactNode } from "react";

import icon from "@/assets/icon.png";
import bkash from "@/assets/partners/bkash.png";
import nagad from "@/assets/partners/nagad.png";
import pathao from "@/assets/partners/pathao.png";
import redx from "@/assets/partners/redx.png";
import steadfast from "@/assets/partners/steadfast.png";
import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type Lane = {
  icon: IconName;
  eyebrow: string;
  title: string;
  description: string;
  partners: ReadonlyArray<{ name: string; mark: ReactNode }>;
};

const LOGO_SIZES = "128px";

/** Visa and Mastercard marks drawn like the footer's payment badges (no logo files). */
function CardMarks() {
  return (
    <span className="flex items-center gap-2.5" aria-hidden="true">
      <span className="text-xl font-extrabold tracking-tight text-[#1A1F71] italic">VISA</span>
      <span className="flex -space-x-2">
        <span className="size-6 rounded-full bg-[#EB001B]" />
        <span className="size-6 rounded-full bg-[#F79E1B] opacity-90" />
      </span>
    </span>
  );
}

// Money comes in on the left, orders go out on the right; UrShop sits in between.
const payments: Lane = {
  icon: "account_balance_wallet",
  eyebrow: "Payments",
  title: "Collect bKash, Nagad & cards",
  description:
    "Payments land in your merchant ledger and settle to your bank or MFS wallet automatically.",
  partners: [
    {
      name: "bKash",
      mark: <Image src={bkash} alt="bKash" sizes={LOGO_SIZES} className="h-9 w-auto" />,
    },
    {
      name: "Nagad",
      mark: <Image src={nagad} alt="Nagad" sizes={LOGO_SIZES} className="h-8 w-auto" />,
    },
    { name: "Visa and Mastercard", mark: <CardMarks /> },
  ],
};

const delivery: Lane = {
  icon: "local_shipping",
  eyebrow: "Delivery",
  title: "Ship with one click",
  description: "UrShop books the courier, prints the label and texts tracking to your buyer.",
  partners: [
    {
      name: "Pathao",
      mark: <Image src={pathao} alt="Pathao" sizes={LOGO_SIZES} className="h-9 w-auto" />,
    },
    {
      name: "SteadFast Courier",
      mark: (
        <Image
          src={steadfast}
          alt="SteadFast Courier"
          sizes={LOGO_SIZES}
          className="h-7 w-auto max-w-full object-contain"
        />
      ),
    },
    {
      name: "RedX",
      mark: <Image src={redx} alt="RedX" sizes={LOGO_SIZES} className="h-8 w-auto rounded-md" />,
    },
  ],
};

function LanePanel({ lane, className }: { lane: Lane; className?: string }) {
  return (
    <article
      className={cn("liquid-glass-card reveal flex flex-col rounded-3xl p-6 sm:p-7", className)}
      style={{ borderRadius: "28px" }}
    >
      <div className="flex items-center gap-4">
        <span
          className="flex size-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm"
          style={{ background: "linear-gradient(135deg, #08c0d8 0%, #0284c7 100%)" }}
        >
          <Icon name={lane.icon} />
        </span>
        <div>
          <p className="text-[11px] font-bold tracking-[0.18em] text-slate-500 uppercase">
            {lane.eyebrow}
          </p>
          <h3 className="text-lg font-bold text-slate-900">{lane.title}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{lane.description}</p>

      <ul className="mt-6 space-y-2.5">
        {lane.partners.map((partner) => (
          <li
            key={partner.name}
            className="flex h-16 items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white/85 px-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors duration-300 hover:border-brand/30 hover:bg-white"
          >
            <span className="flex h-full min-w-0 items-center">{partner.mark}</span>
            <span className="sr-only">{partner.name}: connected</span>
            {/* Decorative "enabled" switch, as in the dashboard's integration settings. */}
            <span
              className="relative h-5 w-9 shrink-0 rounded-full shadow-inner"
              style={{ background: "linear-gradient(135deg, #08c0d8 0%, #0284c7 100%)" }}
              aria-hidden="true"
            >
              <span className="absolute top-0.5 right-0.5 size-4 rounded-full bg-white shadow-sm" />
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function FlowLink() {
  return (
    <span className="integration-link h-12 w-4 shrink-0 lg:h-4 lg:w-auto lg:flex-1">
      <span className="integration-packet" />
      <span className="integration-packet integration-packet-late" />
    </span>
  );
}

/** Bangladeshi payment and delivery partners wired into UrShop through direct APIs. */
export function Integrations() {
  return (
    <section className="relative px-6 py-24 lg:px-12" id="integrations">
      <div className="mx-auto max-w-5xl">
        <div className="reveal mx-auto mb-14 max-w-2xl text-center">
          <span className="liquid-pill mb-2 inline-flex items-center justify-center rounded-full px-4 py-1.5 text-[12px] font-bold tracking-[0.12em] text-slate-600 uppercase select-none sm:px-5 sm:tracking-[0.18em]">
            NATIVE BANGLADESH INTEGRATIONS
          </span>
          <h2 className="mt-3 mb-4 text-3xl font-extrabold text-balance text-slate-900 sm:text-4xl">
            Plugged into the tools your customers trust
          </h2>
          <p className="text-base text-slate-600">
            Direct API connections with zero middlemen or manual approval delays.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_15rem_minmax(0,1fr)]">
          <LanePanel lane={payments} />

          <div
            className="reveal reveal-delay-1 flex flex-col items-center justify-center lg:flex-row"
            aria-hidden="true"
          >
            <FlowLink />
            <div className="integration-hub liquid-glass relative flex size-24 shrink-0 items-center justify-center rounded-full lg:size-28">
              <Image src={icon} alt="" sizes="64px" className="h-11 w-auto lg:h-13" />
            </div>
            <FlowLink />
          </div>

          <LanePanel lane={delivery} className="reveal-delay-2" />
        </div>
      </div>
    </section>
  );
}

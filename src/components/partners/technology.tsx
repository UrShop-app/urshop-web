import Link from "next/link";
import type { CSSProperties } from "react";

import { Icon, type IconName } from "@/components/ui/icon";
import { PauseOffscreen } from "@/components/ui/pause-offscreen";
import { integrationsByStatus } from "@/data/integrations";
import { partnershipPath } from "@/data/partners";

import {
  CardLabel,
  FinePrint,
  Flow,
  Hub,
  PartnersSection,
  PillLink,
  partnershipContactHref,
} from "./kit";

// Third-party services merchants can connect today (src/data/integrations.ts), not the
// merchant's own domain or email sender.
const CONNECTED = integrationsByStatus("connect").filter(
  (integration) => integration.group !== "store" && !integration.name.startsWith("Your "),
);

// Kinds of product we'd like to talk to. Open slots, not integrations in progress.
const OPEN_SLOTS: ReadonlyArray<{ icon: IconName; label: string }> = [
  { icon: "payments", label: "Payments" },
  { icon: "local_shipping", label: "Logistics" },
  { icon: "forum", label: "Messaging" },
  { icon: "campaign", label: "Marketing" },
  { icon: "insights", label: "Analytics" },
  { icon: "apps", label: "Business software" },
];

/** Technology partners: products that could connect with UrShop. */
export function TechnologySection() {
  const path = partnershipPath("technology");
  return (
    <PartnersSection
      id="technology"
      eyebrow="Technology partners"
      title="Make commerce better for UrShop merchants"
      intro="Payments, logistics, messaging or SaaS? Let's connect your product."
    >
      <PauseOffscreen className="reveal reveal-delay-1 mx-auto max-w-3xl">
        <div
          aria-hidden="true"
          className="liquid-glass-card rounded-3xl p-5 text-center select-none sm:p-8"
          style={{ borderRadius: "28px" }}
        >
          <CardLabel>Connected today</CardLabel>
          <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
            {CONNECTED.map((integration) => (
              <li
                key={integration.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-bold text-slate-700"
              >
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {integration.name}
              </li>
            ))}
          </ul>

          <Flow axis="y" className="mx-auto mt-3 h-8 w-4" delay={0.2} />
          <Hub size="sm" className="mx-auto" />
          <Flow axis="y" reverse className="mx-auto mb-3 h-8 w-4" delay={0.9} />

          <CardLabel className="text-brand-dark">Your product here</CardLabel>
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {OPEN_SLOTS.map((slot, index) => (
              <li
                key={slot.label}
                className="relative flex items-center justify-center gap-2 rounded-2xl border border-dashed border-brand/45 bg-white/60 px-3 py-3 text-sm font-bold text-slate-800"
              >
                {index === 0 ? (
                  <span
                    className="partners-glow pointer-events-none absolute -inset-px rounded-2xl ring-2 ring-brand/50"
                    style={{ "--delay": "0s" } as CSSProperties}
                  />
                ) : null}
                <Icon name={slot.icon} className="-my-1 shrink-0 scale-75 text-brand" />
                {slot.label}
              </li>
            ))}
          </ul>
        </div>
      </PauseOffscreen>

      <div className="reveal mt-10 flex flex-col items-center gap-4">
        <FinePrint>{path.terms}</FinePrint>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/integrations"
            className="text-sm font-bold text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
          >
            See current integrations
          </Link>
          <PillLink href={partnershipContactHref(path.contactSubject)}>Talk integration</PillLink>
        </div>
      </div>
    </PartnersSection>
  );
}

import { Icon, type IconName } from "@/components/ui/icon";
import { PauseOffscreen } from "@/components/ui/pause-offscreen";
import { partnershipPath } from "@/data/partners";
import { cn } from "@/lib/utils";

import {
  BRAND_GRADIENT,
  FinePrint,
  Flow,
  PartnersSection,
  PillLink,
  partnershipContactHref,
} from "./kit";

type Stage = { who: string; title: string; icon: IconName; highlight?: boolean };

// The referral pipeline as people, not software: no links, tracking or payout screens.
const STAGES: ReadonlyArray<Stage> = [
  { who: "You", title: "Introduce a business", icon: "share" },
  { who: "UrShop", title: "We talk to them", icon: "forum" },
  { who: "Merchant", title: "They start selling", icon: "storefront" },
  { who: "You", title: "You earn, as agreed", icon: "handshake", highlight: true },
];

/** Referral partners: introducing businesses that should be on UrShop. */
export function ReferralSection() {
  const path = partnershipPath("referral");
  return (
    <PartnersSection
      id="referral"
      eyebrow="Referral partners"
      title="Know businesses that should be on UrShop?"
      intro="Introduce them. Our team takes it from there."
    >
      <PauseOffscreen className="reveal reveal-delay-1 mx-auto max-w-4xl">
        <ol className="grid gap-6 sm:grid-cols-4 lg:gap-10">
          {STAGES.map((stage, index) => (
            <li key={stage.title} className="relative flex">
              {/* Connector across the gap from the previous step. */}
              {index > 0 ? (
                <>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 sm:hidden">
                    <Flow axis="y" className="h-6 w-4" delay={index * 0.6} />
                  </span>
                  <span className="absolute top-1/2 -left-6 hidden -translate-y-1/2 sm:block lg:-left-10">
                    <Flow className="h-4 w-6 lg:w-10" delay={index * 0.6} />
                  </span>
                </>
              ) : null}
              <div
                className={cn(
                  "flex flex-1 items-center gap-3 rounded-3xl p-4 sm:flex-col sm:justify-center sm:gap-3 sm:p-5 sm:text-center",
                  stage.highlight
                    ? "text-white shadow-[0_16px_32px_-14px_rgba(2,132,199,0.55)]"
                    : "liquid-glass-card",
                )}
                style={{
                  borderRadius: "24px",
                  ...(stage.highlight ? { background: BRAND_GRADIENT } : {}),
                }}
              >
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-2xl",
                    stage.highlight ? "bg-white/20" : "bg-brand-light text-brand-dark",
                  )}
                >
                  <Icon name={stage.icon} />
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-[11px] font-bold tracking-[0.14em] uppercase",
                      stage.highlight ? "text-white/80" : "text-slate-400",
                    )}
                  >
                    {stage.who}
                  </span>
                  <span
                    className={cn(
                      "block text-sm leading-snug font-bold",
                      stage.highlight ? "text-white" : "text-slate-800",
                    )}
                  >
                    {stage.title}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ol>
      </PauseOffscreen>

      <div className="reveal mt-10 flex flex-col items-center gap-4">
        <FinePrint>{path.terms}</FinePrint>
        <PillLink href={partnershipContactHref(path.contactSubject)}>Refer a business</PillLink>
      </div>
    </PartnersSection>
  );
}

import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { partnerAudiences, partnershipPath, type PartnershipPathId } from "@/data/partners";
import { cn } from "@/lib/utils";

import { BRAND_GRADIENT, PartnersSection, partnershipContactHref } from "./kit";

const PATH_TAG: Record<PartnershipPathId, string> = {
  referral: "Referral",
  agency: "Agency",
  regional: "Regional",
  technology: "Technology",
  software: "Software",
};

/** "Who should talk to us?": each audience links to the path that usually suits it. */
export function Audiences() {
  return (
    <PartnersSection
      id="who"
      eyebrow="Who we talk to"
      title="Who should talk to us?"
      intro="Size matters less than what you bring."
    >
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {partnerAudiences.map((audience, index) => {
          const firstPath = audience.paths[0];
          const href = firstPath ? `#${partnershipPath(firstPath).sectionId}` : null;
          const isOpenInvite = audience.paths.length === 0;
          const content = (
            <>
              <span
                className={cn(
                  "grid size-11 shrink-0 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6",
                  isOpenInvite ? "bg-white/20 text-white" : "bg-brand-light text-brand-dark",
                )}
              >
                <Icon name={audience.icon} />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={cn("block font-bold", isOpenInvite ? "text-white" : "text-slate-900")}
                >
                  {audience.label}
                </span>
                <span className="mt-1.5 flex flex-wrap gap-1">
                  {isOpenInvite ? (
                    <span className="text-xs font-semibold text-white/85">
                      Tell us what you have in mind
                    </span>
                  ) : (
                    audience.paths.map((pathId) => (
                      <span
                        key={pathId}
                        className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600"
                      >
                        {PATH_TAG[pathId]}
                      </span>
                    ))
                  )}
                </span>
              </span>
              <Icon
                name="arrow_forward"
                className={cn(
                  "shrink-0 scale-75 transition-[translate,opacity] duration-300 group-hover:translate-x-0.5",
                  isOpenInvite ? "text-white" : "text-slate-300 group-hover:text-brand",
                )}
              />
            </>
          );
          const className = cn(
            "group flex h-full items-center gap-4 rounded-3xl p-4 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark sm:p-5",
            isOpenInvite ? "text-white" : "liquid-glass-card glass-lift",
          );
          const style = isOpenInvite
            ? {
                background: BRAND_GRADIENT,
                borderRadius: "24px",
                boxShadow: "0 20px 40px -18px rgba(2, 132, 199, 0.55)",
              }
            : { borderRadius: "24px" };
          return (
            <li
              key={audience.label}
              className={cn(
                "reveal",
                index % 3 === 1 && "reveal-delay-1",
                index % 3 === 2 && "reveal-delay-2",
              )}
            >
              {href ? (
                <a href={href} className={className} style={style}>
                  {content}
                </a>
              ) : (
                <Link href={partnershipContactHref()} className={className} style={style}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </PartnersSection>
  );
}

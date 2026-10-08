import Link from "next/link";

import { AmbientBackdrop } from "@/components/layout/ambient-backdrop";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  IntakeHero,
  IntakeHeroBackdrop,
  type IntakeHighlight,
} from "@/components/support-intake/intake-hero";
import { IntakeSection, type IntakeGuidance } from "@/components/support-intake/intake-section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/report",
  title: "Report a Problem | UrShop",
  description:
    "Something not working in UrShop? Report a bug or a problem with orders, products, couriers or billing. No account needed.",
});

const HIGHLIGHTS: ReadonlyArray<IntakeHighlight> = [
  { icon: "person_off", label: "No account needed" },
  { icon: "schedule", label: "About a minute" },
  { icon: "support_agent", label: "Read by our team" },
];

const GUIDANCE: ReadonlyArray<IntakeGuidance> = [
  { icon: "bug_report", title: "What happened", body: "The error or behaviour you saw." },
  { icon: "fact_check", title: "What you expected", body: "What should have happened instead." },
  { icon: "route", title: "How to repeat it", body: "The steps, and the page it happened on." },
];

export default function ReportPage() {
  return (
    <div className="relative overflow-x-clip bg-[#FAFBFD] text-slate-900 selection:bg-brand-light selection:text-brand-dark">
      <AmbientBackdrop />
      <IntakeHeroBackdrop />

      <SiteHeader />

      <main className="relative z-10 w-full pt-[116px]">
        <IntakeHero
          eyebrow="Report"
          title={
            <>
              Something not <span className="cyan-underline px-1">right</span>?
            </>
          }
          intro="Tell us what happened. We'll take it from here."
          highlights={HIGHLIGHTS}
        />
        <IntakeSection
          kind="report"
          label="Report a problem"
          guidanceHeading="Quick tips"
          guidance={GUIDANCE}
          note={
            <>
              Have an idea instead?{" "}
              <Link
                href="/feature-request"
                className="font-semibold text-brand-dark underline underline-offset-4"
              >
                Request a feature
              </Link>
            </>
          }
        />
      </main>

      <SiteFooter />
    </div>
  );
}

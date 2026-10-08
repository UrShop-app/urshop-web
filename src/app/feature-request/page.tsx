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
  path: "/feature-request",
  title: "Request a Feature | UrShop",
  description:
    "Have an idea for UrShop? Tell us the problem you want solved and what UrShop should do. No account needed.",
});

const HIGHLIGHTS: ReadonlyArray<IntakeHighlight> = [
  { icon: "person_off", label: "No account needed" },
  { icon: "schedule", label: "About a minute" },
  { icon: "lightbulb", label: "We read every idea" },
];

const GUIDANCE: ReadonlyArray<IntakeGuidance> = [
  { icon: "lightbulb", title: "The problem", body: "What's hard to do in UrShop today?" },
  { icon: "group", title: "Who it's for", body: "Merchants, staff or shoppers, and how often." },
  { icon: "auto_awesome", title: "Your idea", body: "How you'd like it to work." },
];

export default function FeatureRequestPage() {
  return (
    <div className="relative overflow-x-clip bg-[#FAFBFD] text-slate-900 selection:bg-brand-light selection:text-brand-dark">
      <AmbientBackdrop />
      <IntakeHeroBackdrop />

      <SiteHeader />

      <main className="relative z-10 w-full pt-[116px]">
        <IntakeHero
          eyebrow="Feature request"
          title={
            <>
              Got an <span className="cyan-underline px-1">idea</span>?
            </>
          }
          intro="Tell us what would make UrShop better for you."
          highlights={HIGHLIGHTS}
        />
        <IntakeSection
          kind="feature-request"
          label="Request a feature"
          guidanceHeading="Quick tips"
          guidance={GUIDANCE}
          note={
            <>
              Something broken?{" "}
              <Link
                href="/report"
                className="font-semibold text-brand-dark underline underline-offset-4"
              >
                Report a problem
              </Link>
            </>
          }
        />
      </main>

      <SiteFooter />
    </div>
  );
}

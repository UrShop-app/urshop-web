import { partnershipPath } from "@/data/partners";

import { AgencyDemo } from "./agency-demo";
import { FinePrint, PartnersSection, PillLink, partnershipContactHref } from "./kit";

/** Agency partners: building and running client stores on UrShop. */
export function AgencySection() {
  const path = partnershipPath("agency");
  return (
    <PartnersSection
      id="agency"
      eyebrow="Agency partners"
      title="Build client stores on UrShop"
      intro="Your clients get a full store. You keep the relationship and the recurring work."
    >
      <div className="reveal reveal-delay-1">
        <AgencyDemo />
      </div>
      <div className="reveal mt-8 flex flex-col items-center gap-4">
        <FinePrint>Each client has their own store. {path.terms}</FinePrint>
        <PillLink href={partnershipContactHref(path.contactSubject)}>
          Talk agency partnership
        </PillLink>
      </div>
    </PartnersSection>
  );
}

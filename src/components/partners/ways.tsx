import { partnershipPaths } from "@/data/partners";

import { PartnersSection } from "./kit";
import { PathExplorer } from "./path-explorer";

/** "Choose how we work together": every partnership path and its business model. */
export function WaysToPartner() {
  return (
    <PartnersSection
      id="ways"
      eyebrow="Ways to partner"
      title="Choose how we work together"
      intro="Five ways to grow with UrShop."
    >
      <div className="reveal reveal-delay-1">
        <PathExplorer paths={partnershipPaths} />
      </div>
    </PartnersSection>
  );
}

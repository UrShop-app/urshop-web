/**
 * Partnership paths for the /partners page.
 *
 * Rules for editors:
 * - These are commercial relationships, not product features. Never describe a partner program
 *   feature (agency console, multi-client billing, white-label admin, referral dashboard,
 *   tracking links, automatic attribution or payouts) unless it exists and `features.ts` says so.
 * - No commission or margin percentages, payout schedules, cookie windows, minimum payouts,
 *   exclusivity, territory, equity or franchise promises. Terms are agreed per partnership.
 * - Never name or hint at a specific private partnership or its terms.
 * - Product capabilities mentioned here must be live in `src/data/features.ts`.
 * - Keep copy short: the page shows these as labels, not paragraphs.
 */

import type { IconName } from "@/components/ui/icon";

export type PartnershipPathId = "referral" | "agency" | "regional" | "technology" | "software";

export type PartnershipPath = {
  id: PartnershipPathId;
  /** What the visitor would do, as a selector label: "Refer businesses". */
  action: string;
  /** Name of the relationship: "Referral Partner". */
  partnerType: string;
  icon: IconName;
  /** One short line: the proposition. */
  headline: string;
  /** What the partner contributes (two or three words each). */
  partnerBrings: ReadonlyArray<string>;
  /** What UrShop contributes (two or three words each). */
  urshopBrings: ReadonlyArray<string>;
  /** What the partnership creates. */
  outcome: string;
  /** How the commercial side works, without inventing terms. */
  terms: string;
  /** Id of the page section that tells this path's full story. */
  sectionId: string;
  /** Pre-filled subject when the visitor contacts us about this path. */
  contactSubject: string;
};

export const partnershipPaths: ReadonlyArray<PartnershipPath> = [
  {
    id: "referral",
    action: "Refer businesses",
    partnerType: "Referral Partner",
    icon: "share",
    headline: "Introduce businesses that should sell with UrShop",
    partnerBrings: ["Introductions", "Your network", "Trust"],
    urshopBrings: ["Sales conversation", "Store setup", "The platform"],
    outcome: "New merchants",
    terms: "Referral terms are agreed with our team.",
    sectionId: "referral",
    contactSubject: "Referral partnership",
  },
  {
    id: "agency",
    action: "Build for clients",
    partnerType: "Agency Partner",
    icon: "work",
    headline: "Build and run client stores on UrShop",
    partnerBrings: ["Clients", "Design & setup", "Marketing & support"],
    urshopBrings: ["Storefront & checkout", "Themes & pages", "Integrations"],
    outcome: "Recurring client work",
    terms: "Terms are agreed per agency. No fixed public margins.",
    sectionId: "agency",
    contactSubject: "Agency partnership",
  },
  {
    id: "regional",
    action: "Bring UrShop to your market",
    partnerType: "Regional Partner",
    icon: "public",
    headline: "Take the UrShop model to a new market",
    partnerBrings: ["Local market", "Sales & marketing", "Merchant network"],
    urshopBrings: ["Core platform", "Engineering", "Local adaptations"],
    outcome: "A joint market",
    terms: "Structure and scope are agreed case by case.",
    sectionId: "regional",
    contactSubject: "Regional partnership",
  },
  {
    id: "technology",
    action: "Integrate your technology",
    partnerType: "Technology Partner",
    icon: "hub",
    headline: "Connect your product with UrShop merchants",
    partnerBrings: ["Your product", "Your API", "Your expertise"],
    urshopBrings: ["Integration work", "Merchant reach", "The platform"],
    outcome: "A new integration",
    terms: "Each integration is scoped on its own.",
    sectionId: "technology",
    contactSubject: "Technology partnership",
  },
  {
    id: "software",
    action: "Build custom software",
    partnerType: "Software Partner",
    icon: "code",
    headline: "Build custom software with our team",
    partnerBrings: ["The problem", "Domain knowledge", "Your clients"],
    urshopBrings: ["Engineering team", "Apps & APIs", "AI automation"],
    outcome: "Software that fits",
    terms: "Scope and terms depend on the work.",
    sectionId: "software",
    contactSubject: "Custom software partnership",
  },
];

export function partnershipPath(id: PartnershipPathId): PartnershipPath {
  const path = partnershipPaths.find((item) => item.id === id);
  if (!path) throw new Error(`Partners: unknown partnership path "${id}".`);
  return path;
}

/** "Who should talk to us?" Each audience points at the paths that usually suit it. */
export type PartnerAudience = {
  label: string;
  icon: IconName;
  /** Empty for "anyone with a concrete proposal". */
  paths: ReadonlyArray<PartnershipPathId>;
};

export const partnerAudiences: ReadonlyArray<PartnerAudience> = [
  { label: "Ecommerce & digital agencies", icon: "storefront", paths: ["agency", "software"] },
  { label: "Marketing agencies", icon: "campaign", paths: ["agency", "referral"] },
  { label: "Consultants", icon: "lightbulb", paths: ["referral", "agency"] },
  { label: "Developers", icon: "terminal", paths: ["agency", "software"] },
  { label: "Regional operators", icon: "public", paths: ["regional"] },
  { label: "SaaS companies", icon: "api", paths: ["technology"] },
  { label: "Payment & logistics providers", icon: "local_shipping", paths: ["technology"] },
  { label: "Businesses needing custom software", icon: "code", paths: ["software"] },
  { label: "Anyone with a concrete proposal", icon: "handshake", paths: [] },
];

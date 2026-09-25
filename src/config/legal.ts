/**
 * UrShop's platform legal documents (the UrShop ↔ merchant/account relationship). This site is
 * their canonical home: the admin dashboard and other UrShop surfaces link to these paths on
 * `siteConfig.url` instead of keeping their own copies. Merchant storefront policies for shoppers
 * are separate and don't belong here.
 *
 * The paths are public contracts (OAuth consent screens, Facebook Login's data-deletion URL,
 * app-store listings), so never rename them.
 */
export const legalDocuments = {
  privacyPolicy: {
    path: "/privacy-policy",
    title: "Privacy Policy",
    navLabel: "Privacy Policy",
    description:
      "Privacy Policy for UrShop — how we handle customer, merchant, authentication, and storefront data across the UrShop platform.",
    lastUpdated: "2026-06-15",
  },
  terms: {
    path: "/terms",
    title: "Terms of Service",
    navLabel: "Terms of Service",
    description:
      "Terms of Service for using UrShop, the ecommerce platform powering merchant storefronts.",
    lastUpdated: "2026-06-15",
  },
  dataDeletion: {
    path: "/data-deletion",
    title: "Data Deletion Instructions",
    navLabel: "Data Deletion",
    description:
      "How to request deletion of customer account data connected to Facebook Login or other customer login methods on UrShop-powered storefronts.",
    lastUpdated: "2026-06-15",
  },
} as const satisfies Record<string, LegalDocument>;

export type LegalDocument = {
  path: `/${string}`;
  /** Page heading and metadata title. */
  title: string;
  /** Shorter label for navigation (footer, document switcher). */
  navLabel: string;
  description: string;
  /** ISO date (YYYY-MM-DD) shown as "Last updated". */
  lastUpdated: string;
};

/** Display order for navigation. */
export const legalDocumentList: ReadonlyArray<LegalDocument> = [
  legalDocuments.privacyPolicy,
  legalDocuments.terms,
  legalDocuments.dataDeletion,
];

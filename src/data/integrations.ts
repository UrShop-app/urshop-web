/**
 * Public integration inventory for the /integrations page.
 *
 * Rules for editors:
 * - `src/data/features.ts` is the canonical source. Link each entry to its feature with
 *   `featureId`; the check at the bottom fails the build if an entry is shown as more available
 *   than its feature (a coming-soon feature listed as connectable, for example).
 * - "connect": usable today by connecting the merchant's own account or settings.
 * - "per-store": exists, but is switched on per store.
 * - "coming-later": not available yet. Never show these next to live integrations, and never
 *   give them dates.
 * - No setup times, fees, delivery times or performance claims.
 */

import { featureById } from "@/data/features";

export type IntegrationStatus = "connect" | "per-store" | "coming-later";

export type IntegrationGroup = "payments" | "delivery" | "messaging" | "measurement" | "store";

export type Integration = {
  id: string;
  name: string;
  group: IntegrationGroup;
  status: IntegrationStatus;
  /** One short line of public copy. */
  description: string;
  /** The feature in `features.ts` that backs this entry, when there is one. */
  featureId?: string;
};

export const integrationGroupLabels: Readonly<Record<IntegrationGroup, string>> = {
  payments: "Payments",
  delivery: "Delivery",
  messaging: "Messaging",
  measurement: "Measurement",
  store: "Your store",
};

export const integrationStatusLabels: Readonly<
  Record<IntegrationStatus, { title: string; text: string }>
> = {
  connect: {
    title: "Connect your account",
    text: "Available to every store. Connect your own account or domain to switch it on.",
  },
  "per-store": {
    title: "Enabled per store",
    text: "Available, switched on for your store by the UrShop team.",
  },
  "coming-later": {
    title: "Coming later",
    text: "Not available yet.",
  },
};

export const integrations: ReadonlyArray<Integration> = [
  // Connect your own account
  {
    id: "bkash",
    name: "bKash",
    group: "payments",
    status: "connect",
    description: "Online payments into your bKash merchant account, with refunds.",
    featureId: "bkash-payments",
  },
  {
    id: "pathao",
    name: "Pathao",
    group: "delivery",
    status: "connect",
    description: "Book shipments from your orders.",
    featureId: "courier-integrations",
  },
  {
    id: "redx",
    name: "RedX",
    group: "delivery",
    status: "connect",
    description: "Book shipments from your orders.",
    featureId: "courier-integrations",
  },
  {
    id: "steadfast",
    name: "Steadfast",
    group: "delivery",
    status: "connect",
    description: "Book shipments from your orders.",
    featureId: "courier-integrations",
  },
  {
    id: "bulksmsbd",
    name: "BulkSMSBD",
    group: "messaging",
    status: "connect",
    description: "Order SMS and campaigns from your own SMS account.",
    featureId: "sms-marketing",
  },
  {
    id: "email-sender",
    name: "Your email sender",
    group: "messaging",
    status: "connect",
    description: "Send order emails from your own email service.",
    featureId: "merchant-email",
  },
  {
    id: "meta-pixel",
    name: "Meta Pixel",
    group: "measurement",
    status: "connect",
    description: "With the Conversions API.",
    featureId: "ad-pixels",
  },
  {
    id: "tiktok-pixel",
    name: "TikTok Pixel",
    group: "measurement",
    status: "connect",
    description: "With the Events API.",
    featureId: "ad-pixels",
  },
  {
    id: "gtm",
    name: "Google Tag Manager",
    group: "measurement",
    status: "connect",
    description: "Add your container.",
    featureId: "ad-pixels",
  },
  {
    id: "meta-feed",
    name: "Meta product feed",
    group: "measurement",
    status: "connect",
    description: "Keep a Meta catalog in sync with your products.",
    featureId: "seo-foundation",
  },
  {
    id: "custom-domain",
    name: "Your own domain",
    group: "store",
    status: "connect",
    description: "Serve your store on a domain you own.",
    featureId: "custom-domains",
  },

  // Enabled per store
  {
    id: "secure-cod",
    name: "Secure COD",
    group: "payments",
    status: "per-store",
    description: "Delivery charge paid with bKash, the rest in cash.",
    featureId: "cod-payment",
  },
  {
    id: "website-chat",
    name: "Website chat",
    group: "messaging",
    status: "per-store",
    description: "Answer shoppers from a dashboard inbox.",
    featureId: "store-chat",
  },
  {
    id: "abandoned-sms",
    name: "Abandoned-checkout SMS",
    group: "messaging",
    status: "per-store",
    description: "Win back checkouts that weren't finished.",
    featureId: "abandoned-checkout",
  },

  // Coming later (bkash-payments.limitations lists the payment methods as coming soon)
  { id: "nagad", name: "Nagad", group: "payments", status: "coming-later", description: "" },
  { id: "rocket", name: "Rocket", group: "payments", status: "coming-later", description: "" },
  {
    id: "cards",
    name: "Card payments",
    group: "payments",
    status: "coming-later",
    description: "",
  },
  {
    id: "bank-transfer",
    name: "Bank transfer",
    group: "payments",
    status: "coming-later",
    description: "",
  },
  {
    id: "meta-messaging",
    name: "Facebook, Instagram & WhatsApp messaging",
    group: "messaging",
    status: "coming-later",
    description: "",
    featureId: "meta-messaging",
  },
];

export function integrationsByStatus(status: IntegrationStatus): ReadonlyArray<Integration> {
  return integrations.filter((integration) => integration.status === status);
}

// Never show an integration as more available than the feature behind it.
for (const integration of integrations) {
  if (!integration.featureId) continue;
  const feature = featureById(integration.featureId);
  if (!feature) {
    throw new Error(`Integrations: unknown feature "${integration.featureId}".`);
  }
  const allowed: ReadonlyArray<IntegrationStatus> =
    feature.availabilityStatus === "coming-soon"
      ? ["coming-later"]
      : feature.availabilityStatus === "gated"
        ? ["per-store", "coming-later"]
        : ["connect", "per-store"];
  if (!allowed.includes(integration.status)) {
    throw new Error(
      `Integrations: "${integration.id}" is "${integration.status}" but feature "${feature.id}" is "${feature.availabilityStatus}".`,
    );
  }
}

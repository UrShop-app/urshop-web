export const siteConfig = {
  name: "UrShop",
  /**
   * Canonical production origin, used for every absolute URL in metadata, robots and the
   * sitemap. Deliberately a constant rather than derived from the request or deployment, so
   * preview and local builds never advertise their own host as canonical.
   */
  url: "https://urshop.app",
  description:
    "The simplest way for Bangladeshi shops and creators to sell products online: bKash & Nagad payouts, automated Pathao, Steadfast and RedX delivery, and a clean checkout page.",
  supportEmail: "support@urshop.app",
} as const;

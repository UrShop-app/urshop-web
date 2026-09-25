/**
 * Canonical merchant-feature inventory for the future UrShop public Features page.
 *
 * Researched from the current production codebase across:
 * - `urshop-backend` (Fastify + Prisma API, source of truth for what is enforced)
 * - `Ecommerce-admin` (merchant dashboard, source of truth for what merchants can do)
 * - `Ecommerce-with-sanity` (customer storefront, source of truth for shopper-facing results)
 *
 * Rules for future editors:
 * - Only list capabilities supported by the current codebase. Do not market
 *   TODOs, `coming_soon` hub cards, or platform-gated flags merchants cannot use.
 * - `sources` are repo-relative module/file paths for verification, not copied code.
 * - Keep copy factual. No invented statistics, performance claims, or AI hype.
 * - Retrieval fields (`aliases`, `keywords`) aid search/chatbot matching only:
 *   keep them short, factual, and free of marketing language or stuffing.
 * - `availabilityStatus` is the machine-readable rollout state; `availability.detail`
 *   keeps the human-readable condition. Never mark a feature `live` from code
 *   existence alone — it must be usable by a merchant today.
 * - Every feature carries `lastVerifiedAt` so retrieved chunks stay trustworthy.
 */

export type FeatureCategoryId =
  | "store-setup"
  | "design"
  | "pages"
  | "catalog"
  | "discovery"
  | "checkout"
  | "promotions"
  | "customers"
  | "shipping"
  | "payments"
  | "insights"
  | "marketing"
  | "infrastructure"
  | "operations";

export type FeatureCategory = {
  id: FeatureCategoryId;
  /** Section heading for the future Features page. */
  title: string;
  /** One-line factual scope of the category. */
  summary: string;
};

export type SourceRepo = "backend" | "admin" | "storefront";

export type FeatureSource = {
  repo: SourceRepo;
  /** Repo-relative file or module path that proves the claim. */
  path: string;
};

export type FeatureAvailability = {
  status: "available" | "conditional" | "platform-gated";
  /**
   * Plain-language condition, e.g. "needs the merchant's own courier
   * credentials" or "enabled by the platform per store".
   */
  detail: string;
};

/**
 * Machine-readable rollout state for retrieval and AI answers:
 * - "live": usable by any merchant today (normal self-setup such as entering
 *   their own courier or bKash credentials still counts as live).
 * - "limited": usable, but with a material scope constraint (single provider,
 *   two locales only, phase-1, manual billing, gated sub-capability).
 * - "gated": needs platform/super-admin enablement per store.
 * - "coming-soon": announced or visible in UI but not yet rolled out.
 */
export type AvailabilityStatus = "live" | "limited" | "gated" | "coming-soon";

/** Who primarily uses or experiences the feature. */
export type FeatureAudience = "merchant" | "staff" | "shopper";

/**
 * ISO date (YYYY-MM-DD) of the inspection pass that last verified the whole
 * inventory. One shared value — never invent per-feature historical dates.
 */
export const FEATURES_LAST_VERIFIED_AT = "2026-09-25";

export type MerchantFeature = {
  /** Stable kebab-case id for links and analytics. Never rename once shipped. */
  id: string;
  name: string;
  /** Natural alternative names merchants or shoppers may use. Retrieval only. */
  aliases?: string[];
  /** Search terms (product/implementation vocabulary). Retrieval only, no stuffing. */
  keywords?: string[];
  category: FeatureCategoryId;
  /** Concise factual summary of what the merchant gets. */
  summary: string;
  /** The merchant problem this solves / job it does. */
  benefit: string;
  /** Notable sub-capabilities actually implemented. */
  capabilities: string[];
  /** What shoppers see on the storefront, where applicable. */
  storefrontResult?: string;
  availability: FeatureAvailability;
  /** Machine-readable rollout state; see {@link AvailabilityStatus}. */
  availabilityStatus: AvailabilityStatus;
  /** Who primarily uses or experiences the feature. Never empty. */
  audiences: FeatureAudience[];
  /** Inspection-pass date this entry was last verified against the codebase. */
  lastVerifiedAt: string;
  sources: FeatureSource[];
  /** Limitations that prevent overstating the feature. */
  limitations?: string;
  /** Genuinely central to the UrShop pitch. Not a ranking. */
  core?: boolean;
  /** Ids of closely related features for "related features" UI. */
  relatedIds?: string[];
};

export const featureCategories: readonly FeatureCategory[] = [
  {
    id: "store-setup",
    title: "Store setup & branding",
    summary: "Getting a shop online: setup flow, brand identity, languages, and policies.",
  },
  {
    id: "design",
    title: "Themes & customization",
    summary: "Preset themes, visual customization, safe preview, and fast mobile-first rendering.",
  },
  {
    id: "pages",
    title: "Pages, navigation & content",
    summary: "Custom landing pages, homepage merchandising, navigation, footer, and blog.",
  },
  {
    id: "catalog",
    title: "Products, catalog & inventory",
    summary: "Products, variants, media, categories, brands, and stock control.",
  },
  {
    id: "discovery",
    title: "Search & discovery",
    summary: "Storefront search, filters, sorting, synonyms, and product recommendations.",
  },
  {
    id: "checkout",
    title: "Cart, checkout & orders",
    summary: "Persistent cart, guest checkout, order management, tracking, and recovery.",
  },
  {
    id: "promotions",
    title: "Coupons & promotions",
    summary: "Discount codes, promo popups, banners, and announcement bar.",
  },
  {
    id: "customers",
    title: "Customers & engagement",
    summary: "Customer records, storefront accounts, wishlist, reviews, and newsletter.",
  },
  {
    id: "shipping",
    title: "Delivery & couriers",
    summary: "Courier integrations and delivery charge configuration.",
  },
  {
    id: "payments",
    title: "Payments",
    summary: "Cash on delivery and bKash online payments with refunds.",
  },
  {
    id: "insights",
    title: "Analytics & insights",
    summary: "Sales dashboards, product analytics, AI reports, and courier fraud checks.",
  },
  {
    id: "marketing",
    title: "Marketing & integrations",
    summary: "SMS and email, ad pixels, chat, and social messaging connections.",
  },
  {
    id: "infrastructure",
    title: "Domains & infrastructure",
    summary: "Custom domains, DNS, SEO foundations, and media delivery.",
  },
  {
    id: "operations",
    title: "Plans, team & operations",
    summary: "Subscriptions, staff permissions, wholesale, and merchant support.",
  },
];

export const features: readonly MerchantFeature[] = [
  // ---------------------------------------------------------------- store-setup
  {
    id: "guided-setup",
    name: "Guided store setup",
    aliases: ["onboarding", "store setup", "getting started"],
    keywords: ["region preset", "launch checklist", "help guides"],
    availabilityStatus: "live",
    audiences: ["merchant"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "store-setup",
    summary:
      "Create a store with profile, region defaults, and an onboarding checklist that walks merchants through launch.",
    benefit:
      "New sellers can open a working shop without technical setup or guesswork about what to configure first.",
    capabilities: [
      "Store profile with name, slug, and avatar upload",
      "Bangladesh region preset: country, currency (BDT/Tk), timezone, phone and address format",
      "First-run onboarding stages covering profile, social links, and launch",
      "Bilingual (English/Bangla) admin guidance and help articles",
    ],
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/storesAdmin/service.ts" },
      { repo: "backend", path: "src/modules/regionConfig/presets.ts" },
      { repo: "admin", path: "src/features/onboarding/index.ts" },
      { repo: "admin", path: "src/features/help/index.ts" },
    ],
    limitations:
      "Only the Bangladesh (BD) region preset exists; multi-country selling would need new presets.",
    core: true,
    relatedIds: ["branding", "localization", "preset-themes"],
  },
  {
    id: "branding",
    name: "Branding & contact identity",
    aliases: ["brand identity", "store logo", "logo"],
    keywords: ["favicon", "brand colors", "corner radius"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "store-setup",
    summary:
      "Set the shop's brand name, logo, favicon, contact details, brand colors, and corner radius from one settings page.",
    benefit: "The storefront looks like the merchant's own shop, not a generic template.",
    capabilities: [
      "Brand name, logo and favicon uploads",
      "Address, email, and phone contact details",
      "Primary and secondary brand colors plus corner-radius control",
    ],
    storefrontResult:
      "Logo, brand colors, and contact details appear in the header, footer, and invoices.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "admin", path: "src/app/(dashboard)/storefront/branding-contact/page.tsx" },
      { repo: "backend", path: "src/modules/storefrontCms/service.ts" },
    ],
    core: true,
    relatedIds: ["preset-themes", "theme-customizer", "site-navigation"],
  },
  {
    id: "localization",
    name: "Bangla & English storefront",
    aliases: ["language", "Bangla store", "multi-language", "Bengali"],
    keywords: ["bn", "en", "locale", "taka", "BDT", "language switcher"],
    availabilityStatus: "limited",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "store-setup",
    summary:
      "Every storefront serves both Bangla (default) and English, with locale-prefixed URLs and a shopper language switcher.",
    benefit: "Merchants serve Bangla- and English-speaking shoppers from a single catalog.",
    capabilities: [
      "Bangla (bn, default) and English (en) storefront locales",
      "Language switcher in the storefront header",
      "Taka currency formatting and locale-aware dates",
      "Per-locale SEO metadata",
    ],
    storefrontResult:
      "Shoppers toggle between Bangla and English; URLs are prefixed per locale (e.g. /bn, /en).",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "storefront", path: "i18n/routing.ts" },
      { repo: "storefront", path: "messages/en.json" },
      { repo: "storefront", path: "messages/bn.json" },
      { repo: "backend", path: "src/config/storefrontLocales.ts" },
    ],
    limitations:
      "Exactly two locales (bn, en). Every storefront string must exist in both; no per-store third language.",
    relatedIds: ["guided-setup", "seo-foundation"],
  },
  {
    id: "checkout-fields",
    name: "Configurable checkout fields",
    aliases: ["checkout form", "checkout customization"],
    keywords: ["checkout fields", "address hierarchy", "division", "district", "upazila"],
    availabilityStatus: "live",
    audiences: ["merchant"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "store-setup",
    summary:
      "Choose which customer fields the checkout collects and which are required; name, mobile, and full address are always required.",
    benefit:
      "Merchants collect exactly the delivery details they need without a one-size-fits-all form.",
    capabilities: [
      "Toggle visibility and required state per checkout field",
      "Cascading Division/District/Upazila selectors matched to Bangladesh addresses",
      "Bangladesh mobile-number validation and postal-code checks",
      "Unsafe combinations are rejected (a field can only be required when visible)",
    ],
    storefrontResult:
      "Shoppers see a checkout form shaped by the merchant's settings, with address dropdowns that cascade.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "admin", path: "src/app/(dashboard)/storefront/checkout-fields/page.tsx" },
      { repo: "backend", path: "src/modules/storefrontCms/checkoutFields.ts" },
      { repo: "storefront", path: "features/checkout/lib/checkoutFields.ts" },
    ],
    relatedIds: ["guest-checkout", "delivery-rates"],
  },
  {
    id: "store-policies",
    name: "Policy pages",
    aliases: ["terms", "privacy policy", "return policy", "legal pages"],
    keywords: ["privacy", "shipping policy", "refund policy"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "store-setup",
    summary:
      "Maintain terms, privacy, shipping, and return/refund pages as rich text from the dashboard.",
    benefit: "Shoppers find the legal and shipping terms they expect before trusting a new shop.",
    capabilities: [
      "Rich-text editing for terms, privacy, shipping, and return policies",
      "Dedicated storefront pages with sanitized, readable rendering",
    ],
    storefrontResult:
      "Shoppers read policies at /terms-of-service, /privacy-policy, /return-refund-policy, and /shipping.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "admin", path: "src/app/(dashboard)/storefront/policy-pages/page.tsx" },
      { repo: "backend", path: "src/modules/storefrontCms/policyPages.ts" },
      { repo: "storefront", path: "commerce/content/loadPolicyPage.server.ts" },
    ],
    relatedIds: ["site-navigation", "guest-checkout"],
  },
  {
    id: "contact-inbox",
    name: "Contact form & inbox",
    aliases: ["contact form", "contact us", "inquiries"],
    keywords: ["contact", "inbox", "inquiry triage"],
    availabilityStatus: "live",
    audiences: ["merchant", "staff", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "store-setup",
    summary:
      "A storefront contact form feeds a dashboard inbox where merchants triage inquiries as New, Read, or Resolved.",
    benefit:
      "Shoppers can reach the shop directly, and merchants never lose an inquiry in social DMs.",
    capabilities: [
      "Rate-limited public contact form on the storefront",
      "Dashboard inbox with New/Read/Resolved workflow",
    ],
    storefrontResult: "Shoppers send inquiries from the /contact page.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/contactInquiries/handlers.public.ts" },
      { repo: "backend", path: "src/modules/contactInquiries/handlers.admin.ts" },
      { repo: "admin", path: "src/features/contact-messages/index.ts" },
    ],
    relatedIds: ["store-chat", "customer-crm"],
  },

  // -------------------------------------------------------------------- design
  {
    id: "preset-themes",
    name: "Preset storefront themes",
    aliases: ["themes", "store theme", "website template"],
    keywords: ["classic", "aura", "theme family", "revisions", "rollback", "draft"],
    availabilityStatus: "limited",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "design",
    summary:
      "Pick from coded theme families (Classic and Aura) with draft editing, publishing, rollback, and immutable revisions.",
    benefit:
      "Merchants get a professionally designed shop they can switch and restyle without a designer.",
    capabilities: [
      "Preset theme families with curated defaults (Classic, Aura)",
      "Draft vs live (active) configuration with publish and rollback",
      "Immutable theme revisions with retention",
      "Switching themes preserves homepage choices; unsupported sections are skipped, never deleted",
    ],
    storefrontResult:
      "The whole shop renders in the active theme family; an unknown theme falls back to Classic so the shop never breaks.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/storefrontThemes/catalog.ts" },
      { repo: "backend", path: "src/modules/storefrontThemes/familyRegistry.ts" },
      { repo: "admin", path: "src/app/(dashboard)/storefront/themes/page.tsx" },
      { repo: "storefront", path: "storefront/runtime/contracts.ts" },
    ],
    limitations:
      "Two production theme families (Classic, Aura). Merchants cannot upload custom CSS, JS, or components.",
    core: true,
    relatedIds: ["theme-customizer", "theme-preview", "page-builder"],
  },
  {
    id: "theme-customizer",
    name: "Visual theme customizer",
    aliases: ["theme editor", "customize theme", "store designer"],
    keywords: ["customizer", "typography", "density", "homepage sections", "component variants"],
    availabilityStatus: "limited",
    audiences: ["merchant"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "design",
    summary:
      "Customize colors, typography, density, component variants, and homepage sections in a live editor that embeds the real storefront.",
    benefit:
      "Merchants see exactly what shoppers will see while restyling the shop — no preview-site mismatch.",
    capabilities: [
      "Brand colors, typography from an allowlisted font set, corner radius, and spacing density",
      "Header, footer, product-card, product-detail, and collection-grid variants",
      "Homepage section plan (hero, trust bar, promos, category grid, featured, best sellers, new arrivals, brands, testimonials, call-to-action, blogs, contact) up to 20 sections",
      "Desktop, tablet, and mobile preview sizes in editor, split, and full-preview modes",
    ],
    storefrontResult:
      "Merchant styling choices render store-wide on every page of the active theme.",
    availability: {
      status: "available",
      detail: "Available to every merchant; publishing needs the publish permission.",
    },
    sources: [
      { repo: "admin", path: "src/features/storefront-themes/index.ts" },
      { repo: "admin", path: "docs/storefront-themes/admin.md" },
      { repo: "backend", path: "src/modules/storefrontThemes/service.ts" },
    ],
    limitations:
      "Typography is limited to the fonts each theme family declares (Classic supports the system font; Aura supports ~20).",
    core: true,
    relatedIds: ["preset-themes", "theme-preview", "homepage-merchandising"],
  },
  {
    id: "theme-preview",
    name: "Theme preview & safe publishing",
    aliases: ["preview theme", "draft preview", "share preview"],
    keywords: ["preview session", "preview token", "revision conflict"],
    availabilityStatus: "live",
    audiences: ["merchant"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "design",
    summary:
      "Preview unpublished theme changes in an isolated session — including a shareable view link — with cart and checkout disabled so test sessions never take orders.",
    benefit: "Merchants can review and share a redesign safely before it goes live to shoppers.",
    capabilities: [
      "Private preview sessions with short-lived tokens",
      "Shareable view-only preview links (tokens must not be logged or stored)",
      "Preview covers homepage, product, and category pages",
      "Publish and rollback create immutable revisions; edit conflicts surface instead of silently overwriting",
    ],
    storefrontResult:
      "Reviewers see the draft theme at a preview URL; cart and checkout are blocked inside preview.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/storefrontThemes/previewToken.ts" },
      { repo: "backend", path: "src/modules/storefrontThemes/handlers.public.ts" },
      { repo: "storefront", path: "app/[locale]/(preview)/theme-preview/s/[sessionId]/page.tsx" },
      { repo: "storefront", path: "commerce/preview/previewMode.ts" },
    ],
    relatedIds: ["preset-themes", "theme-customizer"],
  },
  {
    id: "responsive-storefront",
    name: "Mobile-first responsive storefront",
    aliases: ["mobile store", "mobile-friendly", "responsive design"],
    keywords: ["mobile", "responsive", "bottom tab bar", "navigation drawer"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "design",
    summary:
      "Every storefront is mobile-first: mobile top bar, navigation drawer, bottom tab bar, and grids that scale from 2 columns on phones to multi-column on desktop.",
    benefit:
      "The majority of shoppers — on phones — get a purpose-built mobile experience, not a shrunk desktop page.",
    capabilities: [
      "Mobile top bar with search, slide-in navigation drawer, and bottom tab bar",
      "Collapsible filter drawer on mobile, sidebar on desktop",
      "Product grids from 2 columns on mobile up to 5–6 on large screens",
      "Sticky mobile cart summary and responsive hero and promo imagery",
    ],
    storefrontResult:
      "Shoppers get touch-friendly navigation, search, filters, and checkout on any screen size.",
    availability: { status: "available", detail: "Available to every storefront automatically." },
    sources: [
      { repo: "storefront", path: "storefront/families/classic/shell/ClassicMobileNav.tsx" },
      { repo: "storefront", path: "storefront/families/classic/shell/ClassicMobileTopBar.tsx" },
      { repo: "storefront", path: "storefront/families/classic/pages/ClassicProductListPage.tsx" },
    ],
    relatedIds: ["preset-themes", "media-optimization"],
  },
  {
    id: "media-optimization",
    name: "Image framing & optimization",
    aliases: ["image optimization", "fast images", "CDN images"],
    keywords: ["AVIF", "WebP", "blur placeholder", "CDN", "media framing"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "design",
    summary:
      "Product and theme imagery is served optimized — modern formats, blur placeholders, skeletons with fade-in, and CDN caching under merchant-safe rules.",
    benefit: "Shop pages load fast and look polished even on slow mobile connections.",
    capabilities: [
      "Modern image formats (AVIF/WebP) with long cache lifetimes",
      "Blur placeholders and skeleton-to-fade loading states",
      "Per-theme-family media framing contracts so crops stay consistent",
      "Tenant-scoped uploads with CDN delivery; remote images limited to an allowlist",
    ],
    availability: { status: "available", detail: "Available to every storefront automatically." },
    sources: [
      { repo: "storefront", path: "components/storefront/StorefrontImage.tsx" },
      { repo: "storefront", path: "next.config.ts" },
      { repo: "backend", path: "src/modules/uploads/service.ts" },
      { repo: "backend", path: "docs/platform/media-cache-contract.md" },
    ],
    limitations: "Popup and remote images outside the allowlist are rejected rather than rendered.",
    relatedIds: ["product-media", "responsive-storefront"],
  },

  // --------------------------------------------------------------------- pages
  {
    id: "page-builder",
    name: "Page builder",
    aliases: ["landing pages", "custom pages", "page editor"],
    keywords: ["blocks", "landing page", "countdown", "FAQ block", "product grid"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "pages",
    summary:
      "Build custom landing and content pages from content and commerce blocks — heroes, product grids, countdowns, FAQs, galleries, videos, testimonials, and more — with draft, publish, and revision history.",
    benefit:
      "Merchants create campaign and brand pages themselves instead of paying a developer per page.",
    capabilities: [
      "Block library covering hero, rich text, image-and-text, calls-to-action, product grids, featured products, countdowns, FAQs, video, gallery, bundles, tables, and contact sections",
      "Per-block sensible limits (e.g. product and FAQ counts)",
      "Draft and published revisions with restore, duplicate, and preview links",
      "Pages can be assigned as the homepage for a locale and injected into navigation and footer",
      "SEO controls including noindex per page",
    ],
    storefrontResult:
      "Shoppers browse merchant-built pages at clean URLs, rendered with the shop's palette and typography.",
    availability: {
      status: "available",
      detail: "Available to every merchant; publishing needs the publish permission.",
    },
    sources: [
      { repo: "admin", path: "src/features/storefront-pages/index.ts" },
      { repo: "backend", path: "src/modules/storefrontBuilderPages/service.ts" },
      { repo: "storefront", path: "storefront/builder/registry.ts" },
      { repo: "storefront", path: "storefront/builder/StorefrontBuilderPage.tsx" },
    ],
    limitations:
      "Unknown block types are skipped at render so pages stay up. Draft page preview covers the homepage flow.",
    core: true,
    relatedIds: ["preset-themes", "site-navigation", "homepage-merchandising"],
  },
  {
    id: "homepage-merchandising",
    name: "Homepage merchandising",
    aliases: ["homepage", "homepage sections", "front page"],
    keywords: ["hero", "best sellers", "new arrivals", "featured products", "trust bar"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "pages",
    summary:
      "Arrange the homepage from a section plan — hero, trust bar, promo banners, category grids, featured products, best sellers, new arrivals, brands, testimonials, blogs, and calls-to-action.",
    benefit:
      "Merchants control the shop's front window: what shoppers see first and what gets promoted.",
    capabilities: [
      "Enable, order, and configure up to 20 homepage sections",
      "Product sections including featured, best sellers (from real sales stats), and new arrivals",
      "Brand, testimonial, blog, and contact sections that can be switched on per store",
    ],
    storefrontResult:
      "Shoppers land on a merchandised homepage matching the merchant's section plan.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/storefrontThemes/familyRegistry.ts" },
      { repo: "storefront", path: "storefront/families/classic/sections/registry.server.ts" },
    ],
    relatedIds: ["theme-customizer", "page-builder", "promo-banners"],
  },
  {
    id: "site-navigation",
    name: "Navigation & footer controls",
    aliases: ["menu", "navigation menu", "footer", "header"],
    keywords: ["announcement bar", "social links", "marketplace links"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "pages",
    summary:
      "Control the header navigation, announcement bar, footer columns and links, social and marketplace rails, contact channels, and copyright.",
    benefit:
      "Shoppers find products, help, and policies quickly, and the shop looks complete and trustworthy.",
    capabilities: [
      "Header navigation links plus builder pages injected into navbar and footer with ordering",
      "Footer columns, custom links, tagline, and copyright text",
      "Social and marketplace link rails with icon uploads",
      "Contact channels (phone, email, address) shown in header and footer",
    ],
    storefrontResult:
      "Shoppers navigate via the header, mobile drawer, announcement bar, and a full footer with help and legal links.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/storefrontCms/service.ts" },
      { repo: "storefront", path: "commerce/navigation/loadNavigation.server.ts" },
      { repo: "storefront", path: "commerce/footer/footerViewModel.ts" },
      { repo: "admin", path: "src/app/(dashboard)/storefront/footer-social-links/page.tsx" },
    ],
    relatedIds: ["page-builder", "branding", "store-policies"],
  },
  {
    id: "blog",
    name: "Blog & content marketing",
    aliases: ["blog posts", "articles", "news"],
    keywords: ["blog", "scheduled posts", "SEO content", "linked products", "AI drafting"],
    availabilityStatus: "live",
    audiences: ["merchant", "staff", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "pages",
    summary:
      "Publish SEO-friendly articles with categories, scheduling, linked products, and full meta controls — optionally drafted with AI assistance.",
    benefit:
      "Merchants attract search traffic and explain products with content that links directly to items for sale.",
    capabilities: [
      "Posts with locale, category, slug, excerpt, body, thumbnail, and author",
      "Draft, published, and scheduled states with publish scheduling",
      "Product links from articles to the products they mention",
      "SEO controls: titles, meta descriptions, canonical URLs, Open Graph/Twitter cards, and structured data",
      "AI-assisted draft generation (topic, tone, audience, keywords), credit-metered",
    ],
    storefrontResult:
      "Shoppers read articles at /blogs with category pages, related posts, sharing, and JSON-LD structured data.",
    availability: {
      status: "conditional",
      detail: "Blog is available by default; AI drafting needs platform enablement and AI credits.",
    },
    sources: [
      { repo: "backend", path: "src/modules/blog/service.ts" },
      { repo: "backend", path: "src/modules/blog/handlers.admin.ts" },
      { repo: "admin", path: "src/features/blog/index.ts" },
      { repo: "storefront", path: "commerce/blog/loadBlog.server.ts" },
    ],
    relatedIds: ["seo-foundation", "page-builder"],
  },

  // -------------------------------------------------------------------- catalog
  {
    id: "product-management",
    name: "Product catalog management",
    aliases: ["products", "add product", "catalog management", "CSV import"],
    keywords: ["SKU", "CSV", "import", "export", "duplicate", "sale price"],
    availabilityStatus: "live",
    audiences: ["merchant", "staff"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "catalog",
    summary:
      "Create and manage products with pricing, sale prices, SKUs, SEO, warranty, dimensions, delivery overrides, offer countdowns, and bulk CSV import/export plus duplication.",
    benefit:
      "Merchants run their whole catalog — from a handful of items to large imports — in one place.",
    capabilities: [
      "Full product create, edit, status, featured flags, delete, and duplicate (with image copy option)",
      "Pricing with previous-price sale display, per-product delivery-charge override, and offer countdowns",
      "SEO fields, warranty, weight, and dimensions per product",
      "CSV template, validation, import with idempotency, and export of selected, filtered, or all products",
      "Product list with text search, category, brand, availability, sale, featured, rating, price, and sort filters",
    ],
    storefrontResult:
      "Shoppers browse accurate product pages with prices, sale badges, countdowns, specs, and delivery information.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/products/service.ts" },
      { repo: "backend", path: "src/modules/products/csv.ts" },
      { repo: "admin", path: "src/features/products/client.ts" },
      { repo: "storefront", path: "commerce/products/loadProductDetail.server.ts" },
    ],
    core: true,
    relatedIds: ["product-variants", "product-media", "categories-brands", "inventory-control"],
  },
  {
    id: "product-variants",
    name: "Product variants & options",
    aliases: ["variants", "options", "product options", "size and color"],
    keywords: ["optionsJson", "price delta", "option stock", "swatches"],
    availabilityStatus: "limited",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "catalog",
    summary:
      "Sell product options such as size or color, each with its own price adjustment, stock, and image.",
    benefit:
      "One product listing covers all its options instead of fragmenting into many duplicate listings.",
    capabilities: [
      "Named options (e.g. Size, Color) with values carrying price deltas, stock, and images",
      "Per-option-value stock tracked alongside the main product stock",
      "CSV import validates option structures before anything is written",
    ],
    storefrontResult:
      "Shoppers pick options via swatches and selectors; prices and availability update per selection with quick-add on cards.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/products/dto.admin.ts" },
      { repo: "backend", path: "src/modules/inventory/service.ts" },
      { repo: "storefront", path: "commerce/products/productOptions.ts" },
    ],
    limitations:
      "Variants are stored as structured option data on the product, not as separate variant records with their own SKUs and inventory transactions.",
    core: true,
    relatedIds: ["product-management", "inventory-control", "persistent-cart"],
  },
  {
    id: "product-media",
    name: "Product images & videos",
    aliases: ["product images", "product photos", "product video", "gallery"],
    keywords: ["YouTube", "Vimeo", "thumbnail", "poster"],
    availabilityStatus: "limited",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "catalog",
    summary:
      "Attach image galleries plus product videos — either uploaded or embedded from YouTube/Vimeo — with blur placeholders and per-theme framing.",
    benefit:
      "Rich product pages with photos and video build shopper confidence without technical media work.",
    capabilities: [
      "Multiple gallery images plus thumbnail per product",
      "Uploaded videos with posters, or external YouTube/Vimeo embeds (privacy-friendly YouTube embeds)",
      "Blur placeholders and dimension metadata for smooth loading",
      "Secure tenant-scoped uploads served over CDN",
    ],
    storefrontResult:
      "Shoppers see galleries, video players, and fast-loading images on every product page.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/products/service.ts" },
      { repo: "backend", path: "src/modules/uploads/service.ts" },
      { repo: "storefront", path: "commerce/media/externalProductVideo.ts" },
      { repo: "storefront", path: "components/storefront/StorefrontImage.tsx" },
    ],
    limitations:
      "Video playback is external embedding only; there is no hosted video streaming player.",
    relatedIds: ["product-management", "media-optimization"],
  },
  {
    id: "categories-brands",
    name: "Categories & brands",
    aliases: ["categories", "brands", "collections"],
    keywords: ["category tree", "brand logo", "slug history", "reorder"],
    availabilityStatus: "live",
    audiences: ["merchant", "staff", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "catalog",
    summary:
      "Organize the catalog with hierarchical reorderable categories and brand pages with logos.",
    benefit: "Shoppers browse by category or brand instead of scrolling one long product list.",
    capabilities: [
      "Hierarchical categories with parent/child trees, reordering, and slug history for stable links",
      "Brands with logos and dedicated brand views",
      "Delete guards prevent removing categories that are in use or have children",
    ],
    storefrontResult:
      "Shoppers browse category and brand pages with imagery, filters, and stable URLs.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/categories/service.ts" },
      { repo: "backend", path: "src/modules/brands/handlers.admin.ts" },
      { repo: "admin", path: "src/features/categories/model/hierarchy.ts" },
      { repo: "storefront", path: "commerce/categories/categoryMedia.ts" },
    ],
    core: true,
    relatedIds: ["product-management", "storefront-search", "filters-sorting"],
  },
  {
    id: "inventory-control",
    name: "Inventory tracking & low-stock alerts",
    aliases: ["stock", "inventory", "stock management", "low stock"],
    keywords: ["oversell", "reservation", "low-stock", "continue selling"],
    availabilityStatus: "limited",
    audiences: ["merchant", "staff"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "catalog",
    summary:
      "Track stock per product and per option value, block overselling unless explicitly allowed, and get low-stock states for restocking.",
    benefit:
      "Merchants avoid selling what they cannot fulfill while keeping popular items available.",
    capabilities: [
      "Per-product stock with optional tracking toggle and sell-through-when-out-of-stock control",
      "Low-stock threshold states that feed merchant notifications",
      "Order-time reservation so paid and pending orders hold stock correctly",
    ],
    storefrontResult:
      "Shoppers see in-stock, low-stock, and out-of-stock states; over-limit checkouts are blocked with clear messaging.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/inventory/service.ts" },
      { repo: "backend", path: "src/modules/notifications/inventoryLowStockPublisher.ts" },
      { repo: "storefront", path: "commerce/products/stock.ts" },
    ],
    limitations:
      "There is no separate inventory-ledger table; stock lives on the product and its option data.",
    relatedIds: ["product-variants", "order-management", "abandoned-checkout"],
  },
  {
    id: "ai-product-assist",
    name: "AI product content assistance",
    aliases: ["AI descriptions", "AI product writer"],
    keywords: ["AI generate", "search keywords", "AI credits"],
    availabilityStatus: "gated",
    audiences: ["merchant"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "catalog",
    summary:
      "Generate product descriptions and hidden search keywords with AI, metered by credits.",
    benefit: "Merchants write listings faster and get discovered more without hiring copywriters.",
    capabilities: [
      "AI-generated product descriptions from merchant input",
      "Regenerable hidden search keywords that never overwrite merchant-written text",
      "Credit-metered usage with per-store allowances",
    ],
    availability: {
      status: "platform-gated",
      detail: "Needs platform enablement per store and consumes AI credits.",
    },
    sources: [
      { repo: "backend", path: "src/modules/products/handlers.admin.ts" },
      { repo: "backend", path: "src/config/aiProductPrompt.ts" },
      { repo: "backend", path: "src/modules/aiUsage/service.ts" },
    ],
    limitations:
      "Do not claim autonomous or guaranteed-quality copy; output is a merchant-reviewed draft and keyword helper.",
    relatedIds: ["product-management", "storefront-search", "ai-store-reports"],
  },

  // ------------------------------------------------------------------ discovery
  {
    id: "storefront-search",
    name: "Storefront search",
    aliases: ["search", "product search", "site search"],
    keywords: ["suggest", "recent searches", "name match"],
    availabilityStatus: "limited",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "discovery",
    summary:
      "Full-page product search with header suggestions, popular categories, featured items, and recent searches.",
    benefit: "Shoppers find products by name in seconds instead of browsing category by category.",
    capabilities: [
      "Full-page search results at /search",
      "Header search overlay and mobile search with debounced suggestions",
      "Recent searches stored on-device and popular bootstrap content (categories, featured)",
    ],
    storefrontResult:
      "Shoppers type once and land on matching products with suggestions as they type.",
    availability: { status: "available", detail: "Available to every storefront automatically." },
    sources: [
      { repo: "storefront", path: "app/[locale]/(store)/search/page.tsx" },
      { repo: "storefront", path: "commerce/search/loadSearch.server.ts" },
      { repo: "storefront", path: "app/api/search/suggest/route.ts" },
    ],
    limitations:
      "Search matches product names and tags; there is no typo tolerance or full faceted search index on the storefront.",
    core: true,
    relatedIds: ["filters-sorting", "search-synonyms", "recommendations"],
  },
  {
    id: "filters-sorting",
    name: "Filters, sorting & pagination",
    aliases: ["filters", "sort products", "price filter", "facets"],
    keywords: ["sort", "price range", "in-stock", "on-sale", "rating filter"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "discovery",
    summary:
      "Catalog and category pages offer brand and category multi-select, price range, in-stock, on-sale, featured, rating filters, and multiple sort orders.",
    benefit: "Shoppers narrow large catalogs to exactly what they want and can afford.",
    capabilities: [
      "Category and brand multi-select, price min/max, in-stock, on-sale, featured, and rating filters",
      "Sort by newest, best-selling, and price ascending/descending",
      "Removable filter chips and paginated results",
    ],
    storefrontResult:
      "Shoppers filter and sort product listings with persistent, shareable result states.",
    availability: { status: "available", detail: "Available to every storefront automatically." },
    sources: [
      { repo: "storefront", path: "commerce/products/catalogFilters.ts" },
      { repo: "storefront", path: "storefront/families/classic/pages/ClassicProductListPage.tsx" },
    ],
    limitations: "The rating filter only appears when product reviews are enabled for the store.",
    relatedIds: ["storefront-search", "categories-brands"],
  },
  {
    id: "recommendations",
    name: "Similar & recommended products",
    aliases: ["similar products", "recommended", "you may also like", "related products"],
    keywords: ["recommendations", "manual override", "cart suggestions"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "discovery",
    summary:
      "Product pages show similar items the merchant can tune globally and override per product; carts surface recommendations too.",
    benefit:
      "Shoppers discover related items, lifting basket size without merchant effort per page.",
    capabilities: [
      "Global toggle, section title, item limit, and hide-out-of-stock control",
      "Per-product manual recommendation overrides",
      "Cart recommendations alongside checkout",
    ],
    storefrontResult:
      "Shoppers see a similar-products section on product pages and suggestions in the cart.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/similarProducts/service.ts" },
      { repo: "admin", path: "src/features/storefront/model/similar-products.ts" },
      {
        repo: "storefront",
        path: "storefront/families/classic/components/SimilarProductsSection.tsx",
      },
    ],
    relatedIds: ["product-management", "storefront-search"],
  },
  {
    id: "search-synonyms",
    name: "Search synonyms & demand insights",
    aliases: ["search synonyms", "zero-result search"],
    keywords: ["synonyms", "zero-result", "search index", "reindex"],
    availabilityStatus: "live",
    audiences: ["merchant"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "discovery",
    summary:
      "Teach the shopper search merchant vocabulary with synonym groups, and see zero-result queries plus index completeness in the dashboard.",
    benefit:
      "Merchants fix failed searches — e.g. local terms for the same product — instead of losing those shoppers.",
    capabilities: [
      "Synonym groups mapping shopper words to catalog terms",
      "Zero-result search query reporting",
      "Search-index completeness and reindex controls",
    ],
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/productDiscovery/synonyms.ts" },
      { repo: "backend", path: "src/modules/search/service.ts" },
      { repo: "admin", path: "src/features/storefront/model/search.ts" },
    ],
    relatedIds: ["storefront-search", "analytics-dashboard"],
  },

  // ------------------------------------------------------------------- checkout
  {
    id: "persistent-cart",
    name: "Persistent shopping cart",
    aliases: ["cart", "shopping cart", "basket", "shopping bag"],
    keywords: ["guest cart", "variant lines", "coupon handoff", "stock cap"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "checkout",
    summary:
      "A guest cart that survives reloads, understands variants, merges duplicate lines, caps quantities at stock, and hands off cleanly to checkout.",
    benefit:
      "Shoppers never lose their basket, and merchants get fewer confused support messages about cart errors.",
    capabilities: [
      "Variant-aware cart lines with quantity controls and option changes",
      "Persistence across sessions with validation and repair against live stock and prices",
      "Coupon handoff between cart and checkout pages",
      "Cart recommendations and fly-to-cart feedback",
    ],
    storefrontResult:
      "Shoppers keep their cart across visits with accurate prices, stock caps, and coupon carry-over.",
    availability: { status: "available", detail: "Available to every storefront automatically." },
    sources: [
      { repo: "storefront", path: "stores/cart-store.ts" },
      { repo: "storefront", path: "commerce/cart/useCartController.ts" },
      { repo: "storefront", path: "commerce/cart/cartValidation.ts" },
    ],
    limitations:
      "Changing the cart invalidates an applied coupon so totals are always re-quoted by the server.",
    relatedIds: ["guest-checkout", "coupons", "product-variants"],
  },
  {
    id: "guest-checkout",
    name: "Guest checkout with server-priced totals",
    aliases: ["checkout", "one-page checkout", "express checkout", "guest checkout"],
    keywords: ["preflight", "server pricing", "delivery quote", "abuse protection"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "checkout",
    summary:
      "One-page guest checkout with Bangladesh address hierarchy, authoritative delivery quotes, and abuse protection — no account required.",
    benefit:
      "Shoppers check out in minutes with cash or online payment while merchants are protected from tampered totals and spam orders.",
    capabilities: [
      "Guest checkout always available; name, mobile, and full address required",
      "Authoritative server-side pricing, delivery quotes, and preflight validation — client totals are never trusted",
      "Duplicate-order suppression and abuse throttling",
      "Dedicated express checkout pages for ad traffic",
    ],
    storefrontResult:
      "Shoppers complete orders as guests with live delivery fees that appear once the address is complete.",
    availability: { status: "available", detail: "Available to every storefront automatically." },
    sources: [
      { repo: "backend", path: "src/modules/orders/handlers.public.ts" },
      { repo: "backend", path: "src/modules/orders/antiAbuse.ts" },
      { repo: "storefront", path: "app/[locale]/(store)/checkout/page.tsx" },
      { repo: "storefront", path: "features/checkout/api/checkoutOptionPreflight.ts" },
    ],
    core: true,
    relatedIds: ["checkout-fields", "persistent-cart", "order-tracking", "bkash-payments"],
  },
  {
    id: "order-management",
    name: "Order management & invoices",
    aliases: ["orders", "order management", "invoices", "fulfillment"],
    keywords: ["order status", "invoice PDF", "order export", "email outbox"],
    availabilityStatus: "live",
    audiences: ["merchant", "staff"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "checkout",
    summary:
      "Manage the full order lifecycle — statuses, manual orders, edits, exports, printable/PDF invoices, and email delivery status — from the dashboard.",
    benefit: "Merchants run fulfillment from one queue instead of spreadsheets and chat threads.",
    capabilities: [
      "Order list with status, totals, and customer filters; full status lifecycle (pending to delivered, cancelled, refunded)",
      "Manual order creation and order editing from the dashboard",
      "Printable and PDF invoices, including tokenized customer invoice links",
      "CSV order export and customer order-history sidebar (new vs returning, lifetime value)",
      "Order confirmation, delivery, and cancellation emails via outbox with delivery status",
    ],
    storefrontResult:
      "Shoppers receive email updates and can open their invoice link for printing or records.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/orders/handlers.admin.ts" },
      { repo: "backend", path: "src/modules/orders/orderEmailOutbox.ts" },
      { repo: "admin", path: "src/features/orders/client.ts" },
      { repo: "storefront", path: "app/[locale]/(store)/orders/[token]/page.tsx" },
    ],
    core: true,
    relatedIds: ["order-tracking", "courier-integrations", "customer-crm"],
  },
  {
    id: "order-tracking",
    name: "Order tracking for shoppers",
    aliases: ["track order", "order status", "tracking page", "where is my order"],
    keywords: ["tracking", "token link", "timeline", "courier panel"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "checkout",
    summary:
      "Guests track orders with order number plus phone, or via secure token links; signed-in shoppers get order history with timelines, courier, and payment panels.",
    benefit: "Fewer 'where is my order' messages: shoppers self-serve accurate status anytime.",
    capabilities: [
      "Public tracking form (order number + exact phone match)",
      "Secure token links that stay out of search indexes",
      "Timeline and stepper views with courier, payment, delivery, and items panels",
      "Signed-in order history with automatic refresh until terminal states",
    ],
    storefrontResult:
      "Shoppers track at /orders, open token links from notifications, or review history under /account/orders.",
    availability: { status: "available", detail: "Available to every storefront automatically." },
    sources: [
      { repo: "storefront", path: "commerce/orders/useOrderTracking.ts" },
      { repo: "storefront", path: "features/orders/components/GuestOrderTrackingPage.tsx" },
      { repo: "backend", path: "src/modules/orders/handlers.public.ts" },
    ],
    limitations: "Guest tracking requires the exact phone number used at checkout.",
    relatedIds: ["order-management", "customer-accounts", "courier-integrations"],
  },
  {
    id: "cancellation-requests",
    name: "Customer cancellation requests",
    aliases: ["cancel order", "cancellation", "order cancellation"],
    keywords: ["cancellation queue", "approve", "reject", "withdraw"],
    availabilityStatus: "live",
    audiences: ["merchant", "staff", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "checkout",
    summary:
      "Shoppers request order cancellations from the storefront; merchants approve or reject them from a dedicated queue.",
    benefit: "Cancellations become a tidy workflow instead of chaotic chat negotiations.",
    capabilities: [
      "Shopper cancellation requests with withdrawal option",
      "Dashboard approval and rejection queue",
    ],
    storefrontResult: "Shoppers request cancellation on their order and see the outcome.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/customerRequests/handlers.public.ts" },
      { repo: "backend", path: "src/modules/customerRequests/handlers.admin.ts" },
      { repo: "admin", path: "src/app/(dashboard)/orders/cancellations/page.tsx" },
    ],
    relatedIds: ["order-management", "order-tracking"],
  },
  {
    id: "abandoned-checkout",
    name: "Abandoned checkout recovery",
    aliases: ["abandoned cart", "cart recovery", "checkout recovery"],
    keywords: ["recovery SMS", "recovery link", "recovery rate", "inactivity window"],
    availabilityStatus: "gated",
    audiences: ["merchant", "staff"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "checkout",
    summary:
      "Detect stalled checkouts and recover them over SMS with templates, scheduling, and recovery-rate reporting — plus shareable recovery links.",
    benefit: "Merchants win back shoppers who almost bought, turning lost checkouts into revenue.",
    capabilities: [
      "Abandoned, active, completed, recovered, and expired checkout states",
      "SMS recovery with inactivity timing, message templates (English/Bangla), and consent checks",
      "Recovery links that restore the shopper's checkout",
      "Summary metrics including recovery rate",
    ],
    storefrontResult: "Shoppers return through a recovery link with their checkout restored.",
    availability: {
      status: "platform-gated",
      detail: "Needs platform enablement per store plus an SMS connection and storefront URL.",
    },
    sources: [
      { repo: "backend", path: "src/modules/abandonedCheckouts/service.ts" },
      { repo: "admin", path: "src/features/abandoned-checkouts/index.ts" },
      { repo: "storefront", path: "lib/abandonedCheckoutCapture.ts" },
    ],
    limitations:
      "Completed checkouts never count as abandoned or recovered; suppression rules (consent, premium access) can skip recovery messages.",
    relatedIds: ["guest-checkout", "sms-marketing", "analytics-dashboard"],
  },

  // ----------------------------------------------------------------- promotions
  {
    id: "coupons",
    name: "Coupons & discounts",
    aliases: ["coupons", "discount codes", "promo codes", "vouchers", "discounts"],
    keywords: ["coupon", "percentage", "fixed amount", "usage limits", "preview calc"],
    availabilityStatus: "live",
    audiences: ["merchant", "staff", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "promotions",
    summary:
      "Create percentage or fixed-amount coupon codes with caps, product or category targeting, exclusions, minimum quantities, usage limits, and schedules — previewable before launch.",
    benefit:
      "Merchants run sales and creator codes that apply correctly at checkout without manual adjustments.",
    capabilities: [
      "Percentage and fixed-amount codes with maximum-discount caps",
      "Targeting by all products, categories, or specific products, with exclusions",
      "Minimum quantity rules, per-code usage limits, and start/end schedules",
      "Admin preview calculator and diagnostics for misconfigured codes",
      "Server-side enforcement at order creation — the storefront only previews",
    ],
    storefrontResult:
      "Shoppers enter a code on cart or checkout and see the verified discount immediately.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/discounts/service.admin.ts" },
      { repo: "backend", path: "src/modules/discounts/calculator.ts" },
      { repo: "admin", path: "src/features/discounts/client.ts" },
      { repo: "storefront", path: "commerce/cart/couponDiscount.ts" },
    ],
    core: true,
    relatedIds: ["persistent-cart", "guest-checkout", "promo-popup"],
  },
  {
    id: "promo-popup",
    name: "Promotional popup",
    aliases: ["popup", "promo popup", "offer popup", "discount popup"],
    keywords: ["popup delay", "repeat rules", "suppression", "coupon display"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "promotions",
    summary:
      "Show one merchant-configured popup with title, description, image, call-to-action, and optional coupon code — with delay, repeat frequency, and smart suppression.",
    benefit:
      "Merchants capture attention for a sale or coupon without harassing every visitor on every page.",
    capabilities: [
      "Title, description, image, call-to-action link, and optional coupon-code display",
      "Display delay (0–120s) and repeat rules (session, daily, weekly, monthly)",
      "Automatic suppression on cart, checkout, account, order, payment, and preview pages",
      "Content-change detection resets display state so new promos actually show",
    ],
    storefrontResult: "Eligible shoppers see the popup once per rule after the configured delay.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/storefrontCms/homePopup.ts" },
      { repo: "admin", path: "src/app/(dashboard)/storefront/promo-popup/page.tsx" },
      { repo: "storefront", path: "features/promo-popup/components/PromoPopupMount.tsx" },
    ],
    limitations:
      "The popup's coupon display is presentational only — actual discounts come from the coupons engine.",
    relatedIds: ["coupons", "promo-banners", "homepage-merchandising"],
  },
  {
    id: "promo-banners",
    name: "Promo banners, announcement bar & testimonials",
    aliases: ["banners", "promo banners", "announcement bar", "testimonials"],
    keywords: ["banner slots", "announcement", "scheduling", "star ratings"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "promotions",
    summary:
      "Merchandise the shop with scheduled promo banner slots, a site-wide announcement bar, and customer testimonials with ratings.",
    benefit: "Sales, offers, and social proof stay visible across the shop without page rebuilds.",
    capabilities: [
      "Primary and mid-page promo banner slots with grid layouts and scheduling",
      "Site-wide announcement bar text",
      "Testimonials with badge, title, and 1–5 star ratings",
    ],
    storefrontResult:
      "Shoppers see banners, the announcement marquee, and testimonials across homepage and theme sections.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/storefrontCms/promoBanners.ts" },
      { repo: "admin", path: "src/app/(dashboard)/storefront/promo-banners/page.tsx" },
      { repo: "storefront", path: "components/storefront/PromoBannerRows.tsx" },
    ],
    relatedIds: ["homepage-merchandising", "promo-popup", "product-reviews"],
  },

  // ------------------------------------------------------------------ customers
  {
    id: "customer-crm",
    name: "Customer records & marketing consent",
    aliases: ["customers", "customer database", "CRM", "blocklist"],
    keywords: ["consent", "tags", "spend rollups", "known IPs"],
    availabilityStatus: "live",
    audiences: ["merchant", "staff"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "customers",
    summary:
      "A customer database built from orders, newsletter signups, forms, and imports — with tags, notes, spend rollups, consent tracking, and IP/phone/email blocking.",
    benefit:
      "Merchants know who buys, who consented to marketing, and who should be blocked — in one record.",
    capabilities: [
      "Customer profiles with status (active, blocked, archived) and source tracking",
      "Tags, notes, addresses, spend and order rollups, and event history",
      "Email and SMS marketing consent states with audit trail",
      "Blocklist for email, phone, and IP with deny and hard storefront-deny actions",
    ],
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/customers/service.admin.ts" },
      { repo: "backend", path: "src/modules/customers/handlers.admin.ts" },
      { repo: "admin", path: "src/features/customers/index.ts" },
    ],
    relatedIds: ["customer-accounts", "sms-marketing", "order-management"],
  },
  {
    id: "customer-accounts",
    name: "Customer accounts & address book",
    aliases: ["customer login", "member accounts", "my account", "address book"],
    keywords: ["magic link", "OAuth", "Google login", "Facebook login", "sessions"],
    availabilityStatus: "gated",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "customers",
    summary:
      "Optional shopper accounts with password, magic-link, and Google/Facebook login, order history, and up to 10 saved addresses.",
    benefit:
      "Repeat shoppers check out faster and see their history, while guest checkout keeps first orders frictionless.",
    capabilities: [
      "Email/password signup and login, passwordless magic links, and Google/Facebook OAuth",
      "Email verification, password reset, and session management",
      "Address book with up to 10 Bangladesh-structured addresses and checkout prefill",
      "Signed-in order history, invoice access, and server-synced wishlist",
    ],
    storefrontResult:
      "Shoppers register or sign in at /account, manage addresses, and reorder from history; guests can always check out without an account.",
    availability: {
      status: "platform-gated",
      detail: "Needs platform allowance plus a merchant enable toggle per store.",
    },
    sources: [
      { repo: "backend", path: "src/modules/customerAuth/handlers.public.ts" },
      { repo: "backend", path: "src/modules/customerAddresses/service.ts" },
      { repo: "admin", path: "src/features/customer-accounts/index.ts" },
      { repo: "storefront", path: "features/account/components/LoginForm.tsx" },
    ],
    relatedIds: ["order-tracking", "wishlist", "guest-checkout"],
  },
  {
    id: "wishlist",
    name: "Wishlist",
    aliases: ["favorites", "saved items", "wish list"],
    keywords: ["heart button", "guest wishlist", "cross-device sync", "wishlist analytics"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "customers",
    summary:
      "Shoppers save favorites with a heart button; guests keep up to 20 items per store and signed-in shoppers sync across devices.",
    benefit:
      "Shoppers bookmark now and buy later — and merchants see which products attract intent.",
    capabilities: [
      "Heart-button saving on product cards and product pages",
      "Guest wishlist persisted per store (20-item cap) with guest-to-account merge on login",
      "Dedicated wishlist page with add-to-cart, option selection, and unavailable-item handling",
      "Dashboard wishlist analytics: adds, removes, add-to-cart, and top products",
    ],
    storefrontResult: "Shoppers manage saved items at /wishlist and move them to cart in one tap.",
    availability: {
      status: "available",
      detail: "Available to every storefront; server sync needs customer accounts.",
    },
    sources: [
      { repo: "backend", path: "src/modules/wishlist/service.ts" },
      { repo: "storefront", path: "stores/wishlist-store.ts" },
      { repo: "storefront", path: "features/wishlist/lib/WishlistProvider.tsx" },
      { repo: "admin", path: "src/features/wishlist-analytics/index.ts" },
    ],
    limitations:
      "Guest wishlists are capped at 20 items per store and live on-device until the shopper signs in.",
    relatedIds: ["customer-accounts", "product-reviews", "analytics-dashboard"],
  },
  {
    id: "product-reviews",
    name: "Product reviews & moderation",
    aliases: ["reviews", "ratings", "product ratings", "customer reviews"],
    keywords: ["rating", "moderation", "trust stats", "helpful votes"],
    availabilityStatus: "live",
    audiences: ["merchant", "staff", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "customers",
    summary:
      "Collect shopper reviews with ratings, moderate them per product or store-wide, and show trust summaries on product pages.",
    benefit: "Real reviews answer shopper doubts and lift conversion without fake-review risk.",
    capabilities: [
      "Shopper review submission (name, order reference, rating, text)",
      "Store-wide enable toggle plus per-product moderation: approve, hide, bulk delete",
      "Helpful votes and trust statistics on product pages",
      "AI-assisted review tools where enabled, credit-metered",
    ],
    storefrontResult:
      "Shoppers read and write reviews on product pages when the merchant enables them.",
    availability: {
      status: "conditional",
      detail:
        "Available by default; the store-wide toggle and per-product moderation control visibility.",
    },
    sources: [
      { repo: "backend", path: "src/modules/reviews/service.ts" },
      { repo: "admin", path: "src/app/(dashboard)/storefront/reviews/page.tsx" },
      {
        repo: "storefront",
        path: "storefront/families/classic/components/ProductDetailSection.tsx",
      },
    ],
    relatedIds: ["wishlist", "product-management", "promo-banners"],
  },
  {
    id: "newsletter",
    name: "Newsletter signup",
    aliases: ["newsletter", "email signup", "subscribe"],
    keywords: ["subscribers", "footer signup", "consent"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "customers",
    summary:
      "Footer newsletter capture feeds the customer database as consent-tracked newsletter subscribers.",
    benefit:
      "Merchants build an owned audience for launches and sales instead of renting attention per campaign.",
    capabilities: [
      "Storefront footer newsletter signup",
      "Subscribers recorded with newsletter source and email consent state",
    ],
    storefrontResult: "Shoppers subscribe from the footer on every page.",
    availability: { status: "available", detail: "Available to every storefront automatically." },
    sources: [
      { repo: "storefront", path: "storefront/families/classic/shell/ClassicFooter.tsx" },
      { repo: "storefront", path: "commerce/newsletter/useNewsletterSubscription.ts" },
      { repo: "backend", path: "src/modules/customers/service.admin.ts" },
    ],
    relatedIds: ["customer-crm", "sms-marketing"],
  },

  // ------------------------------------------------------------------ shipping
  {
    id: "courier-integrations",
    name: "Courier integrations (Pathao, RedX, Steadfast)",
    aliases: ["courier", "delivery partner", "shipping provider", "courier integration"],
    keywords: ["Pathao", "RedX", "Steadfast", "shipment", "bulk shipment", "status sync"],
    availabilityStatus: "limited",
    audiences: ["merchant", "staff"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "shipping",
    summary:
      "Connect Pathao, RedX, and Steadfast accounts, validate credentials, and create single or bulk shipments with status sync — right from orders.",
    benefit:
      "Delivery booking and tracking happen inside the dashboard instead of three separate courier portals.",
    capabilities: [
      "Credential connection and validation for Pathao, RedX, and Steadfast (credentials encrypted, never returned)",
      "Per-order shipment creation plus bulk shipment handling with result panels",
      "Automatic shipment-status mapping and background sync with courier logs",
    ],
    storefrontResult:
      "Shoppers see live courier status in order tracking once the merchant books a shipment.",
    availability: {
      status: "conditional",
      detail: "Available to every merchant; needs the merchant's own courier account credentials.",
    },
    sources: [
      { repo: "backend", path: "src/modules/courier/service.ts" },
      { repo: "backend", path: "src/modules/courier/pathaoClient.ts" },
      { repo: "backend", path: "src/modules/courier/redxClient.ts" },
      { repo: "backend", path: "src/modules/courier/steadfastClient.ts" },
      { repo: "admin", path: "src/features/courier/ui/hub/courier-providers.tsx" },
    ],
    limitations:
      "Exactly three courier providers are supported; no other courier or custom carrier exists.",
    core: true,
    relatedIds: ["order-management", "order-tracking", "delivery-rates"],
  },
  {
    id: "delivery-rates",
    name: "Delivery rates & per-product overrides",
    aliases: ["delivery charge", "shipping rates", "delivery fees", "shipping cost"],
    keywords: ["inside Dhaka", "outside Dhaka", "delivery policy", "per-product charge"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "shipping",
    summary:
      "Set default inside-Dhaka and outside-Dhaka delivery charges, override them per product, and publish a delivery policy shown on every product page.",
    benefit:
      "Delivery pricing matches real courier costs per area and per product without surprises at checkout.",
    capabilities: [
      "Store-wide default inside-Dhaka and outside-Dhaka delivery charges",
      "Per-product delivery-charge override with weight and dimensions for courier calculation",
      "Merchant delivery-policy page snippet rendered on every product page",
    ],
    storefrontResult:
      "Shoppers see delivery information on product pages and authoritative quoted fees at checkout.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/storefrontCms/deliveryPolicy.ts" },
      { repo: "admin", path: "src/app/(dashboard)/storefront/delivery-charge-defaults/page.tsx" },
      {
        repo: "storefront",
        path: "storefront/families/classic/components/ProductDeliveryCard.tsx",
      },
    ],
    relatedIds: ["courier-integrations", "guest-checkout", "checkout-fields"],
  },

  // ------------------------------------------------------------------ payments
  {
    id: "bkash-payments",
    name: "bKash online payments & refunds",
    aliases: ["bKash", "online payment", "mobile wallet", "digital payment"],
    keywords: ["IPN", "callback", "refund", "payment status"],
    availabilityStatus: "limited",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "payments",
    summary:
      "Accept bKash wallet payments at checkout with merchant-credential connection, validation, IPN confirmation, and dashboard refunds.",
    benefit:
      "Merchants get paid online into their own bKash merchant account with refunds handled in-dashboard.",
    capabilities: [
      "Merchant bKash credential connection with validation and enable control",
      "Checkout creation, callback handling, and provider IPN confirmation",
      "Dashboard-issued bKash refunds",
      "Payment status surfaced on tracking, invoices, and account order history",
    ],
    storefrontResult:
      "Shoppers see bKash at checkout only when the merchant connected it; otherwise checkout safely offers cash on delivery.",
    availability: {
      status: "conditional",
      detail: "Available to every merchant; needs the merchant's own bKash credentials.",
    },
    sources: [
      { repo: "backend", path: "src/modules/payments/bkashClient.ts" },
      { repo: "backend", path: "src/modules/payments/handlers.public.ts" },
      { repo: "admin", path: "src/app/(dashboard)/payments/bkash/page.tsx" },
      { repo: "storefront", path: "lib/payment/methods.ts" },
    ],
    limitations:
      "bKash is the only live online gateway. Nagad, Rocket, cards, and bank transfer appear in the dashboard as coming-soon cards with no setup flow.",
    core: true,
    relatedIds: ["cod-payment", "guest-checkout", "order-tracking"],
  },
  {
    id: "cod-payment",
    name: "Cash on delivery & Secure COD",
    aliases: ["cash on delivery", "COD", "secure COD", "cash"],
    keywords: ["prepaid delivery fee", "collection mode", "fail-safe method"],
    availabilityStatus: "limited",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "payments",
    summary:
      "Cash on delivery works out of the box; Secure COD optionally collects the delivery charge online via bKash and the balance in cash.",
    benefit:
      "Merchants serve cash shoppers everywhere while reducing fake-order losses on delivery fees.",
    capabilities: [
      "Cash on delivery always available as the default fail-safe method",
      "Secure COD mode: delivery fee prepaid online, product balance on delivery",
      "Checkout payment options driven by the server quote, never client choice alone",
    ],
    storefrontResult:
      "Shoppers choose cash on delivery, or Secure COD where the merchant enabled it, with the prepaid portion clearly separated.",
    availability: {
      status: "conditional",
      detail: "COD is available by default; Secure COD needs platform enablement per store.",
    },
    sources: [
      { repo: "backend", path: "src/modules/orders/secureCod.ts" },
      { repo: "backend", path: "src/modules/storefrontCms/deliveryPolicy.ts" },
      { repo: "storefront", path: "lib/payment/methods.ts" },
    ],
    limitations: "Online collection modes currently support bKash only.",
    relatedIds: ["bkash-payments", "guest-checkout", "fraud-checker"],
  },

  // ------------------------------------------------------------------ insights
  {
    id: "analytics-dashboard",
    name: "Sales & traffic analytics",
    aliases: ["analytics", "sales reports", "dashboard stats", "traffic reports"],
    keywords: ["visitors", "revenue", "funnel", "conversion", "CSV export", "traffic sources"],
    availabilityStatus: "live",
    audiences: ["merchant", "staff"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "insights",
    summary:
      "Dashboard analytics with date ranges, prior-period comparison, visitors, orders, revenue, payments, funnels, sources, pages, locations, and CSV export — plus per-product analytics.",
    benefit: "Merchants see what earns and what leaks, then act on it instead of guessing.",
    capabilities: [
      "Visitors, orders, revenue, dues, payments overview, and profit views with range picker and comparison",
      "Traffic sources, campaigns, medium, paid-vs-organic, pages, referrers, locations, and sessions",
      "Conversion funnel and order-flow views",
      "Per-product sales analytics with drilldown",
      "CSV export of analytics data",
    ],
    availability: {
      status: "conditional",
      detail:
        "Available by default; revenue figures need the revenue-view permission and per-store analytics enabled.",
    },
    sources: [
      { repo: "backend", path: "src/modules/analytics/service.admin.ts" },
      { repo: "backend", path: "src/modules/analytics/metrics.ts" },
      { repo: "admin", path: "src/features/analytics/index.ts" },
      { repo: "admin", path: "src/app/(dashboard)/analytics/page.tsx" },
    ],
    core: true,
    relatedIds: ["ai-store-reports", "wishlist", "search-synonyms"],
  },
  {
    id: "ai-store-reports",
    name: "AI store reports & actions",
    aliases: ["AI reports", "store insights", "business reports"],
    keywords: ["AI report", "action list", "anomalies", "PDF export", "AI credits"],
    availabilityStatus: "gated",
    audiences: ["merchant"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "insights",
    summary:
      "Generated 7/30/90-day business reports — summary, comparisons, funnel, inventory demand, retention, anomalies — with an actionable task list and PDF export.",
    benefit: "Merchants get analyst-style findings and next actions without hiring one.",
    capabilities: [
      "Executive summary with period comparisons and funnel analysis",
      "Inventory-demand, retention, and anomaly findings",
      "Action list (open, done, snoozed, not relevant) with merchant notes",
      "PDF export of reports",
    ],
    availability: {
      status: "platform-gated",
      detail: "Needs platform enablement per store and consumes AI credits.",
    },
    sources: [
      { repo: "backend", path: "src/modules/storeAiReports/service.ts" },
      { repo: "admin", path: "src/features/store-ai-reports/index.ts" },
    ],
    limitations:
      "Do not claim guaranteed accuracy or autonomous decisions; reports are generated insights with merchant-approved actions.",
    relatedIds: ["analytics-dashboard", "ai-product-assist", "store-chat"],
  },
  {
    id: "fraud-checker",
    name: "Courier fraud & risk checker",
    aliases: ["fraud check", "risk check", "fake order check", "COD verification"],
    keywords: ["risk score", "success ratio", "courier history", "bulk check"],
    availabilityStatus: "live",
    audiences: ["merchant", "staff"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "insights",
    summary:
      "Check a customer's courier history before dispatch — success and cancellation ratios with courier breakdown — for single or bulk orders.",
    benefit:
      "Merchants avoid shipping cash-on-delivery parcels to addresses that habitually refuse them.",
    capabilities: [
      "Per-order and bulk risk checks with low/medium/high outcome",
      "Parcel success and cancellation ratios with courier breakdown",
      "Risk reports and a pre-dispatch checklist",
    ],
    availability: {
      status: "conditional",
      detail: "Available to merchants; needs the risk-provider API connection.",
    },
    sources: [
      { repo: "backend", path: "src/modules/customerRisk/service.ts" },
      { repo: "admin", path: "src/features/customer-risk/index.ts" },
    ],
    limitations:
      "Risk data comes from the connected provider's courier-history coverage, not UrShop's own data.",
    relatedIds: ["order-management", "cod-payment", "customer-crm"],
  },

  // ----------------------------------------------------------------- marketing
  {
    id: "sms-marketing",
    name: "SMS notifications & campaigns",
    aliases: ["SMS", "bulk SMS", "SMS campaigns", "order SMS"],
    keywords: ["BulkSMSBD", "transactional SMS", "unsubscribe", "sender ID"],
    availabilityStatus: "limited",
    audiences: ["merchant", "staff", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "marketing",
    summary:
      "Send transactional order SMS in English and Bangla and run promotional campaigns with audience preview, consent checks, and per-recipient delivery states.",
    benefit:
      "Order updates reach shoppers instantly, and promotions reach opted-in phones without spreadsheet uploads.",
    capabilities: [
      "Order SMS for placed, confirmed, delivered, and cancelled events with editable templates",
      "Promotional campaigns with selected, previous, or filtered audiences and preview counts",
      "Consent and phone-validity checks with per-recipient states (no fake delivered receipts)",
      "Public SMS unsubscribe page with token links",
    ],
    storefrontResult:
      "Shoppers get order SMS updates and can unsubscribe anytime via the SMS unsubscribe page.",
    availability: {
      status: "conditional",
      detail: "Available to every merchant; needs the merchant's own BulkSMSBD connection.",
    },
    sources: [
      { repo: "backend", path: "src/modules/sms/campaign.service.ts" },
      { repo: "backend", path: "src/modules/sms/orderSmsOutbox.ts" },
      { repo: "admin", path: "src/features/sms/index.ts" },
      { repo: "storefront", path: "app/[locale]/(store)/sms-unsubscribe/page.tsx" },
    ],
    limitations:
      "BulkSMSBD is the only SMS provider. Order SMS covers four events only — there is intentionally no shipped-event SMS.",
    relatedIds: ["merchant-email", "abandoned-checkout", "customer-crm"],
  },
  {
    id: "merchant-email",
    name: "Order emails that always send",
    aliases: ["order emails", "transactional email", "email notifications"],
    keywords: ["Resend", "SMTP", "outbox", "delivery status", "sender setup"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "marketing",
    summary:
      "Order lifecycle emails (placed, confirmed, delivered, cancelled) sent from an immutable outbox with delivery status, plus merchant sender setup.",
    benefit:
      "Every order event produces a trustworthy paper trail for shoppers and merchants alike.",
    capabilities: [
      "Outbox-backed order emails with idempotent sends and delivery status in the dashboard",
      "Merchant sender setup (Resend/SMTP) with test sends",
      "Immutable message snapshots so records match what was sent",
    ],
    storefrontResult:
      "Shoppers receive order emails they can reference alongside tracking and invoices.",
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/orders/orderEmailOutbox.ts" },
      { repo: "backend", path: "src/modules/merchantEmailSender/service.ts" },
      { repo: "admin", path: "src/features/orders/model/email-status.ts" },
    ],
    relatedIds: ["sms-marketing", "order-management"],
  },
  {
    id: "ad-pixels",
    name: "Ad pixels & conversion tracking",
    aliases: ["pixel", "Meta pixel", "TikTok pixel", "conversion tracking", "GTM"],
    keywords: ["CAPI", "Conversions API", "TikTok Events API", "Tag Manager", "test events"],
    availabilityStatus: "live",
    audiences: ["merchant"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "marketing",
    summary:
      "Connect Meta Pixel with Conversions API, TikTok pixel and Events API, and Google Tag Manager — with test events and delivery status.",
    benefit:
      "Ad campaigns on Facebook, TikTok, and Google measure real shop purchases instead of flying blind.",
    capabilities: [
      "Meta Pixel plus server-side Conversions API with test event codes and delivery status",
      "TikTok pixel with browser and Events API toggles and test codes",
      "Google Tag Manager container validation",
      "Secrets stay server-side; dashboards show set-status only, never tokens",
    ],
    availability: {
      status: "conditional",
      detail: "Available to every merchant; needs the merchant's own pixel and container IDs.",
    },
    sources: [
      { repo: "backend", path: "src/modules/marketing/metaCapi.ts" },
      { repo: "backend", path: "src/modules/marketing/tiktokEventsApi.ts" },
      { repo: "backend", path: "src/modules/marketing/gtm.ts" },
      { repo: "admin", path: "src/app/(dashboard)/storefront/meta-pixel/page.tsx" },
    ],
    relatedIds: ["analytics-dashboard", "blog", "seo-foundation"],
  },
  {
    id: "store-chat",
    name: "Store chat (AI + human inbox)",
    aliases: ["live chat", "chat widget", "customer chat", "AI chat"],
    keywords: ["hybrid mode", "proactive messages", "retention"],
    availabilityStatus: "gated",
    audiences: ["merchant", "staff", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "marketing",
    summary:
      "An on-site chat widget backed by a dashboard inbox with AI, human-only, or hybrid modes, greetings, proactive messages, and conversation history.",
    benefit:
      "Shopper questions get answered on the product page — where the purchase decision happens.",
    capabilities: [
      "Chat widget with proactive messages and page/product context",
      "Dashboard conversations with reply, close, summaries, and live updates",
      "AI-only, human-only, or hybrid answering modes with greeting and policy guidance",
      "Configurable message retention",
    ],
    storefrontResult:
      "Shoppers open the chat widget on any storefront page and get answers in context.",
    availability: {
      status: "platform-gated",
      detail: "Needs platform enablement per store plus a merchant enable toggle.",
    },
    sources: [
      { repo: "backend", path: "src/modules/chat/service.ts" },
      { repo: "admin", path: "src/features/chat/index.ts" },
      { repo: "storefront", path: "features/chat/components/ChatWidget.tsx" },
    ],
    relatedIds: ["contact-inbox", "ai-store-reports", "meta-messaging"],
  },
  {
    id: "meta-messaging",
    name: "Facebook & Instagram messaging",
    aliases: ["Facebook chat", "Instagram DMs", "Messenger", "WhatsApp business"],
    keywords: ["Meta", "Instagram", "WhatsApp", "WABA", "page assets"],
    availabilityStatus: "coming-soon",
    audiences: ["merchant"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "marketing",
    summary:
      "Connect Facebook, Instagram, and WhatsApp business assets for messaging, shown in the dashboard with connection health states.",
    benefit:
      "Social followers become supportable shoppers without leaving the merchant's inbox workflow.",
    capabilities: [
      "Onboarding for pages, Instagram accounts, and WhatsApp business assets with per-asset AI toggles",
      "Connection health states (connected, connecting, action required, token expired)",
      "Audited webhook processing for incoming messages",
    ],
    availability: {
      status: "platform-gated",
      detail: "Marked Soon in the dashboard; needs platform allowance per store.",
    },
    sources: [
      { repo: "backend", path: "src/modules/metaMessaging/processor.ts" },
      { repo: "admin", path: "src/features/meta-messaging/index.ts" },
    ],
    limitations:
      "Avoid strong public claims: the dashboard labels this Soon and it requires platform enablement. Verify current rollout before marketing it.",
    relatedIds: ["store-chat", "contact-inbox"],
  },

  // ------------------------------------------------------------ infrastructure
  {
    id: "custom-domains",
    name: "Custom domains & DNS",
    aliases: ["custom domain", "domain", "own domain", "DNS"],
    keywords: ["nameservers", "verification", "primary domain", "cache policy"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "infrastructure",
    summary:
      "Serve the shop on a hosted or custom domain with primary-domain control, nameserver verification, DNS records, and CDN cache management.",
    benefit: "The shop lives at the merchant's own domain with trustworthy, fast delivery.",
    capabilities: [
      "Hosted or custom domains with primary-domain selection",
      "Expected-nameserver verification flow with DNS guidance",
      "Managed DNS records with protection for merchant-owned entries",
      "CDN cache policies with best-effort cache sync on publishing",
    ],
    storefrontResult:
      "Shoppers browse the shop at the merchant's domain with CDN-served pages and media.",
    availability: {
      status: "available",
      detail: "Available to every merchant; custom domains need DNS verification.",
    },
    sources: [
      { repo: "backend", path: "src/modules/storeDomains/service.ts" },
      { repo: "backend", path: "src/modules/storeDomains/dnsManager.ts" },
      { repo: "admin", path: "src/app/(dashboard)/storefront/domains/page.tsx" },
    ],
    core: true,
    relatedIds: ["seo-foundation", "branding", "preset-themes"],
  },
  {
    id: "seo-foundation",
    name: "SEO, sitemaps & product feeds",
    aliases: ["SEO", "sitemap", "Google ranking", "product feed"],
    keywords: ["robots", "structured data", "Meta feed", "site verification"],
    availabilityStatus: "live",
    audiences: ["merchant", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "infrastructure",
    summary:
      "SEO foundations come built in: per-locale meta, sitemaps, robots, Google verification, structured data, and a Meta product feed URL.",
    benefit:
      "Shops are discoverable on Google and ready for Meta catalog ads without developer work.",
    capabilities: [
      "Per-locale SEO titles, descriptions, and social share metadata",
      "Automatic sitemap and robots with domain readiness checks",
      "Google site-verification token support",
      "Structured data on articles and products where enabled",
      "Meta product feed endpoint for catalog sync",
    ],
    storefrontResult:
      "Search engines index clean product, category, and article URLs with correct metadata.",
    availability: { status: "available", detail: "Available to every storefront automatically." },
    sources: [
      { repo: "storefront", path: "app/sitemap.ts" },
      { repo: "storefront", path: "app/robots.ts" },
      { repo: "storefront", path: "app/feeds/meta-products.xml/route.ts" },
      { repo: "storefront", path: "commerce/seo/jsonLd.ts" },
      { repo: "admin", path: "src/app/(dashboard)/storefront/marketing-seo/page.tsx" },
    ],
    relatedIds: ["blog", "custom-domains", "ad-pixels"],
  },

  // --------------------------------------------------------------- operations
  {
    id: "subscription-plans",
    name: "Plans, trial & subscription status",
    aliases: ["pricing plans", "subscription", "trial", "membership plan"],
    keywords: ["starter", "growth", "scale", "grace", "frozen"],
    availabilityStatus: "limited",
    audiences: ["merchant", "staff"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "operations",
    summary:
      "Transparent plan catalog (trial, starter, growth, scale with monthly/yearly billing) plus a dashboard showing status, access state, renewal, and history.",
    benefit:
      "Merchants always know their plan state — trial, active, grace, or locked — and what each plan includes.",
    capabilities: [
      "Plan catalog with trial, starter, growth, and scale tiers and monthly/yearly comparison",
      "Status dashboard: trial/active/grace/frozen/cancelled with dashboard, storefront, and checkout access states",
      "Renewal instructions and subscription event history",
    ],
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/subscriptions/service.ts" },
      { repo: "admin", path: "src/features/subscription-plans/index.ts" },
      { repo: "admin", path: "src/app/(dashboard)/subscription/page.tsx" },
    ],
    limitations:
      "Billing operations are currently manual (no self-serve card billing integration in the backend); enforcement is behind a platform flag.",
    relatedIds: ["staff-permissions", "support-help"],
  },
  {
    id: "staff-permissions",
    name: "Staff accounts & permissions",
    aliases: ["staff", "team members", "user roles", "permissions", "sub-accounts"],
    keywords: ["invite", "role presets", "audit log", "MFA", "TOTP", "slot limits"],
    availabilityStatus: "live",
    audiences: ["merchant", "staff"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "operations",
    summary:
      "Invite staff with granular permissions across some fifty capabilities, slot limits, disable/suspend controls, and audit logs — plus personal security (MFA, sessions).",
    benefit:
      "Shop owners delegate orders, products, or support safely without sharing their own login.",
    capabilities: [
      "Staff invites with per-capability view/manage permissions and role presets",
      "Staff slot limits (default 3 per store) with disable, suspend, and re-invite",
      "Audit logs of staff actions",
      "Merchant security: password controls, TOTP two-factor with recovery codes, and session management",
    ],
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/staff/permissions.ts" },
      { repo: "backend", path: "src/modules/staff/service.ts" },
      { repo: "admin", path: "src/features/staff-management/index.ts" },
    ],
    limitations:
      "Sensitive areas (revenue, couriers, payments, domains, settings, staff, subscriptions, SMS) are explicitly flagged in permission presets.",
    relatedIds: ["subscription-plans", "order-management"],
  },
  {
    id: "wholesale-b2b",
    name: "Wholesale (B2B) channel",
    aliases: ["wholesale", "B2B", "bulk orders", "reseller"],
    keywords: ["MOQ", "bulk pricing", "application", "members", "tiered pricing"],
    availabilityStatus: "limited",
    audiences: ["merchant", "staff", "shopper"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "operations",
    summary:
      "A gated wholesale channel with applications and document checks, member management, bulk-enrolled listings with MOQ and tiered pricing, and a separate wholesale shop, cart, and checkout.",
    benefit:
      "Merchants sell retail and bulk from one catalog without leaking wholesale prices to regular shoppers.",
    capabilities: [
      "Wholesale application form with business-document checks and approve/reject workflow",
      "Member management with suspend and reactivate",
      "Bulk listing enrollment with percent or fixed pricing, minimums, maximums, increments, and per-variant rules",
      "Separate gated wholesale catalog, cart, and checkout with minimum-quantity enforcement",
      "Wholesale dashboard (orders, sales, members, pending applications, listings)",
    ],
    storefrontResult:
      "Approved wholesale members shop a separate /wholesale catalog with bulk rules; retail shoppers never see wholesale prices.",
    availability: {
      status: "conditional",
      detail:
        "Available where enabled; merchants control channel enablement, auto-enroll, and navbar/footer visibility.",
    },
    sources: [
      { repo: "backend", path: "src/modules/wholesale/service.ts" },
      { repo: "backend", path: "src/modules/wholesale/pricing.ts" },
      { repo: "admin", path: "src/features/wholesale/index.ts" },
      { repo: "storefront", path: "commerce/wholesale/catalog.ts" },
    ],
    limitations:
      "Phase-1 implementation: availability resolves against live retail stock, and application documents carry sensitive-data handling.",
    relatedIds: ["product-management", "inventory-control", "customer-accounts"],
  },
  {
    id: "support-help",
    name: "Support tickets, guides & onboarding",
    aliases: ["support", "help center", "helpdesk", "tickets", "guides"],
    keywords: ["priorities", "attachments", "onboarding", "bilingual guides"],
    availabilityStatus: "live",
    audiences: ["merchant", "staff"],
    lastVerifiedAt: FEATURES_LAST_VERIFIED_AT,
    category: "operations",
    summary:
      "In-dashboard support tickets with priorities, file attachments, and internal notes — plus bilingual help guides per feature and first-run onboarding.",
    benefit: "Merchants get unstuck fast with help where they work, not a separate support maze.",
    capabilities: [
      "Support tickets with categories, priorities, statuses, messages, and image attachments",
      "Bilingual step-by-step guides per dashboard feature",
      "First-run onboarding checklist for new stores",
    ],
    availability: { status: "available", detail: "Available to every merchant by default." },
    sources: [
      { repo: "backend", path: "src/modules/support/service.ts" },
      { repo: "admin", path: "src/features/support/index.ts" },
      { repo: "admin", path: "src/features/help/index.ts" },
      { repo: "admin", path: "src/features/onboarding/index.ts" },
    ],
    relatedIds: ["guided-setup", "subscription-plans"],
  },
];

/** Features flagged as central to the UrShop pitch. Not a ranking. */
export const coreFeatures: readonly MerchantFeature[] = features.filter(
  (feature) => feature.core === true,
);

export function featuresByCategory(category: FeatureCategoryId): readonly MerchantFeature[] {
  return features.filter((feature) => feature.category === category);
}

export function featureById(id: string): MerchantFeature | undefined {
  return features.find((feature) => feature.id === id);
}

export function featuresByAvailabilityStatus(
  status: AvailabilityStatus,
): readonly MerchantFeature[] {
  return features.filter((feature) => feature.availabilityStatus === status);
}

export function featuresByAudience(audience: FeatureAudience): readonly MerchantFeature[] {
  return features.filter((feature) => feature.audiences.includes(audience));
}

/**
 * Deterministic lightweight retrieval over id, name, aliases, keywords,
 * summary, and benefit. Results follow inventory order. Case-insensitive;
 * matches when the normalized query equals an alias/keyword or appears in
 * the id, name, summary, or benefit text.
 */
export function searchFeatures(query: string): readonly MerchantFeature[] {
  const q = query.trim().toLowerCase();
  if (q === "") return [];
  return features.filter((feature) => {
    if (feature.id === q) return true;
    const haystacks = [feature.name, feature.summary, feature.benefit];
    if (haystacks.some((text) => text.toLowerCase().includes(q))) return true;
    const terms = [...(feature.aliases ?? []), ...(feature.keywords ?? [])].map((term) =>
      term.toLowerCase(),
    );
    return terms.some((term) => term === q || term.includes(q));
  });
}

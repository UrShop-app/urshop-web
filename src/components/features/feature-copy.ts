import type { IconName } from "@/components/ui/icon";
import type { MerchantFeature } from "@/data/features";

/**
 * Public-facing copy for the Features page, keyed by feature id in `src/data/features.ts`.
 *
 * The dataset stays factual and machine-oriented; this file is the marketing layer on top of it.
 * Rules when editing:
 * - Say nothing the dataset doesn't support. Rewrite `summary`/`capabilities` in plain merchant
 *   language; never add claims.
 * - Every `limitations` entry must still hold after reading the copy. When a limitation changes
 *   what a merchant can expect, repeat it in `note`.
 * - No implementation details (tokens, outbox, IPN, tenants, source paths).
 */
export type FeatureCopy = {
  name: string;
  /** One sentence shown under the name. */
  blurb: string;
  /** What's included, in merchant terms. Shown when a search result is expanded. */
  details?: ReadonlyArray<string>;
  /** Scope or availability caveat, shown as "Good to know". */
  note?: string;
  /** Highlighted features only: icon and short chip on the showcase tabs. */
  icon?: IconName;
  tag?: string;
};

const featureCopy: Readonly<Record<string, FeatureCopy>> = {
  // Store setup & branding
  "guided-setup": {
    name: "Guided store setup",
    blurb: "Create your store and follow an onboarding checklist from profile to launch.",
    details: [
      "Bangladesh defaults for currency (৳), timezone, phone and address formats",
      "Step-by-step onboarding for your profile, social links and launch",
      "Help articles in English and Bangla",
    ],
    note: "Built for selling in Bangladesh. Other countries aren't supported yet.",
  },
  branding: {
    name: "Branding & contact details",
    blurb: "Set your logo, favicon, brand colors and contact details in one place.",
    details: [
      "Logo and favicon uploads",
      "Primary and secondary brand colors and corner style",
      "Address, email and phone shown in your header, footer and invoices",
    ],
  },
  localization: {
    name: "Bangla & English storefront",
    blurb: "Every storefront serves Bangla and English, with a language switcher for shoppers.",
    details: [
      "Bangla by default, English one tap away",
      "Prices in Taka and dates formatted for each language",
      "Search-engine titles and descriptions per language",
    ],
    note: "Storefronts support Bangla and English only.",
  },
  "checkout-fields": {
    name: "Checkout fields you control",
    blurb: "Choose which customer details checkout asks for, and which are required.",
    details: [
      "Show, hide or require optional fields",
      "Division, District and Upazila dropdowns for Bangladeshi addresses",
      "Mobile number and postal code checks",
    ],
    note: "Name, mobile number and full address are always required.",
  },
  "store-policies": {
    name: "Policy pages",
    blurb: "Publish terms, privacy, shipping and return policies shoppers can read before buying.",
    details: [
      "Edit each policy with a rich-text editor",
      "Each policy gets its own page on your storefront",
    ],
  },
  "contact-inbox": {
    name: "Contact form & inbox",
    blurb: "Shoppers message you from your contact page, and you handle each one in the dashboard.",
    details: [
      "Contact form on your storefront, with limits against repeat spam",
      "Mark inquiries as New, Read or Resolved",
    ],
  },

  // Themes & customization
  "preset-themes": {
    name: "Storefront themes",
    blurb:
      "Start from a professionally designed theme family, Classic or Aura, and switch any time.",
    details: [
      "Two theme families: Classic and Aura",
      "Save drafts, publish when ready, roll back to an earlier version",
      "Switching themes keeps your homepage choices",
    ],
    note: "Themes can't be extended with your own CSS, JavaScript or components.",
    icon: "palette",
    tag: "Classic & Aura",
  },
  "theme-customizer": {
    name: "Visual theme editor",
    blurb:
      "Restyle colors, fonts, layouts and homepage sections in an editor that shows your real storefront.",
    details: [
      "Brand colors, fonts, corner radius and spacing",
      "Header, footer, product card and product page layouts",
      "Preview at desktop, tablet and mobile sizes",
    ],
    note: "Font choice depends on the theme family: Aura offers around 20 fonts, Classic uses the system font.",
    icon: "tune",
    tag: "Live storefront preview",
  },
  "theme-preview": {
    name: "Preview before you publish",
    blurb: "Review unpublished design changes privately and share a view-only preview link.",
    details: [
      "Preview home, product and category pages",
      "Cart and checkout are switched off in previews, so no test orders",
      "Conflicting edits are flagged instead of overwritten",
    ],
  },
  "responsive-storefront": {
    name: "Mobile-first storefront",
    blurb:
      "Every storefront is built for phones first, with touch-friendly navigation, search and checkout.",
    details: [
      "Mobile top bar, navigation drawer and bottom tab bar",
      "Filter drawer on mobile, sidebar on desktop",
      "Product grids from 2 columns on phones up to 5–6 on large screens",
    ],
  },
  "media-optimization": {
    name: "Optimized images",
    blurb: "Product and theme images load in modern formats with smooth placeholders.",
    details: [
      "AVIF and WebP images with CDN caching",
      "Blur placeholders that fade into the full image",
      "Consistent image framing in each theme family",
    ],
    note: "Images hosted on other websites are shown only from approved sources.",
  },

  // Pages, navigation & content
  "page-builder": {
    name: "Page builder",
    blurb:
      "Build landing and campaign pages from ready-made blocks: heroes, product grids, countdowns, FAQs, video and more.",
    details: [
      "Content and commerce blocks, including bundles and contact sections",
      "Drafts, publishing and revision history with restore",
      "Add pages to your menu or footer, or make one your homepage",
      "SEO settings per page",
    ],
    icon: "dashboard_customize",
    tag: "Drafts & revision history",
  },
  "homepage-merchandising": {
    name: "Homepage sections",
    blurb:
      "Decide what shoppers see first: banners, categories, featured products, best sellers and more.",
    details: [
      "Turn on, reorder and configure up to 20 sections",
      "Best sellers based on your actual sales",
      "Brand, testimonial, blog and contact sections",
    ],
  },
  "site-navigation": {
    name: "Navigation & footer",
    blurb: "Control your header menu, footer links, social links and contact details.",
    details: [
      "Header links, plus your own pages in the menu and footer",
      "Footer columns, tagline and copyright text",
      "Social and marketplace links with your own icons",
    ],
  },
  blog: {
    name: "Blog",
    blurb: "Publish articles with categories, scheduling and links to the products they mention.",
    details: [
      "Draft, schedule and publish posts",
      "Link articles to products in your store",
      "SEO titles, descriptions and social share cards",
    ],
    note: "AI-assisted drafting is switched on per store and uses AI credits.",
  },

  // Products, catalog & inventory
  "product-management": {
    name: "Product management",
    blurb:
      "Add products with sale prices, SKUs, SEO, delivery charges and offer countdowns, or import them by CSV.",
    details: [
      "Sale prices shown against the previous price",
      "CSV import, plus export of selected, filtered or all products",
      "Duplicate a product, including its images",
      "Search and filter your list by category, brand, stock, price and more",
    ],
    icon: "inventory_2",
    tag: "CSV import & export",
  },
  "product-variants": {
    name: "Variants & options",
    blurb:
      "Sell sizes, colors and other options from one listing, each with its own price adjustment, stock and image.",
    details: [
      "Options such as Size and Color with price adjustments",
      "Stock tracked for each option value",
      "Shoppers pick options with swatches and selectors",
    ],
    note: "Options belong to their product; they don't have separate SKUs.",
  },
  "product-media": {
    name: "Product images & video",
    blurb: "Add photo galleries and product videos from YouTube or Vimeo.",
    details: [
      "Multiple gallery images plus a thumbnail",
      "YouTube and Vimeo video embeds",
      "Fast-loading images with blur placeholders",
    ],
    note: "UrShop doesn't host or stream video; videos play from YouTube or Vimeo.",
  },
  "categories-brands": {
    name: "Categories & brands",
    blurb: "Organize products into nested categories and brand pages shoppers can browse.",
    details: [
      "Parent and child categories you can reorder",
      "Old category links keep working after a rename",
      "Brand pages with logos",
    ],
  },
  "inventory-control": {
    name: "Inventory & low-stock alerts",
    blurb: "Track stock per product and option, prevent overselling, and see when stock runs low.",
    details: [
      "Stock tracking on or off per product",
      "Choose whether to keep selling when out of stock",
      "Stock is held for pending and paid orders",
    ],
    note: "UrShop keeps the current stock count, not a history of stock movements.",
  },
  "ai-product-assist": {
    name: "AI product descriptions",
    blurb: "Draft product descriptions and search keywords with AI, then review them yourself.",
    details: [
      "Description drafts from your own notes",
      "Hidden search keywords that never overwrite your text",
    ],
    note: "Switched on per store and uses AI credits. Always review AI drafts before publishing.",
  },

  // Search & discovery
  "storefront-search": {
    name: "Storefront search",
    blurb: "Shoppers search from any page, with suggestions as they type.",
    details: [
      "Full search results page",
      "Popular categories and featured items in the search panel",
      "Recent searches remembered on the shopper's device",
    ],
    note: "Search matches product names and tags, and doesn't correct typos.",
  },
  "filters-sorting": {
    name: "Filters & sorting",
    blurb: "Shoppers narrow products by category, brand, price, stock, sale and rating, then sort.",
    details: [
      "Multi-select category and brand filters",
      "Sort by newest, best-selling or price",
      "Removable filter chips and shareable results",
    ],
    note: "The rating filter appears when product reviews are turned on.",
  },
  recommendations: {
    name: "Similar products",
    blurb: "Show similar items on product pages and suggestions in the cart.",
    details: [
      "Set the section title and number of items",
      "Hide out-of-stock items",
      "Choose recommendations by hand for any product",
    ],
  },
  "search-synonyms": {
    name: "Search synonyms & insights",
    blurb: "Teach search the words your shoppers use, and see which searches find nothing.",
    details: [
      "Synonym groups, such as local names for the same product",
      "Report of searches with no results",
      "Search index status and reindexing",
    ],
  },

  // Cart, checkout & orders
  "persistent-cart": {
    name: "Saved shopping cart",
    blurb:
      "Carts survive reloads and return visits, with prices and stock rechecked before checkout.",
    details: [
      "Change options and quantities in the cart",
      "Quantities capped at available stock",
      "Coupons carry over from cart to checkout",
    ],
    note: "Changing the cart re-checks an applied coupon.",
  },
  "guest-checkout": {
    name: "Guest checkout",
    blurb:
      "One-page checkout without an account. Totals and delivery fees are calculated by UrShop, never trusted from the browser.",
    details: [
      "Delivery fee shown once the address is complete",
      "Protection against duplicate and spam orders",
      "Express checkout pages for ad traffic",
    ],
    icon: "shopping_cart_checkout",
    tag: "No account needed",
  },
  "order-management": {
    name: "Orders & invoices",
    blurb:
      "Run every order from one dashboard: statuses, manual orders, edits, invoices and exports.",
    details: [
      "Statuses from pending to delivered, plus cancelled and refunded",
      "Create orders by hand and edit existing ones",
      "Printable and PDF invoices, with an invoice link for customers",
      "CSV export and each customer's order history",
    ],
    icon: "receipt_long",
    tag: "PDF invoices",
  },
  "order-tracking": {
    name: "Order tracking for shoppers",
    blurb:
      "Shoppers check their own order status, so you answer fewer “where is my order?” messages.",
    details: [
      "Track with order number and phone number",
      "Secure tracking links",
      "Timeline with courier, payment and delivery details",
    ],
    note: "Guest tracking needs the exact phone number used at checkout.",
  },
  "cancellation-requests": {
    name: "Cancellation requests",
    blurb:
      "Shoppers request a cancellation from your store; you approve or reject it from one queue.",
  },
  "abandoned-checkout": {
    name: "Abandoned checkout recovery",
    blurb:
      "Spot stalled checkouts and send an SMS with a link that restores the shopper's checkout.",
    details: [
      "Message templates in English and Bangla",
      "Marketing consent checked before sending",
      "Recovery rate reporting",
    ],
    note: "Switched on per store, and needs an SMS connection.",
  },

  // Coupons & promotions
  coupons: {
    name: "Coupons & discounts",
    blurb:
      "Create percentage or fixed-amount codes with caps, targeting, usage limits and schedules.",
    details: [
      "All products, chosen categories or specific products, with exclusions",
      "Minimum quantities, usage limits, start and end dates",
      "Preview a code's discount before launch",
      "Every discount is verified when the order is placed",
    ],
    icon: "sell",
    tag: "Verified at checkout",
  },
  "promo-popup": {
    name: "Promotional popup",
    blurb:
      "Show one popup with your offer, image, button and optional coupon code, timed not to annoy.",
    details: [
      "Delay up to 120 seconds; repeat per session, day, week or month",
      "Never shown on cart, checkout, account or payment pages",
      "Shows again when you change its content",
    ],
    note: "The code in a popup is for display; the discount itself comes from your coupons.",
  },
  "promo-banners": {
    name: "Banners & announcement bar",
    blurb:
      "Schedule promo banners, run a site-wide announcement bar and show customer testimonials.",
    details: [
      "Main and mid-page banner slots with scheduling",
      "Announcement bar across the whole store",
      "Testimonials with 1–5 star ratings",
    ],
  },

  // Customers & engagement
  "customer-crm": {
    name: "Customer list",
    blurb:
      "One record per customer from orders, signups, forms and imports, with tags, notes, spend and consent.",
    details: [
      "Tags, notes, addresses and order totals",
      "Email and SMS marketing consent, with history",
      "Block by email, phone or IP address",
    ],
    icon: "group",
    tag: "Marketing consent",
  },
  "customer-accounts": {
    name: "Customer accounts",
    blurb: "Shoppers sign in to see their orders, save addresses and check out faster.",
    details: [
      "Email and password, magic link, or Google and Facebook sign-in",
      "Up to 10 saved addresses",
      "Wishlist synced across devices",
    ],
    note: "Switched on per store. Guest checkout always stays available.",
  },
  wishlist: {
    name: "Wishlist",
    blurb: "Shoppers save favorites with a heart and move them to the cart later.",
    details: [
      "Save from product cards and product pages",
      "A wishlist page with add to cart",
      "See which products shoppers save most",
    ],
    note: "Guests can save up to 20 items on their device; syncing across devices needs customer accounts.",
  },
  "product-reviews": {
    name: "Product reviews",
    blurb:
      "Collect star ratings and reviews, moderate them, and show a rating summary on product pages.",
    details: [
      "Turn reviews on for the whole store",
      "Approve, hide or bulk delete reviews per product",
      "Helpful votes from shoppers",
    ],
    note: "AI review tools are available only where switched on, and use AI credits.",
  },
  newsletter: {
    name: "Newsletter signup",
    blurb:
      "A footer signup on every page adds subscribers to your customer list, with consent recorded.",
  },

  // Delivery & couriers
  "courier-integrations": {
    name: "Courier booking",
    blurb:
      "Connect your Pathao, RedX or Steadfast account and book shipments from your orders, one at a time or in bulk.",
    details: [
      "Credentials checked when you connect, stored encrypted",
      "Single and bulk shipment booking",
      "Shipment status syncs back automatically",
    ],
    note: "Works with your own Pathao, RedX or Steadfast account. Other couriers aren't supported.",
    icon: "local_shipping",
    tag: "Pathao · RedX · Steadfast",
  },
  "delivery-rates": {
    name: "Delivery charges",
    blurb:
      "Set inside and outside Dhaka charges, override them per product, and show your delivery policy on product pages.",
    details: [
      "Store-wide inside-Dhaka and outside-Dhaka charges",
      "Per-product charge, weight and dimensions",
      "Delivery policy shown on every product page",
    ],
    icon: "route",
    tag: "Inside & outside Dhaka",
  },

  // Payments
  "bkash-payments": {
    name: "bKash payments & refunds",
    blurb:
      "Accept bKash at checkout into your own bKash merchant account, and refund from the dashboard.",
    details: [
      "Connect and check your bKash merchant credentials",
      "Payments confirmed directly with bKash",
      "Payment status on invoices and order tracking",
    ],
    note: "bKash is currently the only online payment method. Nagad, Rocket, cards and bank transfer aren't available yet.",
    icon: "account_balance_wallet",
    tag: "Your own merchant account",
  },
  "cod-payment": {
    name: "Cash on delivery & Secure COD",
    blurb:
      "Cash on delivery works from day one. Secure COD can collect the delivery fee upfront and the rest in cash.",
    details: [
      "Cash on delivery is always available as a fallback",
      "Secure COD keeps the prepaid delivery fee separate from the cash balance",
    ],
    note: "Secure COD is switched on per store and collects online through bKash only.",
    icon: "payments",
    tag: "Secure COD on request",
  },

  // Analytics & insights
  "analytics-dashboard": {
    name: "Sales & traffic analytics",
    blurb:
      "See visitors, orders and revenue for any date range, compared with the previous period.",
    details: [
      "Traffic sources, campaigns, paid vs organic and top pages",
      "Conversion funnel and per-product sales",
      "Export to CSV",
    ],
    note: "Revenue figures are visible only to team members with permission.",
    icon: "monitoring",
    tag: "Period comparison",
  },
  "ai-store-reports": {
    name: "AI store reports",
    blurb:
      "7, 30 or 90-day reports on sales, funnel, stock demand and retention, with suggested actions.",
    details: [
      "Period comparisons and unusual changes",
      "Mark suggested actions done, snoozed or not relevant",
      "Export as PDF",
    ],
    note: "Switched on per store and uses AI credits. Reports are suggestions for you to review.",
  },
  "fraud-checker": {
    name: "Courier risk check",
    blurb:
      "Before dispatch, check a customer's delivery history: success and cancellation rates by courier.",
    details: [
      "Check one order or many at once",
      "Low, medium or high risk result",
      "Pre-dispatch checklist",
    ],
    note: "Results come from the connected risk provider's courier data.",
  },

  // Marketing & integrations
  "sms-marketing": {
    name: "SMS updates & campaigns",
    blurb:
      "Text order updates in English or Bangla, and send promotions to customers who opted in.",
    details: [
      "SMS when an order is placed, confirmed, delivered or cancelled",
      "Audience preview before a campaign goes out",
      "Unsubscribe link for every shopper",
    ],
    note: "Needs your own BulkSMSBD account. There's no SMS for the shipped step.",
  },
  "merchant-email": {
    name: "Order emails",
    blurb:
      "Emails for placed, confirmed, delivered and cancelled orders, with delivery status in your dashboard.",
    details: [
      "See whether each email was delivered",
      "Send from your own address via Resend or SMTP, with test sends",
      "A saved copy of every email sent",
    ],
  },
  "ad-pixels": {
    name: "Ad pixels & conversion tracking",
    blurb:
      "Connect Meta Pixel with Conversions API, TikTok pixel and Events API, and Google Tag Manager.",
    details: [
      "Test events and delivery status for Meta and TikTok",
      "Google Tag Manager container check",
      "Access tokens stay private; the dashboard only shows whether they're set",
    ],
    note: "Uses your own pixel and container IDs.",
    icon: "ads_click",
    tag: "Meta · TikTok · GTM",
  },
  "store-chat": {
    name: "Store chat",
    blurb:
      "A chat widget on your storefront with a dashboard inbox, answered by your team, by AI, or both.",
    details: [
      "Greetings and proactive messages",
      "Replies, summaries and history in the dashboard",
      "AI-only, team-only or mixed answering",
    ],
    note: "Switched on per store.",
  },
  "meta-messaging": {
    name: "Facebook, Instagram & WhatsApp messaging",
    blurb:
      "Connect your business pages and accounts to handle social messages alongside your store.",
    note: "Not available yet.",
  },

  // Domains & infrastructure
  "custom-domains": {
    name: "Custom domain",
    blurb: "Run your shop on a hosted UrShop address or your own domain, with guided DNS setup.",
    details: [
      "Choose your primary domain",
      "Step-by-step nameserver verification",
      "Managed DNS records and CDN caching",
    ],
    icon: "language",
    tag: "Guided DNS setup",
  },
  "seo-foundation": {
    name: "SEO & product feeds",
    blurb: "Sitemaps, search-engine metadata and a Meta product feed come built in.",
    details: [
      "Titles and descriptions per language",
      "Automatic sitemap and robots file",
      "Google site verification",
      "Product feed URL for Meta catalogs",
    ],
  },

  // Plans, team & operations
  "subscription-plans": {
    name: "Plan & subscription status",
    blurb:
      "See your plan, trial and renewal status, and your subscription history, in the dashboard.",
    details: [
      "Compare plans with monthly and yearly billing",
      "Renewal instructions and subscription history",
    ],
    note: "Renewals are arranged with the UrShop team; there's no automatic card billing yet.",
  },
  "staff-permissions": {
    name: "Staff & permissions",
    blurb: "Invite staff with exactly the access they need, and see what they did in audit logs.",
    details: [
      "View or manage access per area, with role presets",
      "Disable or suspend staff accounts",
      "Two-factor sign-in and session management",
    ],
    note: "The number of staff seats per store is limited.",
    icon: "admin_panel_settings",
    tag: "Audit logs",
  },
  "wholesale-b2b": {
    name: "Wholesale (B2B)",
    blurb:
      "A separate wholesale shop for approved buyers, with minimum quantities and wholesale pricing.",
    details: [
      "Applications with document checks and approval",
      "Percent or fixed wholesale pricing with minimums and increments",
      "Separate wholesale cart and checkout; retail shoppers never see wholesale prices",
    ],
    note: "Early release. Wholesale orders draw on the same stock as your retail shop.",
  },
  "support-help": {
    name: "Support & help guides",
    blurb:
      "Open support tickets from the dashboard and follow step-by-step guides in English and Bangla.",
  },
};

/** Page copy for a feature, falling back to the dataset's own wording for new entries. */
export function presentFeature(feature: MerchantFeature): FeatureCopy {
  return (
    featureCopy[feature.id] ?? {
      name: feature.name,
      blurb: feature.summary,
      note: feature.limitations,
    }
  );
}

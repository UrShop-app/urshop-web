/**
 * The /resources library: UrShop's public learning hub, organised by what a merchant is trying
 * to do (goal) and what kind of material it is (type).
 *
 * Rules for editors:
 * - Every entry points at real, live content on this site. Never add a resource before the page
 *   it links to exists, and never invent articles, dates, authors or view counts.
 * - Claims follow `src/data/features.ts` (canonical). FAQ and Features entries take their copy
 *   from `src/data/faq.ts` and the Features page areas, so they can't drift apart.
 * - A type only shows as a filter once at least one resource has it (see `resourceTypesInUse`).
 *   When guides, articles or videos ship, add their entries here with the new `type`.
 * - Ids are stable (used for search and React keys); don't rename them once published.
 */

import { featureAreas } from "@/components/features/areas";
import type { IconName } from "@/components/ui/icon";
import { faqById, faqCategories } from "@/data/faq";
import { integrationsByStatus } from "@/data/integrations";

/**
 * Content formats. Only `overview` and `answers` have content today; the others are the formats
 * the hub is meant to grow into and stay invisible until an entry uses them.
 */
export type ResourceTypeId =
  "overview" | "answers" | "guide" | "article" | "tutorial" | "video" | "case-study" | "download";

export const resourceTypes: Readonly<
  Record<ResourceTypeId, { label: string; pluralLabel: string }>
> = {
  overview: { label: "Overview", pluralLabel: "Overviews" },
  answers: { label: "Answers", pluralLabel: "Answers" },
  guide: { label: "Guide", pluralLabel: "Guides" },
  article: { label: "Article", pluralLabel: "Articles" },
  tutorial: { label: "Tutorial", pluralLabel: "Tutorials" },
  video: { label: "Video", pluralLabel: "Videos" },
  "case-study": { label: "Case study", pluralLabel: "Case studies" },
  download: { label: "Download", pluralLabel: "Downloads" },
};

export type ResourceGoalId =
  | "start-selling"
  | "design-storefront"
  | "products-orders"
  | "payments-delivery"
  | "marketing-growth"
  | "trust-control";

export type ResourceGoal = {
  /** Also the library section's fragment id (`/resources#goal-start-selling`). */
  id: ResourceGoalId;
  title: string;
  /** Short label for filter chips. */
  navLabel: string;
  description: string;
  icon: IconName;
};

export const resourceGoals: ReadonlyArray<ResourceGoal> = [
  {
    id: "start-selling",
    title: "Start selling online",
    navLabel: "Start selling",
    description: "Open your store, get your first order.",
    icon: "rocket_launch",
  },
  {
    id: "design-storefront",
    title: "Design your storefront",
    navLabel: "Design",
    description: "Themes, pages and every screen.",
    icon: "palette",
  },
  {
    id: "products-orders",
    title: "Products, orders & customers",
    navLabel: "Products & orders",
    description: "Catalog, checkout and orders.",
    icon: "inventory_2",
  },
  {
    id: "payments-delivery",
    title: "Get paid & deliver",
    navLabel: "Payments & delivery",
    description: "COD, bKash and local couriers.",
    icon: "local_shipping",
  },
  {
    id: "marketing-growth",
    title: "Market & grow",
    navLabel: "Marketing & growth",
    description: "SEO, ads, SMS and analytics.",
    icon: "trending_up",
  },
  {
    id: "trust-control",
    title: "Keep your store under control",
    navLabel: "Trust & control",
    description: "Team access, domains and security.",
    icon: "verified_user",
  },
];

export type Resource = {
  id: string;
  title: string;
  description: string;
  /** Internal route, optionally with a fragment. */
  href: `/${string}`;
  type: ResourceTypeId;
  goal: ResourceGoalId;
  icon: IconName;
  /** Small factual note next to the type, e.g. "7 answers". */
  meta?: string;
  /** Extra words people might search for. Search only. */
  keywords?: ReadonlyArray<string>;
  /** Further text the search matches but the page doesn't show (e.g. an FAQ topic's questions). */
  searchText?: string;
  /** The hub's lead resource. Exactly one entry sets it. */
  featured?: boolean;
};

/** An FAQ category as a resource; copy and question count come from `faq.ts`. */
function faqTopic(
  categoryId: string,
  goal: ResourceGoalId,
  options: { title?: string; keywords?: ReadonlyArray<string> } = {},
): Resource {
  const category = faqCategories.find((item) => item.id === categoryId);
  if (!category) throw new Error(`Resources: unknown FAQ category "${categoryId}".`);
  const count = category.questions.length;
  return {
    id: `faq-${category.id}`,
    title: options.title ?? category.title,
    description: category.description,
    href: `/faq#${category.id}`,
    type: "answers",
    goal,
    icon: category.icon,
    meta: `${count} ${count === 1 ? "answer" : "answers"}`,
    keywords: options.keywords,
    searchText: category.questions
      .flatMap((question) => [question.question, ...(question.keywords ?? [])])
      .join(" "),
  };
}

/** A Features page area as a resource; copy comes from the area itself. */
function featureArea(areaId: string, goal: ResourceGoalId, keywords?: ReadonlyArray<string>) {
  const area = featureAreas.find((item) => item.id === areaId);
  if (!area) throw new Error(`Resources: unknown Features area "${areaId}".`);
  return {
    id: `features-${area.id}`,
    title: area.title,
    description: area.intro,
    href: `/features#${area.id}`,
    type: "overview",
    goal,
    icon: area.icon,
    keywords,
  } satisfies Resource;
}

const paymentAndDeliveryNames = integrationsByStatus("connect")
  .filter((integration) => integration.group === "payments" || integration.group === "delivery")
  .map((integration) => integration.name);

/** "a, b and c", the site's list style (no serial comma). */
function listNames(names: ReadonlyArray<string>) {
  return names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

/**
 * The launch library, in display order within each goal. The first entry of a goal is its lead
 * tile; keep the strongest destination first.
 */
export const resources: ReadonlyArray<Resource> = [
  // Start selling online
  {
    id: "features",
    title: "Everything UrShop can do",
    description: "Every feature, searchable, with what's live today.",
    href: "/features",
    type: "overview",
    goal: "start-selling",
    icon: "apps",
    keywords: ["platform", "capabilities", "what can", "ecommerce platform"],
  },
  faqTopic("getting-started", "start-selling", {
    title: "Getting started",
    keywords: ["new store", "launch", "first steps", "beginner"],
  }),
  {
    id: "about",
    title: "Built for selling in Bangladesh",
    description: "Local payments, couriers and Bangla, built in.",
    href: "/about",
    type: "overview",
    goal: "start-selling",
    icon: "public",
    keywords: ["company", "mission", "local commerce", "bangladesh"],
  },

  // Design your storefront
  {
    id: "themes",
    title: "Themes that match your brand",
    description: "Pick a theme, make it yours in a live editor.",
    href: "/themes",
    type: "overview",
    goal: "design-storefront",
    icon: "palette",
    keywords: ["design", "template", "customize", "logo", "colors", "fonts", "store design"],
  },
  {
    id: "page-builder",
    title: "Build pages from blocks",
    description: "Campaign and landing pages, no code.",
    href: "/themes#page-builder",
    type: "overview",
    goal: "design-storefront",
    icon: "dashboard_customize",
    keywords: ["page builder", "landing page", "campaign page", "blocks"],
  },
  {
    id: "every-screen",
    title: "Looks right on every screen",
    description: "Mobile-first layouts that adapt.",
    href: "/themes#every-screen",
    type: "overview",
    goal: "design-storefront",
    icon: "devices",
    keywords: ["mobile", "responsive", "phone"],
  },
  {
    id: "preview-publish",
    title: "Preview before you publish",
    description: "Private drafts. Publish when ready. Roll back anytime.",
    href: "/themes#preview",
    type: "overview",
    goal: "design-storefront",
    icon: "visibility",
    keywords: ["draft", "publish", "restore", "rollback", "preview link"],
  },
  faqTopic("storefront-domains", "design-storefront", {
    keywords: ["theme", "design", "page builder"],
  }),
  faqTopic("shopping", "design-storefront", {
    title: "What shoppers see",
    keywords: ["customer experience", "shopper", "buyer"],
  }),

  // Products, orders & customers
  featureArea("sell", "products-orders", ["catalog", "checkout", "orders", "coupons"]),
  faqTopic("products-inventory", "products-orders", {
    keywords: ["catalog", "stock", "variants"],
  }),
  faqTopic("orders-checkout", "products-orders", { keywords: ["checkout", "invoice"] }),
  faqTopic("customers-reviews", "products-orders", { keywords: ["crm", "reviews"] }),
  faqTopic("advanced", "products-orders", { keywords: ["b2b", "wholesale", "blog"] }),

  // Get paid & deliver
  {
    id: "order-journey",
    title: "From checkout to doorstep",
    description: `One order, from checkout to doorstep, with ${listNames(paymentAndDeliveryNames)}.`,
    href: "/integrations",
    type: "overview",
    goal: "payments-delivery",
    icon: "route",
    keywords: ["integrations", "cash on delivery", "cod", "shipping", "courier", "order flow"],
    featured: true,
  },
  {
    id: "bkash",
    title: "Get paid with bKash",
    description: "Payments straight to your own bKash account.",
    href: "/integrations#payments",
    type: "overview",
    goal: "payments-delivery",
    icon: "payments",
    keywords: ["bkash", "online payment", "cash on delivery", "cod", "secure cod", "mfs"],
  },
  {
    id: "couriers",
    title: "Book Pathao, RedX and Steadfast",
    description: "Ship from your orders. Status syncs back.",
    href: "/integrations#delivery",
    type: "overview",
    goal: "payments-delivery",
    icon: "local_shipping",
    keywords: ["pathao", "redx", "steadfast", "courier", "delivery", "shipping"],
  },
  faqTopic("payments-delivery", "payments-delivery", {
    keywords: ["bkash", "cod", "secure cod", "pathao", "redx", "steadfast"],
  }),

  // Market & grow
  featureArea("grow", "marketing-growth", ["analytics", "ads", "customers", "crm"]),
  {
    id: "measurement",
    title: "Measure your ads",
    description: "Meta Pixel, TikTok Pixel and Google Tag Manager.",
    href: "/integrations#measurement",
    type: "overview",
    goal: "marketing-growth",
    icon: "ads_click",
    keywords: ["meta pixel", "facebook pixel", "tiktok", "gtm", "google tag manager", "capi"],
  },
  {
    id: "messaging",
    title: "Order SMS and emails",
    description: "Order SMS in Bangla or English, plus emails.",
    href: "/integrations#messaging",
    type: "overview",
    goal: "marketing-growth",
    icon: "forum",
    keywords: ["sms", "bulksmsbd", "email", "notifications"],
  },
  faqTopic("marketing-analytics", "marketing-growth", {
    keywords: ["seo", "google", "analytics", "promotions"],
  }),
  faqTopic("messaging-integrations", "marketing-growth", { keywords: ["sms", "chat"] }),

  // Keep your store under control
  {
    id: "security",
    title: "How your store stays safe",
    description: "Two-factor sign-in, staff permissions, verified domains.",
    href: "/security",
    type: "overview",
    goal: "trust-control",
    icon: "verified_user",
    keywords: ["security", "safety", "2fa", "two factor", "privacy"],
  },
  {
    id: "staff-permissions",
    title: "Staff access you control",
    description: "Choose what each person can see and change.",
    href: "/security#permissions",
    type: "overview",
    goal: "trust-control",
    icon: "manage_accounts",
    keywords: ["staff", "team", "roles", "permissions", "access"],
  },
  {
    id: "domains",
    title: "Use your own domain",
    description: "Verified, on HTTPS, whenever you're ready.",
    href: "/security#domains",
    type: "overview",
    goal: "trust-control",
    icon: "domain_verification",
    keywords: ["domain", "dns", "https", "ssl", "website address"],
  },
  featureArea("run", "trust-control", ["domain", "staff"]),
  faqTopic("staff-security", "trust-control", { keywords: ["2fa", "password", "login"] }),
];

/** The hub's lead resource. */
export const featuredResource: Resource = (() => {
  const featured = resources.filter((resource) => resource.featured);
  if (featured.length !== 1) throw new Error("Resources: exactly one resource must be featured.");
  return featured[0]!;
})();

export function resourcesByGoal(goal: ResourceGoalId): ReadonlyArray<Resource> {
  return resources.filter((resource) => resource.goal === goal);
}

/** Types that have at least one resource, in `resourceTypes` order. Only these get a filter. */
export const resourceTypesInUse: ReadonlyArray<ResourceTypeId> = (
  Object.keys(resourceTypes) as ResourceTypeId[]
).filter((type) => resources.some((resource) => resource.type === type));

/** Common merchant questions answered on the hub (ids from `faq.ts`), in order. */
export const quickAnswerIds: ReadonlyArray<string> = [
  "create-store",
  "technical-skills",
  "payment-methods",
  "secure-cod",
  "couriers",
  "customize-storefront",
];

export type LearningStep = {
  label: string;
  title: string;
  icon: IconName;
  href: `/${string}`;
};

/** A merchant's journey, each stage pointing at the strongest page for it today. */
export const learningPath: ReadonlyArray<LearningStep> = [
  {
    label: "Launch",
    title: "Open your store",
    icon: "rocket_launch",
    href: "/faq#getting-started",
  },
  { label: "Customize", title: "Make it your brand", icon: "palette", href: "/themes" },
  { label: "Connect", title: "Add payments & couriers", icon: "hub", href: "/integrations" },
  { label: "Sell", title: "Take orders", icon: "shopping_bag", href: "/features#sell" },
  { label: "Measure", title: "See what works", icon: "monitoring", href: "/features#grow" },
  {
    label: "Grow",
    title: "Reach more shoppers",
    icon: "trending_up",
    href: "/faq#marketing-analytics",
  },
];

export type SupportLink = { title: string; href: `/${string}`; icon: IconName };

/** Ways to work with the UrShop team. Utilities, not learning resources. */
export const supportLinks: ReadonlyArray<SupportLink> = [
  { title: "Talk to our team", href: "/contact", icon: "support_agent" },
  { title: "Become a partner", href: "/partners", icon: "handshake" },
  { title: "Request a feature", href: "/feature-request", icon: "lightbulb" },
  { title: "Report a problem", href: "/report", icon: "bug_report" },
];

// Fail the build on broken references rather than shipping a broken hub.
{
  const ids = new Set<string>();
  for (const resource of resources) {
    if (ids.has(resource.id)) throw new Error(`Resources: duplicate id "${resource.id}".`);
    ids.add(resource.id);
  }
  for (const goal of resourceGoals) {
    if (resourcesByGoal(goal.id).length === 0) {
      throw new Error(`Resources: goal "${goal.id}" has no resources.`);
    }
  }
  quickAnswerIds.forEach(faqById);
}

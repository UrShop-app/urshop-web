import type { IconName } from "@/components/ui/icon";
import {
  featureCategories,
  features,
  type AvailabilityStatus,
  type FeatureCategoryId,
  type MerchantFeature,
} from "@/data/features";

import { presentFeature } from "./feature-copy";
import { normalizeSearchText } from "./search-text";

/**
 * The Features page groups the dataset's 14 categories into five areas that follow a merchant's
 * day: build the store, sell, get paid and deliver, grow, run the business. Each area demos a few
 * headline features; every feature (including those) is findable in the search explorer.
 */
export type FeatureArea = {
  /** Fragment id for the section; linked from the hero and dock. Keep stable once published. */
  id: string;
  navLabel: string;
  icon: IconName;
  eyebrow: string;
  title: string;
  intro: string;
  categoryIds: ReadonlyArray<FeatureCategoryId>;
  /** Features demoed in the showcase, in order. Must be usable by every store today. */
  highlightIds: ReadonlyArray<string>;
};

export const featureAreas: ReadonlyArray<FeatureArea> = [
  {
    id: "build",
    navLabel: "Build",
    icon: "storefront",
    eyebrow: "Build your store",
    title: "A storefront that looks like your brand",
    intro: "Pick a theme, make it yours in a live editor, and build pages without a developer.",
    categoryIds: ["store-setup", "design", "pages"],
    highlightIds: ["preset-themes", "theme-customizer", "page-builder"],
  },
  {
    id: "sell",
    navLabel: "Sell",
    icon: "shopping_bag",
    eyebrow: "Sell",
    title: "From product listing to confirmed order",
    intro: "List products, check shoppers out in one page, and run every order from one queue.",
    categoryIds: ["catalog", "discovery", "checkout", "promotions"],
    highlightIds: ["product-management", "guest-checkout", "order-management", "coupons"],
  },
  {
    id: "payments-delivery",
    navLabel: "Payments & delivery",
    icon: "local_shipping",
    eyebrow: "Get paid & deliver",
    title: "Cash on delivery, bKash and three couriers",
    intro: "Take cash on delivery from day one, add bKash, and book couriers from your orders.",
    categoryIds: ["payments", "shipping"],
    highlightIds: ["cod-payment", "bkash-payments", "courier-integrations", "delivery-rates"],
  },
  {
    id: "grow",
    navLabel: "Grow",
    icon: "insights",
    eyebrow: "Grow",
    title: "Know your customers and what's working",
    intro: "See sales and traffic in one place, measure your ads, and know every customer.",
    categoryIds: ["insights", "marketing", "customers"],
    highlightIds: ["analytics-dashboard", "ad-pixels", "customer-crm"],
  },
  {
    id: "run",
    navLabel: "Run",
    icon: "settings",
    eyebrow: "Run your business",
    title: "Your domain, your team",
    intro: "Put your shop on your own domain and give each team member just the access they need.",
    categoryIds: ["infrastructure", "operations"],
    highlightIds: ["custom-domains", "staff-permissions"],
  },
];

/** A demoed feature, as the showcase tabs need it (plain data for the client component). */
export type ShowcaseItem = {
  id: string;
  name: string;
  blurb: string;
  icon?: IconName;
  tag?: string;
};

/** A feature in the search explorer (plain data for the client component). */
export type ExplorerItem = {
  id: string;
  name: string;
  blurb: string;
  details?: ReadonlyArray<string>;
  note?: string;
  status: AvailabilityStatus;
  areaId: string;
  categoryTitle: string;
  /** Normalised text the search matches against (see search-text.ts). */
  searchText: string;
};

const featuresById = new Map(features.map((feature) => [feature.id, feature]));
const categoryTitles = new Map(featureCategories.map((category) => [category.id, category.title]));
const areaByCategory = new Map(
  featureAreas.flatMap((area) => area.categoryIds.map((categoryId) => [categoryId, area.id])),
);

// What a merchant can use today comes first; per-store features next; announced ones last.
const STATUS_ORDER: Readonly<Record<AvailabilityStatus, number>> = {
  live: 0,
  limited: 0,
  gated: 1,
  "coming-soon": 2,
};

function requireHighlight(id: string): MerchantFeature {
  const feature = featuresById.get(id);
  if (!feature) throw new Error(`Features page: unknown feature id "${id}".`);
  if (feature.availabilityStatus === "gated" || feature.availabilityStatus === "coming-soon") {
    throw new Error(
      `Features page: "${id}" is ${feature.availabilityStatus} and can't be demoed as a headline feature.`,
    );
  }
  return feature;
}

export function getShowcaseItems(area: FeatureArea): ShowcaseItem[] {
  return area.highlightIds.map((id) => {
    const copy = presentFeature(requireHighlight(id));
    return { id, name: copy.name, blurb: copy.blurb, icon: copy.icon, tag: copy.tag };
  });
}

/** Every feature, grouped by area then category (dataset order), ready for searching. */
export function getExplorerItems(): ExplorerItem[] {
  const items = features.map((feature) => {
    const copy = presentFeature(feature);
    const categoryTitle = categoryTitles.get(feature.category) ?? feature.category;
    const searchText = [
      copy.name,
      copy.blurb,
      ...(copy.details ?? []),
      copy.note,
      categoryTitle,
      feature.name,
      ...(feature.aliases ?? []),
      ...(feature.keywords ?? []),
    ]
      .filter(Boolean)
      .join(" ");

    return {
      id: feature.id,
      name: copy.name,
      blurb: copy.blurb,
      details: copy.details,
      note: copy.note,
      status: feature.availabilityStatus,
      areaId: areaByCategory.get(feature.category) ?? "",
      categoryTitle,
      // Padded with spaces so a term matches from the start of any word: includes(" " + term).
      searchText: ` ${normalizeSearchText(searchText)} `,
    };
  });

  const areaOrder = new Map(featureAreas.map((area, index) => [area.id, index]));
  const categoryOrder = new Map(
    featureAreas
      .flatMap((area) => area.categoryIds)
      .map((id, index) => [categoryTitles.get(id), index]),
  );
  return items.toSorted(
    (a, b) =>
      (areaOrder.get(a.areaId) ?? 0) - (areaOrder.get(b.areaId) ?? 0) ||
      (categoryOrder.get(a.categoryTitle) ?? 0) - (categoryOrder.get(b.categoryTitle) ?? 0) ||
      STATUS_ORDER[a.status] - STATUS_ORDER[b.status],
  );
}

/** Categories no area lists would silently disappear from the page, so fail the build instead. */
const unlistedCategories = featureCategories.filter((category) => !areaByCategory.has(category.id));
if (unlistedCategories.length > 0) {
  throw new Error(
    `Features page: add ${unlistedCategories.map((category) => category.id).join(", ")} to an area.`,
  );
}

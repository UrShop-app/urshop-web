/**
 * The UrShop blog: practical, people-first articles for Bangladesh ecommerce merchants.
 *
 * Rules for editors:
 * - One file per article in this folder, registered in `posts` below. The content model is in
 *   `types.ts`; inline text supports `[links](/path)` and `**bold**` only.
 * - UrShop claims follow `src/data/features.ts` (canonical) and respect its `live`, `limited`,
 *   `gated` and `coming-soon` states. Keep general advice and UrShop functionality apart (the
 *   `urshop` block exists for the latter).
 * - No invented statistics, prices, delivery times, rankings, customer counts or quotes. Rates
 *   and terms of third parties (couriers, bKash) change; tell readers what to ask, not the answer.
 * - Dates are ISO (YYYY-MM-DD) and truthful. Bump `updatedAt` by hand only for a real revision.
 * - The byline is the organisation (`blogAuthor`). Never invent people, photos or credentials.
 * - This module must not import `src/data/resources.ts` (Resources imports the blog).
 */

import type { IconName } from "@/components/ui/icon";
import { staticRoutes } from "@/config/routes";
import { faqCategories } from "@/data/faq";

import { bkashCashOnDeliveryEcommerceBangladesh } from "./bkash-cash-on-delivery-ecommerce-bangladesh";
import { ecommerceSeoBangladesh } from "./ecommerce-seo-bangladesh";
import { facebookPageVsEcommerceWebsiteBangladesh } from "./facebook-page-vs-ecommerce-website-bangladesh";
import { howToStartOnlineStoreBangladesh } from "./how-to-start-online-store-bangladesh";
import { pathaoVsRedxVsSteadfastEcommerceCourier } from "./pathao-vs-redx-vs-steadfast-ecommerce-courier";
import type { BlogBlock, BlogCategoryId, BlogPost, InlineText } from "./types";

export type { BlogBlock, BlogCategoryId, BlogPost, InlineText } from "./types";

/** The byline on every article: the organisation, not an invented person. */
export const blogAuthor = { name: "UrShop Team", href: "/about" } as const;

export const blogCategories: Readonly<Record<BlogCategoryId, { label: string; icon: IconName }>> = {
  "getting-started": { label: "Getting Started", icon: "rocket_launch" },
  "ecommerce-strategy": { label: "Ecommerce Strategy", icon: "call_split" },
  payments: { label: "Payments", icon: "payments" },
  delivery: { label: "Delivery", icon: "local_shipping" },
  "marketing-seo": { label: "Marketing & SEO", icon: "travel_explore" },
};

/** Registration order is the tie-breaker when two articles share a publication date. */
const posts: ReadonlyArray<BlogPost> = [
  howToStartOnlineStoreBangladesh,
  facebookPageVsEcommerceWebsiteBangladesh,
  bkashCashOnDeliveryEcommerceBangladesh,
  pathaoVsRedxVsSteadfastEcommerceCourier,
  ecommerceSeoBangladesh,
];

/** Newest first; ties keep registration order (Array.prototype.sort is stable). */
const sortedPosts: ReadonlyArray<BlogPost> = [...posts].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

const postsBySlug = new Map(posts.map((post) => [post.slug, post]));

export function getAllBlogPosts(): ReadonlyArray<BlogPost> {
  return sortedPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return postsBySlug.get(slug);
}

export function getBlogPostPath(slug: string): `/blog/${string}` {
  return `/blog/${slug}`;
}

export function getFeaturedBlogPost(): BlogPost {
  return sortedPosts.find((post) => post.featured)!;
}

/** Newest articles, optionally leaving some out (e.g. the featured one already on the page). */
export function getLatestBlogPosts(
  limit = Infinity,
  { exclude = [] }: { exclude?: ReadonlyArray<string> } = {},
): ReadonlyArray<BlogPost> {
  return sortedPosts.filter((post) => !exclude.includes(post.slug)).slice(0, limit);
}

/**
 * Articles to read next: the post's own `relatedSlugs` first, then other articles in the same
 * category, then the newest. Deterministic, never random.
 */
export function getRelatedBlogPosts(post: BlogPost, limit = 3): ReadonlyArray<BlogPost> {
  const picked = new Map<string, BlogPost>();
  const candidates = [
    ...post.relatedSlugs.map((slug) => postsBySlug.get(slug)!),
    ...sortedPosts.filter((other) => other.category === post.category),
    ...sortedPosts,
  ];
  for (const candidate of candidates) {
    if (picked.size === limit) break;
    if (candidate.slug !== post.slug) picked.set(candidate.slug, candidate);
  }
  return [...picked.values()];
}

/** Categories that have at least one article, in `blogCategories` order. */
export function getBlogCategoriesInUse(): ReadonlyArray<BlogCategoryId> {
  return (Object.keys(blogCategories) as BlogCategoryId[]).filter((category) =>
    posts.some((post) => post.category === category),
  );
}

export function getBlogPostsByCategory(category: BlogCategoryId): ReadonlyArray<BlogPost> {
  return sortedPosts.filter((post) => post.category === category);
}

// ------------------------------------------------------------------------------- inline text

/** `[label](href)` or `**strong**`. Shared with the renderer so both read text the same way. */
export const INLINE_MARK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

/** The words a reader sees: marks removed, link labels kept. */
export function inlineToPlainText(text: InlineText): string {
  return text.replace(INLINE_MARK_PATTERN, (_match, label, _href, strong) => label ?? strong);
}

function inlineLinks(text: InlineText): ReadonlyArray<string> {
  return [...text.matchAll(INLINE_MARK_PATTERN)].flatMap((match) => (match[2] ? [match[2]] : []));
}

/** Every piece of inline text in a block, in reading order. */
function blockTexts(block: BlogBlock): ReadonlyArray<InlineText> {
  switch (block.type) {
    case "h2":
    case "h3":
    case "p":
      return [block.text];
    case "ul":
    case "ol":
      return block.items;
    case "checklist":
      return [...(block.title ? [block.title] : []), ...block.items];
    case "callout":
      return [block.title, block.text];
    case "table":
      return [block.caption, ...block.head, ...block.rows.flat()];
    case "urshop":
      return [block.text, block.link.label];
    case "figure":
      return block.caption ? [block.caption] : [];
  }
}

/** All reader-visible inline text: takeaways, intro and body, in reading order. */
function postTexts(post: BlogPost): ReadonlyArray<InlineText> {
  return [...post.takeaways, ...post.intro, ...post.body.flatMap(blockTexts)];
}

// ----------------------------------------------------------------------- headings and length

/** Lower-case, hyphenated anchor id from heading text ("COD & bKash" → "cod-bkash"). */
export function slugifyHeading(text: string): string {
  return inlineToPlainText(text)
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function headingId(block: Extract<BlogBlock, { type: "h2" | "h3" }>): string {
  return block.id ?? slugifyHeading(block.text);
}

/** The article's sections, for the table of contents. */
export function getBlogPostSections(post: BlogPost): ReadonlyArray<{ id: string; title: string }> {
  return post.body.flatMap((block) =>
    block.type === "h2" ? [{ id: block.id, title: inlineToPlainText(block.text) }] : [],
  );
}

/** Words in the title, takeaways, intro and body as a reader sees them. */
export function getBlogPostWordCount(post: BlogPost): number {
  const text = [post.title, ...postTexts(post)].map(inlineToPlainText).join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

/** Average adult reading speed for web articles, in words per minute. */
const WORDS_PER_MINUTE = 220;

/** Minutes to read, calculated from the article's own words. */
export function getBlogPostReadingTime(post: BlogPost): number {
  return Math.max(1, Math.round(getBlogPostWordCount(post) / WORDS_PER_MINUTE));
}

// --------------------------------------------------------------------------------- checks

// Fail the build on broken or ambiguous articles rather than publishing them.
{
  const isoDate = /^\d{4}-\d{2}-\d{2}$/;
  const anchorsByPath = new Map<string, Set<string>>();

  for (const post of posts) {
    const where = `Blog "${post.slug}"`;
    const path = getBlogPostPath(post.slug);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) throw new Error(`${where}: invalid slug.`);
    if (anchorsByPath.has(path)) throw new Error(`${where}: duplicate slug.`);

    for (const field of ["title", "seoTitle", "description", "excerpt", "heroAlt"] as const) {
      if (!post[field].trim()) throw new Error(`${where}: missing ${field}.`);
    }
    if (!isoDate.test(post.publishedAt) || !isoDate.test(post.updatedAt)) {
      throw new Error(`${where}: dates must be YYYY-MM-DD.`);
    }
    if (post.updatedAt < post.publishedAt) throw new Error(`${where}: updated before published.`);
    if (post.body[0]?.type !== "h2") throw new Error(`${where}: the body must open with an h2.`);
    if (post.takeaways.length < 3 || post.takeaways.length > 5) {
      throw new Error(`${where}: write three to five takeaways.`);
    }
    const figures = post.body.flatMap((block) => (block.type === "figure" ? [block] : []));
    for (const figure of figures) {
      if (
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(figure.image) ||
        ["hero", "og", "square"].includes(figure.image)
      ) {
        throw new Error(`${where}: invalid figure image name "${figure.image}".`);
      }
      if (!figure.alt.trim()) throw new Error(`${where}: figure "${figure.image}" needs alt text.`);
      if (figures.filter((other) => other.image === figure.image).length > 1) {
        throw new Error(`${where}: duplicate figure image "${figure.image}".`);
      }
    }
    for (const related of post.relatedSlugs) {
      if (related === post.slug || !postsBySlug.has(related)) {
        throw new Error(`${where}: invalid related slug "${related}".`);
      }
    }

    const anchors = new Set<string>();
    for (const block of post.body) {
      if (block.type !== "h2" && block.type !== "h3") continue;
      const id = headingId(block);
      if (!id || anchors.has(id)) throw new Error(`${where}: duplicate heading id "${id}".`);
      anchors.add(id);
    }
    anchorsByPath.set(path, anchors);
  }

  // Internal links must reach a real page, and a real section when they name one. FAQ anchors are
  // question and topic ids; other pages' fragments are checked against the built HTML.
  anchorsByPath.set(
    "/faq",
    new Set(
      faqCategories.flatMap((category) => [category.id, ...category.questions.map((q) => q.id)]),
    ),
  );
  for (const post of posts) {
    const hrefs = [
      ...postTexts(post).flatMap(inlineLinks),
      ...post.body.flatMap((block) => (block.type === "urshop" ? [block.link.href] : [])),
    ];
    for (const href of hrefs) {
      if (!href.startsWith("/")) continue;
      const [path = "", fragment] = href.split("#");
      if (!staticRoutes.includes(path as `/${string}`) && !anchorsByPath.has(path)) {
        throw new Error(`Blog "${post.slug}": link to unknown page "${href}".`);
      }
      const anchors = anchorsByPath.get(path);
      if (fragment && anchors && !anchors.has(fragment)) {
        throw new Error(`Blog "${post.slug}": link to unknown section "${href}".`);
      }
    }
  }

  if (posts.filter((post) => post.featured).length !== 1) {
    throw new Error("Blog: exactly one post must be featured.");
  }
}

/**
 * Content model for UrShop blog articles. Articles are plain typed data, rendered by
 * `components/blog/article-body.tsx`; there is no HTML or Markdown in the data.
 *
 * Inline text (paragraphs, list items, table cells, callouts) supports exactly two marks:
 * - `[anchor text](/path)` for a link. Internal links are checked at build time (see `index.ts`).
 * - `**strong**` for emphasis.
 */
export type InlineText = string;

export type BlogCategoryId =
  "getting-started" | "ecommerce-strategy" | "payments" | "delivery" | "marketing-seo";

export type BlogBlock =
  /** Section heading. `id` is the public anchor (`/blog/slug#id`) and the TOC entry: keep it stable. */
  | { type: "h2"; id: string; text: string }
  /** Sub-heading inside a section. `id` defaults to a slug of the text. */
  | { type: "h3"; text: string; id?: string }
  | { type: "p"; text: InlineText }
  | { type: "ul"; items: ReadonlyArray<InlineText> }
  | { type: "ol"; items: ReadonlyArray<InlineText> }
  /** A list of things to do or check, rendered with check marks. */
  | { type: "checklist"; title?: string; items: ReadonlyArray<InlineText> }
  /** General advice worth pulling out of the flow. */
  | { type: "callout"; tone: "tip" | "warning"; title: string; text: InlineText }
  | {
      type: "table";
      caption: string;
      head: ReadonlyArray<string>;
      rows: ReadonlyArray<ReadonlyArray<InlineText>>;
    }
  /**
   * How UrShop handles the topic. Kept visually separate from general advice so readers can tell
   * them apart. Claims must match `src/data/features.ts`. Use sparingly: one or two per article.
   */
  | { type: "urshop"; text: InlineText; link: { label: string; href: `/${string}` } }
  /**
   * An illustration from `public/images/blog/<slug>/<image>.webp` (see docs/blog-images.md). It
   * renders only once that file exists, so an article reads completely without it.
   */
  | { type: "figure"; image: string; alt: string; caption?: InlineText };

export type BlogPost = {
  /** URL segment: `/blog/<slug>`. Never change once published. */
  slug: string;
  /** Visible H1, Open Graph title and `BlogPosting.headline`. */
  title: string;
  /** `<title>` tag. Keep it close to 60 characters. */
  seoTitle: string;
  /** Meta description, the article deck under the H1 and `BlogPosting.description`. */
  description: string;
  /** One or two sentences for cards. */
  excerpt: string;
  category: BlogCategoryId;
  /** Shown nowhere as a list; used in `BlogPosting.keywords` and Open Graph tags. */
  tags: ReadonlyArray<string>;
  /** Search phrases the article answers. Used by the Resources search, not as meta keywords. */
  keywords: ReadonlyArray<string>;
  /** ISO date (YYYY-MM-DD) the article was first published. */
  publishedAt: string;
  /** ISO date (YYYY-MM-DD) of the last meaningful edit. Change it by hand, never automatically. */
  updatedAt: string;
  /** The blog's lead article. Exactly one post sets it. */
  featured?: boolean;
  /**
   * Alt text for the article's hero image, `public/images/blog/<slug>/hero.webp`. Written before
   * the image exists, so the generated image must match it (docs/blog-images.md). Until the file
   * exists, cards use category artwork and nothing (metadata, structured data) claims an image.
   */
  heroAlt: string;
  /** Three to five one-line points a skimmer can act on, shown above the intro. */
  takeaways: ReadonlyArray<InlineText>;
  /** Opening paragraphs before the first section. */
  intro: ReadonlyArray<InlineText>;
  body: ReadonlyArray<BlogBlock>;
  /** Slugs of the articles shown under "Keep reading", in order. */
  relatedSlugs: ReadonlyArray<string>;
};

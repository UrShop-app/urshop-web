import { siteConfig } from "@/config/site";
import { getBlogStructuredDataImages } from "@/lib/blog-images";
import {
  blogAuthor,
  blogCategories,
  getBlogPostPath,
  getBlogPostWordCount,
  type BlogPost,
} from "@/data/blog";

/** An absolute URL on the canonical origin, for structured data. */
export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

/** UrShop as the publisher of everything on this site. No logo: there's no stable logo URL yet. */
export const publisherJsonLd = {
  "@type": "Organization",
  name: siteConfig.name,
  url: absoluteUrl("/"),
} as const;

export type Breadcrumb = { name: string; path: string };

/** `BreadcrumbList` matching the visible breadcrumb trail, in order. */
export function breadcrumbJsonLd(items: ReadonlyArray<Breadcrumb>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** JSON for a `<script type="application/ld+json">`, with `<` escaped so it can't close the tag. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Shared `@id` linking each article to the blog it belongs to. */
const BLOG_ID = absoluteUrl("/blog#blog");

/** `BlogPosting` for an article. Every value is shown on the page (headline = H1, deck, dates). */
export function blogPostingJsonLd(post: BlogPost) {
  const url = absoluteUrl(getBlogPostPath(post.slug));
  const images = getBlogStructuredDataImages(post);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: blogAuthor.name, url: absoluteUrl(blogAuthor.href) },
    publisher: publisherJsonLd,
    // Only real images that exist; never a placeholder.
    ...(images.length ? { image: images } : {}),
    articleSection: blogCategories[post.category].label,
    keywords: post.tags.join(", "),
    wordCount: getBlogPostWordCount(post),
    inLanguage: "en",
    isPartOf: { "@type": "Blog", "@id": BLOG_ID },
  };
}

/** `Blog` for the index page, listing the articles it shows. */
export function blogJsonLd({
  name,
  description,
  posts,
}: {
  name: string;
  description: string;
  posts: ReadonlyArray<BlogPost>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": BLOG_ID,
    name,
    description,
    url: absoluteUrl("/blog"),
    inLanguage: "en",
    publisher: publisherJsonLd,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(getBlogPostPath(post.slug)),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
    })),
  };
}

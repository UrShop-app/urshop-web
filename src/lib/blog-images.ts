import fs from "node:fs";
import path from "node:path";

import { siteConfig } from "@/config/site";
import type { BlogBlock, BlogPost } from "@/data/blog";

/**
 * Blog images live in `public/images/blog/<slug>/` with fixed names and sizes
 * (docs/blog-images.md), so adding one is a file drop, no code change. Each image is used only
 * once its file exists; until then the page, metadata and structured data claim no image.
 *
 * They're in `public/` rather than `src/assets` so their URLs are stable (not hashed), which
 * social previews and structured data need. Pages are prerendered, so the file checks below run
 * at build time only. Server-only: never import this from a client component.
 */
export const BLOG_IMAGE_ROOT = "/images/blog";

export const blogImageSpecs = {
  hero: { file: "hero.webp", width: 1600, height: 900 },
  og: { file: "og.jpg", width: 1200, height: 630 },
  square: { file: "square.jpg", width: 1200, height: 1200 },
  fourThree: { file: "four-three.jpg", width: 1200, height: 900 },
  figure: { width: 1600, height: 900 },
} as const;

export type BlogImage = { src: `/${string}`; width: number; height: number; alt: string };

function publicFileExists(src: string) {
  return fs.existsSync(path.join(/* turbopackIgnore: true */ process.cwd(), "public", src));
}

function find(src: `/${string}`, width: number, height: number, alt: string) {
  return publicFileExists(src) ? ({ src, width, height, alt } satisfies BlogImage) : undefined;
}

function postImage(post: BlogPost, kind: "hero" | "og" | "square" | "fourThree") {
  const { file, width, height } = blogImageSpecs[kind];
  return find(`${BLOG_IMAGE_ROOT}/${post.slug}/${file}`, width, height, post.heroAlt);
}

/** The article's hero, also used on its cards. */
export function getBlogHeroImage(post: BlogPost) {
  return postImage(post, "hero");
}

export type BlogCardImageKind = "hero" | "square" | "fourThree";

/** One of the article's images by shape, for cards and thumbnails; falls back to the hero. */
export function getBlogCardImage(post: BlogPost, kind: BlogCardImageKind) {
  return postImage(post, kind) ?? getBlogHeroImage(post);
}

/** Social preview: the dedicated 1200×630 image, else the hero. */
export function getBlogSocialImage(post: BlogPost) {
  return postImage(post, "og") ?? getBlogHeroImage(post);
}

/** Available representative images (1:1, 4:3, 16:9), in that order, for structured data. */
export function getBlogStructuredDataImages(post: BlogPost): ReadonlyArray<string> {
  return [postImage(post, "square"), postImage(post, "fourThree"), postImage(post, "hero")].flatMap(
    (image) => (image ? [new URL(image.src, siteConfig.url).toString()] : []),
  );
}

export function getBlogFigureImage(post: BlogPost, figure: Extract<BlogBlock, { type: "figure" }>) {
  const { width, height } = blogImageSpecs.figure;
  return find(`${BLOG_IMAGE_ROOT}/${post.slug}/${figure.image}.webp`, width, height, figure.alt);
}

/** Optional social preview for the /blog index page. */
export function getBlogIndexSocialImage() {
  const { width, height } = blogImageSpecs.og;
  return find(`${BLOG_IMAGE_ROOT}/og-blog.jpg`, width, height, "UrShop Blog");
}

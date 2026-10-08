import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

/** Open Graph defaults, also used by the root layout for pages without their own metadata. */
export const sharedOpenGraph = {
  type: "website",
  siteName: siteConfig.name,
} satisfies Metadata["openGraph"];

type PageMetadataOptions = {
  /** Route path, e.g. "/pricing". Resolved against the production origin. */
  path: `/${string}`;
  title: string;
  description: string;
  /** Social preview image, only when a real one exists. */
  image?: SocialImage;
};

type SocialImage = { src: string; width: number; height: number; alt: string };

function socialImages(image: SocialImage | undefined) {
  return image
    ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }]
    : undefined;
}

/**
 * Metadata for a public page: title, description, canonical URL and a complete Open Graph
 * object (Next.js replaces nested objects like `openGraph` between segments instead of merging
 * them). Relative URLs resolve against `metadataBase` (siteConfig.url) set in the root layout.
 */
export function pageMetadata({ path, title, description, image }: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...sharedOpenGraph, url: path, title, description, images: socialImages(image) },
    ...(image ? { twitter: { card: "summary_large_image", images: socialImages(image) } } : {}),
  };
}

type ArticleMetadataOptions = PageMetadataOptions & {
  /** Headline for social cards, usually the H1 (the `<title>` can carry the site name). */
  socialTitle: string;
  /** ISO dates. */
  publishedTime: string;
  modifiedTime: string;
  section: string;
  tags: ReadonlyArray<string>;
  authors: ReadonlyArray<string>;
};

/** `pageMetadata` for an article: Open Graph `article` with its dates, plus Twitter card text. */
export function articleMetadata({
  path,
  title,
  description,
  image,
  socialTitle,
  publishedTime,
  modifiedTime,
  section,
  tags,
  authors,
}: ArticleMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...sharedOpenGraph,
      type: "article",
      url: path,
      title: socialTitle,
      description,
      publishedTime,
      modifiedTime,
      section,
      tags: [...tags],
      authors: [...authors],
      images: socialImages(image),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: socialImages(image),
    },
    // Let search engines show a large preview image (Google Discover and image-rich results).
    robots: { "max-image-preview": "large" },
  };
}

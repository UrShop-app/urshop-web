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
};

/**
 * Metadata for a public page: title, description, canonical URL and a complete Open Graph
 * object (Next.js replaces nested objects like `openGraph` between segments instead of merging
 * them). Relative URLs resolve against `metadataBase` (siteConfig.url) set in the root layout.
 */
export function pageMetadata({ path, title, description }: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...sharedOpenGraph, url: path, title, description },
  };
}

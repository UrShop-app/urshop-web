import type { MetadataRoute } from "next";

import { staticRoutes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { getAllBlogPosts, getBlogPostPath } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({ url: new URL(route, siteConfig.url).toString() })),
    // Every article, automatically; `updatedAt` is edited by hand, so it's a truthful date.
    ...getAllBlogPosts().map((post) => ({
      url: new URL(getBlogPostPath(post.slug), siteConfig.url).toString(),
      lastModified: post.updatedAt,
    })),
  ];
}

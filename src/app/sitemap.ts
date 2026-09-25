import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

// Add each public page here when it ships.
const routes = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: new URL(route, siteConfig.url).toString() }));
}

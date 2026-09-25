import type { MetadataRoute } from "next";

import { legalDocumentList } from "@/config/legal";
import { siteConfig } from "@/config/site";

// Add each public page here when it ships.
const routes = ["/", "/features", "/about", ...legalDocumentList.map((document) => document.path)];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: new URL(route, siteConfig.url).toString() }));
}

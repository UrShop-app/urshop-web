import { legalDocumentList } from "@/config/legal";

/**
 * Every public page with a fixed path. The sitemap lists these (plus one entry per blog
 * article), and the blog checks its internal links against them. Add each public page here when
 * it ships.
 */
export const staticRoutes: ReadonlyArray<`/${string}`> = [
  "/",
  "/features",
  "/themes",
  "/integrations",
  "/security",
  "/faq",
  "/resources",
  "/blog",
  "/about",
  "/partners",
  "/contact",
  "/report",
  "/feature-request",
  ...legalDocumentList.map((document) => document.path),
];

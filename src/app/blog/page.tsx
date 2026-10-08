import { BlogClosingCta } from "@/components/blog/closing-cta";
import { FeaturedPost } from "@/components/blog/featured-post";
import { BlogHero } from "@/components/blog/index-hero";
import { LatestPosts } from "@/components/blog/latest-posts";
import { BlogTopics } from "@/components/blog/topics";
import { AmbientBackdrop } from "@/components/layout/ambient-backdrop";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/ui/json-ld";
import { getAllBlogPosts, getFeaturedBlogPost, getLatestBlogPosts } from "@/data/blog";
import { getBlogIndexSocialImage } from "@/lib/blog-images";
import { pageMetadata } from "@/lib/metadata";
import { blogJsonLd } from "@/lib/structured-data";

const title = "UrShop Blog: Ecommerce Guides for Bangladesh Sellers";
const description =
  "Practical guides for selling online in Bangladesh: starting a store, Facebook vs a website, bKash and cash on delivery, choosing a courier and ecommerce SEO.";

export const metadata = pageMetadata({
  path: "/blog",
  title,
  description,
  image: getBlogIndexSocialImage(),
});

export default function BlogPage() {
  const featured = getFeaturedBlogPost();

  return (
    // `overflow-x-clip` (not hidden) keeps the root the scroll container for `.reveal`.
    <div className="relative overflow-x-clip bg-[#FAFBFD] text-slate-900 selection:bg-brand-light selection:text-brand-dark">
      <JsonLd data={blogJsonLd({ name: "UrShop Blog", description, posts: getAllBlogPosts() })} />
      <AmbientBackdrop />

      <SiteHeader />

      <main className="relative z-10 w-full pt-[116px]">
        <BlogHero />
        <FeaturedPost post={featured} />
        <LatestPosts posts={getLatestBlogPosts(Infinity, { exclude: [featured.slug] })} />
        <BlogTopics />
        <BlogClosingCta />
      </main>

      <SiteFooter />
    </div>
  );
}

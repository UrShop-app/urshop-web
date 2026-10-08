import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/blog/article-body";
import { ArticleFooter, KeyTakeaways } from "@/components/blog/article-extras";
import { ArticleHeader, Breadcrumbs } from "@/components/blog/article-header";
import { BlogClosingCta } from "@/components/blog/closing-cta";
import { RelatedPosts } from "@/components/blog/related-posts";
import { ShareLinks } from "@/components/blog/share-links";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/ui/json-ld";
import { TableOfContents } from "@/components/ui/table-of-contents";
import {
  blogAuthor,
  blogCategories,
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostPath,
  getBlogPostSections,
  getRelatedBlogPosts,
} from "@/data/blog";
import { getBlogHeroImage, getBlogSocialImage } from "@/lib/blog-images";
import { articleMetadata } from "@/lib/metadata";
import { absoluteUrl, blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

// Every article is prerendered at build time; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getBlogPostBySlug((await params).slug);
  if (!post) return {};
  return articleMetadata({
    path: getBlogPostPath(post.slug),
    image: getBlogSocialImage(post),
    title: post.seoTitle,
    socialTitle: post.title,
    description: post.description,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    section: blogCategories[post.category].label,
    tags: post.tags,
    authors: [blogAuthor.name],
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getBlogPostBySlug((await params).slug);
  if (!post) notFound();

  const path = getBlogPostPath(post.slug);
  const url = absoluteUrl(path);
  const hero = getBlogHeroImage(post);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: path },
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#FAFBFD] text-slate-900 selection:bg-brand-light selection:text-brand-dark">
      <JsonLd data={blogPostingJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd(breadcrumbs.map(({ name, href }) => ({ name, path: href })))}
      />
      <div className="reading-progress print:hidden" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(8,192,216,0.12),transparent)]"
        aria-hidden="true"
      />

      <div className="print:hidden">
        <SiteHeader />
      </div>

      <main id="top" className="relative z-10 w-full pt-[104px] md:pt-[128px] print:pt-0">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-6xl pt-4 print:hidden">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          {/* Columns: contents | article | share rail (xl). The header sits over the article
              column, so the H1 lines up with the text. */}
          <article className="mx-auto mt-8 grid max-w-6xl gap-x-12 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_2.5rem]">
            <div className="lg:col-start-2">
              <ArticleHeader post={post} url={url} />
              {hero ? (
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  width={hero.width}
                  height={hero.height}
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1280px) 760px, (min-width: 1024px) calc(100vw - 25rem), calc(100vw - 2rem)"
                  className="mt-8 aspect-video w-full rounded-3xl border border-slate-200 bg-slate-100 object-cover"
                />
              ) : null}
            </div>

            <aside className="mt-8 lg:col-start-1 lg:row-start-1 lg:row-end-3 lg:mt-0 print:hidden">
              <TableOfContents entries={getBlogPostSections(post)} />
            </aside>

            <div className="mt-8 rounded-card border border-slate-200 bg-white px-5 py-8 shadow-sm sm:px-10 sm:py-12 lg:col-start-2 print:border-0 print:p-0 print:shadow-none">
              <KeyTakeaways post={post} />
              <ArticleBody post={post} />
              <ArticleFooter post={post} url={url} />
            </div>

            <aside
              aria-label="Share"
              className="hidden xl:col-start-3 xl:row-start-2 xl:mt-8 xl:block print:hidden"
            >
              <div className="sticky top-36 flex flex-col items-center gap-3">
                <span className="text-[10px] font-bold tracking-[0.16em] text-slate-400 uppercase [writing-mode:vertical-rl]">
                  Share
                </span>
                <ShareLinks url={url} title={post.title} layout="rail" />
              </div>
            </aside>
          </article>
        </div>

        <div className="print:hidden">
          <RelatedPosts posts={getRelatedBlogPosts(post)} />
          <BlogClosingCta />
        </div>
      </main>

      <div className="print:hidden">
        <SiteFooter />
      </div>
    </div>
  );
}

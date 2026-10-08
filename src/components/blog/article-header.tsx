import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { blogAuthor, blogCategories, getBlogPostReadingTime, type BlogPost } from "@/data/blog";

import { AuthorMark } from "./article-extras";
import { BlogDate, CategoryLabel } from "./post-meta";
import { ShareLinks } from "./share-links";

export type BreadcrumbLink = { name: string; href: string };

/** Visible breadcrumb trail. Keep it identical to the page's `BreadcrumbList` structured data. */
export function Breadcrumbs({ items }: { items: ReadonlyArray<BreadcrumbLink> }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex min-w-0 items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="line-clamp-1 text-slate-700">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="font-semibold text-slate-600 transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
                  >
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="text-slate-300">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Category, H1, deck, byline and share row: compact, so the article starts above the fold. */
export function ArticleHeader({ post, url }: { post: BlogPost; url: string }) {
  const isUpdated = post.updatedAt !== post.publishedAt;
  return (
    <header>
      <span className="inline-flex items-center gap-2 rounded-full bg-brand-light/70 px-3 py-1">
        <Icon name={blogCategories[post.category].icon} className="text-brand-dark" />
        <CategoryLabel post={post} />
      </span>
      <h1 className="mt-4 text-3xl leading-[1.15] font-extrabold tracking-tight text-balance text-slate-900 sm:text-4xl lg:text-[2.75rem]">
        {post.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{post.description}</p>
      <div className="mt-7 flex flex-col gap-5 border-y border-slate-200 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <AuthorMark />
          <div className="text-sm leading-snug">
            <Link
              href={blogAuthor.href}
              className="font-bold text-slate-900 transition-colors hover:text-brand-dark"
            >
              {blogAuthor.name}
            </Link>
            <p className="flex flex-wrap gap-x-1.5 text-slate-500">
              <span>
                <span className="sr-only">Published </span>
                <BlogDate date={post.publishedAt} />
              </span>
              {isUpdated ? (
                <span>
                  · Updated <BlogDate date={post.updatedAt} />
                </span>
              ) : null}
              <span aria-hidden="true">·</span>
              <span>{getBlogPostReadingTime(post)} min read</span>
            </p>
          </div>
        </div>
        {/* From xl the share buttons move to the sticky rail beside the article. */}
        <ShareLinks url={url} title={post.title} className="xl:hidden print:hidden" />
      </div>
    </header>
  );
}

import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import {
  blogCategories,
  getBlogCategoriesInUse,
  getBlogPostPath,
  getBlogPostsByCategory,
} from "@/data/blog";

/** Every article by topic. Only topics with articles are listed; no filters, no archive pages. */
export function BlogTopics() {
  return (
    <section aria-labelledby="blog-topics-heading" className="relative px-6 py-14 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <h2
          id="blog-topics-heading"
          className="reveal text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
        >
          Browse by topic
        </h2>
        <ul className="reveal mt-8 grid gap-x-10 gap-y-6 border-t border-slate-200 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {getBlogCategoriesInUse().map((categoryId) => {
            const category = blogCategories[categoryId];
            return (
              <li key={categoryId}>
                <h3 className="flex items-center gap-2.5 text-sm font-bold tracking-[0.12em] text-slate-500 uppercase">
                  <Icon name={category.icon} className="text-brand" />
                  {category.label}
                </h3>
                <ul className="mt-3 space-y-2">
                  {getBlogPostsByCategory(categoryId).map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={getBlogPostPath(post.slug)}
                        className="font-semibold text-slate-800 underline decoration-slate-200 underline-offset-4 transition-colors hover:text-brand-dark hover:decoration-brand-dark"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import type { BlogPost } from "@/data/blog";
import { cn } from "@/lib/utils";

import { PostCard } from "./post-card";
import { blogCardId } from "./post-meta";

/** How many of the newest articles get a large image card; the rest are compact rows. */
const LARGE_CARDS = 2;

/** The rest of the library, newest first, as a two-tier bento: large image cards, then rows. */
export function LatestPosts({ posts }: { posts: ReadonlyArray<BlogPost> }) {
  return (
    <section aria-labelledby="latest-posts-heading" className="relative px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex items-end justify-between gap-6">
          <div>
            <span className="liquid-pill inline-flex items-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
              Latest
            </span>
            <h2
              id="latest-posts-heading"
              className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              Latest articles
            </h2>
          </div>
          <p className="hidden text-sm font-semibold text-slate-500 sm:block">
            {posts.length} {posts.length === 1 ? "article" : "articles"}
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {posts.map((post, index) => {
            const isLarge = index < LARGE_CARDS;
            return (
              <li key={post.slug} className={cn("reveal", index % 2 === 1 && "reveal-delay-1")}>
                <PostCard
                  post={post}
                  id={blogCardId(post)}
                  layout={isLarge ? "stacked" : "row"}
                  className="scroll-mt-32"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

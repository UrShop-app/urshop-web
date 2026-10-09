import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { Icon } from "@/components/ui/icon";
import { PauseOffscreen } from "@/components/ui/pause-offscreen";
import {
  blogCategories,
  getAllBlogPosts,
  getBlogCategoriesInUse,
  getBlogPostReadingTime,
  getBlogPostsByCategory,
  getFeaturedBlogPost,
  getLatestBlogPosts,
  type BlogPost,
} from "@/data/blog";
import { getBlogCardImage } from "@/lib/blog-images";

import { BlogDate, blogCardId } from "./post-meta";

const STACK_POSITIONS = ["back-left", "back-right", "front"] as const;

/**
 * Three article illustrations fanned out like prints on a desk, drifting gently and spreading on
 * hover. Decorative: every article is linked properly further down the page.
 */
function CoverStack({ posts }: { posts: ReadonlyArray<BlogPost> }) {
  return (
    <PauseOffscreen className="blog-stack relative mx-auto aspect-[5/4] w-full max-w-[480px] lg:mt-6">
      {/* `absolute inset-0`: the entrance animation transforms this wrapper, which makes it the
          cards' containing block, so it must cover the whole stack box. */}
      <div aria-hidden="true" className="absolute inset-0">
        <span className="absolute inset-[12%] rounded-full bg-brand/25 blur-3xl" />
        {posts.map((post, index) => {
          const image = getBlogCardImage(post, "fourThree");
          const position = STACK_POSITIONS[index]!;
          return (
            <div
              key={post.slug}
              data-pos={position}
              className="blog-stack-card absolute w-[68%] overflow-clip rounded-[22px] border-4 border-white bg-white shadow-[0_30px_60px_-24px_rgba(2,132,199,0.45)]"
              style={{ "--i": index } as CSSProperties}
            >
              {image ? (
                <Image
                  src={image.src}
                  alt=""
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 360px, 68vw"
                  loading={position === "front" ? "eager" : "lazy"}
                  fetchPriority={position === "front" ? "high" : "auto"}
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <span className="block aspect-[4/3] bg-linear-to-br from-slate-900 to-sky-950" />
              )}
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 py-1 pr-3 pl-1.5 text-[11px] font-bold text-slate-700 shadow-sm backdrop-blur">
                <span className="grid size-6 place-items-center rounded-full bg-brand text-white">
                  <Icon name={blogCategories[post.category].icon} className="scale-[0.6]" />
                </span>
                {blogCategories[post.category].label}
              </span>
            </div>
          );
        })}
      </div>
    </PauseOffscreen>
  );
}

/** Blog index hero: headline, honest library facts, topic links and the cover stack. */
export function BlogHero() {
  const posts = getAllBlogPosts();
  const featured = getFeaturedBlogPost();
  // The featured guide lies on top.
  const stack = [...getLatestBlogPosts(2, { exclude: [featured.slug] }), featured];
  const totalMinutes = posts.reduce((sum, post) => sum + getBlogPostReadingTime(post), 0);
  const lastUpdated = posts
    .map((post) => post.updatedAt)
    .sort()
    .at(-1)!;
  const topics = getBlogCategoriesInUse().map((id) => ({
    id,
    ...blogCategories[id],
    first: getBlogPostsByCategory(id)[0]!,
  }));

  return (
    <section
      aria-labelledby="blog-hero-heading"
      className="relative px-6 pt-12 pb-16 sm:pt-16 lg:px-12 lg:pb-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10">
        <div className="text-center lg:text-left">
          <span
            className="blog-rise liquid-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none"
            style={{ "--d": 0 } as CSSProperties}
          >
            <span className="size-2 rounded-full bg-brand" aria-hidden="true" />
            UrShop Blog
          </span>
          <h1
            id="blog-hero-heading"
            className="blog-rise mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-6xl"
            style={{ "--d": 1 } as CSSProperties}
          >
            Ecommerce guides for{" "}
            <span className="blog-underline relative inline-block whitespace-nowrap">
              <span className="relative z-10">Bangladesh</span>
            </span>
          </h1>
          <p
            className="blog-rise mx-auto mt-5 max-w-md text-base text-slate-600 sm:text-lg lg:mx-0"
            style={{ "--d": 2 } as CSSProperties}
          >
            Sell, ship and get found online.
          </p>
          <p
            className="blog-rise mt-4 text-sm font-medium text-slate-500"
            style={{ "--d": 3 } as CSSProperties}
          >
            {posts.length} guides
            <span aria-hidden="true"> · </span>
            {totalMinutes} min of reading
            <span aria-hidden="true"> · </span>
            Updated <BlogDate date={lastUpdated} />
          </p>

          <nav aria-label="Topics" className="blog-rise mt-8" style={{ "--d": 4 } as CSSProperties}>
            <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {topics.map((topic) => (
                <li key={topic.id}>
                  <Link
                    href={`#${blogCardId(topic.first)}`}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 py-1.5 pr-3.5 pl-2 text-sm font-semibold text-slate-700 shadow-[0_4px_12px_-6px_rgba(15,23,42,0.12)] backdrop-blur transition-[border-color,color,translate] duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark motion-reduce:hover:translate-y-0"
                  >
                    <Icon
                      name={topic.icon}
                      className="scale-[0.75] text-brand transition-transform duration-300 group-hover:scale-90"
                    />
                    {topic.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <CoverStack posts={stack} />
      </div>
    </section>
  );
}

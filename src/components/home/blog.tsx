import Link from "next/link";

import { PostCard } from "@/components/blog/post-card";
import { Icon } from "@/components/ui/icon";
import { getFeaturedBlogPost, getLatestBlogPosts } from "@/data/blog";

/** Home page: the cornerstone guide plus the two newest articles, with a link to the blog. */
export function BlogPreview() {
  const featured = getFeaturedBlogPost();
  const posts = [featured, ...getLatestBlogPosts(2, { exclude: [featured.slug] })];

  return (
    <section aria-labelledby="home-blog-heading" className="relative px-6 py-24 lg:px-12" id="blog">
      <div className="mx-auto max-w-5xl">
        <div className="reveal mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="liquid-pill mb-1 inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
              BLOG
            </span>
            <h2
              id="home-blog-heading"
              className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl"
            >
              From the UrShop Blog
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Practical guides for building and growing an online business.
            </p>
          </div>
          <Link
            href="/blog"
            className="group inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-bold text-brand-dark transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark md:self-auto"
          >
            View all articles
            <Icon
              name="arrow_forward"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {posts.map((post, index) => (
            <li key={post.slug} className={index === 0 ? "reveal" : "reveal reveal-delay-1"}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

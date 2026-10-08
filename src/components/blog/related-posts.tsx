import type { BlogPost } from "@/data/blog";

import { PostCard } from "./post-card";

/** "Keep reading": articles picked by `getRelatedBlogPosts` (explicit links first, never random). */
export function RelatedPosts({ posts }: { posts: ReadonlyArray<BlogPost> }) {
  if (posts.length === 0) return null;
  return (
    <section
      aria-labelledby="related-posts-heading"
      className="relative px-4 py-16 sm:px-6 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="related-posts-heading"
          className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
        >
          Keep reading
        </h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { SectionHeading } from "@/components/ui/section-heading";
import type { BlogPost } from "@/data/blog";

import { PostCard } from "./post-card";

/** The rest of the library, newest first: the first two with artwork, the others compact. */
export function LatestPosts({ posts }: { posts: ReadonlyArray<BlogPost> }) {
  const [lead, rest] = [posts.slice(0, 2), posts.slice(2)];
  return (
    <section aria-labelledby="latest-posts-heading" className="relative px-6 py-14 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="latest-posts-heading"
          eyebrow="Latest"
          title="Latest articles"
          className="reveal"
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {lead.map((post) => (
            <li key={post.slug} className="reveal">
              <PostCard post={post} />
            </li>
          ))}
          {rest.map((post) => (
            <li key={post.slug} className="reveal reveal-delay-1">
              <PostCard post={post} showArt={false} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

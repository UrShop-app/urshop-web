import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { getBlogPostPath, type BlogPost } from "@/data/blog";
import { cn } from "@/lib/utils";

import { PostArt } from "./post-art";
import { CategoryLabel, PostCardMeta } from "./post-meta";

/**
 * An article card for the blog index, the home page and "Keep reading". The title is the link
 * (descriptive anchor text for crawlers and screen readers), stretched over the whole card.
 */
export function PostCard({
  post,
  headingLevel: Heading = "h3",
  showArt = true,
  className,
}: {
  post: BlogPost;
  headingLevel?: "h2" | "h3";
  showArt?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "liquid-glass-card glass-lift group relative flex h-full flex-col overflow-clip transition-[box-shadow,translate] duration-300 focus-within:-translate-y-0.5 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
      style={{ borderRadius: "24px" }}
    >
      {showArt ? <PostArt post={post} className="aspect-[16/8] w-full" /> : null}
      <div className="flex flex-1 flex-col p-6">
        <CategoryLabel post={post} />
        <Heading className="mt-2.5 text-lg leading-snug font-extrabold tracking-tight text-balance text-slate-900">
          <Link
            href={getBlogPostPath(post.slug)}
            className="after:absolute after:inset-0 after:rounded-[24px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand-dark"
          >
            {post.title}
          </Link>
        </Heading>
        <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <PostCardMeta post={post} />
          <Icon
            name="arrow_forward"
            className="text-slate-300 transition-[color,translate] duration-300 group-hover:translate-x-0.5 group-hover:text-brand motion-reduce:transition-none"
          />
        </div>
      </div>
    </article>
  );
}

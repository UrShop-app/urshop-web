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
  layout = "stacked",
  id,
  className,
}: {
  post: BlogPost;
  headingLevel?: "h2" | "h3";
  showArt?: boolean;
  /** `stacked`: image above the text. `row`: a square thumbnail beside it. */
  layout?: "stacked" | "row";
  /** Fragment id, e.g. for the blog's topic links. */
  id?: string;
  className?: string;
}) {
  const isRow = layout === "row";
  return (
    <article
      id={id}
      className={cn(
        "liquid-glass-card glass-lift group blog-target relative flex h-full overflow-clip transition-[box-shadow,translate] duration-300 focus-within:-translate-y-0.5 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        isRow ? "flex-row items-stretch" : "flex-col",
        className,
      )}
      style={{ borderRadius: "24px" }}
    >
      {showArt ? (
        isRow ? (
          <PostArt
            post={post}
            kind="square"
            sizes="(min-width: 640px) 176px, 112px"
            className="my-3 ml-3 aspect-square w-24 shrink-0 self-center rounded-[16px] sm:m-0 sm:w-44 sm:self-stretch sm:rounded-none"
          />
        ) : (
          <PostArt post={post} className="aspect-[16/8] w-full" />
        )
      ) : null}
      <div className={cn("flex flex-1 flex-col", isRow ? "min-w-0 p-4 sm:p-6" : "p-6")}>
        <CategoryLabel post={post} />
        <Heading
          className={cn(
            "mt-2.5 leading-snug font-extrabold tracking-tight text-balance text-slate-900 transition-colors duration-300 group-hover:text-brand-dark",
            isRow ? "text-base sm:text-lg" : "text-lg",
          )}
        >
          <Link
            href={getBlogPostPath(post.slug)}
            className="after:absolute after:inset-0 after:rounded-[24px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand-dark"
          >
            {post.title}
          </Link>
        </Heading>
        <p
          className={cn(
            "mt-2.5 text-sm leading-relaxed text-slate-600",
            isRow && "hidden sm:line-clamp-2",
          )}
        >
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <PostCardMeta post={post} />
          <span className="grid size-8 place-items-center rounded-full bg-slate-100 text-slate-400 transition-[background-color,color,translate] duration-300 group-hover:translate-x-0.5 group-hover:bg-brand group-hover:text-white motion-reduce:transition-none">
            <Icon name="arrow_forward" />
          </span>
        </div>
      </div>
    </article>
  );
}

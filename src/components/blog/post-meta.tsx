import { blogCategories, getBlogPostReadingTime, type BlogPost } from "@/data/blog";
import { cn } from "@/lib/utils";

const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });

/** An ISO date (YYYY-MM-DD) as readable text inside a machine-readable `<time>`. */
export function BlogDate({ date }: { date: string }) {
  return <time dateTime={date}>{dateFormat.format(new Date(`${date}T00:00:00Z`))}</time>;
}

/** Small uppercase category label. */
export function CategoryLabel({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <span
      className={cn("text-[11px] font-bold tracking-[0.14em] text-brand-dark uppercase", className)}
    >
      {blogCategories[post.category].label}
    </span>
  );
}

/** "Oct 9, 2026 · 7 min read" for cards. */
export function PostCardMeta({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <p className={cn("text-xs font-medium text-slate-500", className)}>
      <BlogDate date={post.publishedAt} />
      <span aria-hidden="true"> · </span>
      {getBlogPostReadingTime(post)} min read
    </p>
  );
}

/** Fragment id of an article's card on the blog index (the hero's topic links jump to it). */
export function blogCardId(post: BlogPost) {
  return `post-${post.slug}`;
}

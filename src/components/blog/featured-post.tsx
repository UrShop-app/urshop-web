import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { getBlogPostPath, getBlogPostSections, type BlogPost } from "@/data/blog";

import { CategoryLabel, PostCardMeta } from "./post-meta";

/** How many of the guide's sections to preview. */
const PREVIEW_SECTIONS = 7;

/**
 * The lead article as a large editorial feature. Instead of a stock image, the visual is the
 * guide's own table of contents, linking straight into its sections.
 */
export function FeaturedPost({ post }: { post: BlogPost }) {
  const path = getBlogPostPath(post.slug);
  const sections = getBlogPostSections(post);

  return (
    <section aria-labelledby="featured-post-heading" className="relative px-6 pb-16 lg:px-12">
      <article
        className="liquid-glass-card reveal relative mx-auto grid max-w-6xl gap-10 overflow-clip p-7 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:p-14"
        style={{ borderRadius: "32px" }}
      >
        <div
          className="pointer-events-none absolute -top-32 -left-24 size-96 rounded-full bg-brand-cyan/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <p className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-900 px-3 py-1 text-[12px] font-bold tracking-[0.16em] text-white uppercase">
              Featured guide
            </span>
            <CategoryLabel post={post} />
          </p>
          <h2
            id="featured-post-heading"
            className="mt-5 text-3xl leading-[1.12] font-extrabold tracking-tight text-balance text-slate-900 sm:text-4xl lg:text-5xl"
          >
            <Link
              href={path}
              className="transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark"
            >
              {post.title}
            </Link>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {post.excerpt}
          </p>
          <PostCardMeta post={post} className="mt-5 text-sm" />
          <Link
            href={path}
            className="group mt-8 inline-flex h-11.5 items-center justify-center gap-2 rounded-full bg-slate-900 px-7 text-sm font-bold text-white shadow-[0_12px_28px_-12px_rgba(15,23,42,0.6)] transition-all duration-300 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark active:scale-95"
          >
            Read the guide
            <Icon
              name="arrow_forward"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <nav
          aria-label="Inside this guide"
          className="relative overflow-clip rounded-3xl bg-linear-to-br from-slate-900 via-slate-900 to-sky-950 p-6 text-white shadow-[0_24px_48px_-20px_rgba(2,132,199,0.55)] sm:p-8"
          style={{ borderRadius: "28px" }}
        >
          <span
            className="lead-tile-grid pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full bg-brand/30 blur-3xl"
            aria-hidden="true"
          />
          <p className="relative text-[11px] font-bold tracking-[0.16em] text-white/60 uppercase">
            Inside this guide
          </p>
          <ol className="relative mt-4 space-y-1">
            {sections.slice(0, PREVIEW_SECTIONS).map((section) => (
              <li key={section.id}>
                <Link
                  href={`${path}#${section.id}`}
                  className="group flex items-center gap-3 rounded-xl px-2 py-2 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {section.title.replace(/^\d+\.\s*/, "")}
                </Link>
              </li>
            ))}
          </ol>
          {sections.length > PREVIEW_SECTIONS ? (
            <p className="relative mt-3 px-2 text-xs text-white/55">
              + {sections.length - PREVIEW_SECTIONS} more sections
            </p>
          ) : null}
        </nav>
      </article>
    </section>
  );
}

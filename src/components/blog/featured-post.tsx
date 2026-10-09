import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { blogCategories, getBlogPostPath, getBlogPostSections, type BlogPost } from "@/data/blog";
import { getBlogHeroImage } from "@/lib/blog-images";

import { blogCardId, PostCardMeta } from "./post-meta";

/** How many of the guide's sections to preview. */
const PREVIEW_SECTIONS = 3;

/**
 * The lead article as a compact, image-first story: illustration beside a dark panel with the
 * guide's first sections linking straight into the article.
 */
export function FeaturedPost({ post }: { post: BlogPost }) {
  const path = getBlogPostPath(post.slug);
  const sections = getBlogPostSections(post);
  const image = getBlogHeroImage(post);
  const category = blogCategories[post.category];

  return (
    <section aria-labelledby="featured-post-heading" className="relative px-6 pb-16 lg:px-12">
      <article
        id={blogCardId(post)}
        className="group blog-target relative mx-auto grid max-w-6xl scroll-mt-32 overflow-clip bg-slate-950 text-white shadow-[0_40px_80px_-32px_rgba(2,132,199,0.55)] lg:grid-cols-2"
        style={{ borderRadius: "28px" }}
      >
        <Link
          href={path}
          tabIndex={-1}
          aria-hidden="true"
          className="relative block aspect-[16/9] overflow-clip bg-brand-light lg:aspect-auto"
        >
          {image ? (
            <Image
              src={image.src}
              alt=""
              fill
              sizes="(min-width: 1152px) 576px, (min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : null}
          <span className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-slate-950/85 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.16em] text-white uppercase backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-brand" />
            Featured guide
          </span>
        </Link>

        <div className="relative flex flex-col p-7 sm:p-9">
          <span
            className="lead-tile-grid pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-brand/25 blur-3xl transition-transform duration-1000 group-hover:scale-125"
            aria-hidden="true"
          />
          <p className="relative inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-brand uppercase">
            <Icon name={category.icon} className="scale-[0.75]" />
            {category.label}
          </p>
          <h2
            id="featured-post-heading"
            className="relative mt-3 text-2xl leading-[1.15] font-extrabold tracking-tight text-balance sm:text-[1.75rem]"
          >
            <Link
              href={path}
              className="transition-colors hover:text-brand-cyan focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {post.title}
            </Link>
          </h2>
          <p className="relative mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            {post.excerpt}
          </p>
          <PostCardMeta post={post} className="relative mt-3 text-white/50" />

          <nav aria-label="Inside this guide" className="relative mt-6">
            <p className="text-[11px] font-bold tracking-[0.16em] text-white/45 uppercase">
              Inside this guide
            </p>
            <ol className="mt-3 divide-y divide-white/10 border-y border-white/10">
              {sections.slice(0, PREVIEW_SECTIONS).map((section, index) => (
                <li key={section.id}>
                  <Link
                    href={`${path}#${section.id}`}
                    className="group/item flex items-center gap-3 py-2 text-sm font-semibold text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <span className="font-stat text-xs text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{section.title.replace(/^\d+\.\s*/, "")}</span>
                    <Icon
                      name="arrow_forward"
                      className="scale-75 text-white/30 transition-[color,translate] duration-300 group-hover/item:translate-x-1 group-hover/item:text-brand"
                    />
                  </Link>
                </li>
              ))}
            </ol>
            {sections.length > PREVIEW_SECTIONS ? (
              <p className="mt-2 text-xs text-white/45">
                + {sections.length - PREVIEW_SECTIONS} more sections
              </p>
            ) : null}
          </nav>

          <Link
            href={path}
            className="group/cta relative mt-7 inline-flex h-11 items-center justify-center gap-2 self-start overflow-clip rounded-full bg-white px-7 text-sm font-bold text-slate-950 transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-95"
          >
            <span className="blog-shine pointer-events-none absolute inset-0" aria-hidden="true" />
            Read the guide
            <Icon
              name="arrow_forward"
              className="transition-transform duration-300 group-hover/cta:translate-x-0.5"
            />
          </Link>
        </div>
      </article>
    </section>
  );
}

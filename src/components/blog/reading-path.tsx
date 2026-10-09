import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import {
  blogCategories,
  getBlogPostBySlug,
  getBlogPostPath,
  getBlogPostReadingTime,
} from "@/data/blog";
import { getBlogCardImage } from "@/lib/blog-images";

/** A suggested reading order for someone starting from zero. Every slug must exist. */
const PATH_SLUGS = [
  "how-to-start-online-store-bangladesh",
  "facebook-page-vs-ecommerce-website-bangladesh",
  "bkash-cash-on-delivery-ecommerce-bangladesh",
  "pathao-vs-redx-vs-steadfast-ecommerce-courier",
  "ecommerce-seo-bangladesh",
] as const;

const path = PATH_SLUGS.map((slug) => {
  const post = getBlogPostBySlug(slug);
  if (!post) throw new Error(`Blog reading path: unknown article "${slug}".`);
  return post;
});

/**
 * "Start here": the guides in a sensible order, joined by a line that draws itself as the
 * section scrolls into view (horizontal on desktop, vertical on phones).
 */
export function ReadingPath() {
  const totalMinutes = path.reduce((sum, post) => sum + getBlogPostReadingTime(post), 0);

  return (
    <section aria-labelledby="reading-path-heading" className="relative px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="reading-path-heading"
          eyebrow="Start here"
          title="New to selling online? Read them in order"
          intro={`${path.length} guides, about ${totalMinutes} minutes in total.`}
          className="reveal"
        />

        <div className="blog-path relative mt-12">
          <span className="blog-path-track" aria-hidden="true">
            <span className="blog-path-line" />
          </span>
          <ol className="relative grid gap-6 lg:grid-cols-5 lg:gap-5">
            {path.map((post, index) => {
              const image = getBlogCardImage(post, "square");
              return (
                <li
                  key={post.slug}
                  className="blog-path-step group relative flex gap-4 pl-14 lg:flex-col lg:gap-0 lg:pl-0"
                  style={{ "--i": index } as CSSProperties}
                >
                  <span className="absolute top-0 left-0 z-10 grid size-10 place-items-center rounded-full border-4 border-[#FAFBFD] bg-slate-900 font-stat text-sm font-bold text-white shadow-[0_8px_18px_-6px_rgba(2,132,199,0.6)] transition-colors duration-300 group-hover:bg-brand lg:relative lg:mx-auto">
                    {index + 1}
                  </span>
                  <div className="relative min-w-0 flex-1 lg:mt-5">
                    <div className="liquid-glass-card glass-lift overflow-clip rounded-[22px] transition-[translate] duration-300 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                      {image ? (
                        <div className="relative aspect-[4/3] overflow-clip bg-brand-light/40 lg:aspect-square">
                          <Image
                            src={image.src}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 210px, calc(100vw - 7rem)"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                          />
                        </div>
                      ) : null}
                      <div className="p-4">
                        <p className="text-[10px] font-bold tracking-[0.14em] text-brand-dark uppercase">
                          {blogCategories[post.category].label}
                        </p>
                        <h3 className="mt-1.5 text-sm leading-snug font-bold text-slate-900">
                          <Link
                            href={getBlogPostPath(post.slug)}
                            className="after:absolute after:inset-0 after:rounded-[22px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand-dark"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        <p className="mt-2 text-xs text-slate-500">
                          {getBlogPostReadingTime(post)} min read
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

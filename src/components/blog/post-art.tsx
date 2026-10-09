import Image from "next/image";

import { Icon } from "@/components/ui/icon";
import { blogCategories, type BlogPost } from "@/data/blog";
import { getBlogCardImage, type BlogCardImageKind } from "@/lib/blog-images";
import { cn } from "@/lib/utils";

/**
 * The visual at the top of an article card: the article's own image when it has one, otherwise
 * a branded category tile (no stock photos, no fake screenshots). Decorative either way, since
 * the card's title says what the article is.
 */
export function PostArt({
  post,
  size = "default",
  kind = "hero",
  sizes,
  className,
}: {
  post: BlogPost;
  size?: "default" | "large";
  /** Which shape of the article's images to use (docs/blog-images.md). */
  kind?: BlogCardImageKind;
  /** `sizes` for the image when the default for `size` doesn't fit the layout. */
  sizes?: string;
  className?: string;
}) {
  const category = blogCategories[post.category];
  const image = getBlogCardImage(post, kind);

  if (image) {
    return (
      <div className={cn("relative overflow-clip bg-brand-light/40", className)}>
        <Image
          src={image.src}
          alt=""
          fill
          sizes={
            sizes ??
            (size === "large"
              ? "(min-width: 1024px) 560px, 100vw"
              : "(min-width: 1024px) 360px, 100vw")
          }
          // Slow zoom when the surrounding card (`group`) is hovered.
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate overflow-clip bg-linear-to-br from-slate-900 via-slate-900 to-sky-950",
        className,
      )}
      aria-hidden="true"
    >
      <span className="lead-tile-grid absolute inset-0" />
      <span className="absolute -top-10 -right-10 size-48 rounded-full bg-brand/35 blur-3xl" />
      <span
        className={cn(
          "absolute grid place-items-center rounded-2xl bg-linear-to-br from-brand to-brand-dark text-white shadow-[0_10px_22px_-8px_rgba(8,192,216,0.8)]",
          size === "large" ? "bottom-7 left-7 size-14" : "bottom-5 left-5 size-11",
        )}
      >
        <Icon name={category.icon} />
      </span>
      <span
        className={cn(
          "absolute right-5 bottom-5 font-bold tracking-[0.16em] text-white/45 uppercase",
          size === "large" ? "right-7 bottom-8 text-xs" : "text-[10px]",
        )}
      >
        {category.label}
      </span>
    </div>
  );
}

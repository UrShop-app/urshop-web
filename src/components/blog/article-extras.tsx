import Image from "next/image";
import Link from "next/link";

import icon from "@/assets/icon.png";
import { Icon } from "@/components/ui/icon";
import { blogAuthor, type BlogPost } from "@/data/blog";

import { InlineText } from "./inline-text";
import { BlogDate } from "./post-meta";
import { ShareLinks } from "./share-links";

/** The article's main points, before the intro, for readers who skim. */
export function KeyTakeaways({ post }: { post: BlogPost }) {
  return (
    <aside aria-labelledby="key-takeaways-heading" className="article-takeaways">
      <p id="key-takeaways-heading" className="article-takeaways-title">
        <Icon name="lightbulb" />
        Key takeaways
      </p>
      <ul>
        {post.takeaways.map((takeaway) => (
          <li key={takeaway}>
            <InlineText text={takeaway} />
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** The organisation's mark next to the byline. It's UrShop's logo, not an invented person. */
export function AuthorMark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center overflow-clip rounded-full border border-slate-200 bg-white"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Image src={icon} alt="" sizes={`${size}px`} className="h-auto w-[70%]" />
    </span>
  );
}

/**
 * End of the article: share again, who wrote it (the organisation, described truthfully), when it
 * was last checked, and a way back to the top.
 */
export function ArticleFooter({ post, url }: { post: BlogPost; url: string }) {
  return (
    <footer className="mt-14 space-y-8 border-t border-slate-200 pt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <p className="text-sm font-bold text-slate-900">Found this useful? Share it.</p>
        <ShareLinks url={url} title={post.title} />
      </div>

      <div className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
        <AuthorMark size={48} />
        <div className="text-sm leading-relaxed text-slate-600">
          <p className="font-bold text-slate-900">Written by the {blogAuthor.name}</p>
          <p className="mt-1">
            We build UrShop, an ecommerce platform for selling online in Bangladesh. Our guides aim
            to be useful whether or not you use UrShop.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Last reviewed <BlogDate date={post.updatedAt} />.{" "}
            <Link
              href="/contact"
              className="font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 hover:decoration-brand-dark"
            >
              Spotted something out of date?
            </Link>
          </p>
        </div>
      </div>

      <p className="text-center print:hidden">
        <a
          href="#top"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
        >
          <Icon name="arrow_upward" />
          Back to top
        </a>
      </p>
    </footer>
  );
}

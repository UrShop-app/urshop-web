import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { headingId, type BlogBlock, type BlogPost } from "@/data/blog";
import { getBlogFigureImage } from "@/lib/blog-images";

import { InlineText } from "./inline-text";

type Section = { heading: Extract<BlogBlock, { type: "h2" }>; blocks: BlogBlock[] };

/** Splits the body into one section per h2 (the body always opens with an h2). */
function toSections(body: ReadonlyArray<BlogBlock>): ReadonlyArray<Section> {
  const sections: Section[] = [];
  for (const block of body) {
    if (block.type === "h2") sections.push({ heading: block, blocks: [] });
    else sections.at(-1)?.blocks.push(block);
  }
  return sections;
}

function Block({ post, block }: { post: BlogPost; block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return null;
    case "h3":
      return (
        <h3 id={headingId(block)} className="scroll-mt-28 md:scroll-mt-36">
          <InlineText text={block.text} />
        </h3>
      );
    case "p":
      return (
        <p>
          <InlineText text={block.text} />
        </p>
      );
    case "ul":
    case "ol": {
      const List = block.type;
      return (
        <List>
          {block.items.map((item) => (
            <li key={item}>
              <InlineText text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "checklist":
      return (
        <div className="article-checklist">
          {block.title ? <p className="article-checklist-title">{block.title}</p> : null}
          <ul>
            {block.items.map((item) => (
              <li key={item}>
                <Icon name="check_circle" className="article-checklist-icon" />
                <span>
                  <InlineText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "callout":
      return (
        <aside className="article-callout" data-tone={block.tone}>
          <Icon
            name={block.tone === "warning" ? "info" : "lightbulb"}
            className="article-callout-icon"
          />
          <div>
            <p className="article-callout-title">{block.title}</p>
            <p>
              <InlineText text={block.text} />
            </p>
          </div>
        </aside>
      );
    case "table":
      return (
        // Scrolls sideways inside its own box on narrow screens; the page never does.
        <div className="article-table" role="region" aria-label={block.caption} tabIndex={0}>
          <table>
            <caption>{block.caption}</caption>
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th key={cell} scope="col">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={index} scope="row">
                        <InlineText text={cell} />
                      </th>
                    ) : (
                      <td key={index}>
                        <InlineText text={cell} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "urshop":
      return (
        <aside className="article-urshop" aria-label="How UrShop handles this">
          <p className="article-urshop-label">On UrShop</p>
          <p>
            <InlineText text={block.text} />
          </p>
          <Link href={block.link.href} className="article-urshop-link">
            {block.link.label}
            <Icon name="arrow_forward" />
          </Link>
        </aside>
      );
    case "figure": {
      // Only once the image file exists (docs/blog-images.md); the text stands on its own.
      const image = getBlogFigureImage(post, block);
      if (!image) return null;
      return (
        <figure className="article-figure">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1280px) 680px, (min-width: 640px) calc(100vw - 8rem), calc(100vw - 4.5rem)"
          />
          {block.caption ? (
            <figcaption>
              <InlineText text={block.caption} />
            </figcaption>
          ) : null}
        </figure>
      );
    }
  }
}

/** The article text: intro, then one `<section>` per h2. Pure server markup, no client JS. */
export function ArticleBody({ post }: { post: BlogPost }) {
  return (
    <div className="article-prose">
      <div className="article-intro">
        {post.intro.map((paragraph) => (
          <p key={paragraph}>
            <InlineText text={paragraph} />
          </p>
        ))}
      </div>
      {toSections(post.body).map(({ heading, blocks }) => (
        <section key={heading.id} aria-labelledby={heading.id}>
          <h2 id={heading.id} className="scroll-mt-28 md:scroll-mt-36">
            <InlineText text={heading.text} />
          </h2>
          {blocks.map((block, index) => (
            <Block key={index} post={post} block={block} />
          ))}
        </section>
      ))}
    </div>
  );
}

import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import { INLINE_MARK_PATTERN, type InlineText as InlineTextValue } from "@/data/blog";

/** Article inline text: `[label](href)` becomes a link and `**text**` strong. Nothing else. */
export function InlineText({ text }: { text: InlineTextValue }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE_MARK_PATTERN)) {
    const [whole, label, href, strong] = match;
    if (match.index > last) parts.push(text.slice(last, match.index));
    const key = match.index;
    if (href && label) {
      parts.push(
        href.startsWith("/") ? (
          <Link key={key} href={href}>
            {label}
          </Link>
        ) : (
          <a key={key} href={href} rel="noopener noreferrer">
            {label}
          </a>
        ),
      );
    } else {
      parts.push(<strong key={key}>{strong}</strong>);
    }
    last = match.index + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}

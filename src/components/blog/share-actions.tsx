"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const noop = () => () => {};

/** Copies the article's canonical URL. Feedback is visual and announced to screen readers. */
export function CopyLinkButton({ url, className }: { url: string; className?: string }) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timer = window.setTimeout(() => setIsCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [isCopied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
    } catch {
      // Clipboard unavailable: the address bar still has the link.
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={isCopied ? "Link copied" : "Copy link"}
        title="Copy link"
        className={cn(className, "cursor-pointer")}
      >
        <Icon name={isCopied ? "check" : "link"} />
      </button>
      <span role="status" className="sr-only">
        {isCopied ? "Link copied" : ""}
      </span>
    </>
  );
}

/**
 * The device's own share sheet (Messenger, WhatsApp, imo, saved apps...) where the browser has
 * one, mostly phones. Renders nothing elsewhere, including on the server.
 */
export function NativeShareButton({
  url,
  title,
  className,
}: {
  url: string;
  title: string;
  className?: string;
}) {
  const canShare = useSyncExternalStore(
    noop,
    () => typeof navigator.share === "function",
    () => false,
  );
  if (!canShare) return null;

  const share = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      // The visitor closed the share sheet.
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      aria-label="Share with an app"
      title="Share"
      className={cn(className, "cursor-pointer")}
    >
      <Icon name="share" />
    </button>
  );
}

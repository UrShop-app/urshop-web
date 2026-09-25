"use client";

import { useEffect, useState } from "react";

import { Icon } from "@/components/ui/icon";

/** Copies the address for visitors whose browser has no email app set up for mailto links. */
export function CopyEmailButton({ email }: { email: string }) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timer = window.setTimeout(() => setIsCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [isCopied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
    } catch {
      // Clipboard access denied or unavailable: the address stays on screen to copy by hand.
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="glass-btn inline-flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-full pr-4 pl-3 text-sm font-bold text-slate-700 transition-all duration-300 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
      >
        <Icon name={isCopied ? "check_circle" : "content_copy"} className="text-brand" />
        {isCopied ? "Copied" : "Copy"}
        <span className="sr-only"> email address</span>
      </button>
      <span role="status" className="sr-only">
        {isCopied ? "Email address copied" : ""}
      </span>
    </>
  );
}

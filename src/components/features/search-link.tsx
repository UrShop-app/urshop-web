"use client";

import type { ReactNode } from "react";

import { requestExplorer } from "./explorer-store";

/** Link to the feature search that also focuses the search box when it arrives. */
export function SearchLink({
  children,
  className,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <a
      href="#all-features"
      aria-label={ariaLabel}
      onClick={() => requestExplorer(null, true)}
      className={className}
    >
      {children}
    </a>
  );
}

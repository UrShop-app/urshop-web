"use client";

import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Fixed header that slides away while the site footer (`#site-footer`) is within 280px of
 * the viewport, so it never covers the footer.
 */
export function FloatingHeader({ children }: { children: ReactNode }) {
  const [isNearFooter, setIsNearFooter] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearFooter(entry?.isIntersecting ?? false),
      { rootMargin: "0px 0px 280px 0px", threshold: 0 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      inert={isNearFooter}
      className={cn(
        "fixed top-0 z-50 w-full transition-[translate,opacity,visibility] duration-300 ease-[ease]",
        isNearFooter && "pointer-events-none invisible -translate-y-[110%] opacity-0",
      )}
    >
      {children}
    </header>
  );
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Pauses the looping CSS animations inside it while it is off screen (`.security-pausable` in
 * globals.css). The markup stays server-rendered and is passed in as `children`.
 */
export function PauseOffscreen({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIsInView(entry?.isIntersecting ?? false),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-paused={isInView ? undefined : "true"}
      className={cn("security-pausable", className)}
    >
      {children}
    </div>
  );
}

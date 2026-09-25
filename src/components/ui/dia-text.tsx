"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type DiaTextProps = {
  /** Words shown one after another, looping. */
  words: string[];
  /** Time each word stays on screen, in milliseconds. */
  duration?: number;
  className?: string;
};

/** Rotating word with a slide/blur transition and a brand-colored sweep. */
export function DiaText({ words, duration = 2000, className }: DiaTextProps) {
  const [index, setIndex] = useState(0);
  const wordCount = words.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % wordCount);
    }, duration);

    return () => clearInterval(interval);
  }, [wordCount, duration]);

  return (
    <span
      className={cn(
        "relative inline-block min-w-[2ch] overflow-hidden align-bottom text-black",
        className,
      )}
      style={{ verticalAlign: "bottom" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            filter: { duration: 0.2 },
          }}
          className="absolute inset-0 inline-block"
        >
          <motion.span
            className="inline-block bg-clip-text pb-1"
            style={{
              WebkitTextFillColor: "transparent",
              backgroundImage: "linear-gradient(90deg, currentColor 50%, #08C0D8 100%)",
              backgroundSize: "250% 100%",
            }}
            initial={{ backgroundPosition: "100% 0%" }}
            animate={{ backgroundPosition: "0% 0%" }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
          >
            {words[index]}
          </motion.span>
        </motion.span>
      </AnimatePresence>

      {/* Invisible copy of the current word keeps the layout width stable. */}
      <span className="invisible" aria-hidden="true">
        {words[index]}
      </span>
    </span>
  );
}

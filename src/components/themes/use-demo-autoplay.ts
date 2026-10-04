"use client";

import { useEffect, useState, type RefObject } from "react";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export type DemoAutoplay = {
  /** Step to show. Under reduced motion, `reducedMotionStep` until the visitor takes over. */
  step: number;
  isAutoplayOn: boolean;
  /** Autoplay is on and the demo is on screen, so the current step's timer is running. */
  isPlaying: boolean;
  /** How long the current step lasts while playing, in milliseconds. */
  stepDuration: number;
  reducedMotion: boolean;
  /** The visitor picked a step: show it and stop autoplay. */
  goTo: (step: number) => void;
  /** The visitor changed something else in the demo: stop autoplay where it is. */
  stop: () => void;
  toggleAutoplay: () => void;
};

/**
 * Steps a demo through its frames: `durations[i]` milliseconds on frame `i`, then the next,
 * looping. Plays only while the demo is on screen and never under reduced motion. Any visitor
 * input stops it (they took over); the demo's play button restarts it.
 */
export function useDemoAutoplay(
  /** The demo's root element; autoplay only runs while it is on screen. */
  ref: RefObject<HTMLElement | null>,
  {
    durations,
    reducedMotionStep = 0,
  }: {
    durations: ReadonlyArray<number>;
    reducedMotionStep?: number;
  },
): DemoAutoplay {
  const [step, setStep] = useState(0);
  const [isAutoplayOn, setIsAutoplayOn] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry?.isIntersecting ?? false),
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  const isPlaying = isAutoplayOn && isInView && !reducedMotion;
  const stepCount = durations.length;
  const duration = durations[step] ?? 3000;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setTimeout(
      () => setStep((current) => (current + 1) % stepCount),
      duration,
    );
    return () => window.clearTimeout(timer);
  }, [isPlaying, step, duration, stepCount]);

  return {
    step: reducedMotion && !hasInteracted ? reducedMotionStep : step,
    isAutoplayOn: isAutoplayOn && !reducedMotion,
    isPlaying,
    stepDuration: duration,
    reducedMotion,
    goTo: (next) => {
      setStep(next);
      setIsAutoplayOn(false);
      setHasInteracted(true);
    },
    stop: () => {
      setIsAutoplayOn(false);
      setHasInteracted(true);
    },
    toggleAutoplay: () => {
      setIsAutoplayOn((isOn) => !isOn);
      setHasInteracted(true);
    },
  };
}

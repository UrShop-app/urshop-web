"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

import { MetallicShaderMount, type MetallicShaderUniforms } from "./metallic-shader";

// Brand look of the button. Speeds are the shader's animation rate in each state.
const SHADER_UNIFORMS: MetallicShaderUniforms = {
  colorBack: "#08c0d8",
  colorTint: "#ffffff",
  repetition: 4,
  softness: 0.5,
  angle: 45,
  scale: 8,
  distortion: 0,
  shiftRed: 0.3,
  shiftBlue: 0.3,
};
const IDLE_SPEED = 0.6;
const HOVER_SPEED = 1;
const CLICK_SPEED = 2.4;

const SETTLE = "transition-all duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)]";
const SHADOW_SHIFT = "transition-[box-shadow] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]";
const RIM_PRESSED =
  "shadow-[0px_0px_0px_1px_rgba(255,255,255,0.9),inset_0px_2px_4px_rgba(3,105,161,0.24),0px_2px_8px_0px_rgba(2,132,199,0.2)]";
const RIM_HOVERED =
  "shadow-[0px_0px_0px_1px_rgba(255,255,255,0.95),0px_12px_24px_-4px_rgba(2,132,199,0.32),0px_2px_8px_0px_rgba(8,192,216,0.24),inset_0px_1px_2px_rgba(255,255,255,0.7)]";
const RIM_RESTING =
  "shadow-[0px_0px_0px_1px_rgba(255,255,255,0.92),0px_18px_30px_-8px_rgba(2,132,199,0.24),0px_4px_10px_0px_rgba(8,192,216,0.16),inset_0px_1px_2px_rgba(255,255,255,0.72)]";
const FACE_PRESSED =
  "shadow-[inset_0px_2px_4px_rgba(3,105,161,0.26),inset_0px_1px_2px_rgba(255,255,255,0.35)]";

// `mobile-full-width-*` are hooks for section CSS that stretches the button on small screens.
const SHELL_SIZE = "h-11.5 w-35.5 mobile-full-width-shell";
const FACE_SIZE = "h-10.5 w-34.5 mobile-full-width-face";

type MetallicButtonProps = {
  label: string;
  /** Renders a link (client-side navigation) instead of a button. */
  href?: string;
  onClick?: () => void;
  className?: string;
};

/** Primary call-to-action with an animated liquid-metal (WebGL) rim. */
export function MetallicButton({ label, href, onClick, className }: MetallicButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const mount = useRef<MetallicShaderMount | null>(null);
  const rippleId = useRef(0);
  const isHoveredRef = useRef(false);
  const reducedMotion = usePrefersReducedMotion();

  // Create the WebGL surface once; the initial speed is corrected by the effect below.
  useEffect(() => {
    if (!surfaceRef.current) return;
    mount.current = new MetallicShaderMount(surfaceRef.current, SHADER_UNIFORMS, 0);
    return () => {
      mount.current?.dispose();
      mount.current = null;
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      mount.current?.setSpeed(0);
    } else if (!isHoveredRef.current) {
      mount.current?.setSpeed(IDLE_SPEED);
    }
  }, [reducedMotion]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    isHoveredRef.current = true;
    if (!reducedMotion) mount.current?.setSpeed(HOVER_SPEED);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    isHoveredRef.current = false;
    setIsPressed(false);
    if (!reducedMotion) mount.current?.setSpeed(IDLE_SPEED);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (!reducedMotion) {
      mount.current?.setSpeed(CLICK_SPEED);
      setTimeout(() => {
        mount.current?.setSpeed(isHoveredRef.current ? HOVER_SPEED : IDLE_SPEED);
      }, 300);

      const rect = event.currentTarget.getBoundingClientRect();
      const ripple = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        id: rippleId.current++,
      };
      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
    }

    onClick?.();
  };

  const rippleElements = ripples.map((ripple) => (
    <span
      key={ripple.id}
      className="pointer-events-none absolute size-5 animate-[metallic-button-ripple_0.6s_ease-out] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_70%)]"
      style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
    />
  ));

  const pressShift = isPressed ? "translate-y-px scale-[0.98]" : "translate-y-0 scale-100";

  const interactiveProps = {
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    "aria-label": label,
    className: `absolute top-0 left-0 z-40 translate-z-6.25 cursor-pointer overflow-hidden rounded-full border-none bg-transparent outline-none transform-3d focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand/35 focus-visible:outline-solid ${SHELL_SIZE}`,
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <div className="perspective-[1000px] perspective-origin-[50%_50%]">
        <div className={`relative transform-3d ${SHELL_SIZE}`}>
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute top-0 left-0 z-30 flex translate-z-5 items-center justify-center gap-1.5 transform-3d ${SHELL_SIZE}`}
          >
            <span
              className={`text-sm font-bold whitespace-nowrap text-white [text-shadow:0px_1px_2px_rgba(0,0,0,0.24)] ${SETTLE}`}
            >
              {label}
            </span>
          </div>

          <div
            className={`absolute top-0 left-0 z-20 translate-z-2.5 transform-3d ${SHELL_SIZE} ${pressShift} ${SETTLE}`}
          >
            <div
              className={`m-0.5 rounded-full bg-[linear-gradient(135deg,#08c0d8_0%,#0284c7_100%)] ${FACE_SIZE} ${SHADOW_SHIFT} ${isPressed ? FACE_PRESSED : "shadow-none"}`}
            />
          </div>

          <div
            className={`absolute top-0 left-0 z-10 translate-z-0 transform-3d ${SHELL_SIZE} ${pressShift} ${SETTLE}`}
          >
            <div
              className={`rounded-full bg-transparent ${SHELL_SIZE} ${SHADOW_SHIFT} ${
                isPressed ? RIM_PRESSED : isHovered ? RIM_HOVERED : RIM_RESTING
              }`}
            >
              <div
                ref={surfaceRef}
                className={`metallic-button-canvas relative overflow-hidden rounded-full ${SHELL_SIZE}`}
              />
            </div>
          </div>

          {href ? (
            <Link href={href} {...interactiveProps}>
              {rippleElements}
            </Link>
          ) : (
            <button type="button" {...interactiveProps}>
              {rippleElements}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

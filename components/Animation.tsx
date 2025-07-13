"use client";

import React, { useEffect } from "react";
import type { ReactNode } from "react";

/**
 * Props for the `Animation` component using ScrollReveal.
 */
type AnimationProps = {
  /** Child elements to animate */
  children: ReactNode;

  /** Direction of animation origin: top, bottom, left, or right. Default is "bottom". */
  origin?: "top" | "bottom" | "left" | "right";

  /** Distance the element moves during animation (e.g., "20px"). Default is "20px". */
  distance?: string;

  /** Duration of the animation in milliseconds. Default is 1000ms. */
  duration?: number;

  /** Delay between animating multiple elements with the same class. Default is 100ms. */
  interval?: number;

  /** Whether the animation should reset when scrolling out/in again. Default is false. */
  reset?: boolean;

  /**
   * A unique class name used by ScrollReveal to target elements.
   * Must not contain spaces. Default is "content-data".
   */
  animationName?: string;

  /** Additional Tailwind or custom class names to style the wrapper div. */
  className?: string;
};

/**
 * `Animation` is a reusable wrapper component for applying scroll-based animations using ScrollReveal.
 *
 * @example
 * ```tsx
 * <Animation origin="right" animationName="fade-right">
 *   <div className="p-4 bg-white">Animated Content</div>
 * </Animation>
 * ```
 */
const Animation = ({
  children,
  origin = "bottom",
  distance = "20px",
  duration = 1000,
  interval = 100,
  reset = false,
  animationName = "content-data",
  className,
}: AnimationProps) => {
  useEffect(() => {
    async function animate() {
      const sr = (await import("scrollreveal")).default;

      sr({
        origin,
        distance,
        duration,
        reset,
      }).reveal(`.${animationName}`, {
        interval,
      });
    }

    animate();
  }, [origin, distance, duration, interval, reset, animationName]);

  return <div className={`${animationName} ${className}`}>{children}</div>;
};

export default Animation;

"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
}

/**
 * A number that springs from 0 to its value when scrolled into view.
 * Writes textContent imperatively from the animation frame — zero React
 * re-renders during the count, so it costs the same as any tween.
 */
export function CountUp({ to, prefix = "", suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const node = ref.current;
    if (!isInView || !node) return;

    if (reducedMotion) {
      node.textContent = `${prefix}${to}${suffix}`;
      return;
    }

    const controls = animate(0, to, {
      type: "spring",
      stiffness: 50,
      damping: 20,
      onUpdate: (value) => {
        node.textContent = `${prefix}${Math.round(value)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, to, prefix, suffix, reducedMotion]);

  return <span ref={ref}>{`${prefix}0${suffix}`}</span>;
}

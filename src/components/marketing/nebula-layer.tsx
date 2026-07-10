"use client";

import { motion } from "motion/react";

import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * A vast, barely-there color wheel turning once every four minutes — the
 * nebula. One oversized element, transform-only rotation (constant
 * rotation is the one motion that can't be a spring: springs settle,
 * skies don't), opacity low enough that you feel it more than see it.
 */
export function NebulaLayer() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <motion.div
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 size-[160vmax] rounded-full opacity-15"
      style={{
        x: "-50%",
        y: "-50%",
        background:
          "conic-gradient(from 0deg, transparent 0%, color-mix(in oklch, var(--color-aurora-violet) 35%, transparent) 18%, transparent 34%, color-mix(in oklch, var(--color-aurora-cyan) 25%, transparent) 52%, transparent 68%, color-mix(in oklch, var(--color-aurora-magenta) 30%, transparent) 84%, transparent 100%)",
        filter: "blur(60px)",
      }}
      animate={reducedMotion ? undefined : { rotate: 360 }}
      transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
    />
  );
}

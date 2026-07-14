"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

import { Starfield } from "@/components/marketing/starfield";
import { useMediaQuery } from "@/hooks/use-media-query";
import { seededRange } from "@/lib/deterministic-random";

// The same muted lungta (prayer-flag) hues SunlitBackground uses, dimmed
// down for a dark backdrop — the night counterpart should still read as
// the same Himalayan visual language, not the unrelated violet/cyan/
// magenta "aurora" palette CosmicBackground uses on the marketing pages.
const BLOBS = [
  { color: "#C9A03B", top: "-12%", left: "-8%", size: 640, range: 55, stiffness: 5 },
  { color: "#3E6B9E", top: "8%", left: "62%", size: 520, range: 46, stiffness: 4.2 },
  { color: "#A8392E", top: "58%", left: "8%", size: 460, range: 40, stiffness: 4.6 },
  { color: "#3E7B52", top: "62%", left: "68%", size: 500, range: 42, stiffness: 3.8 },
] as const;

interface Mote {
  top: number;
  left: number;
  size: number;
  drift: number;
  delay: number;
  stiffness: number;
}

const MOTE_COUNT = 10;

/**
 * The night counterpart to SunlitBackground — same prayer-flag color
 * blobs, dimmed for a dark sky, plus a twinkling starfield instead of
 * gold motes. Kept local to the calendar page, same as SunlitBackground;
 * it never mounts on the dark-cosmic marketing/dashboard routes.
 */
export function StarlitBackground() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const motes = useMemo<Mote[]>(
    () =>
      Array.from({ length: MOTE_COUNT }, (_, i) => ({
        top: seededRange(i * 5.1, 8, 92),
        left: seededRange(i * 7.3, 8, 92),
        size: seededRange(i * 3.7, 3, 6),
        drift: seededRange(i * 9.1, 14, 30),
        delay: seededRange(i * 1.9, 0, 3),
        stiffness: seededRange(i * 6.1, 4, 9),
      })),
    [],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-8%,color-mix(in_oklch,var(--color-gold)_10%,transparent),transparent)]" />

      {!reducedMotion &&
        BLOBS.map((blob, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-[0.09] blur-[110px]"
            style={{
              top: blob.top,
              left: blob.left,
              width: blob.size,
              height: blob.size,
              backgroundColor: blob.color,
            }}
            animate={{ x: [0, blob.range], y: [0, -blob.range * 0.5] }}
            transition={{
              type: "spring",
              stiffness: blob.stiffness,
              damping: 5,
              repeat: Infinity,
              repeatType: "mirror",
              delay: i * 0.6,
            }}
          />
        ))}

      <Starfield />

      {!reducedMotion &&
        motes.map((m, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full blur-[1px]"
            style={{
              top: `${m.top}%`,
              left: `${m.left}%`,
              width: m.size,
              height: m.size,
              backgroundColor: "var(--color-gold)",
              opacity: 0.3,
            }}
            animate={{ y: [0, -m.drift], x: [0, m.drift * 0.3] }}
            transition={{
              type: "spring",
              stiffness: m.stiffness,
              damping: 6,
              repeat: Infinity,
              repeatType: "mirror",
              delay: m.delay,
            }}
          />
        ))}

      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="starlitGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#starlitGrain)" />
        </svg>
      </div>
    </div>
  );
}

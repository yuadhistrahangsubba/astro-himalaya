"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

import { AuroraLayer } from "@/components/marketing/aurora-layer";
import { FloatingParticles } from "@/components/marketing/floating-particles";
import { NebulaLayer } from "@/components/marketing/nebula-layer";
import { Starfield } from "@/components/marketing/starfield";
import { useMediaQuery } from "@/hooks/use-media-query";

const SPRING = { stiffness: 40, damping: 18, mass: 0.6 };

/**
 * The ambient backdrop, back-to-front: nebula → aurora → stars → dust →
 * grain. Each layer sits in its own fixed wrapper that drifts a few
 * pixels toward the cursor — deeper layers move less, so the sky gets
 * real depth. Wrappers bleed 32px past the viewport (-inset-8) so the
 * shift never exposes an edge. Pointer input feeds motion values (no
 * React re-renders per mousemove), springs smooth it, and everything is
 * transform-only — the whole system stays on the compositor.
 */
export function CosmicBackground() {
  const hasFinePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const parallaxEnabled = hasFinePointer && !reducedMotion;

  // Normalized cursor position, -1..1 from viewport center.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, SPRING);
  const springY = useSpring(pointerY, SPRING);

  useEffect(() => {
    if (!parallaxEnabled) return;
    function handleMove(event: PointerEvent) {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 2);
    }
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [parallaxEnabled, pointerX, pointerY]);

  // Depth multipliers, px of travel at full cursor deflection. Negative =
  // layers slide away from the cursor, which reads as looking *into* the sky.
  const nebulaX = useTransform(springX, (v) => v * -5);
  const nebulaY = useTransform(springY, (v) => v * -5);
  const auroraX = useTransform(springX, (v) => v * -10);
  const auroraY = useTransform(springY, (v) => v * -10);
  const starsX = useTransform(springX, (v) => v * -16);
  const starsY = useTransform(springY, (v) => v * -16);
  const dustX = useTransform(springX, (v) => v * -24);
  const dustY = useTransform(springY, (v) => v * -24);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x: nebulaX, y: nebulaY }}
        className="pointer-events-none fixed -inset-8 z-[-5] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,color-mix(in_oklch,var(--color-aurora-violet)_14%,transparent),transparent)]" />
        <NebulaLayer />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ x: auroraX, y: auroraY }}
        className="pointer-events-none fixed -inset-8 z-[-4] overflow-hidden"
      >
        <AuroraLayer />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ x: starsX, y: starsY }}
        className="pointer-events-none fixed -inset-8 z-[-3] overflow-hidden"
      >
        <Starfield />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ x: dustX, y: dustY }}
        className="pointer-events-none fixed -inset-8 z-[-2] overflow-hidden"
      >
        <FloatingParticles />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.04] mix-blend-overlay"
      >
        <svg width="100%" height="100%">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>
    </>
  );
}

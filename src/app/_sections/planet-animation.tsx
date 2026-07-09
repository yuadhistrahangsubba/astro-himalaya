"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

const PHASES = [
  "Two centuries of sky charts, reduced to one moment.",
  "Every planet, precisely placed — not approximated.",
  "This is where your story starts.",
] as const;

const RINGS = [
  { radius: 110, rotateRange: 130, color: "var(--color-gold)" },
  { radius: 155, rotateRange: -95, color: "var(--color-aurora-cyan)" },
  { radius: 190, rotateRange: 200, color: "var(--color-aurora-violet)" },
] as const;

/**
 * Scroll-scrubbed, not spring-driven — this section's motion must stay in
 * lockstep with scroll position (Apple product-page style), so it reads
 * scrollYProgress directly via useTransform rather than animating toward
 * a target. A tall (220vh) wrapper gives the pinned content room to play
 * out before the next section takes over.
 */
export function PlanetAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const ringDraw = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const depthShift = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -60]);

  // Rules of Hooks forbids calling useTransform inside RINGS.map(), even
  // though the array length is fixed — so each ring's rotation is its own
  // top-level hook call, zipped with RINGS only when rendering below.
  const ring0Rotate = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : RINGS[0].rotateRange]);
  const ring1Rotate = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : RINGS[1].rotateRange]);
  const ring2Rotate = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : RINGS[2].rotateRange]);
  const ringRotations = [ring0Rotate, ring1Rotate, ring2Rotate];

  const opacityA = useTransform(scrollYProgress, [0, 0.3, 0.38], [1, 1, 0]);
  const opacityB = useTransform(scrollYProgress, [0.3, 0.38, 0.62, 0.7], [0, 1, 1, 0]);
  const opacityC = useTransform(scrollYProgress, [0.62, 0.7, 1], [0, 1, 1]);
  const phaseOpacities = [opacityA, opacityB, opacityC];

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          aria-hidden="true"
          style={{ y: depthShift }}
          className="absolute size-130 rounded-full bg-aurora-violet/10 blur-[100px]"
        />

        <svg viewBox="0 0 400 400" className="absolute size-105 sm:size-130" aria-hidden="true">
          {RINGS.map((ring, i) => (
            <motion.g
              key={i}
              style={{ rotate: ringRotations[i], transformOrigin: "200px 200px" }}
            >
              <motion.circle
                cx={200}
                cy={200}
                r={ring.radius}
                stroke={ring.color}
                strokeOpacity={0.3}
                fill="none"
                strokeDasharray="0 1"
                style={{ pathLength: ringDraw }}
              />
              <circle cx={200} cy={200 - ring.radius} r={5} fill={ring.color} />
            </motion.g>
          ))}
        </svg>

        <div className="absolute inset-0 flex items-center justify-center px-6">
          {PHASES.map((phase, i) => (
            <motion.p
              key={phase}
              style={{ opacity: phaseOpacities[i] }}
              className="absolute max-w-xl text-center font-serif text-3xl italic sm:text-4xl"
            >
              {phase}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}

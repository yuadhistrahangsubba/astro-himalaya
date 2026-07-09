"use client";

import { ClipboardList, Orbit, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Enter your details",
    body: "Birth date, place, and time if you know it — an unknown time still resolves most placements.",
  },
  {
    icon: Orbit,
    title: "We read the sky",
    body: "Sidereal planetary positions are calculated for that exact moment and place, Lahiri ayanamsa applied.",
  },
  {
    icon: Sparkles,
    title: "Get your reading",
    body: "Your chart, dasha timeline, and compatibility results — ready to explore, save, and revisit.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative mx-auto max-w-4xl px-6 py-28 sm:py-36">
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 110, damping: 16 }}
        className="text-center font-serif text-3xl italic sm:text-4xl"
      >
        How it works
      </motion.h2>

      <div className="relative mt-16 grid gap-10 sm:grid-cols-3">
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          className="absolute top-8 right-[16%] left-[16%] hidden h-px origin-left bg-linear-to-r from-gold/50 via-aurora-cyan/40 to-aurora-violet/50 sm:block"
        />

        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 90, damping: 16, delay: i * 0.15 }}
            className="relative text-center"
          >
            <div className="relative z-10 mx-auto flex size-16 items-center justify-center rounded-full border border-gold/30 bg-background">
              <step.icon className="size-6 text-gold" aria-hidden="true" />
            </div>
            <p className="mt-5 font-dense text-xs tracking-wide text-muted-foreground/60 uppercase">
              Step {i + 1}
            </p>
            <h3 className="mt-1 font-serif text-xl">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

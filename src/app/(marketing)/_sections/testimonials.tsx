"use client";

import { motion } from "motion/react";

// Placeholder quotes — swap for real early-access feedback before launch.
// Deliberately generic attribution (first name + region, no fabricated
// photos or surnames) so it reads as template content, not a real quote.
const TESTIMONIALS = [
  {
    quote: "The dasha timeline finally made sense of a year I couldn't explain.",
    name: "Pema",
    place: "Thimphu",
  },
  {
    quote: "Sidereal, not tropical — first platform I've used that gets that right for us.",
    name: "Anish",
    place: "Kathmandu",
  },
  {
    quote: "Matchmaking that actually follows the tradition my grandmother used.",
    name: "Deki",
    place: "Darjeeling",
  },
] as const;

export function Testimonials() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 110, damping: 16 }}
        className="text-center font-serif text-3xl italic sm:text-4xl"
      >
        Trusted across the Himalaya
      </motion.h2>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: i * 0.12 }}
            className="rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur-md"
          >
            <span className="font-serif text-4xl text-gold/50" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className="mt-1 text-sm text-foreground/90">{t.quote}</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-9 items-center justify-center rounded-full bg-gold/15 font-serif text-sm text-gold"
              >
                {t.name[0]}
              </span>
              <span className="text-sm text-muted-foreground">
                {t.name}, <span className="text-muted-foreground/70">{t.place}</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

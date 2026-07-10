"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/marketing/count-up";
import { GlassCard } from "@/components/marketing/glass-card";

// Illustrative pricing — confirm real tiers/amounts before launch.
const TIERS = [
  {
    name: "Starter",
    price: 0,
    tagline: "Explore your chart",
    features: ["1 birth profile", "Sidereal birth chart", "Basic planetary positions"],
    cta: "Get started",
    recommended: false,
  },
  {
    name: "Devoted",
    price: 9,
    tagline: "For real guidance",
    features: ["Everything in Starter", "Dasha timelines", "Downloadable reports", "Priority email support"],
    cta: "Start free trial",
    recommended: true,
  },
  {
    name: "Family",
    price: 19,
    tagline: "For the whole household",
    features: ["Everything in Devoted", "Up to 6 profiles", "Guna Milan matchmaking"],
    cta: "Get started",
    recommended: false,
  },
] as const;

function TierContent({ tier }: { tier: (typeof TIERS)[number] }) {
  return (
    <div className="flex h-full flex-col">
      <p className="font-serif text-xl">{tier.name}</p>
      <p className="mt-1 text-sm text-muted-foreground">{tier.tagline}</p>
      <p className="mt-5">
        <span className="font-serif text-4xl">
          <CountUp to={tier.price} prefix="$" />
        </span>
        <span className="text-sm text-muted-foreground">/month</span>
      </p>

      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <Button variant={tier.recommended ? "default" : "outline"} className="mt-8 w-full" asChild>
        <a href="#demo">{tier.cta}</a>
      </Button>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 110, damping: 16 }}
        className="text-center font-serif text-3xl italic sm:text-4xl"
      >
        Simple, honest pricing
      </motion.h2>

      <div className="mt-14 grid gap-6 sm:grid-cols-3 sm:items-center">
        {TIERS.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: i * 0.12 }}
          >
            {tier.recommended ? (
              <GlassCard className="h-full">
                <TierContent tier={tier} />
              </GlassCard>
            ) : (
              <div className="h-full rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur-md">
                <TierContent tier={tier} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

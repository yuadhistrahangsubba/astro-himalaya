"use client";

import {
  Briefcase,
  Compass,
  Coins,
  GraduationCap,
  Hammer,
  Heart,
  HeartPulse,
  Palette,
  Smile,
  UserRound,
} from "lucide-react";
import { motion } from "motion/react";
import type { ComponentType } from "react";

import type { DomainInterpretation, DomainKey } from "@/services/astrology/interpretation";

const DOMAIN_ICONS: Record<DomainKey, ComponentType<{ className?: string }>> = {
  character: UserRound,
  happiness: Smile,
  lifestyle: Compass,
  career: Briefcase,
  occupation: Hammer,
  health: HeartPulse,
  hobbies: Palette,
  love: Heart,
  finance: Coins,
  education: GraduationCap,
};

const FADE_UP = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 130, damping: 18 } },
};

interface LifePredictionsProps {
  domains: readonly DomainInterpretation[];
}

export function LifePredictions({ domains }: LifePredictionsProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      className="grid gap-4 sm:grid-cols-2"
    >
      {domains.map((domain) => {
        const Icon = DOMAIN_ICONS[domain.key];
        return (
          <motion.article
            key={domain.key}
            variants={FADE_UP}
            className="rounded-2xl border border-border/60 bg-card/50 p-5"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                <Icon className="size-4.5" aria-hidden="true" />
              </span>
              <h4 className="font-sans text-base font-bold tracking-wide">{domain.title}</h4>
            </div>
            <p className="mt-3 text-sm text-foreground/90 italic">{domain.summary}</p>
            <p className="mt-2.5 text-sm text-muted-foreground">{domain.flavor}</p>
          </motion.article>
        );
      })}
    </motion.div>
  );
}

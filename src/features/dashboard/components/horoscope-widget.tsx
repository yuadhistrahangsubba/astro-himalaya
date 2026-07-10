"use client";

import { SkeletonLines, WidgetCard } from "./widget-card";
import type { SkyNow } from "../hooks/use-sky-now";

// One gentle line per lunar phase. Interpretive astrology is not
// computable — these are clearly badged as sample copy until real
// readings ship (see the AI Astrologer widget).
const SAMPLE_LINES: Record<string, string> = {
  "New Moon": "A dark sky is an empty page — traditionally a time for quiet intentions, not launches.",
  "Waxing Crescent": "The light is returning. Momentum favors things you begin gently.",
  "First Quarter": "Half-lit skies ask for decisions — the classic day to commit or course-correct.",
  "Waxing Gibbous": "Nearly full. Refine what's already moving rather than starting anew.",
  "Full Moon": "Full illumination — culminations, clarity, and things coming to light.",
  "Waning Gibbous": "The exhale begins. Share, teach, and distribute what the cycle produced.",
  "Last Quarter": "Another half-lit threshold — traditionally for release and clearing.",
  "Waning Crescent": "The quietest sky. Rest is considered productive here.",
};

export function HoroscopeWidget({ sky, className }: { sky?: SkyNow; className?: string }) {
  return (
    <WidgetCard
      label="Today's Horoscope"
      live={Boolean(sky)}
      className={className}
      footnote="Interpretation is sample copy — the sky data above it is computed for real."
    >
      {!sky ? (
        <SkeletonLines count={4} />
      ) : (
        <div className="flex h-full flex-col justify-between gap-4">
          <div>
            <p className="font-serif text-2xl leading-snug">
              Moon in <span className="text-gold">{sky.snapshot.moon.rashi.signName}</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {sky.snapshot.moon.nakshatra.name} nakshatra, pada {sky.snapshot.moon.nakshatra.pada} ·{" "}
              {sky.snapshot.panchang.tithi.name} tithi ({sky.snapshot.panchang.tithi.paksha})
            </p>
          </div>
          <div className="rounded-lg border border-white/8 bg-secondary/40 p-3.5">
            <span className="rounded bg-gold/15 px-1.5 py-0.5 font-dense text-[9px] tracking-[0.15em] text-gold uppercase">
              Sample
            </span>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">
              {SAMPLE_LINES[sky.snapshot.moonPhase.name] ?? SAMPLE_LINES["Full Moon"]}
            </p>
          </div>
        </div>
      )}
    </WidgetCard>
  );
}

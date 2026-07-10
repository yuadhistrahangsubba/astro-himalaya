"use client";

import { CountUp } from "@/components/marketing/count-up";
import { calculateLifePathNumber } from "@/services/astrology/numerology/life-path";

import { SkeletonLines, WidgetCard } from "./widget-card";
import { VARA_COLORS } from "../constants";
import type { SkyNow } from "../hooks/use-sky-now";

/**
 * "Lucky numbers" as the one thing actually derivable from today: the
 * universal day number — today's date reduced numerologically. No
 * invented extras padded around it.
 */
export function LuckyNumbersWidget({ sky, className }: { sky?: SkyNow; className?: string }) {
  const dayNumber = sky ? calculateLifePathNumber(sky.localDateISO) : null;

  return (
    <WidgetCard label="Lucky Number" className={className} footnote="Universal day number — today's date, reduced.">
      {dayNumber === null ? (
        <SkeletonLines count={2} />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-1">
          <p className="font-serif text-6xl text-gold">
            <CountUp to={dayNumber} />
          </p>
          <p className="font-dense text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
            Universal day
          </p>
        </div>
      )}
    </WidgetCard>
  );
}

/** Colors of the day's ruling planet — the weekday/planet pairing the days are named for. */
export function LuckyColorsWidget({ sky, className }: { sky?: SkyNow; className?: string }) {
  const entry = sky ? VARA_COLORS[sky.snapshot.panchang.vara.index] : undefined;

  return (
    <WidgetCard
      label="Lucky Colors"
      className={className}
      footnote={entry ? `Traditional colors of ${entry.planet}, today's ruling planet.` : undefined}
    >
      {!entry ? (
        <SkeletonLines count={2} />
      ) : (
        <div className="flex h-full flex-col justify-center gap-3">
          {entry.colors.map((color) => (
            <div key={color.name} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="size-6 rounded-full border border-white/20 shadow-inner"
                style={{ backgroundColor: color.swatch }}
              />
              <span className="text-sm text-foreground/90">{color.name}</span>
            </div>
          ))}
        </div>
      )}
    </WidgetCard>
  );
}

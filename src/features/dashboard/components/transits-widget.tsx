"use client";

import { SkeletonLines, WidgetCard } from "./widget-card";
import type { SkyNow } from "../hooks/use-sky-now";
import { formatEventDate } from "../lib/format";

const SHOWN = 6;

export function TransitsWidget({ sky, className }: { sky?: SkyNow; className?: string }) {
  return (
    <WidgetCard
      label="Upcoming Transits · Sun–Moon"
      live={Boolean(sky)}
      className={className}
      footnote="Computed from live ephemeris. Planetary transits join once Mercury–Saturn land."
    >
      {!sky ? (
        <SkeletonLines count={6} />
      ) : (
        <ul className="grid gap-0 font-mono text-xs tabular-nums">
          {sky.upcomingEvents.slice(0, SHOWN).map((event) => (
            <li
              key={`${event.name}-${event.at.getTime()}`}
              className="flex items-baseline justify-between gap-3 border-t border-white/6 py-2 first:border-t-0"
            >
              <span className="flex items-baseline gap-2">
                <span
                  className={
                    event.name === "Full Moon" || event.name === "New Moon"
                      ? "text-gold"
                      : "text-foreground/85"
                  }
                >
                  {event.name}
                </span>
                <span className="text-[10px] text-muted-foreground/60">{event.aspect}</span>
              </span>
              <span className="text-muted-foreground">{formatEventDate(event.at)}</span>
            </li>
          ))}
        </ul>
      )}
    </WidgetCard>
  );
}

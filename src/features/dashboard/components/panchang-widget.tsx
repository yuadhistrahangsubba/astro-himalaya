"use client";

import { SkeletonLines, WidgetCard } from "./widget-card";
import type { SkyNow } from "../hooks/use-sky-now";

export function PanchangWidget({ sky, className }: { sky?: SkyNow; className?: string }) {
  const rows = sky
    ? [
        {
          limb: "Tithi",
          value: `${sky.snapshot.panchang.tithi.name} · ${sky.snapshot.panchang.tithi.paksha}`,
        },
        { limb: "Vara", value: sky.snapshot.panchang.vara.name },
        {
          limb: "Nakshatra",
          value: `${sky.snapshot.panchang.nakshatra.name} · pada ${sky.snapshot.panchang.nakshatra.pada}`,
        },
        { limb: "Yoga", value: sky.snapshot.panchang.yoga.name },
        { limb: "Karana", value: sky.snapshot.panchang.karana.name },
      ]
    : null;

  return (
    <WidgetCard
      label="Daily Panchang"
      live={Boolean(sky)}
      className={className}
      footnote="Calendar-day based; the traditional sunrise-to-sunrise day boundary isn't applied yet."
    >
      {!rows ? (
        <SkeletonLines count={5} />
      ) : (
        <dl className="grid gap-0 text-sm">
          {rows.map((row) => (
            <div
              key={row.limb}
              className="flex items-baseline justify-between gap-3 border-t border-white/6 py-2 first:border-t-0"
            >
              <dt className="font-dense text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                {row.limb}
              </dt>
              <dd className="text-right text-foreground/90">{row.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </WidgetCard>
  );
}

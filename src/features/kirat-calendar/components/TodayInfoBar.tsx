"use client";

import { useEffect, useState } from "react";

import { PANCHANGA_DATA } from "../data/panchanga-data";

const PILL_CLASSES =
  "inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-foreground/80 sm:text-[13px]";

/**
 * Today's date, a live clock, whatever Kirat-calendar fields are known
 * for this date, and place — its own card, deliberately kept separate
 * from the "KIRAT KHAIK MUNDHUM CALENDAR" banner above it rather than
 * merged into one block.
 */
export function TodayInfoBar({ selectedDate }: { selectedDate: Date }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const key = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(
    selectedDate.getDate(),
  ).padStart(2, "0")}`;
  const p = PANCHANGA_DATA[key];

  const dateLabel = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Sparse dataset — most days only carry `KiratMonthYear`, not every
  // per-day field — so a missing value hides its pill entirely rather
  // than showing a bare "-" placeholder.
  const kiratFields = [p?.KiratDate, p?.tLamikkhok].filter(Boolean).join(" · ");

  return (
    <div className="mt-4 rounded-2xl border border-border/60 bg-card/60 px-5 py-4 text-center shadow-[0_8px_24px_-12px_rgba(0,0,0,.25)] backdrop-blur-xl">
      <p className="font-sans text-sm font-bold text-foreground sm:text-base">
        {dateLabel}
        {now && <span className="font-normal text-muted-foreground"> &middot; {now.toLocaleTimeString()}</span>}
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {kiratFields && <span className={PILL_CLASSES}>{kiratFields}</span>}
        <span className={PILL_CLASSES}>Thimphu, Bhutan</span>
      </div>
    </div>
  );
}

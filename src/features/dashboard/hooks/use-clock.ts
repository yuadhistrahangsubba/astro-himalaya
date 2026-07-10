"use client";

import { useEffect, useState } from "react";

/**
 * A ticking wall clock for the given IANA zone. Returns null until
 * mounted so the server-rendered placeholder never mismatches hydration.
 */
export function useClock(timeZone: string): string | null {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return time;
}

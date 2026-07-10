"use client";

import { useQuery } from "@tanstack/react-query";

import { computeSkySnapshot, type SkySnapshot } from "@/services/astrology/sky-snapshot";
import { findUpcomingLunarEvents, type LunarPhaseEvent } from "@/services/astrology/transits/upcoming";

import { OBSERVER } from "../constants";

export interface SkyNow {
  snapshot: SkySnapshot;
  upcomingEvents: LunarPhaseEvent[];
  localDateISO: string;
}

/**
 * The live sky, recomputed every minute. The computation is pure local
 * math (no network), but routing it through TanStack Query gives every
 * widget one shared, deduplicated subscription plus the refetch loop
 * for free — and, because the queryFn only runs client-side after
 * mount, the server renders skeletons and Date.now() never gets a
 * chance to mismatch hydration.
 */
export function useSkyNow() {
  return useQuery<SkyNow>({
    queryKey: ["sky-now"],
    queryFn: () => {
      const now = new Date();
      const localDateISO = new Intl.DateTimeFormat("en-CA", {
        timeZone: OBSERVER.timezone,
      }).format(now);
      return {
        snapshot: computeSkySnapshot(now, localDateISO),
        upcomingEvents: findUpcomingLunarEvents(now, 40),
        localDateISO,
      };
    },
    refetchInterval: 60_000,
    staleTime: 55_000,
  });
}

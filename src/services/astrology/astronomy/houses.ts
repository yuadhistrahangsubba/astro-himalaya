import { normalizeDegrees } from "./angles";

export type HouseSystem = "equal" | "whole-sign";

export interface HouseCusps {
  system: HouseSystem;
  /** 12 ecliptic longitudes, index 0 = house 1 cusp, in house order. */
  cusps: readonly number[];
}

/**
 * House cusps for the two non-iterative systems. Placidus/Koch (which
 * require solving a transcendental equation per cusp) are intentionally
 * not implemented here — "house calculations" doesn't name a specific
 * system, and Equal House and Whole Sign are both legitimate, widely
 * used systems that don't need an iterative solver to be exact.
 */
export function calculateHouseCusps(ascendantLongitude: number, system: HouseSystem): HouseCusps {
  if (system === "whole-sign") {
    const signStart = Math.floor(normalizeDegrees(ascendantLongitude) / 30) * 30;
    return {
      system,
      cusps: Array.from({ length: 12 }, (_, i) => normalizeDegrees(signStart + i * 30)),
    };
  }

  return {
    system,
    cusps: Array.from({ length: 12 }, (_, i) => normalizeDegrees(ascendantLongitude + i * 30)),
  };
}

/** Which house (1-12) a given ecliptic longitude falls into, for either system's cusps. */
export function houseForLongitude(cusps: readonly number[], longitude: number): number {
  if (cusps.length !== 12) {
    throw new RangeError(`Expected exactly 12 house cusps, got ${cusps.length}`);
  }

  const lon = normalizeDegrees(longitude);

  for (let i = 0; i < 12; i++) {
    const start = cusps[i] as number;
    const end = cusps[(i + 1) % 12] as number;
    const wrapsPastZero = end <= start;
    const inHouse = wrapsPastZero ? lon >= start || lon < end : lon >= start && lon < end;
    if (inHouse) return i + 1;
  }

  // Unreachable: 12 cusps 30 degrees apart always tile the full circle.
  throw new Error("No house matched — cusps did not tile the full circle");
}

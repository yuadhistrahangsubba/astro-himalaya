import { normalizeDegrees } from "../astronomy/angles";

const CLASSICAL_ASPECTS = [
  { name: "Conjunction", angle: 0 },
  { name: "Sextile", angle: 60 },
  { name: "Square", angle: 90 },
  { name: "Trine", angle: 120 },
  { name: "Opposition", angle: 180 },
] as const;

const DEFAULT_ORB_DEGREES = 6;

export interface TransitAspect {
  natalBody: string;
  transitingBody: string;
  /** Minimal angular separation, 0-180 degrees. */
  angleDegrees: number;
  /** The classical aspect name if within orb of one, otherwise null. */
  aspectName: string | null;
}

/** Shortest angular distance between two longitudes, always in [0, 180]. */
export function angularSeparation(a: number, b: number): number {
  const diff = Math.abs(normalizeDegrees(a) - normalizeDegrees(b));
  return diff > 180 ? 360 - diff : diff;
}

/** Which classical aspect (if any) a separation falls within orb of. Aspect angles are tradition-agnostic geometry. */
export function matchClassicalAspect(separationDegrees: number, orbDegrees = DEFAULT_ORB_DEGREES): string | null {
  for (const aspect of CLASSICAL_ASPECTS) {
    if (Math.abs(separationDegrees - aspect.angle) <= orbDegrees) return aspect.name;
  }
  return null;
}

/**
 * Every natal-body x transiting-body pairing, with the angle between
 * them and which classical aspect (if any) it forms. Generic over any
 * body-name-to-longitude maps — doesn't care whether they came from a
 * Vedic sidereal chart or a Western tropical one.
 */
export function calculateTransitAspects(
  natalPositions: Record<string, number>,
  transitingPositions: Record<string, number>,
  orbDegrees = DEFAULT_ORB_DEGREES,
): TransitAspect[] {
  const aspects: TransitAspect[] = [];

  for (const [natalBody, natalLongitude] of Object.entries(natalPositions)) {
    for (const [transitingBody, transitingLongitude] of Object.entries(transitingPositions)) {
      const angleDegrees = angularSeparation(natalLongitude, transitingLongitude);
      aspects.push({
        natalBody,
        transitingBody,
        angleDegrees,
        aspectName: matchClassicalAspect(angleDegrees, orbDegrees),
      });
    }
  }

  return aspects;
}

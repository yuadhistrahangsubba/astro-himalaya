import { normalizeDegrees, toRadians } from "../astronomy/angles";

export const MOON_PHASE_NAMES = [
  "New Moon",
  "Waxing Crescent",
  "First Quarter",
  "Waxing Gibbous",
  "Full Moon",
  "Waning Gibbous",
  "Last Quarter",
  "Waning Crescent",
] as const;

export interface MoonPhaseResult {
  /** Moon - Sun ecliptic longitude, degrees, normalized [0, 360). 0 = new, 180 = full. */
  phaseAngle: number;
  name: string;
  /** Fraction of the visible disc illuminated, 0-1. */
  illuminatedFraction: number;
}

export function calculateMoonPhase(moonLongitude: number, sunLongitude: number): MoonPhaseResult {
  const phaseAngle = normalizeDegrees(moonLongitude - sunLongitude);
  const index = Math.floor(phaseAngle / 45) % 8;
  const illuminatedFraction = (1 - Math.cos(toRadians(phaseAngle))) / 2;

  return {
    phaseAngle,
    name: MOON_PHASE_NAMES[index] as string,
    illuminatedFraction,
  };
}

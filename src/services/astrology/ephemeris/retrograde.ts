import { signedAngularDelta } from "../astronomy/angles";
import type { CelestialBody, EphemerisProvider } from "./types";

// Half a day on each side of the birth moment. Every body this module is
// called for (Mars through Pluto) takes weeks at minimum to reverse
// direction, so a 1-day sampling window comfortably resolves forward vs.
// backward motion without needing the provider to expose velocity directly.
const HALF_STEP_DAYS = 0.5;

/**
 * Whether a body is moving backward (retrograde) through the zodiac at a
 * given moment, by sampling its tropical longitude just before and after
 * and checking the sign of the change — the same "compare two nearby
 * positions" technique any ephemeris-only (no velocity vector) engine
 * uses. Never call this for the Sun or Moon: apparent geocentric motion
 * along the ecliptic never reverses for either, so the result would
 * always be `false` and isn't worth the two extra ephemeris calls. Rahu
 * and Ketu are a separate, simpler case — see `lunar-node.ts` — since
 * this package uses the mean node, which regresses by construction, not
 * by real motion this sampling technique would detect.
 */
export function isRetrograde(provider: EphemerisProvider, body: CelestialBody, julianDay: number): boolean {
  const before = provider.getPosition(body, julianDay - HALF_STEP_DAYS).longitudeDegrees;
  const after = provider.getPosition(body, julianDay + HALF_STEP_DAYS).longitudeDegrees;
  return signedAngularDelta(before, after) < 0;
}

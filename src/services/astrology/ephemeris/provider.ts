import { PlanetNotSupportedError } from "../errors";
import { moonPosition } from "./moon";
import { sunPosition } from "./sun";
import type { CelestialBody, EclipticPosition, EphemerisProvider } from "./types";

/**
 * The only concrete EphemerisProvider in this package right now. Every
 * calculator depends on the `EphemerisProvider` interface, not on this
 * class or on sun.ts/moon.ts directly — swapping this for a Swiss
 * Ephemeris-backed implementation later is a one-file change.
 */
export class MeeusEphemerisProvider implements EphemerisProvider {
  getPosition(body: CelestialBody, julianDay: number): EclipticPosition {
    switch (body) {
      case "sun":
        return sunPosition(julianDay);
      case "moon":
        return moonPosition(julianDay);
      default:
        throw new PlanetNotSupportedError(body);
    }
  }
}

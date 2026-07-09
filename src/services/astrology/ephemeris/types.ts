export type CelestialBody =
  | "sun"
  | "moon"
  | "mercury"
  | "venus"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune"
  | "pluto";

export interface EclipticPosition {
  /** Tropical (not sidereal) ecliptic longitude, degrees, normalized [0, 360). */
  longitudeDegrees: number;
  /** Ecliptic latitude, degrees. */
  latitudeDegrees: number;
}

/**
 * The one seam every calculator in this package that needs a body's sky
 * position depends on — none of them talk to Sun/Moon math directly.
 * Swapping the low-precision Meeus provider for Swiss Ephemeris later
 * means implementing this interface once, not touching every calculator.
 */
export interface EphemerisProvider {
  getPosition(body: CelestialBody, julianDay: number): EclipticPosition;
}

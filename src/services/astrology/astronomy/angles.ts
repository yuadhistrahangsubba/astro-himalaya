/** Wraps any angle in degrees into [0, 360). */
export function normalizeDegrees(degrees: number): number {
  let wrapped = degrees % 360;
  if (wrapped < 0) wrapped += 360;
  // Floating-point rounding can push a value that's mathematically just
  // under 360 (e.g. 360 - 1e-15) to round to exactly 360.0 once added —
  // clamp that boundary back into range rather than leaking a 360.
  if (wrapped >= 360) wrapped -= 360;
  return wrapped;
}

export function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

/** Which 0-11 zodiac sign a normalized ecliptic longitude falls in, and the degrees into it. */
export function signFromLongitude(longitude: number): { signIndex: number; degreesInSign: number } {
  const normalized = normalizeDegrees(longitude);
  return {
    signIndex: Math.floor(normalized / 30),
    degreesInSign: normalized % 30,
  };
}

/**
 * Thrown by the ephemeris provider for any body it doesn't have a real
 * position formula for. Sun and Moon use documented series (see
 * ephemeris/sun.ts, ephemeris/moon.ts); Mercury through Pluto need
 * either full VSOP87 term tables or a Swiss Ephemeris binding, neither
 * of which is wired up — this error exists so callers get a clear
 * signal instead of a silently wrong position.
 */
export class PlanetNotSupportedError extends Error {
  constructor(body: string) {
    super(
      `No ephemeris implementation for "${body}" yet. Sun and Moon are ` +
        "implemented via documented low-precision series (Meeus). Every " +
        "other body needs VSOP87 term tables or a Swiss Ephemeris " +
        "binding — decide which before adding it here.",
    );
    this.name = "PlanetNotSupportedError";
  }
}

/**
 * Thrown by a calculation system that has a defined module and typed
 * inputs/outputs, but whose actual rule set isn't implemented yet
 * because it depends on domain knowledge or reference data this
 * codebase doesn't have verified — e.g. the Tibetan lunisolar calendar
 * conversion needed for Bhutanese/Tibetan astrology. Never substitute
 * a plausible-looking guess for these; throw this instead.
 */
export class CalculationNotImplementedError extends Error {
  constructor(system: string, requirement: string) {
    super(`${system} is not implemented yet: ${requirement}`);
    this.name = "CalculationNotImplementedError";
  }
}

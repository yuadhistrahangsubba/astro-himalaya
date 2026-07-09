// The typed seam between validated user input and the calculation engine.
// Everything upstream (forms, API routes) should depend on these types,
// not on any individual calculator's internals.

import type { WesternSignPlacement } from "./western/zodiac-sign";
import type { HouseCusps } from "./astronomy/houses";
import type { MahadashaPeriod } from "./vedic/dasha";
import type { MoonPhaseResult } from "./moon-phase";
import type { NakshatraPlacement } from "./vedic/nakshatra";
import type { PanchangResult } from "./vedic/panchang";
import type { RashiPlacement } from "./vedic/rashi";

export interface BirthInput {
  birthDate: string; // ISO date, e.g. "1998-04-12"
  birthTime?: string; // "HH:mm", 24-hour, local to `timezone`. Omitted = unknown birth time.
  timezone: string; // IANA tz, e.g. "Asia/Thimphu"
  latitude: number;
  longitude: number;
}

export interface BodyPlacement {
  tropicalLongitude: number;
  siderealLongitude: number;
  rashi: RashiPlacement;
  nakshatra: NakshatraPlacement;
  westernSign: WesternSignPlacement;
}

export interface AscendantPlacement {
  tropicalLongitude: number;
  siderealLongitude: number;
  rashi: RashiPlacement;
  westernSign: WesternSignPlacement;
}

export interface ChartResult {
  julianDayUtc: number;
  ayanamsaDegrees: number;
  /**
   * "exact" when a birth time was given; "date-only" when it wasn't and
   * local noon was used as a placeholder — in that case `ascendant` and
   * `houses` are omitted entirely rather than returning a value that
   * would just be wrong (the Ascendant moves about 1 degree every 4
   * minutes, so a whole day's uncertainty makes it meaningless).
   */
  timeConfidence: "exact" | "date-only";
  sun: BodyPlacement;
  moon: BodyPlacement;
  ascendant?: AscendantPlacement;
  houses?: {
    western: HouseCusps; // equal house, tropical ascendant
    vedic: HouseCusps; // whole sign, sidereal ascendant
  };
  panchang: PanchangResult;
  vimshottariDasha: MahadashaPeriod[];
  moonPhase: MoonPhaseResult;
  /** Bodies this chart could not place — see PlanetNotSupportedError for why. */
  unavailableBodies: readonly string[];
}

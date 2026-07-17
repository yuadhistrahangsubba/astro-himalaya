import { describe, expect, it } from "vitest";

import { toJulianDay } from "../astronomy/julian-date";
import { isRetrograde } from "./retrograde";
import type { CelestialBody, EclipticPosition, EphemerisProvider } from "./types";
import { MeeusEphemerisProvider } from "./provider";

class FakeProvider implements EphemerisProvider {
  constructor(private readonly longitudeAt: (julianDay: number) => number) {}

  getPosition(_body: CelestialBody, julianDay: number): EclipticPosition {
    return { longitudeDegrees: this.longitudeAt(julianDay), latitudeDegrees: 0 };
  }
}

describe("isRetrograde", () => {
  it("reports forward motion as not retrograde", () => {
    const provider = new FakeProvider((jd) => jd); // 1 deg/day forward, arbitrary units
    expect(isRetrograde(provider, "mars", 2451545)).toBe(false);
  });

  it("reports backward motion as retrograde", () => {
    const provider = new FakeProvider((jd) => -jd);
    expect(isRetrograde(provider, "mars", 2451545)).toBe(true);
  });

  it("handles the 359°->0° wrap without misreading direction", () => {
    // Longitude creeping forward through the 0/360 seam: 359.9 -> 0.1
    const provider = new FakeProvider((jd) => (jd < 2451545 ? 359.9 : 0.1));
    expect(isRetrograde(provider, "mars", 2451545)).toBe(false);
  });

  it("matches the known-retrograde real-world reference chart (Mars, 2001-06-07)", () => {
    const provider = new MeeusEphemerisProvider();
    const jd = toJulianDay(new Date("2001-06-07T07:15:00.000Z"));
    // Cross-checked against AstroSage's Kundli for this exact birth moment,
    // which flags Mars [R] at this date.
    expect(isRetrograde(provider, "mars", jd)).toBe(true);
  });

  it("matches the known-direct reference chart (Jupiter, 2001-06-07)", () => {
    const provider = new MeeusEphemerisProvider();
    const jd = toJulianDay(new Date("2001-06-07T07:15:00.000Z"));
    // AstroSage does not flag Jupiter as retrograde for this birth moment.
    expect(isRetrograde(provider, "jupiter", jd)).toBe(false);
  });
});

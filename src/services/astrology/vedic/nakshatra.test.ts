import { describe, expect, it } from "vitest";

import { NAKSHATRAS, nakshatraFromSiderealLongitude } from "./nakshatra";

describe("nakshatraFromSiderealLongitude", () => {
  it("has exactly 27 nakshatras", () => {
    expect(NAKSHATRAS).toHaveLength(27);
  });

  it("places 0 degrees in Ashwini, pada 1", () => {
    const result = nakshatraFromSiderealLongitude(0);
    expect(result.name).toBe("Ashwini");
    expect(result.index).toBe(0);
    expect(result.pada).toBe(1);
  });

  it("places exactly 13°20' at the start of the second nakshatra (Bharani)", () => {
    const result = nakshatraFromSiderealLongitude(360 / 27);
    expect(result.name).toBe("Bharani");
    expect(result.index).toBe(1);
    expect(result.degreesInNakshatra).toBeCloseTo(0, 10);
  });

  it("advances pada every 3°20' within a nakshatra", () => {
    const span = 360 / 27;
    expect(nakshatraFromSiderealLongitude(0).pada).toBe(1);
    expect(nakshatraFromSiderealLongitude(span * 0.3).pada).toBe(2);
    expect(nakshatraFromSiderealLongitude(span * 0.6).pada).toBe(3);
    expect(nakshatraFromSiderealLongitude(span * 0.9).pada).toBe(4);
  });

  it("places the last degrees of the circle in Revati", () => {
    const result = nakshatraFromSiderealLongitude(359);
    expect(result.name).toBe("Revati");
    expect(result.index).toBe(26);
  });

  it("normalizes out-of-range input", () => {
    expect(nakshatraFromSiderealLongitude(360).name).toBe("Ashwini");
  });
});

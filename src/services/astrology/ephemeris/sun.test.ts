import { describe, expect, it } from "vitest";

import { sunPosition } from "./sun";

describe("sunPosition", () => {
  it("matches Meeus's worked example 25.a (1992-10-13.0 TD)", () => {
    const position = sunPosition(2448908.5);
    expect(position.longitudeDegrees).toBeCloseTo(199.90895, 2);
    expect(position.latitudeDegrees).toBe(0);
  });

  it("stays within [0, 360) across a wide range of dates", () => {
    const dates = [2400000.5, 2415020.5, 2451545.0, 2470000.5, 2500000.5];
    for (const jd of dates) {
      const { longitudeDegrees } = sunPosition(jd);
      expect(longitudeDegrees).toBeGreaterThanOrEqual(0);
      expect(longitudeDegrees).toBeLessThan(360);
    }
  });

  it("advances by roughly 360 degrees per year (one trip around the ecliptic)", () => {
    const day1 = sunPosition(2451545.0).longitudeDegrees;
    const oneYearLater = sunPosition(2451545.0 + 365.25).longitudeDegrees;
    expect(oneYearLater).toBeCloseTo(day1, 0);
  });
});

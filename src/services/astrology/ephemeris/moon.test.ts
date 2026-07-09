import { describe, expect, it } from "vitest";

import { moonPosition } from "./moon";

describe("moonPosition", () => {
  it("lands within a couple of degrees of Meeus's full-series worked example 47.a (1992-04-12.0 TD)", () => {
    // Meeus's full ~60-term series gives longitude=133.162655, latitude=-3.229126.
    // This implementation only has the 6 largest terms, so it's checked
    // against a wide tolerance — this catches gross errors (wrong sign,
    // wrong T scaling, wrong argument) without claiming precision this
    // reduced series doesn't have.
    const position = moonPosition(2448724.5);
    expect(position.longitudeDegrees).toBeCloseTo(133.16, 0); // within ~1 degree
    expect(position.latitudeDegrees).toBeCloseTo(-3.23, 0);
  });

  it("stays within [0, 360) across a wide range of dates", () => {
    const dates = [2400000.5, 2415020.5, 2451545.0, 2470000.5, 2500000.5];
    for (const jd of dates) {
      const { longitudeDegrees } = moonPosition(jd);
      expect(longitudeDegrees).toBeGreaterThanOrEqual(0);
      expect(longitudeDegrees).toBeLessThan(360);
    }
  });

  it("completes roughly one full circle per sidereal month (~27.32 days)", () => {
    const start = moonPosition(2451545.0).longitudeDegrees;
    const oneMonthLater = moonPosition(2451545.0 + 27.32).longitudeDegrees;
    const wrappedDelta = Math.min(
      Math.abs(oneMonthLater - start),
      360 - Math.abs(oneMonthLater - start),
    );
    expect(wrappedDelta).toBeLessThan(5); // back near the start, within a few degrees
  });

  it("moves noticeably faster than the Sun day to day (the Moon laps the Sun monthly)", () => {
    const day0 = moonPosition(2451545.0).longitudeDegrees;
    const day1 = moonPosition(2451546.0).longitudeDegrees;
    const dailyMotion = normalizedDelta(day0, day1);
    expect(dailyMotion).toBeGreaterThan(10); // Moon moves ~13.2 deg/day
    expect(dailyMotion).toBeLessThan(16);
  });
});

function normalizedDelta(a: number, b: number): number {
  const raw = b - a;
  return raw < 0 ? raw + 360 : raw;
}

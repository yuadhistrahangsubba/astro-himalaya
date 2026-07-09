import { describe, expect, it } from "vitest";

import { julianCenturiesSinceJ2000, toJulianDay } from "./julian-date";

describe("toJulianDay", () => {
  it("matches the J2000.0 epoch exactly", () => {
    expect(toJulianDay(new Date("2000-01-01T12:00:00Z"))).toBeCloseTo(2451545.0, 6);
  });

  it("matches a known reference date one year before J2000", () => {
    expect(toJulianDay(new Date("1999-01-01T00:00:00Z"))).toBeCloseTo(2451179.5, 6);
  });

  it("matches Meeus's worked example (1957-10-04 19:26:24 UT, Sputnik 1)", () => {
    expect(toJulianDay(new Date("1957-10-04T19:26:24Z"))).toBeCloseTo(2436116.31, 2);
  });
});

describe("julianCenturiesSinceJ2000", () => {
  it("is zero at the J2000.0 epoch", () => {
    expect(julianCenturiesSinceJ2000(2451545.0)).toBe(0);
  });

  it("is exactly 1 one Julian century (36525 days) later", () => {
    expect(julianCenturiesSinceJ2000(2451545.0 + 36525)).toBeCloseTo(1, 10);
  });
});

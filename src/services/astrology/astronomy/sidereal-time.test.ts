import { describe, expect, it } from "vitest";

import { greenwichMeanSiderealTime, localSiderealTime } from "./sidereal-time";

describe("greenwichMeanSiderealTime", () => {
  it("matches Meeus's worked example 12.a (1987-04-10 00:00 UT)", () => {
    // Meeus's answer: 13h10m46.3668s = 197.6932 degrees.
    expect(greenwichMeanSiderealTime(2446895.5)).toBeCloseTo(197.6932, 2);
  });
});

describe("localSiderealTime", () => {
  it("adds east longitude directly to GMST", () => {
    const gmst = greenwichMeanSiderealTime(2446895.5);
    expect(localSiderealTime(2446895.5, 10)).toBeCloseTo(gmst + 10, 6);
  });

  it("wraps around 360 degrees", () => {
    const gmst = greenwichMeanSiderealTime(2446895.5);
    const west = -gmst - 10; // pushes it well below 0
    expect(localSiderealTime(2446895.5, west)).toBeCloseTo(350, 4);
  });
});

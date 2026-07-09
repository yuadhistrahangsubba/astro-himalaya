import { describe, expect, it } from "vitest";

import { meanObliquityOfEcliptic } from "./obliquity";

describe("meanObliquityOfEcliptic", () => {
  it("matches the well-known J2000.0 value of 23.4392911 degrees", () => {
    expect(meanObliquityOfEcliptic(0)).toBeCloseTo(23.4392911, 6);
  });

  it("decreases slowly over time (Earth's axial tilt is slowly shrinking)", () => {
    const atJ2000 = meanObliquityOfEcliptic(0);
    const oneCenturyLater = meanObliquityOfEcliptic(1);
    expect(oneCenturyLater).toBeLessThan(atJ2000);
    expect(atJ2000 - oneCenturyLater).toBeCloseTo(46.815 / 3600, 4);
  });
});

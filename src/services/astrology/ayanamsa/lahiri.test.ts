import { describe, expect, it } from "vitest";

import { lahiriAyanamsa } from "./lahiri";

describe("lahiriAyanamsa", () => {
  it("equals the reference value exactly at the 1900.0 reference epoch", () => {
    expect(lahiriAyanamsa(2415020.0)).toBeCloseTo(22.4595, 6);
  });

  it("is around the commonly cited ~23.85 degrees near the year 2000", () => {
    expect(lahiriAyanamsa(2451545.0)).toBeCloseTo(23.85, 1);
  });

  it("increases monotonically over time (precession only ever accumulates forward)", () => {
    const early = lahiriAyanamsa(2415020.0);
    const later = lahiriAyanamsa(2451545.0);
    const muchLater = lahiriAyanamsa(2500000.0);
    expect(later).toBeGreaterThan(early);
    expect(muchLater).toBeGreaterThan(later);
  });

  it("advances by the general precession rate per year", () => {
    const oneYearOfDays = 365.25;
    const delta = lahiriAyanamsa(2415020.0 + oneYearOfDays) - lahiriAyanamsa(2415020.0);
    expect(delta).toBeCloseTo(50.2388 / 3600, 6);
  });
});

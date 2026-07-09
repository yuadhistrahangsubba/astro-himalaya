import { describe, expect, it } from "vitest";

import { rashiFromSiderealLongitude } from "./rashi";

describe("rashiFromSiderealLongitude", () => {
  it("places 95 degrees sidereal in Cancer, 5 degrees in", () => {
    const result = rashiFromSiderealLongitude(95);
    expect(result.signName).toBe("Cancer");
    expect(result.degreesInSign).toBeCloseTo(5, 10);
  });
});

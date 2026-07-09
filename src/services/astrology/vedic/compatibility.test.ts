import { describe, expect, it } from "vitest";

import { CalculationNotImplementedError } from "../errors";
import { calculateGunaMilan } from "./compatibility";
import { nakshatraFromSiderealLongitude } from "./nakshatra";

describe("calculateGunaMilan", () => {
  it("throws CalculationNotImplementedError rather than returning a guessed score", () => {
    const person1 = nakshatraFromSiderealLongitude(10);
    const person2 = nakshatraFromSiderealLongitude(100);
    expect(() => calculateGunaMilan(person1, person2)).toThrow(CalculationNotImplementedError);
  });
});

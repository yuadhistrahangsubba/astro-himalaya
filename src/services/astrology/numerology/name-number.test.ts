import { describe, expect, it } from "vitest";

import { calculateNameNumber } from "./name-number";

describe("calculateNameNumber", () => {
  it("sums Pythagorean letter values and reduces", () => {
    // A=1, N=5, N=5, A=1 -> 12 -> 1+2 = 3
    expect(calculateNameNumber("ANNA")).toBe(3);
  });

  it("is case-insensitive", () => {
    expect(calculateNameNumber("anna")).toBe(calculateNameNumber("ANNA"));
  });

  it("ignores spaces and non-letter characters", () => {
    // Pema=7+5+4+1=17, Dorji=4+6+9+1+9=29, total=46 -> 4+6=10 -> 1+0=1
    expect(calculateNameNumber("Pema Dorji")).toBe(1);
  });
});

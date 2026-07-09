import { describe, expect, it } from "vitest";

import { calculateLifePathNumber } from "./life-path";

describe("calculateLifePathNumber", () => {
  it("sums every digit of the date and reduces to a single digit", () => {
    // 1998-04-12 -> 1+9+9+8+0+4+1+2 = 34 -> 3+4 = 7
    expect(calculateLifePathNumber("1998-04-12")).toBe(7);
  });

  it("preserves a master number instead of reducing further", () => {
    // 1990-01-09 -> 1+9+9+0+0+1+0+9 = 29 -> 2+9 = 11 (master, stays 11)
    expect(calculateLifePathNumber("1990-01-09")).toBe(11);
  });
});

import { describe, expect, it } from "vitest";

import { reduceToDigitOrMasterNumber } from "./reduce";

describe("reduceToDigitOrMasterNumber", () => {
  it("leaves single digits unchanged", () => {
    expect(reduceToDigitOrMasterNumber(7)).toBe(7);
  });

  it("reduces a multi-digit number down to a single digit across multiple passes", () => {
    expect(reduceToDigitOrMasterNumber(59)).toBe(5); // 5+9=14, 1+4=5
  });

  it("stops reducing at the master numbers 11, 22, and 33", () => {
    expect(reduceToDigitOrMasterNumber(11)).toBe(11);
    expect(reduceToDigitOrMasterNumber(22)).toBe(22);
    expect(reduceToDigitOrMasterNumber(33)).toBe(33);
  });

  it("reduces past a non-master multi-digit intermediate result", () => {
    expect(reduceToDigitOrMasterNumber(1998)).toBe(9); // 1+9+9+8=27, 2+7=9
  });
});

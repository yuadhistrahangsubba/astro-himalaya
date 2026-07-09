import { describe, expect, it } from "vitest";

import { CalculationNotImplementedError } from "../errors";
import { calculateBhutaneseAstrology } from "./index";

describe("calculateBhutaneseAstrology", () => {
  it("throws CalculationNotImplementedError instead of returning a guessed result", () => {
    expect(() => calculateBhutaneseAstrology("1998-04-12", "06:00")).toThrow(
      CalculationNotImplementedError,
    );
  });
});

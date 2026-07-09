import { describe, expect, it } from "vitest";

import { CalculationNotImplementedError } from "../errors";
import { calculateTibetanAstrology } from "./index";

describe("calculateTibetanAstrology", () => {
  it("throws CalculationNotImplementedError instead of returning a guessed result", () => {
    expect(() => calculateTibetanAstrology("1998-04-12", "06:00")).toThrow(
      CalculationNotImplementedError,
    );
  });
});

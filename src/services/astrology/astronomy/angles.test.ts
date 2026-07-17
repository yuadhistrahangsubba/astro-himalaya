import { describe, expect, it } from "vitest";

import { normalizeDegrees, signedAngularDelta, signFromLongitude, toDegrees, toRadians } from "./angles";

describe("normalizeDegrees", () => {
  it("leaves in-range values unchanged", () => {
    expect(normalizeDegrees(45)).toBe(45);
    expect(normalizeDegrees(0)).toBe(0);
  });

  it("wraps values at or above 360", () => {
    expect(normalizeDegrees(360)).toBe(0);
    expect(normalizeDegrees(400)).toBe(40);
    expect(normalizeDegrees(720 + 10)).toBe(10);
  });

  it("wraps negative values", () => {
    expect(normalizeDegrees(-10)).toBe(350);
    expect(normalizeDegrees(-370)).toBe(350);
  });

  it("clamps the floating-point boundary where -epsilon + 360 rounds to exactly 360", () => {
    expect(normalizeDegrees(-1e-15)).toBeLessThan(360);
    expect(normalizeDegrees(-1e-15)).toBeCloseTo(0, 9);
  });
});

describe("toRadians / toDegrees", () => {
  it("round-trip", () => {
    expect(toDegrees(toRadians(123.45))).toBeCloseTo(123.45, 10);
  });

  it("180 degrees is pi radians", () => {
    expect(toRadians(180)).toBeCloseTo(Math.PI, 10);
  });
});

describe("signedAngularDelta", () => {
  it("reports simple forward motion as positive", () => {
    expect(signedAngularDelta(10, 15)).toBeCloseTo(5, 10);
  });

  it("reports simple backward motion as negative", () => {
    expect(signedAngularDelta(15, 10)).toBeCloseTo(-5, 10);
  });

  it("takes the shorter way around across the 359->0 wrap, forward", () => {
    expect(signedAngularDelta(359, 1)).toBeCloseTo(2, 10);
  });

  it("takes the shorter way around across the 0->359 wrap, backward", () => {
    expect(signedAngularDelta(1, 359)).toBeCloseTo(-2, 10);
  });

  it("a half-circle delta resolves to exactly -180 (the [-180, 180) boundary choice)", () => {
    expect(signedAngularDelta(0, 180)).toBe(-180);
  });
});

describe("signFromLongitude", () => {
  it("0 degrees is the first sign at 0 degrees in", () => {
    expect(signFromLongitude(0)).toEqual({ signIndex: 0, degreesInSign: 0 });
  });

  it("29.9 degrees is still the first sign", () => {
    const result = signFromLongitude(29.9);
    expect(result.signIndex).toBe(0);
    expect(result.degreesInSign).toBeCloseTo(29.9, 10);
  });

  it("30 degrees rolls into the second sign", () => {
    expect(signFromLongitude(30)).toEqual({ signIndex: 1, degreesInSign: 0 });
  });

  it("normalizes out-of-range longitudes first", () => {
    expect(signFromLongitude(390)).toEqual({ signIndex: 1, degreesInSign: 0 });
  });

  it("the last sign runs up to (but not including) 360", () => {
    expect(signFromLongitude(345)).toEqual({ signIndex: 11, degreesInSign: 15 });
  });
});

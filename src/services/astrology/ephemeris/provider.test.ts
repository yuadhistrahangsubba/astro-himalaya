import { describe, expect, it } from "vitest";

import { PlanetNotSupportedError } from "../errors";
import { MeeusEphemerisProvider } from "./provider";

describe("MeeusEphemerisProvider", () => {
  const provider = new MeeusEphemerisProvider();

  it("delegates sun and moon to their real implementations", () => {
    const jd = 2451545.0;
    expect(provider.getPosition("sun", jd).longitudeDegrees).toBeGreaterThanOrEqual(0);
    expect(provider.getPosition("moon", jd).longitudeDegrees).toBeGreaterThanOrEqual(0);
  });

  it("throws PlanetNotSupportedError for every other body rather than guessing", () => {
    const others = ["mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"] as const;
    for (const body of others) {
      expect(() => provider.getPosition(body, 2451545.0)).toThrow(PlanetNotSupportedError);
    }
  });
});

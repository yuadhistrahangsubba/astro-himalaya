import { normalizeDegrees } from "../astronomy/angles";
import { toJulianDay } from "../astronomy/julian-date";
import { moonPosition } from "../ephemeris/moon";
import { sunPosition } from "../ephemeris/sun";

const TARGETS = [
  { elongation: 0, name: "New Moon", aspect: "Conjunction" },
  { elongation: 60, name: "Waxing Sextile", aspect: "Sextile" },
  { elongation: 90, name: "First Quarter", aspect: "Square" },
  { elongation: 120, name: "Waxing Trine", aspect: "Trine" },
  { elongation: 180, name: "Full Moon", aspect: "Opposition" },
  { elongation: 240, name: "Waning Trine", aspect: "Trine" },
  { elongation: 270, name: "Last Quarter", aspect: "Square" },
  { elongation: 300, name: "Waning Sextile", aspect: "Sextile" },
] as const;

export interface LunarPhaseEvent {
  name: string;
  aspect: string;
  elongationDegrees: number;
  at: Date;
}

const HOUR_MS = 60 * 60 * 1000;

function elongationAt(date: Date): number {
  const jd = toJulianDay(date);
  return normalizeDegrees(moonPosition(jd).longitudeDegrees - sunPosition(jd).longitudeDegrees);
}

/**
 * Every upcoming Sun–Moon aspect (the lunar phase events: new/full moons,
 * quarters, sextiles, trines) in the given window, in time order.
 *
 * Elongation grows monotonically at ~0.5°/hour, so an hourly scan with
 * linear interpolation at each target crossing pins the time to within
 * a couple of minutes of what this Moon series supports. Absolute
 * accuracy is bounded by the reduced-precision Moon (see
 * ephemeris/moon.ts): typically well under an hour, worst case ~2h —
 * fine for "Full Moon · Jul 29", not for eclipse timing.
 */
export function findUpcomingLunarEvents(from: Date, daysAhead = 40): LunarPhaseEvent[] {
  const events: LunarPhaseEvent[] = [];
  const totalHours = daysAhead * 24;
  let previous = elongationAt(from);

  for (let hour = 1; hour <= totalHours; hour++) {
    const time = new Date(from.getTime() + hour * HOUR_MS);
    const current = elongationAt(time);
    // Forward motion this step, unwrapped across 360 -> 0.
    const step = normalizeDegrees(current - previous);

    for (const target of TARGETS) {
      // How far past `previous` the target sits, going forward.
      const distanceToTarget = normalizeDegrees(target.elongation - previous);
      if (distanceToTarget > 0 && distanceToTarget <= step) {
        const fraction = distanceToTarget / step;
        events.push({
          name: target.name,
          aspect: target.aspect,
          elongationDegrees: target.elongation,
          at: new Date(time.getTime() - (1 - fraction) * HOUR_MS),
        });
      }
    }

    previous = current;
  }

  return events.sort((a, b) => a.at.getTime() - b.at.getTime());
}

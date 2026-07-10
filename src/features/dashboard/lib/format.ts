import { OBSERVER } from "../constants";

/** 123.456 -> `123°27′` — the terminal-style degree readout. */
export function formatDegrees(degrees: number): string {
  const whole = Math.floor(degrees);
  const minutes = Math.round((degrees - whole) * 60);
  // 59.6′ rounds to 60 — carry it rather than printing 12°60′.
  if (minutes === 60) return `${whole + 1}°00′`;
  return `${whole}°${String(minutes).padStart(2, "0")}′`;
}

/** Degrees-into-sign readout, e.g. `17°05′ Leo`. */
export function formatPlacement(degreesInSign: number, signName: string): string {
  return `${formatDegrees(degreesInSign)} ${signName}`;
}

const eventFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: OBSERVER.timezone,
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** `29 Jul, 14:02` in the observer's zone. */
export function formatEventDate(date: Date): string {
  return eventFormatter.format(date);
}

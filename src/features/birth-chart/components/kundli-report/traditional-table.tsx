import { Compass, MoonStar, UserRound } from "lucide-react";
import type { ComponentType } from "react";

import { ascLord, rasiLord, starLord, type ChartResult } from "@/services/astrology";

import { degreesToClockTime, formatDateInZone, formatLatitude, formatLongitude, formatTimeInZone } from "./format";

interface TraditionalTableProps {
  result: ChartResult;
  name: string;
  gender: "male" | "female";
  placeName: string;
  birthUtc: Date;
  timezone: string;
  latitude: number;
  longitude: number;
}

interface Field {
  label: string;
  value: string;
}

interface HeadlineStat {
  label: string;
  value: string;
  sub: string;
}

interface FieldGroup {
  title: string;
  icon: ComponentType<{ className?: string }>;
  fields: Field[];
}

export function TraditionalTable({
  result,
  name,
  gender,
  placeName,
  birthUtc,
  timezone,
  latitude,
  longitude,
}: TraditionalTableProps) {
  const asc = result.ascendant;
  const firstMahadasha = result.vimshottariDasha[0];
  const balance = result.dashaBalanceAtBirth;

  // The four facts a Vedic reading is actually organized around — worth
  // more visual weight than a Julian Day figure, so they get their own
  // headline row instead of disappearing into the general grid.
  const headline: HeadlineStat[] = [
    asc ? { label: "Ascendant", value: asc.rashi.signName, sub: `Lord ${ascLord(asc.rashi)}` } : null,
    { label: "Rasi", value: result.moon.rashi.signName, sub: `Lord ${rasiLord(result.moon.rashi)}` },
    {
      label: "Nakshatra",
      value: `${result.moon.nakshatra.name} · Pada ${result.moon.nakshatra.pada}`,
      sub: `Lord ${starLord(result.moon.nakshatra)}`,
    },
    firstMahadasha
      ? {
          label: "Dasha Balance",
          value: firstMahadasha.planet,
          sub: `${balance.years}y ${balance.months}m ${balance.days}d left`,
        }
      : null,
  ].filter((stat): stat is HeadlineStat => stat !== null);

  const groups: FieldGroup[] = [
    {
      title: "Birth Details",
      icon: UserRound,
      fields: [
        { label: "Name", value: name },
        { label: "Sex", value: gender === "male" ? "Male" : "Female" },
        { label: "Date", value: formatDateInZone(birthUtc, timezone) },
        {
          label: "Time of Birth",
          value: result.timeConfidence === "exact" ? formatTimeInZone(birthUtc, timezone) : "Unknown",
        },
        { label: "Place", value: placeName },
        { label: "Latitude", value: formatLatitude(latitude) },
        { label: "Longitude", value: formatLongitude(longitude) },
      ],
    },
    {
      title: "Panchanga",
      icon: MoonStar,
      fields: [
        { label: "Tithi", value: result.panchang.tithi.name },
        { label: "Yoga", value: result.panchang.yoga.name },
        { label: "Karana", value: result.panchang.karana.name },
        ...(result.sunrise ? [{ label: "Sunrise", value: formatTimeInZone(result.sunrise, timezone) }] : []),
        ...(result.sunset ? [{ label: "Sunset", value: formatTimeInZone(result.sunset, timezone) }] : []),
      ],
    },
    {
      title: "Chart Technicals",
      icon: Compass,
      fields: [
        { label: "Julian Day", value: String(Math.round(result.julianDayUtc)) },
        { label: "Ayanamsa", value: formatDegreesOnly(result.ayanamsaDegrees) },
        { label: "Ayanamsa Type", value: result.ayanamsaName },
        ...(result.siderealTimeDegrees !== undefined
          ? [{ label: "Sidereal Time", value: degreesToClockTime(result.siderealTimeDegrees) }]
          : []),
      ],
    },
  ];

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {headline.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-gold/30 bg-gradient-to-b from-gold/10 to-transparent p-4">
            <p className="font-dense text-[10px] tracking-[0.15em] text-gold uppercase">{stat.label}</p>
            <p className="mt-1 truncate font-sans text-lg font-bold text-foreground" title={stat.value}>
              {stat.value}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title} className="rounded-2xl border border-border/60 bg-card/50 p-5">
            <div className="flex items-center gap-2">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                <group.icon className="size-3.5" aria-hidden="true" />
              </span>
              <h4 className="font-dense text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase">{group.title}</h4>
            </div>
            <dl className="mt-4 grid gap-3">
              {group.fields.map((field) => (
                <div key={field.label} className="flex items-baseline justify-between gap-3">
                  <dt className="text-xs text-muted-foreground">{field.label}</dt>
                  <dd className="truncate text-right text-sm font-semibold text-foreground" title={field.value}>
                    {field.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDegreesOnly(decimalDegrees: number): string {
  const totalMinutes = Math.round(decimalDegrees * 60);
  const degrees = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${degrees}° ${minutes}'`;
}

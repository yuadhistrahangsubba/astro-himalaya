"use client";

import { CountUp } from "@/components/marketing/count-up";

import { SkeletonLines, WidgetCard } from "./widget-card";
import type { SkyNow } from "../hooks/use-sky-now";
import { formatDegrees } from "../lib/format";

/**
 * An accurate phase disc, not a stock crescent: the lit region is the
 * limb semicircle closed by the terminator — a half-ellipse whose
 * x-radius is r·|cos(phase)| — which is the actual geometry of how
 * sunlight falls on a sphere. Waxing lights the right limb, waning the
 * left (northern-hemisphere convention).
 */
function PhaseDisc({ phaseAngle }: { phaseAngle: number }) {
  const radians = (phaseAngle * Math.PI) / 180;
  const rx = 42 * Math.abs(Math.cos(radians));
  const waxing = phaseAngle < 180;

  // SVG sweep=1 bows the bottom→top terminator left, sweep=0 bows it
  // right. Crescents keep the terminator near the lit limb; gibbous
  // phases push it past center toward the dark limb.
  const litPath = waxing
    ? `M 50 8 A 42 42 0 0 1 50 92 A ${rx} 42 0 0 ${phaseAngle < 90 ? 0 : 1} 50 8`
    : `M 50 8 A 42 42 0 0 0 50 92 A ${rx} 42 0 0 ${phaseAngle < 270 ? 0 : 1} 50 8`;

  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-gold/15 blur-xl" aria-hidden="true" />
      <svg viewBox="0 0 100 100" className="relative size-28" aria-hidden="true">
        <circle cx="50" cy="50" r="42" fill="oklch(0.16 0.03 275)" stroke="currentColor" strokeOpacity="0.15" />
        <path d={litPath} fill="var(--color-gold)" fillOpacity="0.92" />
      </svg>
    </div>
  );
}

export function MoonPhaseWidget({ sky, className }: { sky?: SkyNow; className?: string }) {
  return (
    <WidgetCard label="Moon Phase" live={Boolean(sky)} className={className}>
      {!sky ? (
        <SkeletonLines count={4} />
      ) : (
        <div className="flex h-full items-center gap-5">
          <PhaseDisc phaseAngle={sky.snapshot.moonPhase.phaseAngle} />
          <div className="grid gap-1">
            <p className="font-serif text-xl">{sky.snapshot.moonPhase.name}</p>
            <p className="font-mono text-sm text-gold tabular-nums">
              <CountUp to={Math.round(sky.snapshot.moonPhase.illuminatedFraction * 100)} suffix="%" />{" "}
              <span className="text-muted-foreground">lit</span>
            </p>
            <p className="font-mono text-xs text-muted-foreground tabular-nums">
              elongation {formatDegrees(sky.snapshot.moonPhase.phaseAngle)}
            </p>
          </div>
        </div>
      )}
    </WidgetCard>
  );
}

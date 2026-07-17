"use server";

import { computeChart, type BirthInput, type ChartResult } from "@/services/astrology";

export type ComputeChartOutcome = { ok: true; result: ChartResult } | { ok: false; message: string };

/**
 * Server-side twin of `computeChart` — runs the engine on the server instead
 * of the visitor's device, and keeps the exact error message the client
 * previously caught locally. Returned (not thrown) so the message survives:
 * Next.js redacts thrown Server Action errors down to a generic message in
 * production, but a plain returned value is never redacted.
 */
export async function computeChartAction(input: BirthInput): Promise<ComputeChartOutcome> {
  try {
    return { ok: true, result: computeChart(input) };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "Something went wrong." };
  }
}

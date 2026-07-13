import type { Metadata } from "next";

import { CalendarThemedShell } from "@/features/kirat-calendar/components/CalendarThemedShell";
import { AstroPageContent } from "./astro-page-content";

export const metadata: Metadata = {
  title: "Astro",
};

export default function AstroPage() {
  return (
    <CalendarThemedShell>
      <AstroPageContent />
    </CalendarThemedShell>
  );
}

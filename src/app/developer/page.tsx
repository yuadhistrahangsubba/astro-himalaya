import type { Metadata } from "next";

import { CalendarThemedShell } from "@/features/kirat-calendar/components/CalendarThemedShell";
import { DeveloperPageContent } from "./developer-page-content";

export const metadata: Metadata = {
  title: "Developer",
};

export default function DeveloperPage() {
  return (
    <CalendarThemedShell>
      <DeveloperPageContent />
    </CalendarThemedShell>
  );
}

import type { Metadata } from "next";

import { KiratCalendar } from "@/features/kirat-calendar/components/KiratCalendar";

export const metadata: Metadata = {
  title: "Kirat Khaik Mundhum Calendar",
};

export default function HomePage() {
  return <KiratCalendar />;
}

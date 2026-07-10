import type { Metadata } from "next";

import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}

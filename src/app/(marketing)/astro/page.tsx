import type { Metadata } from "next";

import { AstroPageContent } from "./astro-page-content";

export const metadata: Metadata = {
  title: "Astro",
};

export default function AstroPage() {
  return <AstroPageContent />;
}

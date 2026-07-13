import type { Metadata } from "next";

import { Faq } from "./faq-section";

export const metadata: Metadata = {
  title: "FAQ",
};

export default function FaqPage() {
  return (
    <main>
      <Faq />
    </main>
  );
}

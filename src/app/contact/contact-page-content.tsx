"use client";

import { AstrologerDirectory } from "@/features/contact/components/astrologer-directory";

export function ContactPageContent() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center px-6 py-28 sm:py-36">
      <AstrologerDirectory />
    </main>
  );
}

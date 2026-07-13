import Link from "next/link";

import { ChartWheel } from "@/components/marketing/chart-wheel";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/constants/nav";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <ChartWheel size="sm" />
          <span className="font-serif text-lg italic tracking-tight">Kirat Astro</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button asChild size="sm" breathing>
          <Link href="/astro">Get your chart</Link>
        </Button>
      </div>
    </header>
  );
}

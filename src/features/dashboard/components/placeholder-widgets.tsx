"use client";

import { FileText, HeartHandshake, Star, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

import { WidgetCard } from "./widget-card";

function EmptyState({
  icon: Icon,
  title,
  body,
  action,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 py-4 text-center">
      <span className="flex size-10 items-center justify-center rounded-full border border-gold/25 bg-gold/8">
        <Icon className="size-4.5 text-gold" aria-hidden="true" />
      </span>
      <p className="mt-1 text-sm font-medium">{title}</p>
      <p className="max-w-[26ch] text-xs leading-relaxed text-muted-foreground">{body}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/** Honest state: Guna Milan needs verified Ashtakoot tables before we ship scores. */
export function CompatibilityWidget({ className }: { className?: string }) {
  return (
    <WidgetCard label="Compatibility · Guna Milan" className={className}>
      <EmptyState
        icon={HeartHandshake}
        title="Under verification"
        body="Ashtakoot scoring ships once the traditional tables are verified — a match this important doesn't get guessed."
      />
    </WidgetCard>
  );
}

export function SavedChartsWidget({ className }: { className?: string }) {
  return (
    <WidgetCard label="Saved Charts" className={className}>
      <EmptyState
        icon={Star}
        title="No charts yet"
        body="Charts you generate will live here, ready to reopen."
        action={
          <Button asChild size="sm" variant="outline">
            <Link href="/#demo">Generate your first chart</Link>
          </Button>
        }
      />
    </WidgetCard>
  );
}

export function RecentReportsWidget({ className }: { className?: string }) {
  return (
    <WidgetCard label="Recent Reports" className={className}>
      <EmptyState
        icon={FileText}
        title="Nothing to read yet"
        body="Detailed readings will appear here after your first full report."
      />
    </WidgetCard>
  );
}

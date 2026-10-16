import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TimelineProps {
  children: ReactNode;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <div className={cn("relative my-8 not-prose pl-1 sm:pl-2", className)}>
      {/* Continuous vertical timeline connector rail */}
      <div
        aria-hidden="true"
        className="absolute left-[19px] sm:left-[23px] top-4 bottom-6 w-[2px] bg-gradient-to-b from-fd-primary via-fd-border/80 to-fd-border/30"
      />
      <div className="flex flex-col gap-6">
        {children}
      </div>
    </div>
  );
}

export interface TimelineItemProps {
  year: string;
  bsYear?: string;
  title: string;
  badge?: string;
  badgeColor?: "primary" | "secondary" | "accent";
  children: ReactNode;
  isLatest?: boolean;
}

export function TimelineItem({
  year,
  bsYear,
  title,
  badge,
  badgeColor = "primary",
  children,
  isLatest = false,
}: TimelineItemProps) {
  return (
    <div className="relative flex items-start gap-4 sm:gap-6 group">
      {/* Node marker on the rail */}
      <div className="relative z-10 flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-full border-2 border-fd-border bg-fd-background shadow-xs transition-all duration-200 group-hover:border-fd-primary group-hover:scale-105">
        <div
          className={cn(
            "size-3 sm:size-3.5 rounded-full transition-colors",
            isLatest
              ? "bg-fd-primary ring-4 ring-fd-primary/20 animate-pulse"
              : "bg-fd-primary/70 group-hover:bg-fd-primary"
          )}
        />
      </div>

      {/* Timeline item card */}
      <div className="flex-1 rounded-xl border border-fd-border/70 bg-fd-card/50 p-4 sm:p-5 backdrop-blur-xs transition-all duration-200 hover:border-fd-primary/40 hover:bg-fd-card/80 hover:shadow-xs">
        {/* Header row: Year, BS Year badge, and Category badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-fd-border/40 pb-2.5 mb-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm sm:text-base font-bold text-fd-foreground">
              {year}
            </span>
            {bsYear && (
              <span className="inline-flex items-center rounded-md border border-fd-primary/30 bg-fd-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-fd-primary">
                {bsYear}
              </span>
            )}
          </div>
          {badge && (
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
                badgeColor === "primary" && "bg-fd-primary/10 text-fd-primary border border-fd-primary/20",
                badgeColor === "secondary" && "bg-fd-secondary text-fd-secondary-foreground border border-fd-border",
                badgeColor === "accent" && "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
              )}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-fd-foreground tracking-tight mb-2">
          {title}
        </h3>

        {/* Content body */}
        <div className="text-sm leading-relaxed text-fd-muted-foreground space-y-1.5">
          {children}
        </div>
      </div>
    </div>
  );
}


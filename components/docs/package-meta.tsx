"use client";

import { ExternalLink, Download } from "lucide-react";
import { DistributorLogo } from "@/components/icons/package-logos";
import { cn } from "@/lib/cn";

export interface PackageMetaProps {
  distributor: "npm" | "PyPI" | "Packagist";
  packageName: string;
  packageUrl: string;
  repoName: string;
  repoUrl: string;
  badges: Array<{
    alt: string;
    src: string;
    href: string;
  }>;
}

export function PackageMeta({
  distributor,
  packageName,
  packageUrl,
  repoName,
  repoUrl,
  badges,
}: PackageMetaProps) {
  return (
    <div className="my-6 flex flex-col gap-4 rounded-xl border border-fd-border/70 bg-fd-card/50 p-4 backdrop-blur-xs transition-colors not-prose">
      {/* Top Action Links */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-fd-border/50 pb-3.5">
        <div className="flex flex-wrap items-center gap-2">
          {/* Package Distributor Link */}
          <a
            href={packageUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-secondary/60 px-3 py-1.5 text-xs font-semibold text-fd-foreground shadow-2xs transition-all hover:bg-fd-accent hover:border-fd-primary/40 hover:text-fd-primary"
            title={`View ${packageName} on ${distributor}`}
          >
            <DistributorLogo distributor={distributor} className="size-4 shrink-0" />
            <span>{distributor}: <span className="font-mono text-fd-muted-foreground">{packageName}</span></span>
            <ExternalLink className="size-3 text-fd-muted-foreground/70" />
          </a>

          {/* GitHub Repository Link */}
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-fd-border bg-fd-secondary/60 px-3 py-1.5 text-xs font-semibold text-fd-foreground shadow-2xs transition-all hover:bg-fd-accent hover:border-fd-primary/40 hover:text-fd-primary"
            title={`View ${repoName} on GitHub`}
          >
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="size-3.5 shrink-0">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="font-mono text-xs">{repoName.replace("SandipGhimire/", "")}</span>
            <ExternalLink className="size-3 text-fd-muted-foreground/70" />
          </a>
        </div>
      </div>

      {/* Download Counters & Dynamic Badges */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-fd-muted-foreground/80 flex items-center gap-1.5">
          <Download className="size-3 text-fd-primary" />
          Distribution & Download Metrics
        </span>
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          {badges.map((badge, idx) => (
            <a
              key={idx}
              href={badge.href}
              target="_blank"
              rel="noreferrer"
              className="inline-block transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              <img
                src={badge.src}
                alt={badge.alt}
                className="h-5 w-auto rounded-sm"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";
import { ExternalLink, Download, Copy, Check, Terminal } from "lucide-react";
import { NpmLogo, PackagistLogo, PypiLogo } from "@/components/icons/package-logos";

interface PackageCardData {
  language: string;
  distributor: "npm" | "PyPI" | "Packagist";
  logo: React.ReactNode;
  packageName: string;
  packageUrl: string;
  repoName: string;
  repoUrl: string;
  installCommand: string;
  badges: Array<{
    alt: string;
    src: string;
    href: string;
  }>;
}

const packages: PackageCardData[] = [
  {
    language: "Node.js / TypeScript",
    distributor: "npm",
    logo: <NpmLogo className="size-5 shrink-0 rounded-[2.5px]" />,
    packageName: "nepali-date-library",
    packageUrl: "https://www.npmjs.com/package/nepali-date-library",
    repoName: "SandipGhimire/Nepali-Date-Library-NodeJS",
    repoUrl: "https://github.com/SandipGhimire/Nepali-Date-Library-NodeJS",
    installCommand: "npm install nepali-date-library",
    badges: [
      {
        alt: "Monthly Downloads",
        src: "https://img.shields.io/npm/dm/nepali-date-library?style=flat&logo=npm&logoColor=white&label=Downloads%2FMo&color=E1804B",
        href: "https://www.npmjs.com/package/nepali-date-library",
      },
      {
        alt: "Total Downloads",
        src: "https://img.shields.io/npm/dt/nepali-date-library?style=flat&logo=npm&logoColor=white&label=Total&color=E1804B",
        href: "https://www.npmjs.com/package/nepali-date-library",
      },
      {
        alt: "Version",
        src: "https://img.shields.io/npm/v/nepali-date-library?style=flat&label=npm&color=E1804B",
        href: "https://www.npmjs.com/package/nepali-date-library",
      },
    ],
  },
  {
    language: "Python",
    distributor: "PyPI",
    logo: <PypiLogo className="size-5 shrink-0" />,
    packageName: "nepali-date-library",
    packageUrl: "https://pypi.org/project/nepali-date-library/",
    repoName: "SandipGhimire/Nepali-Date-Library-Python",
    repoUrl: "https://github.com/SandipGhimire/Nepali-Date-Library-Python",
    installCommand: "pip install nepali-date-library",
    badges: [
      {
        alt: "Monthly Downloads",
        src: "https://img.shields.io/pypi/dm/nepali-date-library?style=flat&logo=pypi&logoColor=white&label=Downloads%2FMo&color=3775A9",
        href: "https://pypi.org/project/nepali-date-library/",
      },
      {
        alt: "Version",
        src: "https://img.shields.io/pypi/v/nepali-date-library?style=flat&label=PyPI&color=3775A9",
        href: "https://pypi.org/project/nepali-date-library/",
      },
      {
        alt: "Python Versions",
        src: "https://img.shields.io/pypi/pyversions/nepali-date-library?style=flat&label=Python&color=3775A9",
        href: "https://pypi.org/project/nepali-date-library/",
      },
    ],
  },
  {
    language: "PHP",
    distributor: "Packagist",
    logo: <PackagistLogo className="size-5 shrink-0" />,
    packageName: "sghimire/nepali-date-library",
    packageUrl: "https://packagist.org/packages/sghimire/nepali-date-library",
    repoName: "SandipGhimire/Nepali-Date-Library-PHP",
    repoUrl: "https://github.com/SandipGhimire/Nepali-Date-Library-PHP",
    installCommand: "composer require sghimire/nepali-date-library",
    badges: [
      {
        alt: "Monthly Downloads",
        src: "https://img.shields.io/packagist/dm/sghimire/nepali-date-library?style=flat&logo=packagist&logoColor=white&label=Downloads%2FMo&color=777BB4",
        href: "https://packagist.org/packages/sghimire/nepali-date-library",
      },
      {
        alt: "Total Downloads",
        src: "https://img.shields.io/packagist/dt/sghimire/nepali-date-library?style=flat&logo=packagist&logoColor=white&label=Total&color=777BB4",
        href: "https://packagist.org/packages/sghimire/nepali-date-library",
      },
      {
        alt: "Version",
        src: "https://img.shields.io/packagist/v/sghimire/nepali-date-library?style=flat&label=Packagist&color=777BB4",
        href: "https://packagist.org/packages/sghimire/nepali-date-library",
      },
    ],
  },
];

function CopyableCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-fd-border/70 bg-fd-secondary/40 px-3 py-1.5 font-mono text-xs text-fd-foreground">
      <div className="flex items-center gap-2 overflow-hidden truncate">
        <Terminal className="size-3.5 shrink-0 text-fd-muted-foreground" />
        <span className="truncate">{command}</span>
      </div>
      <button
        onClick={handleCopy}
        type="button"
        title="Copy install command"
        className="ml-2 inline-flex size-6 shrink-0 items-center justify-center rounded-md border border-fd-border/60 bg-fd-background text-fd-muted-foreground transition-colors hover:text-fd-foreground hover:border-fd-primary/40"
      >
        {copied ? (
          <Check className="size-3 text-emerald-500" />
        ) : (
          <Copy className="size-3" />
        )}
      </button>
    </div>
  );
}

export function EcosystemOverview() {
  return (
    <div className="my-8 not-prose">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.distributor}
            className="flex flex-col justify-between rounded-xl border border-fd-border/70 bg-fd-card/50 p-5 backdrop-blur-xs transition-all duration-200 hover:border-fd-primary/40 hover:bg-fd-card/80 hover:shadow-xs"
          >
            <div>
              {/* Header: Platform Logo + Language */}
              <div className="flex items-center justify-between gap-2 border-b border-fd-border/50 pb-3">
                <div className="flex items-center gap-2.5">
                  {pkg.logo}
                  <span className="font-bold text-sm text-fd-foreground">
                    {pkg.language}
                  </span>
                </div>
                <span className="rounded-md border border-fd-border bg-fd-secondary/60 px-2 py-0.5 font-mono text-[10px] font-semibold text-fd-muted-foreground">
                  {pkg.distributor}
                </span>
              </div>

              {/* Package Identification */}
              <div className="mt-3.5 space-y-1">
                <div className="text-[11px] font-medium uppercase tracking-wider text-fd-muted-foreground">
                  Package Name
                </div>
                <div className="font-mono text-xs font-semibold text-fd-foreground">
                  {pkg.packageName}
                </div>
              </div>

              {/* Install Command */}
              <div className="mt-3.5 space-y-1">
                <div className="text-[11px] font-medium uppercase tracking-wider text-fd-muted-foreground">
                  Install
                </div>
                <CopyableCommand command={pkg.installCommand} />
              </div>

              {/* Live Metric Badges */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-fd-muted-foreground">
                  <Download className="size-3 text-fd-primary" />
                  <span>Metrics & Version</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  {pkg.badges.map((badge, idx) => (
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

            {/* External Action Links */}
            <div className="mt-5 flex items-center gap-2 border-t border-fd-border/50 pt-3 text-xs">
              <a
                href={pkg.packageUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-fd-border bg-fd-secondary/50 px-2.5 py-1.5 font-medium text-fd-foreground transition-all hover:bg-fd-accent hover:border-fd-primary/40 hover:text-fd-primary"
              >
                <span>Registry</span>
                <ExternalLink className="size-3 opacity-70" />
              </a>
              <a
                href={pkg.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-fd-border bg-fd-secondary/50 px-2.5 py-1.5 font-medium text-fd-foreground transition-all hover:bg-fd-accent hover:border-fd-primary/40 hover:text-fd-primary"
              >
                <span>Repository</span>
                <ExternalLink className="size-3 opacity-70" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


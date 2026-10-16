import Link from "next/link";
import { ExternalLink, Download, ArrowRight } from "lucide-react";
import { NpmLogo, PackagistLogo, PypiLogo } from "@/components/icons/package-logos";

interface PackageCardData {
  language: string;
  distributor: "npm" | "PyPI" | "Packagist";
  logo: React.ReactNode;
  packageName: string;
  packageUrl: string;
  repoName: string;
  repoUrl: string;
  docsUrl: string;
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
    docsUrl: "/docs/nodejs",
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
    docsUrl: "/docs/python",
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
    docsUrl: "/docs/php",
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
                  Package
                </div>
                <div className="font-mono text-xs font-semibold text-fd-foreground">
                  {pkg.packageName}
                </div>
              </div>

              {/* Live Metric Badges */}
              <div className="mt-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-fd-muted-foreground">
                  <Download className="size-3 text-fd-primary" />
                  <span>Downloads & Version</span>
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

            {/* Actions: Primary View Docs Button + Secondary Links */}
            <div className="mt-5 space-y-2 border-t border-fd-border/50 pt-3.5">
              <Link
                href={pkg.docsUrl}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-fd-primary px-3 py-2 text-xs font-semibold text-fd-primary-foreground shadow-2xs transition-all hover:bg-fd-primary/90 hover:shadow-xs active:scale-[0.99]"
              >
                <span>View Docs</span>
                <ArrowRight className="size-3.5" />
              </Link>

              <div className="flex items-center gap-2 text-xs">
                <a
                  href={pkg.packageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-fd-border bg-fd-secondary/40 px-2.5 py-1.5 font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
                >
                  <span>Registry</span>
                  <ExternalLink className="size-3 opacity-60" />
                </a>
                <a
                  href={pkg.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-fd-border bg-fd-secondary/40 px-2.5 py-1.5 font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
                >
                  <span>GitHub</span>
                  <ExternalLink className="size-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("border-t border-fd-border/70 bg-fd-card/60 backdrop-blur-lg", className)}>
      <div className="mx-auto max-w-(--fd-layout-width) px-6 pt-14 pb-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 select-none">
              <img src="/Logo/Dark/Logo.svg" alt="Nepali Date Logo" className="h-10 w-auto sm:h-12 dark:hidden drop-shadow-xs" />
              <img src="/Logo/Light/Logo.svg" alt="Nepali Date Logo" className="h-10 w-auto sm:h-12 hidden dark:block drop-shadow-xs" />
              <div className="flex flex-col text-left justify-center">
                <span className="text-xl font-bold tracking-tight text-fd-foreground">Nepali Date</span>
                <span className="text-xs text-fd-muted-foreground font-medium tracking-normal mt-0.5">
                  Bikram Sambat Date Engine
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-fd-muted-foreground leading-relaxed max-w-sm">
              A comprehensive, multi-language ecosystem for working with Nepali (Bikram Sambat) dates across
              NodeJS, Python, and PHP.
            </p>
          </div>

          {/* Column 1: Ecosystem */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-fd-foreground">
              Implementations
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-fd-muted-foreground">
              <li>
                <Link href="/docs" className="hover:text-fd-foreground transition-colors">
                  NodeJS Library
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-fd-foreground transition-colors">
                  Python Library
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-fd-foreground transition-colors">
                  PHP Library
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-fd-foreground transition-colors">
                  Documentation Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Key Capabilities */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-fd-foreground">
              Features
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-fd-muted-foreground">
              <li>
                <Link href="/docs" className="hover:text-fd-foreground transition-colors">
                  BS ↔ AD Conversion
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-fd-foreground transition-colors">
                  Nepali Fiscal Years
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-fd-foreground transition-colors">
                  Date Arithmetic
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-fd-foreground transition-colors">
                  Formatting & Parsing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-fd-border/60 pt-6 text-xs text-fd-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2.5">
            <img src="/Logo/Dark/Icon.svg" alt="Nepali Date Icon" className="h-5.5 w-5.5 dark:hidden" />
            <img src="/Logo/Light/Icon.svg" alt="Nepali Date Icon" className="h-5.5 w-5.5 hidden dark:block" />
            <span>&copy; {new Date().getFullYear()} Nepali Date Library Ecosystem. Open Source under MIT License.</span>
          </div>
          <div className="flex items-center gap-5 font-medium">
            <Link href="/docs" className="hover:text-fd-foreground transition-colors">
              Documentation
            </Link>
            <a
              href="https://github.com/SandipGhimire/Nepali-Date-Library-Docs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-fd-foreground transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


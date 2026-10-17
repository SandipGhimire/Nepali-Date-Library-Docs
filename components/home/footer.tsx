import Link from "next/link";
import { ExternalLink, Heart } from "lucide-react";
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
            <div className="flex items-center gap-2 pt-1 text-xs text-fd-muted-foreground">
              <span>Made with</span>
              <Heart className="size-3.5 fill-red-500 text-red-500 inline-block" />
              <span>by</span>
              <a
                href="https://github.com/SandipGhimire"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-fd-foreground hover:text-fd-primary transition-colors underline decoration-fd-border underline-offset-4 hover:decoration-fd-primary"
              >
                Sandip Ghimire
              </a>
            </div>
          </div>

          {/* Column 1: Ecosystem */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-fd-foreground">
              Implementations
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-fd-muted-foreground">
              <li>
                <Link href="/docs/nodejs" className="hover:text-fd-foreground transition-colors">
                  NodeJS / TypeScript
                </Link>
              </li>
              <li>
                <Link href="/docs/python" className="hover:text-fd-foreground transition-colors">
                  Python Library
                </Link>
              </li>
              <li>
                <Link href="/docs/php" className="hover:text-fd-foreground transition-colors">
                  PHP Library
                </Link>
              </li>
              <li>
                <Link href="/docs/origination" className="hover:text-fd-foreground transition-colors">
                  Documentation Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Tools & Features */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-fd-foreground">
              Tools & Features
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-fd-muted-foreground">
              <li>
                <Link href="/converter" className="hover:text-fd-foreground text-fd-primary font-medium transition-colors">
                  BS ↔ AD Date Converter
                </Link>
              </li>
              <li>
                <Link href="/docs/nodejs/fiscal-year" className="hover:text-fd-foreground transition-colors">
                  Fiscal Year & Quarters
                </Link>
              </li>
              <li>
                <Link href="/docs/nodejs/methods/add-days" className="hover:text-fd-foreground transition-colors">
                  Date Arithmetic & Math
                </Link>
              </li>
              <li>
                <Link href="/docs/nodejs/methods/format" className="hover:text-fd-foreground transition-colors">
                  Devanagari Formatting
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-fd-border/60 pt-6 text-xs text-fd-muted-foreground sm:flex-row">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <img src="/Logo/Dark/Icon.svg" alt="Nepali Date Icon" className="h-5.5 w-5.5 dark:hidden" />
              <img src="/Logo/Light/Icon.svg" alt="Nepali Date Icon" className="h-5.5 w-5.5 hidden dark:block" />
              <span>&copy; {new Date().getFullYear()} Nepali Date Library. MIT License.</span>
            </div>
            <span className="hidden sm:inline text-fd-border">•</span>
            <span>
              Crafted by{" "}
              <a
                href="https://github.com/SandipGhimire"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-fd-foreground hover:text-fd-primary transition-colors underline decoration-fd-border underline-offset-4 hover:decoration-fd-primary"
              >
                Sandip Ghimire
              </a>
            </span>
          </div>
          <div className="flex items-center gap-5 font-medium">
            <Link href="/converter" className="text-fd-primary hover:underline transition-colors">
              Online Converter
            </Link>
            <Link href="/docs/origination" className="hover:text-fd-foreground transition-colors">
              Documentation
            </Link>
            <a
              href="https://github.com/SandipGhimire/Nepali-Date-Library"
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

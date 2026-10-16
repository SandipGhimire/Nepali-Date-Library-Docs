import { ExternalLink } from "lucide-react";

export function DeveloperProfile() {
  return (
    <div className="my-6 rounded-xl border border-fd-border/70 bg-fd-card/50 p-4 sm:p-5 not-prose transition-all hover:border-fd-primary/40">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src="https://github.com/SandipGhimire.png"
            alt="Sandip Ghimire"
            className="size-11 shrink-0 rounded-full border border-fd-border object-cover bg-fd-secondary"
            loading="lazy"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-fd-foreground">
                Sandip Ghimire
              </span>
              <span className="text-xs text-fd-muted-foreground font-mono">
                @SandipGhimire
              </span>
            </div>
            <p className="text-xs text-fd-muted-foreground mt-0.5">
              Developer from Nepal. Built this library to make Bikram Sambat date calculations simple and consistent across Node.js, Python, and PHP.
            </p>
          </div>
        </div>

        <a
          href="https://github.com/SandipGhimire"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-fd-border bg-fd-secondary/60 px-3 py-1.5 text-xs font-medium text-fd-foreground transition-colors hover:bg-fd-accent hover:text-fd-primary shrink-0"
        >
          <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="size-3.5 shrink-0">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>GitHub</span>
          <ExternalLink className="size-3 text-fd-muted-foreground" />
        </a>
      </div>

      <div className="mt-3.5 pt-3 border-t border-fd-border/40 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <a
          href="https://github.com/SandipGhimire/Nepali-Date-Library-NodeJS"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-md border border-fd-border/70 bg-fd-secondary/30 px-2.5 py-1.5 hover:bg-fd-secondary hover:text-fd-primary transition-colors"
        >
          <span className="font-mono text-[11px] truncate">Node.js</span>
          <ExternalLink className="size-2.5 opacity-60 ml-1 shrink-0" />
        </a>
        <a
          href="https://github.com/SandipGhimire/Nepali-Date-Library-Python"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-md border border-fd-border/70 bg-fd-secondary/30 px-2.5 py-1.5 hover:bg-fd-secondary hover:text-fd-primary transition-colors"
        >
          <span className="font-mono text-[11px] truncate">Python</span>
          <ExternalLink className="size-2.5 opacity-60 ml-1 shrink-0" />
        </a>
        <a
          href="https://github.com/SandipGhimire/Nepali-Date-Library-PHP"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-md border border-fd-border/70 bg-fd-secondary/30 px-2.5 py-1.5 hover:bg-fd-secondary hover:text-fd-primary transition-colors"
        >
          <span className="font-mono text-[11px] truncate">PHP</span>
          <ExternalLink className="size-2.5 opacity-60 ml-1 shrink-0" />
        </a>
        <a
          href="https://github.com/SandipGhimire/Nepali-Date"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-md border border-fd-border/70 bg-fd-secondary/30 px-2.5 py-1.5 hover:bg-fd-secondary hover:text-fd-primary transition-colors"
        >
          <span className="font-mono text-[11px] truncate">Docs & Web</span>
          <ExternalLink className="size-2.5 opacity-60 ml-1 shrink-0" />
        </a>
      </div>
    </div>
  );
}

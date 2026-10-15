"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export function SidebarGithubStar({
  repo = "SandipGhimire/Nepali-Date-Library",
}: {
  repo?: string;
}) {
  const [stars, setStars] = useState<number>(2);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, [repo]);

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-fd-muted-foreground transition-colors hover:bg-fd-accent/60 hover:text-fd-foreground shrink-0"
      title={`GitHub: ${stars} star`}
    >
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
      <span className="font-mono text-[11px] font-medium leading-none">
        {stars} star
      </span>
    </a>
  );
}

export function HeaderGithubStar({
  repo = "SandipGhimire/Nepali-Date-Library",
}: {
  repo?: string;
}) {
  const [stars, setStars] = useState<number>(2);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, [repo]);

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-fd-foreground hover:bg-fd-accent/80 transition-all shrink-0"
      title={`GitHub: ${stars} star`}
    >
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
      <span className="font-mono text-xs font-medium leading-none">
        {stars} star
      </span>
    </a>
  );
}

import { cn } from "@/lib/cn";

export function GithubStarButton({
  repo = "SandipGhimire/Nepali-Date-Library",
  className = "",
}: {
  repo?: string;
  className?: string;
}) {
  const [stars, setStars] = useState<number>(2);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, [repo]);

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 rounded-xl border border-fd-border bg-fd-card/80 px-4 py-3 text-sm font-semibold text-fd-foreground backdrop-blur-sm transition-all hover:bg-fd-accent hover:border-fd-border/80 hover:scale-[1.01] active:scale-[0.98]",
        className,
      )}
    >
      <Star className="h-4 w-4 text-amber-500 fill-amber-400/90 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
      <span>Star</span>
      <span className="h-3.5 w-px bg-fd-border/80" />
      <span className="font-mono text-xs font-medium text-fd-muted-foreground transition-colors group-hover:text-fd-foreground">
        {stars.toLocaleString()}
      </span>
    </a>
  );
}

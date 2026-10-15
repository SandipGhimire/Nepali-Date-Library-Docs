import type { BaseLayoutProps, LayoutTab } from "@/layouts/shared";
import { BookOpen } from "lucide-react";
import { HeaderGithubStar } from "@/components/github-star";

function NavTitle() {
  return (
    <span className="flex items-center gap-3 font-bold text-lg tracking-tight">
      <img src="/Logo/Dark/Logo.svg" alt="Nepali Date" className="h-9 w-auto shrink-0 dark:hidden drop-shadow-xs" />
      <img src="/Logo/Light/Logo.svg" alt="Nepali Date" className="h-9 w-auto shrink-0 hidden dark:block drop-shadow-xs" />
      <span className="text-fd-foreground font-semibold">Nepali Date</span>
    </span>
  );
}

export const rootTabs: LayoutTab[] = [
  {
    icon: <BookOpen className="size-4.5" />,
    title: "Docs",
    description: "Nepali Date Library documentation and API reference",
    url: "/docs",
  },
];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <NavTitle />,
      transparentMode: "top",
    },
    links: [
      {
        icon: <BookOpen className="size-4" />,
        text: "Docs",
        url: "/docs",
        active: "nested-url",
        on: "nav",
      },
      {
        type: "custom",
        children: <HeaderGithubStar repo="SandipGhimire/Nepali-Date-Library-Docs" />,
        on: "nav",
      },
    ],
  };
}

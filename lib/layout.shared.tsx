import type { BaseLayoutProps, LayoutTab } from "@/layouts/shared";
import { BookOpen, RefreshCw } from "lucide-react";
import { HeaderGithubStar } from "@/components/github-star";
import { NpmLogo, PackagistLogo, PypiLogo } from "@/components/icons/package-logos";

function NavTitle() {
  return (
    <span className="flex items-center gap-2.5 tracking-tight select-none">
      <img src="/Logo/Dark/Logo.svg" alt="Nepali Date" className="h-9 w-auto shrink-0 dark:hidden drop-shadow-xs" />
      <img src="/Logo/Light/Logo.svg" alt="Nepali Date" className="h-9 w-auto shrink-0 hidden dark:block drop-shadow-xs" />
      <span className="flex flex-col text-left justify-center">
        <span className="text-fd-foreground font-bold text-sm sm:text-[15px] leading-tight">Nepali Date</span>
        <span className="text-[10px] sm:text-[11px] font-normal text-fd-muted-foreground leading-tight tracking-normal">
          Bikram Sambat Date Engine
        </span>
      </span>
    </span>
  );
}

export const rootTabs: LayoutTab[] = [
  {
    icon: <NpmLogo className="size-4.5 shrink-0 rounded-[3px]" />,
    title: "Node JS",
    description: "TypeScript & JavaScript library for Bikram Sambat",
    url: "/docs/nodejs",
  },
  {
    icon: <PackagistLogo className="size-4.5 shrink-0" />,
    title: "PHP",
    description: "Composer package for Bikram Sambat in PHP",
    url: "/docs/php",
  },
  {
    icon: <PypiLogo className="size-4.5 shrink-0" />,
    title: "Python",
    description: "Python package for Bikram Sambat date calculations",
    url: "/docs/python",
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
        url: "/docs/origination",
        active: "nested-url",
      },
      {
        icon: <RefreshCw className="size-4" />,
        text: "Converter",
        url: "/converter",
        active: "nested-url",
      },
      {
        type: "custom",
        children: <HeaderGithubStar />,
      },
    ],
  };
}

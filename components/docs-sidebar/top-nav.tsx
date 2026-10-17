"use client";

import Link from "fumadocs-core/link";
import { usePathname } from "fumadocs-core/framework";
import { CalendarDays, LayoutDashboard, Download, Code2, GitPullRequest } from "lucide-react";
import { cn } from "../../lib/cn";

export function SidebarTopNavigation() {
  const pathname = usePathname();

  const navItems = [
    {
      title: "What is Nepali Date?",
      href: "/docs/origination",
      icon: <CalendarDays className="size-4 shrink-0" />,
    },
    {
      title: "Overview",
      href: "/docs/overview",
      icon: <LayoutDashboard className="size-4 shrink-0" />,
    },
    {
      title: "Installation",
      href: "/docs/installation",
      icon: <Download className="size-4 shrink-0" />,
    },
    {
      title: "Examples",
      href: "/docs/examples",
      icon: <Code2 className="size-4 shrink-0" />,
    },
    {
      title: "Contribution Guide",
      href: "/docs/contribution",
      icon: <GitPullRequest className="size-4 shrink-0" />,
    },
  ];

  return (
    <div className="flex flex-col gap-1 pt-1 pb-1">
      <div className="flex items-center px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-fd-muted-foreground/70">
        Getting Started
      </div>
      <div className="flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={isActive}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-fd-muted-foreground transition-all hover:bg-fd-accent/60 hover:text-fd-foreground",
                isActive &&
                  "bg-fd-primary/10 text-fd-primary font-semibold hover:bg-fd-primary/15",
              )}
            >
              <span
                className={cn(
                  "transition-colors",
                  isActive
                    ? "text-fd-primary"
                    : "text-fd-muted-foreground group-hover:text-fd-foreground",
                )}
              >
                {item.icon}
              </span>
              <span className="truncate">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}


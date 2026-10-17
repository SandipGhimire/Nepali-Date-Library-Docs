"use client";

import { useTranslations } from "@fuma-translate/react";
import { cn } from "../../../../lib/cn";
import { isActive } from "../../../../lib/urls";
import { useFooterItems } from "@fumadocs/base-ui/utils/use-footer-items";
import { usePathname } from "fumadocs-core/framework";
import Link from "fumadocs-core/link";
import type * as PageTree from "fumadocs-core/page-tree";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type ComponentProps, useMemo } from "react";

type Item = Pick<PageTree.Item, "name" | "description" | "url">;

export interface FooterProps extends ComponentProps<"div"> {
  /**
   * Items including information for the next and previous page
   */
  items?: {
    previous?: Item;
    next?: Item;
  };
}

export function Footer({ items, children, className, ...props }: FooterProps) {
  const footerList = useFooterItems();
  const pathname = usePathname();
  const { previous, next } = useMemo(() => {
    if (items) return items;

    const idx = footerList.findIndex((item) => isActive(item.url, pathname));

    if (idx === -1) return {};
    return {
      previous: footerList[idx - 1],
      next: footerList[idx + 1],
    };
  }, [footerList, items, pathname]);

  return (
    <>
      <div
        className={cn("@container grid gap-4", previous && next ? "grid-cols-2" : "grid-cols-1", className)}
        {...props}
      >
        {previous && <FooterItem item={previous} index={0} />}
        {next && <FooterItem item={next} index={1} />}
      </div>
      {children}
      <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-fd-border/50 pt-6 text-xs text-fd-muted-foreground sm:flex-row">
        <div className="flex items-center gap-1.5">
          <span>Made with</span>
          <span className="text-red-500">❤️</span>
          <span>by</span>
          <a
            href="https://github.com/SandipGhimire"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-fd-foreground hover:text-fd-primary transition-colors inline-flex items-center gap-1.5 underline decoration-fd-border underline-offset-4 hover:decoration-fd-primary"
          >
            <span>Sandip Ghimire</span>
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="size-3.5 inline-block shrink-0">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <Link href="/converter" className="text-fd-primary hover:underline transition-colors">
            Date Converter (BS ↔ AD)
          </Link>
          <span className="text-fd-border">•</span>
          <a
            href="https://github.com/SandipGhimire/Nepali-Date-Library"
            target="_blank"
            rel="noreferrer"
            className="hover:text-fd-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </>
  );
}

function FooterItem({ item, index }: { item: Item; index: 0 | 1 }) {
  const t = useTranslations({ note: "pagination" });
  const Icon = index === 0 ? ChevronLeft : ChevronRight;

  return (
    <Link
      href={item.url}
      className={cn(
        "flex flex-col gap-2 rounded-lg border p-4 text-sm transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground @max-lg:col-span-full",
        index === 1 && "text-end",
      )}
    >
      <div className={cn("inline-flex items-center gap-1.5 font-medium", index === 1 && "flex-row-reverse")}>
        <Icon className="-mx-1 size-4 shrink-0 rtl:rotate-180" />
        <p>{item.name}</p>
      </div>
      <p className="text-fd-muted-foreground truncate">
        {item.description ?? (index === 0 ? t("Previous Page") : t("Next Page"))}
      </p>
    </Link>
  );
}

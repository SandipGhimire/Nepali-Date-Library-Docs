"use client";

import {
  type ComponentProps,
  createContext,
  Fragment,
  use,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { cva } from "class-variance-authority";
import Link from "fumadocs-core/link";
import { NavigationMenu as Primitive } from "@base-ui/react/navigation-menu";
import { cn } from "../../../lib/cn";
import { type LinkItemType, LinkItem } from "../../shared";
import { buttonVariants } from "../../../components/ui/button";
import { ChevronDown, Languages } from "lucide-react";
import { useIsScrollTop } from "@fumadocs/base-ui/utils/use-is-scroll-top";
import { useHomeLayout } from "./..";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../components/ui/collapsible";
import { mergeRefs } from "../../../lib/merge-refs";
import { useTranslations } from "@fuma-translate/react";

export const navItemVariants = cva("[&_svg]:size-4", {
  variants: {
    variant: {
      main: "inline-flex items-center gap-1 p-2 text-fd-foreground/80 font-medium transition-colors hover:text-fd-foreground data-[active=true]:text-fd-primary",
      button: buttonVariants({
        color: "secondary",
        className: "gap-1.5",
      }),
      icon: buttonVariants({
        color: "ghost",
        size: "icon",
      }),
    },
  },
  defaultVariants: {
    variant: "main",
  },
});

const MobileNavigationMenuContext = createContext<{
  setOpen: (v: boolean) => void;
} | null>(null);

export function Header(props: ComponentProps<"header">) {
  const {
    navItems,
    menuItems,
    slots,
    props: { nav },
  } = useHomeLayout();
  const headerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const t = useTranslations({ note: "home layout header" });
  const transparentMode = nav?.transparentMode ?? "none";
  const isTop = useIsScrollTop({ enabled: transparentMode === "top" }) ?? true;
  const isNavTransparent = transparentMode === "top" ? isTop : transparentMode === "always";

  const onClick = useEffectEvent((e: Event) => {
    const element = headerRef.current;
    if (!open || !element) return;
    if (element !== e.target && !element.contains(e.target as HTMLElement)) {
      setOpen(false);
    }
  });

  useEffect(() => {
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);

  const list = (
    <Primitive.List
      ref={listRef}
      render={<div />}
      className="flex h-14 w-full mx-auto max-w-(--fd-layout-width) items-center px-4"
    >
      {slots.navTitle && <slots.navTitle className="inline-flex items-center gap-2.5 font-semibold" />}
      {nav?.children}
      <div className="flex flex-row items-center justify-end gap-3.5 flex-1 max-lg:hidden">
        {slots.searchTrigger && (
          <>
            <slots.searchTrigger.full hideIfDisabled className="w-full max-w-[240px]" />
            <div className="w-px h-5 bg-fd-border/50" />
          </>
        )}

        {/* 1. Navigation Links: Docs, Converter */}
        <ul className="flex flex-row items-center gap-1">
          {navItems
            .filter((item) => item.type !== "custom" && !isSecondary(item))
            .map((item, i) => (
              <NavigationMenuLinkItem key={i} item={item} className="text-sm font-medium" />
            ))}
        </ul>

        {/* Divider between Links and GitHub */}
        <div className="w-px h-5 bg-fd-border/50" />

        {/* 2. GitHub Star Badge */}
        <div className="flex items-center">
          {navItems
            .filter((item) => item.type === "custom" || isSecondary(item))
            .map((item, i) => (
              <NavigationMenuLinkItem key={i} item={item} />
            ))}
        </div>

        {/* Divider between GitHub and Theme Toggle */}
        <div className="w-px h-5 bg-fd-border/50" />

        {/* 3. Theme Toggle & Language */}
        {slots.themeSwitch && <slots.themeSwitch />}
        {slots.languageSelect && (
          <slots.languageSelect.root>
            <Languages className="size-5" />
          </slots.languageSelect.root>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <div className="flex flex-row items-center ms-auto -me-1.5 lg:hidden gap-1">
        {slots.searchTrigger && <slots.searchTrigger.sm hideIfDisabled className="p-2" />}
        <button
          type="button"
          aria-label={t("Toggle Menu", { note: "aria-label" })}
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
          className={cn(
            buttonVariants({
              size: "icon",
              color: "ghost",
            }),
            "cursor-pointer active:scale-95",
          )}
        >
          <ChevronDown className={cn("size-5 transition-transform duration-200", open && "rotate-180")} />
        </button>
      </div>
    </Primitive.List>
  );

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      render={
        <header
          id="nd-nav"
          {...props}
          ref={mergeRefs(headerRef, props.ref)}
          className={cn("sticky top-0 z-40 transition-colors", open ? "h-auto" : "h-14", props.className)}
        >
          <Primitive.Root
            className={(s) =>
              cn(
                "transition-[box-shadow,background-color,border-color,border-radius] duration-200",
                open && "max-lg:shadow-xl max-lg:rounded-b-2xl max-lg:bg-fd-background/95 max-lg:backdrop-blur-xl border-b border-fd-border/60",
                isNavTransparent && !open && !s.open
                  ? "bg-gradient-to-b from-[#F7F7F5]/85 via-[#F7F7F5]/45 to-transparent dark:from-[#171715]/85 dark:via-[#171715]/45 dark:to-transparent backdrop-blur-[2px] border-b border-black/[0.04] dark:border-white/[0.04]"
                  : "bg-fd-background/80 backdrop-blur-md border-b border-fd-border/40 shadow-xs",
                s.open && "bg-fd-background/90",
              )
            }
          >
            {list}
            <CollapsibleContent className="mx-auto max-w-(--fd-layout-width) lg:hidden">
              <div className="flex flex-col gap-3 p-4 pt-1">
                <MobileNavigationMenuContext value={useMemo(() => ({ setOpen }), [])}>
                  {/* Primary Links in Drawer: Docs, Converter */}
                  <div className="flex flex-col gap-1">
                    {menuItems
                      .filter((item) => item.type !== "custom" && !isSecondary(item))
                      .map((item, i) => (
                        <MobileNavigationMenuLinkItem key={i} item={item} />
                      ))}
                  </div>

                  {/* Drawer Footer Row: GitHub Star Button + Theme Toggle */}
                  <div className="flex items-center justify-between border-t border-fd-border/50 pt-3 mt-1">
                    <div className="flex items-center">
                      {menuItems
                        .filter((item) => item.type === "custom" || isSecondary(item))
                        .map((item, i) => (
                          <MobileNavigationMenuLinkItem key={i} item={item} />
                        ))}
                    </div>
                    {slots.themeSwitch && <slots.themeSwitch />}
                  </div>
                </MobileNavigationMenuContext>
              </div>
            </CollapsibleContent>
            <Primitive.Portal>
              <Primitive.Positioner
                side="bottom"
                anchor={listRef}
                collisionPadding={{ top: 5, bottom: 5 }}
                className="z-40 box-border h-(--positioner-height) w-(--anchor-width) max-w-(--available-width) duration-(--duration) ease-(--easing) before:absolute before:content-[''] data-instant:transition-none data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-2.5 data-[side=left]:before:top-0 data-[side=left]:before:right-[-10px] data-[side=left]:before:bottom-0 data-[side=left]:before:w-2.5 data-[side=right]:before:top-0 data-[side=right]:before:bottom-0 data-[side=right]:before:left-[-10px] data-[side=right]:before:w-2.5 data-[side=top]:before:right-0 data-[side=top]:before:bottom-[-10px] data-[side=top]:before:left-0 data-[side=top]:before:h-2.5"
                style={{
                  ["--duration" as string]: "0.35s",
                  ["--easing" as string]: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <Primitive.Popup className="relative border h-(--popup-height) w-full rounded-xl bg-fd-popover/80 text-fd-popover-foreground backdrop-blur-md shadow-lg transition-[opacity,width,height] duration-(--duration) ease-(--easing) data-ending-style:opacity-0 data-ending-style:duration-150 data-starting-style:opacity-0">
                  <Primitive.Viewport className="relative size-full overflow-hidden" />
                </Primitive.Popup>
              </Primitive.Positioner>
            </Primitive.Portal>
          </Primitive.Root>
        </header>
      }
    />
  );
}

function isSecondary(item: LinkItemType): boolean {
  if ("secondary" in item && item.secondary != null) return item.secondary;

  return item.type === "icon";
}

function NavigationMenuLinkItem({ item, className, ...props }: { item: LinkItemType; className?: string }) {
  if (item.type === "custom") return item.children;

  if (item.type === "menu") {
    const children = item.items.map((child, j) => {
      if (child.type === "custom") {
        return <Fragment key={j}>{child.children}</Fragment>;
      }

      const {
        banner = child.icon ? (
          <div className="w-fit rounded-md border bg-fd-muted p-1 [&_svg]:size-4">{child.icon}</div>
        ) : null,
        ...rest
      } = child.menu ?? {};

      return (
        <Primitive.Link
          key={`${j}-${child.url}`}
          render={
            <Link
              href={child.url}
              external={child.external}
              {...rest}
              className={cn(
                "flex flex-col gap-2 rounded-lg border bg-fd-card p-3 transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground",
                rest.className,
              )}
            >
              {rest.children ?? (
                <>
                  {banner}
                  <p className="text-base font-medium">{child.text}</p>
                  <p className="text-sm text-fd-muted-foreground empty:hidden">{child.description}</p>
                </>
              )}
            </Link>
          }
        />
      );
    });

    return (
      <Primitive.Item className={cn("list-none", className)} {...props}>
        <Primitive.Trigger className={cn(navItemVariants(), "rounded-md")}>
          {item.url ? (
            <Link href={item.url} external={item.external}>
              {item.text}
            </Link>
          ) : (
            item.text
          )}
        </Primitive.Trigger>
        <Primitive.Content
          className={cn(
            "h-full w-(--anchor-width) max-w-(--available-width) p-3",
            "transition-[opacity,transform,translate] duration-(--duration) ease-(--easing)",
            "data-starting-style:opacity-0 data-ending-style:opacity-0",
            "data-starting-style:data-[activation-direction=left]:-translate-x-1/2",
            "data-starting-style:data-[activation-direction=right]:translate-x-1/2",
            "data-ending-style:data-[activation-direction=left]:translate-x-1/2",
            "data-ending-style:data-[activation-direction=right]:-translate-x-1/2",
            "grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {children}
        </Primitive.Content>
      </Primitive.Item>
    );
  }

  return (
    <Primitive.Item className={cn("list-none", className)} {...props}>
      <Primitive.Link
        render={
          <LinkItem
            item={item}
            aria-label={item.type === "icon" ? item.label : undefined}
            className={cn(navItemVariants({ variant: item.type }))}
          >
            {item.type === "icon" ? item.icon : item.text}
          </LinkItem>
        }
      />
    </Primitive.Item>
  );
}

function MobileNavigationMenuLinkItem({ item, ...props }: { item: LinkItemType; className?: string }) {
  const { setOpen } = use(MobileNavigationMenuContext)!;

  if (item.type === "custom") return <div className={cn("grid", props.className)}>{item.children}</div>;

  if (item.type === "menu") {
    return (
      <div className={cn("mb-4 flex flex-col", props.className)}>
        <p className="mb-1 text-sm text-fd-muted-foreground">
          {item.url ? (
            <Link href={item.url} external={item.external} onClick={() => setOpen(false)}>
              {item.icon}
              {item.text}
            </Link>
          ) : (
            <>
              {item.icon}
              {item.text}
            </>
          )}
        </p>
        {item.items.map((child, i) => (
          <MobileNavigationMenuLinkItem key={i} item={child} />
        ))}
      </div>
    );
  }

  return (
    <LinkItem
      item={item}
      className={cn(
        {
          main: "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent hover:text-fd-foreground data-[active=true]:text-fd-primary data-[active=true]:bg-fd-primary/10 [&_svg]:size-4.5",
          icon: buttonVariants({
            size: "icon",
            color: "ghost",
          }),
          button: buttonVariants({
            color: "secondary",
            className: "gap-1.5 [&_svg]:size-4",
          }),
        }[item.type ?? "main"],
        props.className,
      )}
      aria-label={item.type === "icon" ? item.label : undefined}
      onClick={() => setOpen(false)}
    >
      {item.icon}
      {item.type === "icon" ? undefined : item.text}
    </LinkItem>
  );
}

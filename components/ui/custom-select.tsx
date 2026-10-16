"use client";

import {
  useState,
  useRef,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SelectOption<T extends string | number> {
  value: T;
  label: string;
  subLabel?: string;
  badge?: string;
}

export interface CustomSelectProps<T extends string | number> {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  label?: string;
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  disabled?: boolean;
  prefix?: ReactNode;
}

export function CustomSelect<T extends string | number>({
  value,
  onChange,
  options,
  label,
  placeholder = "Select...",
  searchable = false,
  searchPlaceholder = "Search...",
  className,
  triggerClassName,
  menuClassName,
  disabled = false,
  prefix,
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);

  // Find currently selected option
  const selectedOption = useMemo(() => {
    return options.find((opt) => opt.value === value);
  }, [options, value]);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    const q = searchQuery.toLowerCase().trim();
    return options.filter((opt) => {
      const matchLabel = opt.label.toLowerCase().includes(q);
      const matchSub = opt.subLabel ? opt.subLabel.toLowerCase().includes(q) : false;
      const matchVal = String(opt.value).toLowerCase().includes(q);
      return matchLabel || matchSub || matchVal;
    });
  }, [options, searchQuery]);

  // Handle outside click to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Focus search input or scroll selected item into view when opened
  useEffect(() => {
    if (isOpen) {
      if (searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
      // Scroll active item into view
      if (selectedItemRef.current) {
        selectedItemRef.current.scrollIntoView({ block: "nearest" });
      }
    } else {
      setSearchQuery("");
    }
  }, [isOpen, searchable]);

  const handleSelect = (val: T) => {
    onChange(val);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {label && (
        <label className="block text-[11px] font-medium text-fd-muted-foreground mb-1">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "group flex w-full items-center justify-between gap-2 rounded-xl border border-fd-border bg-fd-background px-3 py-2 text-xs sm:text-sm font-medium text-fd-foreground shadow-2xs transition-all outline-none",
          "hover:border-fd-border/90 hover:bg-fd-accent/40",
          "focus-visible:ring-2 focus-visible:ring-fd-primary/40 focus-visible:border-fd-primary/60",
          isOpen && "ring-2 ring-fd-primary/40 border-fd-primary/60 shadow-xs",
          disabled && "opacity-50 cursor-not-allowed",
          triggerClassName
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {prefix && <span className="shrink-0 text-fd-muted-foreground">{prefix}</span>}
          <span className="truncate">
            {selectedOption ? (
              <span className="inline-flex items-center gap-1.5 truncate">
                <span>{selectedOption.label}</span>
                {selectedOption.subLabel && (
                  <span className="text-[11px] text-fd-muted-foreground font-normal">
                    {selectedOption.subLabel}
                  </span>
                )}
              </span>
            ) : (
              <span className="text-fd-muted-foreground">{placeholder}</span>
            )}
          </span>
        </div>

        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-fd-muted-foreground transition-transform duration-200 group-hover:text-fd-foreground",
            isOpen && "rotate-180 text-fd-primary"
          )}
        />
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className={cn(
            "absolute left-0 top-full z-50 mt-1.5 w-full min-w-[160px] rounded-2xl border border-fd-border/90 bg-fd-card/95 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in-0 zoom-in-95 duration-150",
            menuClassName
          )}
        >
          {/* Optional Search Input */}
          {searchable && (
            <div className="relative mb-1.5 p-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-fd-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-xl border border-fd-border bg-fd-background/80 pl-8 pr-7 py-1.5 text-xs text-fd-foreground placeholder:text-fd-muted-foreground focus:outline-none focus:ring-1.5 focus:ring-fd-primary/50"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-fd-muted-foreground hover:text-fd-foreground"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>
          )}

          {/* Scrollable Options List */}
          <div className="max-h-56 overflow-y-auto space-y-0.5 pr-0.5 scrollbar-thin">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={String(opt.value)}
                    ref={isSelected ? selectedItemRef : null}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-medium text-left transition-colors",
                      isSelected
                        ? "bg-fd-primary/10 text-fd-primary font-semibold"
                        : "text-fd-foreground/90 hover:bg-fd-accent hover:text-fd-foreground"
                    )}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span>{opt.label}</span>
                      {opt.subLabel && (
                        <span
                          className={cn(
                            "text-[11px] truncate",
                            isSelected ? "text-fd-primary/80" : "text-fd-muted-foreground"
                          )}
                        >
                          {opt.subLabel}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {opt.badge && (
                        <span className="rounded-md bg-fd-secondary px-1.5 py-0.5 text-[10px] font-mono text-fd-muted-foreground">
                          {opt.badge}
                        </span>
                      )}
                      {isSelected && <Check className="size-3.5 text-fd-primary shrink-0" />}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-4 text-center text-xs text-fd-muted-foreground">
                No matching options
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


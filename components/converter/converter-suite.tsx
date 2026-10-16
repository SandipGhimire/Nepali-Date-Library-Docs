"use client";

import { useState } from "react";
import {
  ArrowRightLeft,
  CalendarRange,
  Cake,
  Calculator,
  Landmark,
  Sparkles,
} from "lucide-react";
import { ConvertTab } from "./convert-tab";
import { DifferenceTab } from "./difference-tab";
import { AgeTab } from "./age-tab";
import { ArithmeticTab } from "./arithmetic-tab";
import { FiscalTab } from "./fiscal-tab";

export type ConverterTabId = "convert" | "difference" | "age" | "arithmetic" | "fiscal";

interface TabItem {
  id: ConverterTabId;
  label: string;
  shortLabel: string;
  icon: typeof ArrowRightLeft;
  badge?: string;
}

const TABS: TabItem[] = [
  {
    id: "convert",
    label: "Convert BS ↔ AD",
    shortLabel: "Convert",
    icon: ArrowRightLeft,
  },
  {
    id: "difference",
    label: "Date Difference",
    shortLabel: "Difference",
    icon: CalendarRange,
  },
  {
    id: "age",
    label: "Age Calculator",
    shortLabel: "Age",
    icon: Cake,
  },
  {
    id: "arithmetic",
    label: "Date Math (+ / -)",
    shortLabel: "Date Math",
    icon: Calculator,
  },
  {
    id: "fiscal",
    label: "Fiscal Year (आ.व.)",
    shortLabel: "Fiscal Year",
    icon: Landmark,
  },
];

export function ConverterSuite() {
  const [activeTab, setActiveTab] = useState<ConverterTabId>("convert");

  return (
    <div className="w-full space-y-6">
      {/* Slick Horizontal Segmented Tab Bar */}
      <div className="flex justify-center w-full">
        <div className="inline-flex w-full sm:w-auto items-center gap-1.5 overflow-x-auto rounded-2xl border border-fd-border/80 bg-fd-card/90 p-1.5 shadow-sm backdrop-blur-md no-scrollbar">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`group relative inline-flex flex-1 sm:flex-initial shrink-0 items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 select-none ${
                  isActive
                    ? "bg-fd-primary text-fd-primary-foreground shadow-md shadow-fd-primary/25"
                    : "text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent"
                }`}
              >
                <Icon
                  className={`size-4 transition-transform duration-200 ${
                    isActive ? "scale-110" : "group-hover:scale-110 opacity-70"
                  }`}
                />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="inline sm:hidden">{tab.shortLabel}</span>

                {tab.badge && (
                  <span
                    className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-fd-primary/10 text-fd-primary"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Workspace Content */}
      <div className="relative">
        {activeTab === "convert" && <ConvertTab />}
        {activeTab === "difference" && <DifferenceTab />}
        {activeTab === "age" && <AgeTab />}
        {activeTab === "arithmetic" && <ArithmeticTab />}
        {activeTab === "fiscal" && <FiscalTab />}
      </div>
    </div>
  );
}


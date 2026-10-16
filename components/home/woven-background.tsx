import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export interface WovenBackgroundProps extends ComponentProps<"div"> {
  svgClassName?: string;
}

export function WovenBackground({ className, svgClassName, ...props }: WovenBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[780px] sm:h-[840px] md:h-[920px] lg:h-[980px] overflow-hidden select-none",
        className,
      )}
      {...props}
    >
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMin slice"
        className={cn("h-full w-full object-cover", svgClassName)}
      >
        <defs>
          {/* Vertical mask to seamlessly fade the pattern into the background at the bottom */}
          <linearGradient id="nepaliDateBottomFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="70%" stopColor="#fff" stopOpacity="0.96" />
            <stop offset="88%" stopColor="#fff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="nepaliDateFadeMask">
            <rect width="1600" height="900" fill="url(#nepaliDateBottomFade)" />
          </mask>
        </defs>

        <g mask="url(#nepaliDateFadeMask)">
          {/* Light Mode Layer */}
          <g className="dark:hidden transition-opacity duration-300">
            <rect width="1600" height="900" fill="#F7F7F5" />
            <image href="/images/woven-bg-light.jpg" width="1600" height="900" preserveAspectRatio="xMidYMin slice" opacity="0.35" />
          </g>

          {/* Dark Mode Layer */}
          <g className="hidden dark:block transition-opacity duration-300">
            <rect width="1600" height="900" fill="#171715" />
            <image href="/images/woven-bg-dark.jpeg" width="1600" height="900" preserveAspectRatio="xMidYMin slice" opacity="0.3" />
          </g>
        </g>
      </svg>

      {/* Top Header-to-Mid Ambient Shadow Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[440px] sm:h-[500px] md:h-[560px]
                   bg-gradient-to-b from-[#F7F7F5]/92 via-[#F7F7F5]/50 via-60% to-transparent
                   dark:bg-gradient-to-b dark:from-[#171715]/92 dark:via-[#171715]/50 dark:via-60% dark:to-transparent"
      />
    </div>
  );
}

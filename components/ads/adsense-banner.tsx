"use client";

import { useEffect, useRef, useState } from "react";
import { ADSENSE_CLIENT_ID, IS_ADSENSE_ENABLED } from "@/lib/adsense";

interface AdSenseBannerProps {
  slot?: string;
  format?: "auto" | "horizontal" | "rectangle";
  responsive?: boolean;
  className?: string;
  variant?: "default" | "sidebar";
}

export function AdSenseBanner({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  variant = "default",
}: AdSenseBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [adPushed, setAdPushed] = useState(false);
  const isSidebar = variant === "sidebar";

  useEffect(() => {
    if (!IS_ADSENSE_ENABLED || adPushed) return;

    try {
      // @ts-ignore
      const adsbygoogle = window.adsbygoogle || [];
      // @ts-ignore
      adsbygoogle.push({});
      setAdPushed(true);
    } catch {
      // Gracefully handle adblocker or duplicate push errors
    }
  }, [adPushed]);

  // If AdSense is not enabled, do not render anything
  if (!IS_ADSENSE_ENABLED) {
    return null;
  }

  return (
    <div
      data-adsense-container
      className={
        isSidebar
          ? `my-3 w-full max-w-full overflow-hidden rounded-lg border border-fd-border/50 bg-fd-secondary/30 p-2 text-center transition-all ${className}`
          : `my-8 w-full max-w-full overflow-hidden rounded-xl border border-fd-border/50 bg-fd-card/40 p-2.5 sm:p-3 text-center transition-all ${className}`
      }
    >
      {/* Tiny clean sponsor label */}
      <div className="mb-1.5 flex items-center justify-center gap-2 select-none pointer-events-none">
        <span className="h-px flex-1 max-w-[20px] bg-fd-border/60" />
        <span className="text-[9px] font-mono uppercase tracking-widest text-fd-muted-foreground/60">
          Advertisement
        </span>
        <span className="h-px flex-1 max-w-[20px] bg-fd-border/60" />
      </div>

      {/* Responsive Ad Container with overflow protection */}
      <div className="relative flex w-full max-w-full items-center justify-center overflow-hidden rounded-md [&_iframe]:!max-w-full [&_ins]:!max-w-full">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", minWidth: "100%", width: "100%", textAlign: "center" }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slot || undefined}
          data-ad-format={isSidebar ? "rectangle, horizontal" : format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
}

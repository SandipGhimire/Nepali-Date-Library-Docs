"use client";

import { useEffect, useRef, useState } from "react";
import { useAdSense } from "./adsense-provider";

interface AdSenseBannerProps {
  slot?: string;
  format?: "auto" | "horizontal" | "rectangle";
  responsive?: boolean;
  className?: string;
  minHeight?: string;
  variant?: "default" | "sidebar";
}

export function AdSenseBanner({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  minHeight,
  variant = "default",
}: AdSenseBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [adPushed, setAdPushed] = useState(false);
  const isDev = process.env.NODE_ENV === "development";

  const { clientId, isEnabled, isLoaded } = useAdSense();

  const isSidebar = variant === "sidebar";
  const effectiveMinHeight =
    minHeight || (isSidebar ? "min-h-[85px] sm:min-h-[100px]" : "min-h-[90px] sm:min-h-[100px]");

  useEffect(() => {
    if (!isEnabled || isDev || adPushed) return;

    try {
      // @ts-ignore
      const adsbygoogle = window.adsbygoogle || [];
      // @ts-ignore
      adsbygoogle.push({});
      setAdPushed(true);
    } catch {
      // Gracefully handle adblocker or duplicate push errors
    }
  }, [isEnabled, isDev, adPushed]);

  // If ads are not enabled in production, render nothing (no empty placeholder boxes)
  if (!isEnabled && !isDev && isLoaded) {
    return null;
  }

  return (
    <div
      className={
        isSidebar
          ? `mt-2.5 mb-1 w-full overflow-hidden rounded-lg border border-fd-border/50 bg-fd-secondary/30 p-2 text-center transition-all ${className}`
          : `my-8 w-full overflow-hidden rounded-xl border border-fd-border/50 bg-fd-card/30 p-2 sm:p-3 text-center transition-all ${className}`
      }
    >
      {/* Tiny clean sponsor label */}
      <div className="mb-1 flex items-center justify-center gap-1.5">
        <span className="h-px w-3 bg-fd-border/60" />
        <span className="text-[9px] font-mono uppercase tracking-widest text-fd-muted-foreground/70">
          Advertisement
        </span>
        <span className="h-px w-3 bg-fd-border/60" />
      </div>

      {/* Ad Container */}
      <div className={`flex items-center justify-center overflow-hidden rounded-md ${effectiveMinHeight}`}>
        {isEnabled && !isDev ? (
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: "block", width: "100%", textAlign: "center" }}
            data-ad-client={clientId}
            data-ad-slot={slot || undefined}
            data-ad-format={format}
            data-full-width-responsive={responsive ? "true" : "false"}
          />
        ) : (
          /* Clean preview placeholder in development */
          <div className="flex flex-col items-center justify-center py-2 px-2 text-center">
            <span className="text-[11px] font-mono font-medium text-fd-muted-foreground/70">
              {isSidebar ? "Sidebar Ad Unit" : "Google AdSense Unit"}
            </span>
            <span className="mt-0.5 text-[10px] text-fd-muted-foreground/50">
              {isEnabled ? "Preview Mode (Active in production)" : "Configure ADSENSE_CLIENT_ID in server .env"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

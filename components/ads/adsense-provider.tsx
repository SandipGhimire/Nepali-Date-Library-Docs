"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Script from "next/script";
import { ADSENSE_CLIENT_ID as FALLBACK_CLIENT_ID } from "@/lib/adsense";

interface AdSenseContextValue {
  clientId: string;
  isEnabled: boolean;
  isLoaded: boolean;
}

const defaultContext: AdSenseContextValue = {
  clientId: FALLBACK_CLIENT_ID,
  isEnabled: Boolean(FALLBACK_CLIENT_ID && FALLBACK_CLIENT_ID.startsWith("ca-pub-")),
  isLoaded: false,
};

const AdSenseContext = createContext<AdSenseContextValue>(defaultContext);

export function useAdSense() {
  return useContext(AdSenseContext);
}

export function AdSenseProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<AdSenseContextValue>(defaultContext);

  useEffect(() => {
    let isMounted = true;

    async function loadRuntimeConfig() {
      try {
        const res = await fetch("/api/adsense-config", {
          cache: "no-store",
        });
        if (!res.ok) return;

        const data = await res.json();
        if (!isMounted) return;

        const liveClientId = data.clientId || FALLBACK_CLIENT_ID;

        setConfig({
          clientId: liveClientId,
          isEnabled: Boolean(liveClientId && liveClientId.startsWith("ca-pub-")),
          isLoaded: true,
        });
      } catch {
        if (isMounted) {
          setConfig((prev) => ({ ...prev, isLoaded: true }));
        }
      }
    }

    loadRuntimeConfig();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AdSenseContext.Provider value={config}>
      {children}
      {config.isEnabled && (
        <Script
          id="adsbygoogle-runtime-init"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.clientId}`}
          crossOrigin="anonymous"
        />
      )}
    </AdSenseContext.Provider>
  );
}

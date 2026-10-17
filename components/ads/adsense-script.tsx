import Script from "next/script";
import { ADSENSE_CLIENT_ID } from "@/lib/adsense";

export function AdSenseScript() {
  if (!ADSENSE_CLIENT_ID) {
    return null;
  }

  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
}


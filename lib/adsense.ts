export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";

// Default slots can be configured via environment variables or passed per banner
export const ADSENSE_SLOTS = {
  home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME || "",
  converter: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONVERTER || "",
  docs: process.env.NEXT_PUBLIC_ADSENSE_SLOT_DOCS || "",
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || "",
  toc: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOC || "",
};

export const IS_ADSENSE_ENABLED = Boolean(
  ADSENSE_CLIENT_ID && ADSENSE_CLIENT_ID.startsWith("ca-pub-")
);

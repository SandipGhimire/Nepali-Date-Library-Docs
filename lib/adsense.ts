export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-8151465607564713";

export const IS_ADSENSE_ENABLED = Boolean(
  ADSENSE_CLIENT_ID && ADSENSE_CLIENT_ID.startsWith("ca-pub-")
);


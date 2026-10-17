import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const clientId = process.env.ADSENSE_CLIENT_ID || process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";

  return NextResponse.json(
    {
      clientId,
      enabled: Boolean(clientId && clientId.startsWith("ca-pub-")),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    },
  );
}

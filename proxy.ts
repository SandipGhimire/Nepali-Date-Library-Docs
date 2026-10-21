import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const acceptHeader = request.headers.get("accept") || "";

  // Content Negotiation: If AI agent or crawler explicitly requests Markdown
  if (
    acceptHeader.includes("text/markdown") &&
    !request.nextUrl.pathname.startsWith("/api/") &&
    !request.nextUrl.pathname.startsWith("/_next/") &&
    !request.nextUrl.pathname.includes(".")
  ) {
    const url = request.nextUrl.clone();
    // Next.js server runs internally on HTTP behind Cloudflare/reverse proxy
    // Forcing 'http:' prevents TLS handshake failures on internal rewrite loopbacks
    url.protocol = "http:";
    url.pathname = "/api/markdown-negotiate";
    url.searchParams.set("path", request.nextUrl.pathname);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};


import { RootProvider } from "@fumadocs/base-ui/provider/next";
import { ADSENSE_CLIENT_ID } from "@/lib/adsense";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./global.css";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  SEO_KEYWORDS,
  AUTHOR_INFO,
  getWebSiteSchema,
  getSoftwareApplicationSchema,
} from "@/lib/seo";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0d0e" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: DEFAULT_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SEO_KEYWORDS,
  authors: [{ name: AUTHOR_INFO.name, url: AUTHOR_INFO.url }],
  creator: AUTHOR_INFO.name,
  publisher: AUTHOR_INFO.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/Logo/Dark/Logo.png`,
        width: 1200,
        height: 630,
        alt: "Nepali Date - Bikram Sambat Library & Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator: AUTHOR_INFO.twitter,
    images: [`${SITE_URL}/Logo/Dark/Logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
  },
  other: {
    "ai-content-declaration": "documentation,educational",
    "applicable-device": "pc,mobile",
    "rating": "General",
    "revisit-after": "1 days",
    "Content-Signal": "search=yes, ai-train=yes, ai-input=yes",
    ...(ADSENSE_CLIENT_ID ? { "google-adsense-account": ADSENSE_CLIENT_ID } : {}),
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  const websiteSchema = getWebSiteSchema();
  const softwareSchema = getSoftwareApplicationSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicons explicitly optimized for Google Search Bot & Apple Touch */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon-48x48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />

        {/* Machine-readable LLMs & AI indexing links */}
        <link rel="help" href="/llms.txt" title="LLM Context Specification" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="Full AI Knowledge Context" />
        <link rel="service-desc" type="application/linkset+json" href="/.well-known/api-catalog" title="RFC 9727 API Catalog" />
        <link rel="mcp-server-card" type="application/json" href="/.well-known/mcp/server-card.json" title="MCP Server Card" />
        <link rel="agent-card" type="application/json" href="/.well-known/agent-card.json" title="A2A Agent Card" />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* Google AdSense Verification & Loader (Non-blocking afterInteractive prevents hydration conflicts) */}
        {ADSENSE_CLIENT_ID && (
          <Script
            id="google-adsense"
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
        {/* Global JSON-LD Structured Data */}
        <script
          id="schema-website"
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          id="schema-software"
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <RootProvider
          theme={{
            scriptProps: {
              // @ts-ignore
              async: true,
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}

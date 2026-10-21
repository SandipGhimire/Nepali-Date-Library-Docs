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
      { url: "/Logo/Dark/Icon.svg", type: "image/svg+xml" },
      { url: "/Logo/Dark/Logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/Logo/Dark/Icon.svg", type: "image/svg+xml" }],
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
  other: {
    "ai-content-declaration": "documentation,educational",
    "applicable-device": "pc,mobile",
    ...(ADSENSE_CLIENT_ID ? { "google-adsense-account": ADSENSE_CLIENT_ID } : {}),
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  const websiteSchema = getWebSiteSchema();
  const softwareSchema = getSoftwareApplicationSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Machine-readable LLMs & AI indexing links */}
        <link rel="help" href="/llms.txt" title="LLM Context Specification" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="Full AI Knowledge Context" />
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

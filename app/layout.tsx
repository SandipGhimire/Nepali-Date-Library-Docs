import { RootProvider } from "@fumadocs/base-ui/provider/next";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Nepali Date",
    default: "Nepali Date - Bikram Sambat Library",
  },
  description:
    "A comprehensive, multi-language ecosystem for working with Nepali (Bikram Sambat) dates in NodeJS, Python, and PHP.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
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

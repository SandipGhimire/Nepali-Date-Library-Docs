import type { MetadataRoute } from "next";
import { docsSource } from "@/lib/source";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = docsSource.getPages();
  const currentDate = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/converter`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/docs`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const docEntries: MetadataRoute.Sitemap = pages.map((page) => {
    const pageUrl = page.url.startsWith("/") ? page.url : `/${page.url}`;
    let priority = 0.7;
    let changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly";

    if (
      pageUrl === "/docs/origination" ||
      pageUrl === "/docs/overview" ||
      pageUrl === "/docs/installation" ||
      pageUrl === "/docs/examples"
    ) {
      priority = 0.9;
    } else if (
      pageUrl === "/docs/nodejs" ||
      pageUrl === "/docs/python" ||
      pageUrl === "/docs/php" ||
      pageUrl.endsWith("/quick-start")
    ) {
      priority = 0.85;
    } else if (
      pageUrl.endsWith("/date-converter") ||
      pageUrl.endsWith("/fiscal-year") ||
      pageUrl.endsWith("/constants")
    ) {
      priority = 0.8;
    }

    return {
      url: `${SITE_URL}${pageUrl}`,
      lastModified: currentDate,
      changeFrequency,
      priority,
    };
  });

  return [...staticEntries, ...docEntries];
}


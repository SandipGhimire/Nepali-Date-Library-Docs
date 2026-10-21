import { docsSource } from "@/lib/source";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "@/layouts/docs/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { SITE_URL, SITE_NAME, getBreadcrumbSchema, getTechArticleSchema } from "@/lib/seo";
import { AdSenseBanner } from "@/components/ads/adsense-banner";

import * as LucideIcons from "lucide-react";
import { icons, type LucideIcon } from "lucide-react";
import { NpmLogo, PackagistLogo, PypiLogo } from "@/components/icons/package-logos";

function PageTitleIcon({ slug, icon }: { slug?: string[]; icon?: string }) {
  const firstSlug = slug?.[0]?.toLowerCase();
  const lowerIcon = icon?.toLowerCase();

  if (firstSlug === "nodejs" || lowerIcon === "npm") {
    return <NpmLogo className="size-6.5 sm:size-7.5 shrink-0 rounded-[3.5px] shadow-2xs" />;
  }

  if (firstSlug === "python" || lowerIcon === "pypi") {
    return <PypiLogo className="size-6.5 sm:size-7.5 shrink-0 drop-shadow-2xs" />;
  }

  if (firstSlug === "php" || lowerIcon === "packagist") {
    return <PackagistLogo className="size-6.5 sm:size-7.5 shrink-0 drop-shadow-2xs" />;
  }

  const iconName =
    icon ||
    (firstSlug === "origination"
      ? "CalendarDays"
      : firstSlug === "overview"
        ? "LayoutDashboard"
        : firstSlug === "installation"
          ? "Download"
          : firstSlug === "examples"
            ? "Code2"
            : "BookOpen");

  const IconComp = ((iconName in LucideIcons
    ? (LucideIcons as unknown as Record<string, LucideIcon>)[iconName]
    : null) ??
    (iconName in icons ? icons[iconName as keyof typeof icons] : null) ??
    LucideIcons.BookOpen) as LucideIcon;

  return <IconComp className="size-6.5 sm:size-7.5 shrink-0 text-fd-primary" />;
}

function getLanguageInfo(slug?: string[]) {
  const first = slug?.[0]?.toLowerCase();
  if (first === "nodejs") return { name: "NodeJS / TypeScript", code: "nodejs", badge: "npm" };
  if (first === "python") return { name: "Python", code: "python", badge: "PyPI" };
  if (first === "php") return { name: "PHP", code: "php", badge: "Packagist" };
  return { name: "Guide", code: "general", badge: "Docs" };
}

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = docsSource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const slugArray = params.slug || [];
  const langInfo = getLanguageInfo(slugArray);

  // Generate breadcrumb items
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Docs", url: "/docs" },
  ];

  let currentPath = "/docs";
  for (let i = 0; i < slugArray.length; i++) {
    const segment = slugArray[i];
    currentPath += `/${segment}`;
    const isLast = i === slugArray.length - 1;
    breadcrumbItems.push({
      name: isLast ? page.data.title : segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      url: currentPath,
    });
  }

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);
  const techArticleSchema = getTechArticleSchema({
    title: `${page.data.title} - ${langInfo.name}`,
    description: page.data.description,
    url: `/docs/${slugArray.join("/")}`,
    language: langInfo.name,
  });

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      {/* Schema.org Breadcrumbs & TechArticle Structured Data */}
      <script
        id="docs-breadcrumb-schema"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        id="docs-techarticle-schema"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />

      <DocsTitle className="flex items-center gap-3">
        <PageTitleIcon slug={params.slug} icon={page.data.icon} />
        <span>{page.data.title}</span>
      </DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(docsSource, page),
          })}
        />
        <AdSenseBanner className="mt-12 mb-4" />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return docsSource.generateParams();
}

export async function generateMetadata(props: PageProps<"/docs/[[...slug]]">): Promise<Metadata> {
  const params = await props.params;
  const page = docsSource.getPage(params.slug);
  if (!page) notFound();

  const slugArray = params.slug || [];
  const langInfo = getLanguageInfo(slugArray);
  const pagePath = `/docs/${slugArray.join("/")}`;
  const canonicalUrl = `${SITE_URL}${pagePath}`;

  // Title will be interpolated into layout template: `%s | Nepali Date Library`
  const pageTitle =
    langInfo.code !== "general"
      ? `${page.data.title} (${langInfo.badge})`
      : page.data.title;

  const fullTitle = `${pageTitle} | ${SITE_NAME}`;

  const baseDesc = page.data.description?.trim() || "";
  let description = baseDesc;

  if (langInfo.code !== "general") {
    // Unique language-specific search snippet to prevent duplicate description warnings
    description = `[${langInfo.badge}] ${baseDesc} Includes syntax, parameters, and code examples for ${langInfo.name}.`;
    if (description.length > 160) {
      description = `[${langInfo.badge}] ${baseDesc}`;
      if (description.length > 155) {
        description = description.slice(0, 152).trim() + "...";
      }
    }
  } else if (!description) {
    description = `Official guide for ${page.data.title} in the Nepali Date (Bikram Sambat) multi-language ecosystem.`;
  }

  const keywords = [
    page.data.title.toLowerCase(),
    `nepali date ${page.data.title.toLowerCase()}`,
    `bikram sambat ${page.data.title.toLowerCase()}`,
    `${langInfo.name.toLowerCase()} nepali date`,
    "date converter",
    "nepali date converter",
    "nepali date",
    "nepali date library",
    "bikram sambat",
    "bikram sambat date",
    "bikram sambat date converter",
    "bs date",
    "bs to ad",
    "ad to bs",
    "nepali calendar",
    "nepali patro",
    "bikram sambat library",
    ...(slugArray || []),
  ];

  return {
    title: pageTitle,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/Logo/Dark/Logo.png`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${SITE_URL}/Logo/Dark/Logo.png`],
    },
  };
}

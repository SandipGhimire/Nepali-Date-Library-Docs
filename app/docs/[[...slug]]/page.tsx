import { docsSource } from "@/lib/source";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "@/layouts/docs/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";

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
      : firstSlug === "installation"
        ? "Download"
        : firstSlug === "examples"
          ? "Code2"
          : "BookOpen");

  const IconComp = (
    (iconName in LucideIcons
      ? (LucideIcons as unknown as Record<string, LucideIcon>)[iconName]
      : null) ??
    (iconName in icons ? icons[iconName as keyof typeof icons] : null) ??
    LucideIcons.BookOpen
  ) as LucideIcon;

  return <IconComp className="size-6.5 sm:size-7.5 shrink-0 text-fd-primary" />;
}

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = docsSource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
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
  return {
    title: page.data.title,
    description: page.data.description,
  };
}

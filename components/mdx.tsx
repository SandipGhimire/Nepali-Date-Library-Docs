import defaultMdxComponents from "fumadocs-ui/mdx";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { PackageMeta } from "@/components/docs/package-meta";
import { Timeline, TimelineItem } from "@/components/docs/timeline";
import { EcosystemOverview } from "@/components/docs/ecosystem-overview";
import { DeveloperProfile } from "@/components/docs/developer-profile";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Step,
    Steps,
    Tab,
    Tabs,
    PackageMeta,
    Timeline,
    TimelineItem,
    EcosystemOverview,
    DeveloperProfile,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}

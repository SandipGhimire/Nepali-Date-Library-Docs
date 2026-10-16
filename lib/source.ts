import { defineDocs } from "fumadocs-mdx/macro";
import { loader } from "fumadocs-core/source";
import { createElement } from "react";
import * as LucideIcons from "lucide-react";
import { icons } from "lucide-react";
import { NpmLogo, PackagistLogo, PypiLogo } from "@/components/icons/package-logos";

const docs = defineDocs({ dir: "content/docs" });

export const docsSource = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return;
    const lower = icon.toLowerCase();
    if (lower === "npm" || lower === "nodejs") {
      return createElement(NpmLogo, { className: "size-4 shrink-0 rounded-[2px]" });
    }
    if (lower === "pypi" || lower === "python") {
      return createElement(PypiLogo, { className: "size-4 shrink-0" });
    }
    if (lower === "packagist" || lower === "php") {
      return createElement(PackagistLogo, { className: "size-4 shrink-0" });
    }
    if (icon in LucideIcons) {
      const Comp = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[icon];
      if (typeof Comp === "function" || typeof Comp === "object") {
        return createElement(Comp, { className: "size-4 shrink-0" });
      }
    }
    if (icon in icons) {
      return createElement(icons[icon as keyof typeof icons], { className: "size-4 shrink-0" });
    }
  },
});

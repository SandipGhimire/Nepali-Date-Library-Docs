import { createSearchAPI } from "fumadocs-core/search/server";
import { docsSource } from "@/lib/source";

function toIndexes(source: typeof docsSource) {
  return source.getPages().map((page) => ({
    title: page.data.title,
    description: page.data.description,
    url: page.url,
    id: page.url,
    structuredData: page.data.structuredData,
  }));
}

export const { GET } = createSearchAPI("advanced", {
  indexes: [...toIndexes(docsSource)],
});

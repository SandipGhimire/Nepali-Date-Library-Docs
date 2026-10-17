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

const extraIndexes = [
  {
    title: "Date Converter - Bikram Sambat (BS) to Gregorian (AD)",
    description:
      "Instant online Nepali Date Converter. Bidirectional BS to AD and AD to BS date conversion, Nepali age calculator, date difference, and Nepal fiscal year quarters.",
    url: "/converter",
    id: "/converter",
    structuredData: {
      headings: [
        { id: "converter", content: "Nepali Date Converter (BS to AD)" },
        { id: "ad-to-bs", content: "AD to BS Date Converter" },
        { id: "age-calculator", content: "Nepali Age Calculator" },
        { id: "difference", content: "Nepali Date Difference Calculator" },
        { id: "fiscal", content: "Nepal Fiscal Year Quarters" },
      ],
      contents: [
        {
          heading: undefined,
          content:
            "Convert between Nepali (Bikram Sambat / BS) and Gregorian (AD) calendars accurately. Instant date conversion, today Nepali date, aajako miti, date arithmetic, age calculation, and fiscal quarters.",
        },
      ],
    },
  },
];

export const { GET } = createSearchAPI("advanced", {
  indexes: [...extraIndexes, ...toIndexes(docsSource)],
});

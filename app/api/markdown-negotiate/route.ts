import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const reqPath = searchParams.get("path") || "/";

  let markdownContent = "";

  try {
    const cwd = process.cwd();
    const publicDir = path.join(cwd, "public");
    const contentDocsDir = path.join(cwd, "content", "docs");

    if (reqPath === "/" || reqPath === "") {
      const llmsPath = path.join(publicDir, "llms.txt");
      if (fs.existsSync(llmsPath)) {
        markdownContent = fs.readFileSync(llmsPath, "utf-8");
      }
    } else if (reqPath === "/converter") {
      markdownContent = `# Nepali Date Converter (Bikram Sambat <-> Gregorian AD)

Accurate, bidirectional date conversion utility for Nepali Bikram Sambat (BS) and Gregorian (AD) calendars.

## Features
- **BS to AD Conversion**: Convert any Bikram Sambat date (1976-01-01 BS to 2100-12-31 BS) to standard ISO Gregorian date.
- **AD to BS Conversion**: Convert any English calendar date into Bikram Sambat Nepali date.
- **Leap Year & Variable Month Support**: Exact mapping for dynamic Bikram Sambat month lengths (29 to 32 days).
- **Multi-Language Libraries**: Available for NodeJS (\`npm i nepali-date-library\`), Python (\`pip install nepali-date-library\`), and PHP (\`composer require sandip/nepali-date-library\`).

## Quick Code Examples

### NodeJS / TypeScript
\`\`\`ts
import { NepaliDate, BStoAD, ADtoBS } from "nepali-date-library";

// Convert BS to AD
const englishDate = BStoAD("2081-07-05"); // "2024-10-21"

// Convert AD to BS
const nepaliDate = ADtoBS("2024-10-21"); // "2081-07-05"
\`\`\`

### Python
\`\`\`python
from nepali_date import NepaliDate

d = NepaliDate(2081, 7, 5)
print(d.to_english_date()) # 2024-10-21
\`\`\`

### PHP
\`\`\`php
use Sandip\\NepaliDate\\NepaliDate;

$d = new NepaliDate(2081, 7, 5);
echo $d->toEnglishDate(); // 2024-10-21
\`\`\`
`;
    } else if (reqPath === "/calendar") {
      markdownContent = `# Nepali Calendar (नेपाली पात्रो)

Interactive Bikram Sambat monthly calendar covering 1976 BS to 2100 BS with Saturday and Sunday weekend highlights, English AD day mappings, and fast keyboard navigation.

## Navigation Controls
- **Date Step**: Use \`←\` / \`→\` to navigate days (-1 / +1 day with automatic month rollover).
- **Week Step**: Use \`↑\` / \`↓\` to navigate weeks (-7 / +7 days, staying on the same weekday).
- **Month Jump**: Use \`Ctrl / ⌘\` + \`←\` / \`→\` to switch months.
- **Year Jump**: Use \`Ctrl / ⌘\` + \`↑\` / \`↓\` or dropdowns to switch years.

## Calendar Structure
- **Weekend Highlighting**: Saturdays (शनिबार) and Sundays (आइतबार) are highlighted in distinct red tones.
- **Current Day**: Highlighted in emerald green.
- **Month Lengths**: Accurately reflects 29 to 32 days based on official verified Bikram Sambat ephemeris.
`;
    } else if (reqPath.startsWith("/docs")) {
      const cleanSlug = reqPath.replace(/^\/docs\/?/, "").replace(/\/$/, "");
      const possibleFiles = [
        path.join(contentDocsDir, `${cleanSlug}.mdx`),
        path.join(contentDocsDir, cleanSlug, "index.mdx"),
      ];

      for (const file of possibleFiles) {
        if (fs.existsSync(/*turbopackIgnore: true*/ file)) {
          const raw = fs.readFileSync(/*turbopackIgnore: true*/ file, "utf-8");
          // Strip YAML frontmatter
          markdownContent = raw.replace(/^---[\s\S]*?---\n*/, "");
          // Clean dense JSX wrappers so agents receive pure Markdown
          markdownContent = markdownContent
            .replace(/<Callout(?:\s+type="[^"]*")?>([\s\S]*?)<\/Callout>/g, "> $1")
            .replace(/<\/?(?:Tabs|Tab|Cards|Card|Step|Steps|Accordion|Accordions)[^>]*>/g, "")
            .replace(/\n{3,}/g, "\n\n")
            .trim();
          break;
        }
      }
    }

    // Fallback to llms.txt if empty
    if (!markdownContent) {
      const llmsPath = path.join(publicDir, "llms.txt");
      if (fs.existsSync(/*turbopackIgnore: true*/ llmsPath)) {
        markdownContent = fs.readFileSync(/*turbopackIgnore: true*/ llmsPath, "utf-8");
      } else {
        markdownContent = "# Nepali Date Library\nUniversal multi-language library for Bikram Sambat Nepali dates.";
      }
    }
  } catch {
    markdownContent = "# Nepali Date Library\nUniversal multi-language library for Bikram Sambat Nepali dates.";
  }

  // Calculate estimated tokens (~4 chars per token)
  const tokenCount = Math.max(1, Math.ceil(markdownContent.length / 4));

  return new NextResponse(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Signal": "search=yes, ai-train=yes, ai-input=yes",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "x-markdown-tokens": String(tokenCount),
    },
  });
}


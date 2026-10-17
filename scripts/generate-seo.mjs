import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const CONTENT_DOCS_DIR = path.join(ROOT_DIR, "content", "docs");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nepali-pkg.date";

/**
 * Parses frontmatter fields (title, description) from an MDX file string
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data = { title: "", description: "" };
  if (!match) return data;

  const yamlLines = match[1].split("\n");
  for (const line of yamlLines) {
    const titleMatch = line.match(/^title:\s*(.+)$/);
    if (titleMatch) {
      data.title = titleMatch[1].replace(/^["']|["']$/g, "").trim();
    }
    const descMatch = line.match(/^description:\s*(.+)$/);
    if (descMatch) {
      data.description = descMatch[1].replace(/^["']|["']$/g, "").trim();
    }
  }
  return data;
}

/**
 * Recursively scans directory for .mdx files
 */
function getMdxFiles(dir, baseDir = dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getMdxFiles(fullPath, baseDir));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
      results.push({
        fullPath,
        relativePath,
      });
    }
  }
  return results;
}

/**
 * Converts MDX relative path to canonical documentation URL path
 */
function fileToUrl(relativePath) {
  let url = relativePath.replace(/\.mdx$/, "");
  if (url === "index") return "/docs";
  if (url.endsWith("/index")) {
    url = url.slice(0, -"/index".length);
  }
  return `/docs/${url}`;
}

/**
 * Calculates priority based on URL depth and importance
 */
function getPriority(url) {
  if (url === "/" || url === "/converter") return "1.0";
  if (
    url === "/docs/origination" ||
    url === "/docs/overview" ||
    url === "/docs/installation" ||
    url === "/docs/examples" ||
    url === "/docs"
  ) {
    return "0.9";
  }
  if (
    url === "/docs/nodejs" ||
    url === "/docs/python" ||
    url === "/docs/php" ||
    url.endsWith("/quick-start") ||
    url.endsWith("/installation")
  ) {
    return "0.85";
  }
  if (
    url.endsWith("/date-converter") ||
    url.endsWith("/fiscal-year") ||
    url.endsWith("/class") ||
    url.endsWith("/static") ||
    url.endsWith("/methods") ||
    url.endsWith("/constants")
  ) {
    return "0.8";
  }
  return "0.7";
}

/**
 * Calculates change frequency
 */
function getChangeFreq(url) {
  if (url === "/" || url === "/converter") return "daily";
  if (url.startsWith("/docs/nodejs") || url.startsWith("/docs/python") || url.startsWith("/docs/php")) {
    return "weekly";
  }
  return "weekly";
}

console.log("🔍 Scanning documentation files for SEO & AI indexing...");

const mdxFiles = getMdxFiles(CONTENT_DOCS_DIR);
const docPages = [];

for (const file of mdxFiles) {
  const content = fs.readFileSync(file.fullPath, "utf-8");
  const stats = fs.statSync(file.fullPath);
  const frontmatter = parseFrontmatter(content);
  const url = fileToUrl(file.relativePath);

  docPages.push({
    url,
    title: frontmatter.title || path.basename(file.relativePath, ".mdx"),
    description: frontmatter.description || "",
    lastmod: stats.mtime.toISOString().split("T")[0],
    fullPath: file.fullPath,
    content,
  });
}

// Ensure unique URLs
const uniqueDocMap = new Map();
for (const page of docPages) {
  uniqueDocMap.set(page.url, page);
}
const sortedDocPages = Array.from(uniqueDocMap.values()).sort((a, b) =>
  a.url.localeCompare(b.url)
);

const today = new Date().toISOString().split("T")[0];

// All pages including static routes
const allPages = [
  {
    url: "/",
    title: "Nepali Date - Bikram Sambat Library & Converter (BS to AD)",
    description:
      "Universal Bikram Sambat (BS) date engine for NodeJS, Python, and PHP. Convert between BS and AD, manipulate dates, and compute fiscal years.",
    lastmod: today,
    priority: "1.0",
    changefreq: "daily",
  },
  {
    url: "/converter",
    title: "Nepali Date Converter - BS to AD & AD to BS Converter Online",
    description:
      "Instant bidirectional Bikram Sambat (BS) to Gregorian (AD) date converter, age calculator, date difference, and Nepal fiscal quarters inspector.",
    lastmod: today,
    priority: "1.0",
    changefreq: "daily",
  },
  ...sortedDocPages.map((p) => ({
    url: p.url,
    title: p.title,
    description: p.description,
    lastmod: p.lastmod,
    priority: getPriority(p.url),
    changefreq: getChangeFreq(p.url),
  })),
];

console.log(`📄 Discovered ${allPages.length} total indexable routes.`);

// Ensure directories exist
fs.mkdirSync(PUBLIC_DIR, { recursive: true });
fs.mkdirSync(path.join(PUBLIC_DIR, ".well-known"), { recursive: true });

// 1. Generate sitemap.xml
console.log("🗺️  Generating public/sitemap.xml...");
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), sitemapXml.trim(), "utf-8");

// 2. Generate robots.txt
console.log("🤖 Generating public/robots.txt...");
const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
# Nepali Date Library - Robots Configuration

User-agent: *
Allow: /
Disallow: /api/search

# AI and Search Bot Permissions
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Applebot
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

# AI Model Search & Training Bots (ChatGPT, Claude, Perplexity, etc.)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: CCBot
Allow: /

User-agent: Diffbot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: Omgilibot
Allow: /

Host: ${SITE_URL}
Sitemap: ${SITE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(PUBLIC_DIR, "robots.txt"), robotsTxt.trim(), "utf-8");

// 3. Generate llms.txt (LLM & AI Assistant Indexing Format)
console.log("🧠 Generating public/llms.txt and public/.well-known/llms.txt...");
const llmsTxt = `# Nepali Date Library

> Universal, production-ready multi-language ecosystem for working with Nepali (Bikram Sambat / BS) dates. Supports NodeJS/TypeScript, Python, and PHP with unified APIs, zero dependencies, and 100% verified calendar data.

## Official Resources
- Website: ${SITE_URL}
- Date Converter Suite: ${SITE_URL}/converter
- Full Documentation: ${SITE_URL}/docs
- Complete AI Reference: ${SITE_URL}/llms-full.txt
- GitHub Organization: https://github.com/SandipGhimire/Nepali-Date

## Package Ecosystem & Installation
- **NodeJS / TypeScript**: \`npm install nepali-date-library\` (npm: https://www.npmjs.com/package/nepali-date-library, GitHub: https://github.com/SandipGhimire/Nepali-Date-Library-NodeJS)
- **Python**: \`pip install nepali-date-library\` (PyPI: https://pypi.org/project/nepali-date-library/, GitHub: https://github.com/SandipGhimire/Nepali-Date-Library-Python)
- **PHP**: \`composer require sghimire/nepali-date-library\` (Packagist: https://packagist.org/packages/sghimire/nepali-date-library, GitHub: https://github.com/SandipGhimire/Nepali-Date-Library-PHP)

## Core Capabilities
- **Bidirectional Date Conversion**: Convert Gregorian (AD) to Bikram Sambat (BS) and Bikram Sambat (BS) to Gregorian (AD).
- **Calendar Range**: 1976/01/01 BS to 2100/12/31 BS (approx 1919-04-13 to 2044-04-12 AD).
- **Date Manipulation & Arithmetic**: Add or subtract days, months, and years with automatic edge-case handling for variable Nepali month lengths (29 to 32 days).
- **Government of Nepal Fiscal Year**: Native support for Nepali fiscal years (Shrawan 1 to Ashadh end), fiscal quarters (Q1: Shrawan-Ashwin, Q2: Kartik-Poush, Q3: Magh-Chaitra, Q4: Baisakh-Ashadh).
- **Formatting & Localization**: Flexible date format tokens (\`YYYY-MM-DD\`, \`DD MMMM YYYY\`, \`dddd\`, etc.) rendered in English and Devanagari numerals and script.
- **Date Comparison & Queries**: Check \`isBefore\`, \`isAfter\`, \`isSame\`, \`isLeapYear\`, \`startOfMonth\`, \`endOfMonth\`, \`startOfYear\`, \`endOfYear\`.

## Quick Start Code Recipes

### NodeJS / TypeScript
\`\`\`typescript
import { NepaliDate } from "nepali-date-library";

// Current Nepali date
const today = new NepaliDate();
console.log(today.format("YYYY-MM-DD")); // e.g. 2081-06-29

// Convert AD to BS
const bs = NepaliDate.fromAD(new Date("2024-10-15"));
console.log(bs.format("DD MMMM YYYY")); // 29 Ashwin 2081

// Date manipulation
bs.addDays(30);

// Nepal Fiscal Year
console.log(bs.getFiscalYear()); // 2081/82
\`\`\`

### Python
\`\`\`python
from nepali_date_library import NepaliDate
from datetime import date

# Current Nepali date
today = NepaliDate()
print(today.format("YYYY-MM-DD"))

# Convert AD to BS
bs = NepaliDate.from_ad(date(2024, 10, 15))
print(bs.format("DD MMMM YYYY"))

# Date manipulation
bs.add_days(30)

# Nepal Fiscal Year
print(bs.get_fiscal_year()) # 2081/82
\`\`\`

### PHP
\`\`\`php
use NepaliDateLibrary\\NepaliDate;
use DateTime;

// Current Nepali date
$today = new NepaliDate();
echo $today->format("YYYY-MM-DD");

// Convert AD to BS
$bs = NepaliDate::fromAD(new DateTime("2024-10-15"));
echo $bs->format("DD MMMM YYYY");

// Date manipulation
$bs->addDays(30);

// Nepal Fiscal Year
echo $bs->getFiscalYear(); // 2081/82
\`\`\`

## Key Documentation Sections
- [Origination & Philosophy](${SITE_URL}/docs/origination): Historical background of Bikram Sambat and why this library was built.
- [Ecosystem Overview](${SITE_URL}/docs/overview): Cross-platform feature parity across Node, Python, and PHP.
- [Multi-Language Installation](${SITE_URL}/docs/installation): Package managers and environment setup.
- [Code Examples](${SITE_URL}/docs/examples): Real-world workflows, form integrations, and date math.
- [NodeJS Documentation](${SITE_URL}/docs/nodejs): Complete TypeScript API reference and guides.
- [Python Documentation](${SITE_URL}/docs/python): Pythonic API reference and datetime interoperability.
- [PHP Documentation](${SITE_URL}/docs/php): Composer package reference and DateTime compatibility.
- [Online Converter](${SITE_URL}/converter): Interactive web tools for instant conversions and age calculation.

## Complete Method Directory
${sortedDocPages
  .map(
    (p) => `- [${p.title}](${SITE_URL}${p.url})${p.description ? `: ${p.description}` : ""}`
  )
  .join("\n")}
`;

fs.writeFileSync(path.join(PUBLIC_DIR, "llms.txt"), llmsTxt.trim(), "utf-8");
fs.writeFileSync(
  path.join(PUBLIC_DIR, ".well-known", "llms.txt"),
  llmsTxt.trim(),
  "utf-8"
);

// 4. Generate llms-full.txt (Exhaustive AI Knowledge Base)
console.log("📚 Generating public/llms-full.txt (Comprehensive AI Knowledge Base)...");
let llmsFullTxt = `${llmsTxt}

---

# Detailed API Specifications & Reference Manual

## Bikram Sambat Calendar Structure
Bikram Sambat is a solar calendar historically used in Nepal and parts of South Asia. It is roughly 56.7 years ahead of the Gregorian (AD) calendar:
- Year range: 1976 BS to 2100 BS.
- Month names in order:
  1. Baisakh (बैशाख) - 30 to 31 days
  2. Jestha (जेठ) - 31 to 32 days
  3. Ashadh (असार) - 31 to 32 days
  4. Shrawan (साउन) - 31 to 32 days
  5. Bhadra (भदौ) - 31 to 32 days
  6. Ashwin (असोज) - 30 to 31 days
  7. Kartik (कार्तिक) - 29 to 30 days
  8. Mangsir (मंसिर) - 29 to 30 days
  9. Poush (पौष) - 29 to 30 days
  10. Magh (माघ) - 29 to 30 days
  11. Falgun (फागुन) - 29 to 30 days
  12. Chaitra (चैत) - 30 to 31 days

## Nepal Government Fiscal Year (आर्थिक वर्ष)
- Starts: Shrawan 1 (approx mid-July AD)
- Ends: Ashadh end (approx mid-July next year AD)
- Format: "YYYY/YY" (e.g., 2081/82)
- Fiscal Quarters:
  - First Quarter (Q1): Shrawan 1 to Ashwin end
  - Second Quarter (Q2): Kartik 1 to Poush end
  - Third Quarter (Q3): Magh 1 to Chaitra end
  - Fourth Quarter (Q4): Baisakh 1 to Ashadh end

## Formatting Tokens Cheat Sheet
- \`YYYY\`: 4-digit Nepali Year (e.g. 2081)
- \`YY\`: 2-digit Nepali Year (e.g. 81)
- \`MMMM\`: Full Nepali Month Name (e.g. Ashwin / असोज)
- \`MMM\`: Short Nepali Month Name (e.g. Ash / असो)
- \`MM\`: 2-digit Month (01-12)
- \`M\`: 1 or 2-digit Month (1-12)
- \`DD\`: 2-digit Day (01-32)
- \`D\`: 1 or 2-digit Day (1-32)
- \`dddd\`: Full Day Name (e.g. Sunday / आइतबार)
- \`ddd\`: Short Day Name (e.g. Sun / आइत)
- \`HH\`: 2-digit Hours (00-23)
- \`mm\`: 2-digit Minutes (00-59)
- \`ss\`: 2-digit Seconds (00-59)

---

# Curated Documentation & Method Guides
`;

for (const doc of sortedDocPages) {
  // Strip frontmatter from mdx content
  const cleanBody = doc.content.replace(/^---\r?\n[\s\S]*?\r?\n---/, "").trim();
  llmsFullTxt += `\n\n## Page: ${doc.title} (${doc.url})\n`;
  if (doc.description) {
    llmsFullTxt += `Description: ${doc.description}\n\n`;
  }
  llmsFullTxt += `${cleanBody}\n\n---`;
}

fs.writeFileSync(path.join(PUBLIC_DIR, "llms-full.txt"), llmsFullTxt.trim(), "utf-8");

// 5. Generate site.webmanifest
console.log("📱 Generating public/site.webmanifest...");
const manifest = {
  name: "Nepali Date Library & Converter",
  short_name: "NepaliDate",
  description:
    "Universal multi-language library and online converter for Nepali Bikram Sambat (BS) dates.",
  start_url: "/",
  display: "standalone",
  background_color: "#0c0d0e",
  theme_color: "#E1804B",
  icons: [
    {
      src: "/Logo/Dark/Icon.svg",
      sizes: "any",
      type: "image/svg+xml",
      purpose: "any maskable",
    },
    {
      src: "/Logo/Dark/Logo.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
};
fs.writeFileSync(
  path.join(PUBLIC_DIR, "site.webmanifest"),
  JSON.stringify(manifest, null, 2),
  "utf-8"
);

console.log("✅ All dynamic SEO & AI indexing files generated successfully!");


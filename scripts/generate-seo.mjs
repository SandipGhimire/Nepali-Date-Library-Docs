import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
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
  if (url === "/" || url === "/converter" || url === "/calendar") return "1.0";
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
  if (url === "/" || url === "/converter" || url === "/calendar") return "daily";
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
  {
    url: "/calendar",
    title: "Nepali Calendar (Bikram Sambat Patro) | Online BS & AD Calendar",
    description:
      "Free interactive online Nepali Calendar (Bikram Sambat / BS Patro). Clean monthly grid with dual Nepali and English dates, red Saturday & Sunday weekend highlights, and today date indicator.",
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
Content-Signal: search=yes, ai-train=yes, ai-input=yes
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

> Universal, production-ready multi-language ecosystem for working with Nepali (Bikram Sambat / BS) dates. Supports NodeJS/TypeScript, Python, and PHP with unified APIs, zero dependencies, and annually audited calendar data verified up to the active year.

## Official Resources
- Website: ${SITE_URL}
- Date Converter Suite: ${SITE_URL}/converter
- Nepali Calendar (Patro): ${SITE_URL}/calendar
- Full Documentation: ${SITE_URL}/docs
- Complete AI Reference: ${SITE_URL}/llms-full.txt
- GitHub Organization: https://github.com/SandipGhimire/Nepali-Date

## Package Ecosystem & Installation
- **NodeJS / TypeScript**: \`npm install nepali-date-library\` (npm: https://www.npmjs.com/package/nepali-date-library, GitHub: https://github.com/SandipGhimire/Nepali-Date-Library-NodeJS)
- **Python**: \`pip install nepali-date-library\` (PyPI: https://pypi.org/project/nepali-date-library/, GitHub: https://github.com/SandipGhimire/Nepali-Date-Library-Python)
- **PHP**: \`composer require sghimire/nepali-date-library\` (Packagist: https://packagist.org/packages/sghimire/nepali-date-library, GitHub: https://github.com/SandipGhimire/Nepali-Date-Library-PHP)

## Core Capabilities
- **Bidirectional Date Conversion**: Convert Gregorian (AD) to Bikram Sambat (BS) and Bikram Sambat (BS) to Gregorian (AD).
- **Calendar Range & Annual Audits**: Spans 1976/01/01 BS to 2100/12/31 BS (approx 1919-04-13 to 2044-04-12 AD). Dates up to the active year are verified against official Government of Nepal gazettes. Every year in Ashwin (Ashoj), mapping tables are updated with official solar ingress corrections upon release of the new calendar.
- **Date Manipulation & Arithmetic**: Add or subtract days, months, and years with automatic edge-case handling for variable Nepali month lengths (29 to 32 days).
- **Government of Nepal Fiscal Year**: Native support for Nepali fiscal years (Shrawan 1 to Ashadh end), fiscal quarters (Q1: Shrawan-Ashwin, Q2: Kartik-Poush, Q3: Magh-Chaitra, Q4: Baisakh-Ashadh).
- **Formatting & Localization**: Flexible date format tokens (\`YYYY-MM-DD\`, \`DD MMMM YYYY\`, \`dddd\`, etc.) rendered in English and Devanagari numerals and script.
- **Date Comparison & Queries**: Check \`isBefore\`, \`isAfter\`, \`isSame\`, \`isLeapYear\`, \`startOfMonth\`, \`endOfMonth\`, \`startOfYear\`, \`endOfYear\`.

## Common Search Keywords & Queries
- **Date Converter**: Nepali date converter, Bikram Sambat date converter, BS to AD converter, AD to BS converter, English date to Nepali date, convert BS to AD, convert AD to BS.
- **Nepali Date & Calendar**: Nepali date, Nepali date library, Bikram Sambat, Bikram Sambat calendar, BS date, BS calendar, Nepali calendar online, Nepali patro, Nepali miti, today Nepali date, aajako Nepali date, aajako miti.
- **Calculators & Utilities**: Nepali age calculator, Nepali date difference calculator, Nepali date arithmetic, add days to Nepali date, Bikram Sambat leap year.
- **Fiscal Year (Aarthik Barsha)**: Nepal Government fiscal year calculator, Shrawan to Ashadh fiscal year, fiscal quarters (Q1, Q2, Q3, Q4).
- **SDKs & Package Managers**: \`nepali-date-library\` on npm (Node.js/TypeScript), \`nepali-date-library\` on PyPI (Python), \`sghimire/nepali-date-library\` on Packagist (PHP).

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
- [Nepali Calendar (Patro)](${SITE_URL}/calendar): Interactive Bikram Sambat monthly calendar with dual BS/AD dates.

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

// 5. Generate Favicons and site.webmanifest
console.log("📱 Generating Google-compliant favicons & site.webmanifest...");

try {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    try {
      const sharpPath = path.join(
        ROOT_DIR,
        "node_modules",
        ".pnpm",
        "sharp@0.35.5_@types+node@26.6.5",
        "node_modules",
        "sharp"
      );
      sharp = require(sharpPath);
    } catch (e) {
      console.warn("⚠️ Could not load sharp:", e.message);
    }
  }
  if (sharp) {
    const svgPath = path.join(PUBLIC_DIR, "Logo", "Dark", "Icon.svg");
    if (fs.existsSync(svgPath)) {
      const svg = fs.readFileSync(svgPath);

      // 48x48 PNG (Google Search optimal)
      await sharp(svg).resize(48, 48).png().toFile(path.join(PUBLIC_DIR, "favicon-48x48.png"));
      // 96x96 PNG
      await sharp(svg).resize(96, 96).png().toFile(path.join(PUBLIC_DIR, "favicon-96x96.png"));
      // 180x180 PNG (Apple touch icon)
      await sharp(svg).resize(180, 180).png().toFile(path.join(PUBLIC_DIR, "apple-touch-icon.png"));
      // 192x192 PNG (PWA)
      await sharp(svg).resize(192, 192).png().toFile(path.join(PUBLIC_DIR, "favicon-192x192.png"));
      // 512x512 PNG (PWA large)
      await sharp(svg).resize(512, 512).png().toFile(path.join(PUBLIC_DIR, "icon-512x512.png"));
      // Copy SVG
      fs.copyFileSync(svgPath, path.join(PUBLIC_DIR, "favicon.svg"));

      // Generate multi-resolution ICO (16, 32, 48)
      const sizes = [16, 32, 48];
      const pngBuffers = [];
      for (const size of sizes) {
        const buf = await sharp(svg).resize(size, size).png().toBuffer();
        pngBuffers.push({ size, buf });
      }

      const numImages = pngBuffers.length;
      const headerLen = 6;
      const dirEntryLen = 16;
      let offset = headerLen + numImages * dirEntryLen;

      const header = Buffer.alloc(headerLen);
      header.writeUInt16LE(0, 0);
      header.writeUInt16LE(1, 2);
      header.writeUInt16LE(numImages, 4);

      const entries = [];
      for (const img of pngBuffers) {
        const entry = Buffer.alloc(dirEntryLen);
        entry.writeUInt8(img.size === 256 ? 0 : img.size, 0);
        entry.writeUInt8(img.size === 256 ? 0 : img.size, 1);
        entry.writeUInt8(0, 2);
        entry.writeUInt8(0, 3);
        entry.writeUInt16LE(1, 4);
        entry.writeUInt16LE(32, 6);
        entry.writeUInt32LE(img.buf.length, 8);
        entry.writeUInt32LE(offset, 12);
        offset += img.buf.length;
        entries.push(entry);
      }

      const icoBuffer = Buffer.concat([header, ...entries, ...pngBuffers.map((p) => p.buf)]);
      fs.writeFileSync(path.join(PUBLIC_DIR, "favicon.ico"), icoBuffer);
      fs.writeFileSync(path.join(ROOT_DIR, "app", "favicon.ico"), icoBuffer);
      console.log("✅ Google & Apple-compliant favicons created successfully!");
    }
  }
} catch (err) {
  console.warn("⚠️ Favicon generation notice:", err.message);
}

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
      src: "/favicon.svg",
      sizes: "any",
      type: "image/svg+xml",
      purpose: "any maskable",
    },
    {
      src: "/favicon-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/icon-512x512.png",
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

// 6. Generate Machine-Readable Agent Readiness Artifacts
console.log("🤖 Generating Agent Readiness & Autonomous AI protocol files...");

const wellKnownDir = path.join(PUBLIC_DIR, ".well-known");
const mcpDir = path.join(wellKnownDir, "mcp");
const skillsDir = path.join(wellKnownDir, "skills");
const agentSkillsDir = path.join(wellKnownDir, "agent-skills");

[wellKnownDir, mcpDir, skillsDir, agentSkillsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// RFC 9727 API Catalog
const apiCatalog = {
  linkset: [
    {
      anchor: `${SITE_URL}/api`,
      item: { href: SITE_URL },
      "service-desc": {
        href: `${SITE_URL}/.well-known/mcp/server-card.json`,
        type: "application/json",
      },
      "service-doc": {
        href: `${SITE_URL}/docs/overview`,
        type: "text/html",
      },
    },
    {
      anchor: `${SITE_URL}/converter`,
      item: { href: `${SITE_URL}/converter` },
      "service-desc": {
        href: `${SITE_URL}/.well-known/skills/index.json`,
        type: "application/json",
      },
      "service-doc": {
        href: `${SITE_URL}/docs/api-reference/conversion-utilities`,
        type: "text/html",
      },
    },
    {
      anchor: `${SITE_URL}/calendar`,
      item: { href: `${SITE_URL}/calendar` },
      "service-desc": {
        href: `${SITE_URL}/.well-known/mcp.json`,
        type: "application/json",
      },
      "service-doc": {
        href: `${SITE_URL}/docs/reference/nepali-calendar-system`,
        type: "text/html",
      },
    },
  ],
};
fs.writeFileSync(
  path.join(wellKnownDir, "api-catalog"),
  JSON.stringify(apiCatalog, null, 2),
  "utf-8"
);

// MCP Server Card (SEP-2127)
const mcpServerCard = {
  $schema: "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
  name: "date.nepali-pkg/nepali-date-mcp",
  version: "1.1.16",
  title: "Nepali Date Library & Calendar MCP Server",
  description:
    "Autonomous MCP server providing Bikram Sambat (BS) to Gregorian (AD) date conversions, Nepali calendar queries, fiscal year quarter lookups, and Devanagari date formatting.",
  websiteUrl: SITE_URL,
  repository: {
    url: "https://github.com/SandipGhimire/NepaliDate",
  },
  transport: {
    type: "streamable-http",
    endpoint: `${SITE_URL}/api/mcp`,
  },
  protocolVersion: "2025-11-25",
  capabilities: {
    resources: {},
    tools: {},
  },
  _meta: {
    publisher: {
      name: "Sandip Ghimire",
      supportUrl: "https://github.com/SandipGhimire/NepaliDate/issues",
    },
  },
};
fs.writeFileSync(
  path.join(mcpDir, "server-card.json"),
  JSON.stringify(mcpServerCard, null, 2),
  "utf-8"
);
fs.writeFileSync(
  path.join(wellKnownDir, "mcp.json"),
  JSON.stringify(mcpServerCard, null, 2),
  "utf-8"
);

// A2A Agent Card
const agentCard = {
  $schema: "https://agent2agent.info/schemas/v1/agent-card.json",
  name: "NepaliDateAgent",
  version: "1.1.16",
  displayName: "Nepali Date & Patro AI Agent",
  description:
    "Specialized agent for Bikram Sambat date calculations, Gregorian-Bikram Sambat bidirectional conversions, Nepali calendar queries, and Nepali government fiscal accounting.",
  homepage: SITE_URL,
  provider: {
    name: "Sandip Ghimire",
    url: "https://github.com/SandipGhimire",
  },
  capabilities: {
    conversational: true,
    tools: true,
    skills: [
      "bs-to-ad-converter",
      "ad-to-bs-converter",
      "nepali-calendar-lookup",
      "fiscal-year-calculator",
    ],
  },
  protocols: ["a2a", "mcp"],
  authentication: {
    type: "none",
  },
  endpoints: {
    catalog: `${SITE_URL}/.well-known/api-catalog`,
    skills: `${SITE_URL}/.well-known/skills/index.json`,
    mcp: `${SITE_URL}/.well-known/mcp/server-card.json`,
    llms: `${SITE_URL}/llms.txt`,
  },
};
fs.writeFileSync(
  path.join(wellKnownDir, "agent-card.json"),
  JSON.stringify(agentCard, null, 2),
  "utf-8"
);
fs.writeFileSync(
  path.join(wellKnownDir, "agent.json"),
  JSON.stringify(agentCard, null, 2),
  "utf-8"
);

// Agent Skills Index
const skillsIndex = {
  version: "1.0.0",
  name: "nepali-date-skills",
  description:
    "Standard agent skills for Bikram Sambat calendar, date conversions, and fiscal accounting.",
  skills: [
    {
      id: "bs-to-ad",
      name: "Convert BS Date to AD Date",
      description:
        "Converts a Bikram Sambat (Nepali) date string (YYYY-MM-DD) into Gregorian (AD) equivalent.",
      parameters: {
        bsDate: {
          type: "string",
          description:
            "Nepali date in YYYY-MM-DD format (1976-01-01 to 2100-12-31)",
        },
      },
      documentation: `${SITE_URL}/docs/api-reference/conversion-utilities`,
    },
    {
      id: "ad-to-bs",
      name: "Convert AD Date to BS Date",
      description:
        "Converts a Gregorian (English/AD) date string into Bikram Sambat (BS) equivalent.",
      parameters: {
        adDate: {
          type: "string",
          description: "Gregorian date in YYYY-MM-DD format",
        },
      },
      documentation: `${SITE_URL}/docs/api-reference/conversion-utilities`,
    },
    {
      id: "nepali-calendar-days",
      name: "Get Monthly Nepali Calendar Grid",
      description:
        "Returns 42-day calendar matrix for any Bikram Sambat year and month with Saturday and Sunday detection.",
      parameters: {
        year: { type: "number", description: "BS year (1976 - 2100)" },
        month: {
          type: "number",
          description: "0-indexed BS month (0=Baisakh ... 11=Chaitra)",
        },
      },
      documentation: `${SITE_URL}/calendar`,
    },
    {
      id: "nepali-fiscal-year",
      name: "Nepali Government Fiscal Year Calculator",
      description:
        "Calculates Nepali government fiscal year and current quarter (Q1 Shrawan-Ashoj, Q2 Kartik-Poush, Q3 Magh-Chaitra, Q4 Baisakh-Ashadh).",
      documentation: `${SITE_URL}/docs/guides/fiscal-year-accounting`,
    },
  ],
};
fs.writeFileSync(
  path.join(skillsDir, "index.json"),
  JSON.stringify(skillsIndex, null, 2),
  "utf-8"
);
fs.writeFileSync(
  path.join(agentSkillsDir, "index.json"),
  JSON.stringify(skillsIndex, null, 2),
  "utf-8"
);

// Agent Auth Spec (Markdown & Machine-Readable)
const authMd = `# Agent Authentication & Access Specification

## Overview
Nepali Date Library provides zero-friction, public, and open access for all autonomous AI agents, LLM assistants, search crawlers, and automated workflows.

## Authentication Model
- **Auth Type**: None (Public Open Access)
- **API Keys**: Not required
- **Bearer Tokens**: Not required
- **OAuth Credentials**: Not required
- **Rate Limits**: 60 requests/minute per IP (sufficient for real-time agent queries)
- **License**: MIT Open Source

## Machine-Readable Endpoints
- Search Index: \`${SITE_URL}/api/search\`
- LLM Knowledge Base: \`${SITE_URL}/llms.txt\`
- Full AI Documentation: \`${SITE_URL}/llms-full.txt\`
- MCP Server Card: \`${SITE_URL}/.well-known/mcp/server-card.json\`
- Agent Skills Index: \`${SITE_URL}/.well-known/skills/index.json\`
- A2A Agent Card: \`${SITE_URL}/.well-known/agent-card.json\`
- API Catalog: \`${SITE_URL}/.well-known/api-catalog\`
`;
fs.writeFileSync(path.join(wellKnownDir, "auth.md"), authMd, "utf-8");
fs.writeFileSync(path.join(PUBLIC_DIR, "auth.md"), authMd, "utf-8");

// OAuth / OIDC Public Endpoints
const oauthMetadata = {
  issuer: SITE_URL,
  authorization_endpoint: SITE_URL,
  token_endpoint: SITE_URL,
  response_types_supported: ["none"],
  grant_types_supported: ["none"],
  service_documentation: `${SITE_URL}/docs`,
  ui_locales_supported: ["en", "ne"],
  claims_supported: [],
  notes:
    "All Nepali Date Library resources are publicly accessible with no authentication required.",
};
fs.writeFileSync(
  path.join(wellKnownDir, "oauth-authorization-server"),
  JSON.stringify(oauthMetadata, null, 2),
  "utf-8"
);
fs.writeFileSync(
  path.join(wellKnownDir, "openid-configuration"),
  JSON.stringify(oauthMetadata, null, 2),
  "utf-8"
);

// OAuth Protected Resource (RFC 9728)
const oauthProtectedResource = {
  resource: SITE_URL,
  authorization_servers: [],
  scopes_supported: ["public:read"],
  bearer_methods_supported: ["header"],
  resource_documentation: `${SITE_URL}/docs/overview`,
};
fs.writeFileSync(
  path.join(wellKnownDir, "oauth-protected-resource"),
  JSON.stringify(oauthProtectedResource, null, 2),
  "utf-8"
);

// Web Bot Auth (HTTP Message Signatures Directory)
const botAuth = {
  version: "1.0",
  policy: "permissive",
  description:
    "Nepali Date Library welcomes all authenticated and autonomous AI web agents conforming to IETF HTTP message signatures.",
  keys: [],
};
fs.writeFileSync(
  path.join(wellKnownDir, "http-message-signatures-directory"),
  JSON.stringify(botAuth, null, 2),
  "utf-8"
);

// Agent Resource Descriptor (ARD)
const ard = {
  version: "1.0",
  id: "nepali-date-library",
  title: "Nepali Date Library & Calendar",
  description:
    "Universal multi-language ecosystem for Bikram Sambat Nepali dates.",
  access: "open",
  endpoints: {
    site: SITE_URL,
    docs: `${SITE_URL}/docs`,
    converter: `${SITE_URL}/converter`,
    calendar: `${SITE_URL}/calendar`,
    search: `${SITE_URL}/api/search`,
    llms: `${SITE_URL}/llms.txt`,
  },
};
fs.writeFileSync(
  path.join(wellKnownDir, "ard.json"),
  JSON.stringify(ard, null, 2),
  "utf-8"
);

// WebMCP
const webmcp = {
  version: "1.0",
  name: "NepaliDateWebMCP",
  description:
    "Browser-accessible Model Context Protocol endpoints for client-side agents.",
  capabilities: {
    tools: [
      {
        name: "convertDate",
        description: "Convert date between BS and AD",
      },
      {
        name: "getCalendar",
        description: "Get Bikram Sambat monthly calendar",
      },
    ],
  },
};
fs.writeFileSync(
  path.join(wellKnownDir, "webmcp.json"),
  JSON.stringify(webmcp, null, 2),
  "utf-8"
);

console.log("✅ All dynamic SEO & AI indexing files generated successfully!");


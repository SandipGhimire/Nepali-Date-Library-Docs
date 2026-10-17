# Nepali Date Documentation & Interactive Suite 🇳🇵

[![Website](https://img.shields.io/badge/Website-nepali--pkg.date-E1804B?style=for-the-badge&logo=google-chrome&logoColor=white)](https://nepali-pkg.date)
[![Converter](https://img.shields.io/badge/Converter-Live%20Suite-24292E?style=for-the-badge)](https://nepali-pkg.date/converter)
[![Next.js](https://img.shields.io/badge/Next.js-16.4.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Turbopack](https://img.shields.io/badge/Bundler-Turbopack-000000?style=for-the-badge&logo=turbopack&logoColor=white)](https://turbo.build/pack)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-27845A?style=for-the-badge)](./LICENSE)

The official documentation portal, live interactive playground, and AI knowledge engine for the **Nepali Date (Bikram Sambat) Library Ecosystem**. Built on **Next.js 16** (App Router & Turbopack), **Fumadocs**, and **Tailwind CSS v4**, this platform serves as the central documentation source, live conversion suite, and AI knowledge hub across Node.js, Python, and PHP implementations.

🌐 **Production Website**: [https://nepali-pkg.date](https://nepali-pkg.date)  
🔄 **Live Date Converter Suite**: [https://nepali-pkg.date/converter](https://nepali-pkg.date/converter)

---

## ⚡ Key Highlights

- **Interactive Date & Age Converter Suite**:
  - Bikram Sambat (BS) $\leftrightarrow$ Gregorian (AD) high-precision bidirectional conversion.
  - Multi-unit date difference calculator (years, months, days, weekdays).
  - Accurate age calculator with total days lived and next birthday countdown.
  - Live Nepali fiscal year and quarter computation.
- **Multi-Language SDK Documentation**:
  - Unified guides and complete API references for [**Node.js / TypeScript**](https://nepali-pkg.date/docs/nodejs), [**Python**](https://nepali-pkg.date/docs/python), and [**PHP**](https://nepali-pkg.date/docs/php).
  - Over 220+ statically generated documentation pages with zero layout shift (CLS).
- **AI Engine Optimization (AEO / GEO)**:
  - Machine-readable context endpoints ([`/llms.txt`](https://nepali-pkg.date/llms.txt) and [`/llms-full.txt`](https://nepali-pkg.date/llms-full.txt)).
  - Schema.org JSON-LD structured data (`TechArticle`, `WebApplication`, `BreadcrumbList`, `FAQPage`).
  - Dynamic `sitemap.xml` and AI-crawler targeted `robots.txt`.
- **Terracotta & Obsidian Brand Design**:
  - Theme-aware UI (light & dark mode) tailored to Nepali heritage terracotta tones.
  - Custom responsive layout with sticky table of contents and dynamic per-library versioning.
- **Enterprise CI/CD Automation**:
  - GitHub Actions build runner compiling `master` and publishing pre-built release artifacts directly to the `release` branch for one-step VM deployment.

---

## 🏗️ Repository Architecture

```text
Docs/
├── app/                        # Next.js 16 App Router routes
│   ├── (home)/                 # Root landing page and /converter suite
│   ├── docs/[[...slug]]/       # Dynamic MDX documentation renderer
│   ├── api/search/             # Fumadocs client search indexing route
│   ├── sitemap.ts              # Dynamic sitemap generation
│   ├── robots.ts               # Robots crawling directives
│   ├── llms.txt/               # AI model index route
│   ├── llms-full.txt/          # Full AI model documentation context route
│   └── global.css              # Tailwind v4 styles, theme tokens & scrollbars
├── components/                 # React UI components
│   ├── ads/                    # AdSense script and responsive banner units
│   ├── ai/                     # AI page quick-actions & context exporter
│   ├── converter/              # Interactive conversion, age & arithmetic tabs
│   ├── docs/                   # Package overview badges & developer profile
│   ├── docs-sidebar/           # Custom hierarchical navigation tree
│   └── ui/                     # Accessible Base-UI primitives
├── content/                    # Documentation content authored in MDX
│   └── docs/
│       ├── nodejs/             # Node.js & TypeScript SDK documentation
│       ├── python/             # Python library documentation
│       └── php/                # PHP / Composer package documentation
├── layouts/                    # Fumadocs custom layouts & slots
│   ├── docs/                   # Documentation layout (Sidebar, TOC, Header)
│   ├── home/                   # Landing page layout & navigation
│   └── shared/                 # Shared client slots (ThemeSwitch, Search, Logo)
├── lib/                        # Utilities & business logic
│   ├── adsense.ts              # AdSense configuration & unit slot IDs
│   ├── seo.ts                  # Schema.org JSON-LD generators & metadata
│   └── source.ts               # Fumadocs MDX source collection
├── public/                     # Static assets, logos, and generated SEO files
├── scripts/
│   ├── generate-seo.mjs        # Pre-build scanner generating sitemap & llms.txt
│   └── patch-tailwindcss.cjs   # Build patch for Tailwind v4 integration
├── deploy.sh                   # Safe, conflict-free server deployment script
└── .github/
    └── workflows/
        └── build-and-push.yml  # Manual GitHub Actions compiler & release publisher
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: `v22.0.0` or higher
- **pnpm**: `v10.0.0` or higher (`corepack enable pnpm`)

### 1. Installation

```bash
git clone https://github.com/SandipGhimire/Nepali-Date-Library.git
cd NepaliDate/Docs
pnpm install
```

### 2. Environment Configuration

```bash
cp .env.example .env.local
```

| Variable | Description | Default |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL | `https://nepali-pkg.date` |
| `ADSENSE_CLIENT_ID` | Google AdSense Publisher ID (optional) | `""` |

### 3. Local Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build & Verification

```bash
# Generate SEO assets (sitemap.xml, robots.txt, llms.txt, webmanifest)
pnpm generate:seo

# Create optimized production build
pnpm build

# Start local production server
pnpm start
```

---

## 🚀 CI/CD & Deployment

1. **GitHub Actions Build Pipeline** ([`.github/workflows/build-and-push.yml`](./.github/workflows/build-and-push.yml)):
   - Triggered manually (`workflow_dispatch`).
   - Compiles all 220+ static documentation pages and dynamic SEO assets.
   - Pushes pre-compiled build artifacts to the `release` branch.

2. **One-Command Server Deployment**:
   ```bash
   ./deploy.sh
   ```
   *The `deploy.sh` script automatically preserves `.env`, resets cleanly to `origin/release`, verifies dependencies, and reloads your service without merge conflicts.*

---

## 📚 Ecosystem Documentation Links

- **NodeJS / TypeScript Guide**: [nepali-pkg.date/docs/nodejs](https://nepali-pkg.date/docs/nodejs)
- **Python Package Guide**: [nepali-pkg.date/docs/python](https://nepali-pkg.date/docs/python)
- **PHP Library Guide**: [nepali-pkg.date/docs/php](https://nepali-pkg.date/docs/php)
- **Online Converter Suite**: [nepali-pkg.date/converter](https://nepali-pkg.date/converter)

---

## 🤝 Contributing

We welcome contributions, documentation corrections, and new guide proposals! Please review our [**Contributing Guide (CONTRIBUTING.md)**](./CONTRIBUTING.md) for details on code style, MDX authoring, and the pull request process.

---

## 📄 License

This documentation engine and library ecosystem are open-source software licensed under the [MIT License](./LICENSE).  
Made with ❤️ by [Sandip Ghimire](https://github.com/SandipGhimire).

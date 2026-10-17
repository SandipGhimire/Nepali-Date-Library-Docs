# Nepali Date Documentation Engine 🇳🇵

[![Website](https://img.shields.io/badge/Website-nepali--pkg.date-E1804B?style=for-the-badge&logo=google-chrome&logoColor=white)](https://nepali-pkg.date)
[![Next.js](https://img.shields.io/badge/Next.js-16.4.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Turbopack](https://img.shields.io/badge/Bundler-Turbopack-000000?style=for-the-badge&logo=turbopack&logoColor=white)](https://turbo.build/pack)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-27845A?style=for-the-badge)](./LICENSE)

The official documentation website and interactive web suite for the **Nepali Date (Bikram Sambat) Library Ecosystem**. Built on **Next.js 16** (App Router & Turbopack), **Fumadocs**, and **Tailwind CSS v4**, this platform serves as the central documentation source, live playground, and AI knowledge hub for the TypeScript/Node.js, Python, and PHP packages.

🌐 **Production Website**: [https://nepali-pkg.date](https://nepali-pkg.date)

---

## ⚡ Key Highlights

- **Interactive Date Converter Suite**:
  - Bikram Sambat (BS) $\leftrightarrow$ Gregorian (AD) high-precision bidirectional conversion.
  - Date difference calculator (years, months, days, weekdays).
  - Accurate age calculator with total day counts and upcoming birthday indicators.
  - Nepali fiscal year and quarter computation.
  - Dynamic date arithmetic and manipulation engine.
- **Multi-Language SDK Documentation**:
  - Unified, side-by-side API guides for **Node.js/TypeScript**, **Python**, and **PHP**.
  - Over 220+ statically generated documentation pages with zero layout shift (CLS).
- **AI Engine Optimization (AEO / GEO)**:
  - Automated plain-text LLM context endpoints ([`/llms.txt`](https://nepali-pkg.date/llms.txt) and [`/llms-full.txt`](https://nepali-pkg.date/llms-full.txt)).
  - Comprehensive Schema.org JSON-LD structured data (`TechArticle`, `WebApplication`, `BreadcrumbList`, `FAQPage`).
  - Dynamic `sitemap.xml` and AI-crawler targeted `robots.txt`.
- **Terracotta & Obsidian Brand Design**:
  - Theme-aware UI (light & dark mode) tailored to Nepali heritage tones.
  - Global 4px slim scrollbars with transparent tracks and stepper button suppression.
- **Enterprise CI/CD Automation**:
  - GitHub Actions manual build runner compiling `master` and publishing pre-built release artifacts directly to the `release` branch for one-step VM deployment.

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

Clone the repository and install project dependencies:

```bash
git clone https://github.com/SandipGhimire/Nepali-Date-Library.git
cd NepaliDate/Docs
pnpm install
```

### 2. Environment Configuration

Copy the example environment file and configure optional keys:

```bash
cp .env.example .env.local
```

| Variable                        | Description                            | Default                   |
| :------------------------------ | :------------------------------------- | :------------------------ |
| `NEXT_PUBLIC_SITE_URL`          | Canonical site URL                     | `https://nepali-pkg.date` |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Google AdSense Publisher ID (optional) | `""`                      |
| `NEXT_PUBLIC_ADSENSE_SLOT_*`    | Unit IDs for specific page slots       | `""`                      |

### 3. Local Development

Start the Turbopack-powered development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build & Verification

To verify the production build and regenerate static SEO assets locally:

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

This project uses a dedicated GitHub Actions workflow ([`.github/workflows/build-and-push.yml`](./.github/workflows/build-and-push.yml)) to compile production builds in the cloud:

1. **Trigger**: Manually executed via GitHub Actions tab (`workflow_dispatch`).
2. **Process**:
   - Always checks out `master` branch.
   - Executes `pnpm build` (compiles all 220+ static pages, scripts, and assets).
   - Un-ignores `.next/`, `.source/`, and `public/`.
   - Force-pushes the pre-compiled distribution directly to the `release` branch using the custom `Nepali Date Bot`.
3. **VM Deployment**:
   On your server (running behind Cloudflare Tunnel & PM2):
   ```bash
   git fetch origin release
   git checkout release
   git pull origin release
   pnpm install --prod
   pm2 reload ecosystem.config.cjs --update-env
   ```

---

## 📚 Ecosystem Ports

- **NodeJS / TypeScript**: [`nepali-date-library` on npm](https://www.npmjs.com/package/nepali-date-library)
- **Python**: [`nepali-date-library` on PyPI](https://pypi.org/project/nepali-date-library/)
- **PHP**: [`sghimire/nepali-date-library` on Packagist](https://packagist.org/packages/sghimire/nepali-date-library)

---

## 🤝 Contributing

We welcome contributions, documentation corrections, and new guide proposals! Please review our [**Contributing Guide (CONTRIBUTING.md)**](./CONTRIBUTING.md) for details on code style, MDX authoring, and the pull request process.

---

## 📄 License

This documentation engine and library ecosystem are open-source software licensed under the [MIT License](./LICENSE).

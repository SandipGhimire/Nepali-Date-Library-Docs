# Contributing to Nepali Date Documentation 🇳🇵

Thank you for your interest in improving the **Nepali Date Library Documentation**! High-quality, clear, and accurate documentation is essential for developers relying on the Bikram Sambat ecosystem across JavaScript/TypeScript, Python, and PHP.

This guide outlines our development workflow, content conventions, and pull request standards.

---

## 🧭 Code of Conduct

We are dedicated to providing a welcoming, inclusive, and respectful environment for all contributors. Please treat fellow maintainers and contributors with professionalism, kindness, and constructive feedback.

---

## 🛠️ Development Setup

### Requirements

- **Node.js**: `v22.0.0` or higher
- **pnpm**: `v10.0.0` or higher (`corepack enable pnpm`)
- **Git**

### Getting Started

1. **Fork & Clone**:

   ```bash
   git clone https://github.com/<your-username>/Nepali-Date-Library.git
   cd NepaliDate/Docs
   ```

2. **Branch from `master`**:

   ```bash
   git checkout -b docs/your-topic-name
   ```

3. **Install Dependencies**:

   ```bash
   pnpm install
   ```

4. **Launch Dev Server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to preview your edits with instant hot-reloading.

---

## ✍️ Content & MDX Authoring Guidelines

All documentation content is located in the [`content/docs/`](./content/docs/) directory, segmented by language SDK:

- `content/docs/nodejs/`: TypeScript / Node.js library guides & API reference.
- `content/docs/python/`: Python port guides & usage examples.
- `content/docs/php/`: PHP / Composer port guides & API reference.

### 1. Frontmatter Format

Every `.mdx` file must begin with valid YAML frontmatter:

```yaml
---
title: "Converting AD to BS"
description: "Learn how to convert Gregorian calendar dates to Bikram Sambat dates using NepaliDate."
---
```

Optional properties:

- `full: true` (disables the right-side Table of Contents for wide full-width pages).

### 2. Multi-Language Code Blocks

Whenever demonstrating an API concept applicable across the ecosystem, provide examples for all supported languages using tabbed or sequential code blocks:

````markdown
```ts tab="TypeScript"
import { NepaliDate } from "nepali-date-library";

const bsDate = NepaliDate.fromAD(new Date(2026, 3, 14));
console.log(bsDate.format("YYYY-MM-DD"));
```

```python tab="Python"
from datetime import date
from nepali_date_library import NepaliDate

bs_date = NepaliDate.from_ad(date(2026, 4, 14))
print(bs_date.format("YYYY-MM-DD"))
```

```php tab="PHP"
use NepaliDate\NepaliDate;

$bsDate = NepaliDate::fromAD(new \DateTime('2026-04-14'));
echo $bsDate->format('YYYY-MM-DD');
```
````

### 3. Sidebar Organization (`meta.json`)

Fumadocs uses `meta.json` files within each directory to establish titles and hierarchy in the sidebar navigation:

```json
{
  "title": "API Reference",
  "pages": ["index", "conversion", "formatting", "arithmetic"]
}
```

_Note: When creating a new page, remember to append the filename (without `.mdx`) to the corresponding `meta.json`._

---

## 🎨 Styling & Component Guidelines

1. **Design Philosophy**:
   - We utilize Tailwind CSS v4 with custom terracotta (`#E1804B`) and obsidian heritage tones.
   - Avoid hardcoded color hex values—use semantic theme tokens (`var(--primary)`, `bg-fd-card`, `text-fd-muted-foreground`).
2. **Scrollbars & Navigation**:
   - Scrollbar styles are globally defined in [`app/global.css`](./app/global.css). Do not introduce ad-hoc scrollbar classes.
3. **Icons**:
   - Import icons from `lucide-react`. Maintain consistent icon sizing (`size-4` for inline text, `size-5` for cards/buttons).

---

## 🧪 Pre-Flight Quality Checklist

Before submitting a Pull Request, ensure all checks pass cleanly:

```bash
# 1. Format code and MDX files
pnpm format

# 2. Check TypeScript types
pnpm exec tsc --noEmit

# 3. Regenerate SEO & AI indexing assets
pnpm generate:seo

# 4. Perform a full production build
pnpm build
```

---

## 🚀 Submitting a Pull Request

1. **Commit Messages**:
   We encourage standard [Conventional Commits](https://www.conventionalcommits.org/):
   - `docs: add Python fiscal year guide`
   - `fix(converter): correct BS leap year edge case in UI`
   - `style: refine sidebar active indicator line`
2. **PR Description**:
   - Clearly describe what was modified, added, or resolved.
   - Include links to related issues (e.g., `Closes #12`).
   - If UI changes were made, attach desktop and mobile screenshots.
3. **Review**:
   A maintainer will review your pull request, provide feedback, and merge once verified.

---

Thank you for helping make the **Nepali Date** documentation the best it can be! 🇳🇵

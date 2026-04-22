---
layout: home
title: Nepali Date Library
hero:
  name: Nepali Date Library
  text: Bikram Sambat Date Handling Made Easy
  tagline: A comprehensive library for working with Nepali (Bikram Sambat) dates in both NodeJS and Python.
  actions:
    - theme: brand
      text: NodeJS Docs
      link: /docs/NodeJS/getting-started
    - theme: alt
      text: Python Docs
      link: /docs/Python/getting-started
features:
  - icon: 🔄
    title: Multi-Language Support
    details: Identical core logic available for both NodeJS (TypeScript) and Python projects.
  - icon: 📅
    title: Accuracy First
    details: Supports BS 1976 to 2100 with accurate month lengths and leap years.
  - icon: 🌐
    title: Full Localization
    details: English and Nepali language support for formatting, including Devanagari numerals.
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
}

.VPHero .text {
  font-size: 2rem !important;
}

.language-switcher {
  display: flex;
  gap: 20px;
  margin-top: 40px;
  justify-content: center;
  background-color: transparent !important;
}

.lang-box {
  flex: 1;
  padding: 20px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  max-width: 450px;
}

.lang-box h3 {
  margin-top: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>

## Quick Comparison

| Feature          | NodeJS Package                | Python Package                          | PHP Package (Coming Soon) |
| ---------------- | ----------------------------- | --------------------------------------- | ------------------------- |
| **Package Name** | `nepali-date-library`         | `nepali-date-library`                   | `nepali-date-library`     |
| **Language**     | TypeScript / JavaScript       | Python 3.x                              | PHP 8.x                   |
| **Import**       | `import { NepaliDate } ...`   | `from nepali_date_library ...`          | `use NepaliDate\ ...`     |
| **Main Use**     | Web Apps, React, Vue, Backend | Data Processing, Scripts, Django, Flask | Laravel, Symfony, APIs    |

---

## Quick Start

::: code-group

```typescript [NodeJS]
// npm install nepali-date-library
import { NepaliDate } from "nepali-date-library";

const date = new NepaliDate();
console.log(date.format("YYYY-MM-DD")); // 2082-10-01
```

```python [Python]
# pip install nepali-date-library
from nepali_date_library import NepaliDate

date = NepaliDate()
print(date.format("YYYY-MM-DD")) # 2082-10-01
```

```php [PHP (Coming Soon)]
// composer require sandip-ghimire/nepali-date-library
// Stay tuned for the PHP version!
```

:::

## Detailed Documentation

<div class="language-switcher">
  <div class="lang-box">
    <h3>📦 NodeJS / TypeScript</h3>
    <p>Comprehensive guide for web and server-side JS/TS environments.</p>
    <a href="/docs/NodeJS/">View NodeJS Docs →</a>
  </div>
  <div class="lang-box">
    <h3>🐍 Python</h3>
    <p>Detailed documentation for Python library usage and integration.</p>
    <a href="/docs/Python/">View Python Docs →</a>
  </div>
  <div class="lang-box">
    <h3>🐘 PHP (Coming Soon)</h3>
    <p>Support for PHP projects and Laravel integration is on the way.</p>
  </div>
</div>

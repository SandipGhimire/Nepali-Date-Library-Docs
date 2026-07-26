import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Nepali Date Library",
  description:
    "A comprehensive Nepali (Bikram Sambat) date library for TypeScript and JavaScript",
  outDir: "./build",
  head: [
    [
      "meta",
      {
        name: "keywords",
        content:
          "nepali date, bikram sambat, BS date, AD to BS, BS to AD, nepali calendar, nepal, typescript, javascript",
      },
    ],
    ["meta", { name: "author", content: "Sandip Ghimire" }],
    [
      "link",
      { rel: "canonical", href: "https://nepalidate.sandip-ghimire.com.np/" },
    ],
    ["meta", { property: "og:title", content: "Nepali Date Library" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Comprehensive Nepali (Bikram Sambat) date library for JavaScript and Python",
      },
    ],
    ["meta", { property: "og:type", content: "website" }],
    [
      "meta",
      {
        property: "og:url",
        content: "https://nepalidate.sandip-ghimire.com.np/",
      },
    ],
    [
      "meta",
      {
        property: "og:image",
        content: "https://nepalidate.sandip-ghimire.com.np/logo.png",
      },
    ],
  ],
  themeConfig: {
    logo: "/logo.svg",
    nav: [
      { text: "Home", link: "/" },
      { text: "NodeJS", link: "/docs/NodeJS/" },
      { text: "Python", link: "/docs/Python/" },
      { text: "PHP", link: "/docs/PHP/" },
    ],
    sidebar: {
      "/docs/NodeJS/": [
        {
          text: "Introduction",
          items: [
            { text: "Overview", link: "/docs/NodeJS/" },
            {
              text: "Getting Started",
              link: "/docs/NodeJS/getting-started",
            },
          ],
        },
        {
          text: "API Reference",
          items: [
            { text: "Overview", link: "/docs/NodeJS/api/" },
            {
              text: "NepaliDate Class",
              link: "/docs/NodeJS/api/nepali-date-class",
            },
            {
              text: "Conversion Functions",
              link: "/docs/NodeJS/api/conversion-functions",
            },
            {
              text: "Static Methods",
              link: "/docs/NodeJS/api/static-methods",
            },
            { text: "Constants", link: "/docs/NodeJS/api/constants" },
          ],
        },
        {
          text: "Use Cases",
          items: [
            { text: "Overview", link: "/docs/NodeJS/use-cases/" },
            {
              text: "Date Conversion",
              link: "/docs/NodeJS/use-cases/date-conversion",
            },
            {
              text: "Calendar Generation",
              link: "/docs/NodeJS/use-cases/calendar-generation",
            },
            {
              text: "Fiscal Year Operations",
              link: "/docs/NodeJS/use-cases/fiscal-year",
            },
            {
              text: "Date Ranges",
              link: "/docs/NodeJS/use-cases/date-ranges",
            },
          ],
        },
        {
          text: "Examples",
          items: [
            { text: "Overview", link: "/docs/NodeJS/examples/" },
            {
              text: "Code Snippets",
              link: "/docs/NodeJS/examples/code-snippets",
            },
          ],
        },
        {
          text: "Changelogs",
          items: [{ text: "v1+", link: "/docs/NodeJS/Changelog/V1" }],
        },
      ],
      "/docs/Python/": [
        {
          text: "Introduction",
          items: [
            { text: "Overview", link: "/docs/Python/" },
            {
              text: "Getting Started",
              link: "/docs/Python/getting-started",
            },
          ],
        },
        {
          text: "API Reference",
          items: [
            { text: "Overview", link: "/docs/Python/api/" },
            {
              text: "NepaliDate Class",
              link: "/docs/Python/api/nepali-date-class",
            },
            {
              text: "Conversion Functions",
              link: "/docs/Python/api/conversion-functions",
            },
            {
              text: "Static Methods",
              link: "/docs/Python/api/static-methods",
            },
            {
              text: "Constants",
              link: "/docs/Python/api/constants",
            },
          ],
        },
        {
          text: "Use Cases",
          items: [
            { text: "Overview", link: "/docs/Python/use-cases/" },
            {
              text: "Date Conversion",
              link: "/docs/Python/use-cases/date-conversion",
            },
            {
              text: "Calendar Generation",
              link: "/docs/Python/use-cases/calendar-generation",
            },
            {
              text: "Fiscal Year Operations",
              link: "/docs/Python/use-cases/fiscal-year",
            },
            {
              text: "Date Ranges",
              link: "/docs/Python/use-cases/date-ranges",
            },
          ],
        },
        {
          text: "Examples",
          items: [
            { text: "Overview", link: "/docs/Python/examples/" },
            {
              text: "Code Snippets",
              link: "/docs/Python/examples/code-snippets",
            },
          ],
        },
        {
          text: "Changelogs",
          items: [{ text: "v1+", link: "/docs/Python/Changelog/V1" }],
        },
      ],
      "/docs/PHP/": [
        {
          text: "Introduction",
          items: [
            { text: "Overview", link: "/docs/PHP/" },
            {
              text: "Getting Started",
              link: "/docs/PHP/getting-started",
            },
          ],
        },
        {
          text: "API Reference",
          items: [
            { text: "Overview", link: "/docs/PHP/api/" },
            {
              text: "NepaliDate Class",
              link: "/docs/PHP/api/nepali-date-class",
            },
            {
              text: "Conversion Functions",
              link: "/docs/PHP/api/conversion-functions",
            },
            {
              text: "Static Methods",
              link: "/docs/PHP/api/static-methods",
            },
            { text: "Constants", link: "/docs/PHP/api/constants" },
          ],
        },
        {
          text: "Use Cases",
          items: [
            { text: "Overview", link: "/docs/PHP/use-cases/" },
            {
              text: "Date Conversion",
              link: "/docs/PHP/use-cases/date-conversion",
            },
            {
              text: "Calendar Generation",
              link: "/docs/PHP/use-cases/calendar-generation",
            },
            {
              text: "Fiscal Year Operations",
              link: "/docs/PHP/use-cases/fiscal-year",
            },
            {
              text: "Date Ranges",
              link: "/docs/PHP/use-cases/date-ranges",
            },
          ],
        },
        {
          text: "Examples",
          items: [
            { text: "Overview", link: "/docs/PHP/examples/" },
            {
              text: "Code Snippets",
              link: "/docs/PHP/examples/code-snippets",
            },
          ],
        },
        {
          text: "Changelogs",
          items: [{ text: "v1+", link: "/docs/PHP/Changelog/V1" }],
        },
      ],
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/SandipGhimire/",
      },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026-present Sandip Ghimire",
    },
    search: {
      provider: "local",
    },
  },
});

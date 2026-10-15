# Contributing to Nepali Date Library Documentation

The official Nepali Date Library documentation is built with [Next.js](https://nextjs.org) and [Fumadocs](https://fumadocs.dev), with content authored in MDX.

## Content organization

Documentation content lives in the `content/` directory:

- `content/docs/`: Core documentation, API reference, and guides for NodeJS, Python, and PHP implementations.

Each folder contains a `meta.json` file that defines page titles and navigation ordering in the sidebar.

## Local development

Prerequisites: Node.js 18 or later and pnpm 9.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` in your browser to inspect documentation changes in real time.

## Writing guidelines

- Use clear, direct, and factual technical explanations.
- Keep code examples complete and verified against actual package APIs.
- Update `meta.json` when adding or moving pages to maintain correct sidebar ordering.

## Pull requests

1. Fork the repository and create a branch.
2. Ensure the project builds without errors (`pnpm build`).
3. Submit a pull request with a clear description of changes.

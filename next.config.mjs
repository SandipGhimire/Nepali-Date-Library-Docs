import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["nepali-date-library"],
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/origination",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value:
              '</llms.txt>; rel="help", </llms-full.txt>; rel="alternate"; type="text/plain", </.well-known/api-catalog>; rel="service-desc"',
          },
          {
            key: "Content-Signal",
            value: "search=yes, ai-train=yes, ai-input=yes",
          },
          {
            key: "X-Robots-Tag",
            value:
              "all, index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
        ],
      },
      {
        source: "/.well-known/api-catalog",
        headers: [
          {
            key: "Content-Type",
            value:
              'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
      {
        source: "/.well-known/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, OPTIONS",
          },
        ],
      },
    ];
  },
};

export default withMDX(config);

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
};

export default withMDX(config);

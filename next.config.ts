import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    }
};

module.exports = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      }
    }
  },
  nextConfig
}

export default nextConfig;

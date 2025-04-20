import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
};

module.exports = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      }
    }
  }
}

export default nextConfig;

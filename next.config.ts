import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        }
      } 
    }
};

export default nextConfig;

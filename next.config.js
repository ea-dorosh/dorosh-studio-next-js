/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {REACT_APP_API_URL: process.env.REACT_APP_API_URL},
  reactStrictMode: false,
  images: {
    domains: [`localhost`, `192.168.93.195`],
    // domains: [`localhost`, `192.168.178.27`],
    formats: [`image/avif`, `image/webp`],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [`@mui/material`, `@mui/icons-material`],
  },
  compiler: {removeConsole: process.env.NODE_ENV === `production`},
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig;

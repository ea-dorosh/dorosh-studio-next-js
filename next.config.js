/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  },
  reactStrictMode: false,
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;

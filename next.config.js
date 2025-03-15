/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  },
  reactStrictMode: false,
  images: {
    domains: [`localhost`, `192.168.93.195`],
    // domains: [`localhost`, `192.168.178.27`],
  },
};

module.exports = nextConfig;

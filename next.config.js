/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  } // <-- DEKHIYE, YAHAN COMMA NAHI HAI
};

module.exports = nextConfig;

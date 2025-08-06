/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export' wali line yahan se HATA DI GAYI HAI.
  // Humne purani zaroori settings ko waise hi rakha hai.
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

// Naya, modern "export" format
export default nextConfig;

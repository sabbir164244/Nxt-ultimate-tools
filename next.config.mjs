/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aapki purani settings yahan hain
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

// Naya, modern "export" format
export default nextConfig;

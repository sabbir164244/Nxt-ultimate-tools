/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // --- YEH HAI AAKHRI RAKSHAS KO HARANE KA JAADU ---
  webpack: (config, { isServer }) => {
    // Rule for 'import.meta'
    config.module.rules.push({
      test: /\.m?js$/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false,
      },
    });

    // Rule to IGNORE the problematic server-side package
    config.externals = [...config.externals, 'onnxruntime-node'];
    
    return config;
  },
  // --- JAADU KHATAM ---
};

module.exports = nextConfig;

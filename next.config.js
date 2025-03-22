/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  // Disable PWA features
  experimental: {
    appDir: false
  }
};

module.exports = nextConfig; 
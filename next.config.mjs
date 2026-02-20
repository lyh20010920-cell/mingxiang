/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel 部署支持 API Routes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;

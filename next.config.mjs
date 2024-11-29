/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'm.media-amazon.com',
            port: '',
            pathname: '/images/**',
          },
        ],
      },
      eslint: { ignoreDuringBuilds: true, }, 
};

export default nextConfig;

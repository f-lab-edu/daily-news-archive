/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.com',
        port: '',
      },
      {
        protocol: 'http',
        hostname: '*.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '*.kr',
        port: '',
      },
      {
        protocol: 'http',
        hostname: '*.kr',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '*.net',
        port: '',
      },
      {
        protocol: 'http',
        hostname: '*.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '*.be',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '*.de',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '*.uk',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '*.io',
        port: '',
      },
      {
        protocol: 'http',
        hostname: '*.io',
        port: '',
      },
    ],
  },
};

export default nextConfig;

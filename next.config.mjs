import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const baseConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
};

const nextConfig = isDev
  ? baseConfig
  : withPWA({ ...baseConfig, pwa: pwaConfig });

export default nextConfig;

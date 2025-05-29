/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const baseConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
};

export default withPWA({
  dest: 'public',
  disable: isDev,
  register: true,
  skipWaiting: true,
})(baseConfig);

/** @type {import('next').NextConfig} */

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
    mode: 'production',
  },
});

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [process.env.ALLOWED_ORIGIN, 'localhost:3000'],
      allowedForwardedHosts: [process.env.ALLOWED_ORIGIN, '127.0.0.1:3000'],
    },
  },
};
module.exports = withPWA(nextConfig);

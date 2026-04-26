/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  // Ensure environment variables are available
  env: {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    ADMIN_SETUP_KEY: process.env.ADMIN_SETUP_KEY,
  },
};

module.exports = nextConfig;

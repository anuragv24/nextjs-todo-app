/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  }
};

export default nextConfig;

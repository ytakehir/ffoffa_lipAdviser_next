/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa'

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

const nextConfig = withPWA({
  basePath: process.env.NEXT_PUBLIC_BASE_PATH, // basePath を `/` に設定します
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
  },
})

export default nextConfig

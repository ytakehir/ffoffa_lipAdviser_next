/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH, // basePath を `/` に設定します
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
  },
}

export default nextConfig

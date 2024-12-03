/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist', // ビルドの出力ディレクトリを `./dist/` に変更します
  basePath: process.env.NEXT_PUBLIC_BASE_PATH, // basePath を `/` に設定します
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
  },
}

export default nextConfig

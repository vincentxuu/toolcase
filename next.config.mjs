import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

// 初始化 OpenNext Cloudflare 開發環境
initOpenNextCloudflareForDev()

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  // 圖片優化配置 (Cloudflare 環境)
  images: {
    unoptimized: true, // 禁用 Next.js 內建圖片優化 (Cloudflare Workers 不支持)
  },
}

export default nextConfig

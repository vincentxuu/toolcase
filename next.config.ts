import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import type { NextConfig } from 'next'

// 初始化 OpenNext Cloudflare 開發環境
initOpenNextCloudflareForDev()

const nextConfig: NextConfig = {
  output: 'standalone',

  // 圖片優化配置 (Cloudflare 環境)
  images: {
    unoptimized: false, // 啟用圖片優化
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 86400,
  },
}

export default nextConfig

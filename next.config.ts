import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',

  // 圖片優化配置 (Cloudflare 環境)
  images: {
    unoptimized: true,
  },
}

export default nextConfig

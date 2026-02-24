/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 排除大型客戶端專用依賴,減少 server bundle 大小
  // 這些庫只在客戶端使用,server 不需要打包
  serverComponentsExternalPackages: [
    'recharts',       // 8 MB - 圖表庫
    'katex',          // 4.3 MB - LaTeX 數學公式
    '@ffmpeg/ffmpeg', // 視頻處理
    '@ffmpeg/util',
    'papaparse',      // CSV 解析
    'qrcode',         // QR code 生成
    'pinyin-pro',     // 拼音轉換
    'diff',           // 文字比較
  ],

  // 從 output file tracing 中排除開發依賴和未使用的套件
  outputFileTracingExcludes: {
    '*': [
      'node_modules/typescript/**',
      'node_modules/sass/**',
      'node_modules/@babel/**',
      'node_modules/eslint/**',
      'node_modules/prettier/**',
      'node_modules/@types/**',
      // 未使用的 @vercel/og (動態 OG 圖片生成) - 省約 2.2MB
      'node_modules/next/dist/compiled/@vercel/og/**',
      'node_modules/**/@vercel/og/**',
      // toolcase 用不到的套件
      'node_modules/webpack/**',
      'node_modules/terser/**',
    ],
  },

  // 實驗性功能:優化打包大小
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // 圖片優化配置 (Cloudflare 環境)
  images: {
    unoptimized: true, // Cloudflare Pages 需要 unoptimized
  },
}

export default nextConfig

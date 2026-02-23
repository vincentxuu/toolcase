/**
 * Featured, Popular, and New Tools Configuration
 *
 * 這些列表定義了首頁上要展示的精選工具
 */

// 精選工具：首頁 Featured Tools 區塊展示的工具
export const FEATURED_TOOLS = [
  'json-formatter',
  'qr-code-generator',
  'password-generator',
  'jwt-decoder',
  'timestamp-converter',
  'color-converter',
  'bmi-calculator',
  'percentage-calculator',
  'image-compressor',
  'uuid-generator',
  'base64-encoder-decoder',
  'hash-generator',
  'mortgage-calculator',
  'cron-expression-generator',
  'chinese-converter',
  'url-encoder-decoder',
] as const

// 熱門工具：根據使用率和實用性選擇
export const POPULAR_TOOLS = [
  'qr-code-generator',
  'password-generator',
  'json-formatter',
  'timestamp-converter',
  'bmi-calculator',
  'percentage-calculator',
  'age-calculator',
  'discount-calculator',
] as const

// 新增工具：最近添加的工具
export const NEW_TOOLS = [
  'timezone-converter',
  'days-counter',
  'world-clock',
  'credit-card-validator',
  'password-strength-checker',
  'test-card-generator',
  'country-code-lookup',
  'punycode-converter',
] as const

// 輔助類型
export type FeaturedToolSlug = typeof FEATURED_TOOLS[number]
export type PopularToolSlug = typeof POPULAR_TOOLS[number]
export type NewToolSlug = typeof NEW_TOOLS[number]

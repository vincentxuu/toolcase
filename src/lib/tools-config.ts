export interface ToolConfig {
  slug: string
  category: string
  nameKey: string
  descKey: string
  icon: string
}

export const tools: ToolConfig[] = [
  {
    slug: 'json-formatter',
    category: 'dev',
    nameKey: 'tool_json',
    descKey: 'tool_json_desc',
    icon: '{ }',
  },
  {
    slug: 'qr-code-generator',
    category: 'dev',
    nameKey: 'tool_qr',
    descKey: 'tool_qr_desc',
    icon: '◱',
  },
  {
    slug: 'jwt-decoder',
    category: 'dev',
    nameKey: 'tool_jwt',
    descKey: 'tool_jwt_desc',
    icon: '🔑',
  },
  {
    slug: 'cron-expression-generator',
    category: 'dev',
    nameKey: 'tool_cron',
    descKey: 'tool_cron_desc',
    icon: '⏰',
  },
  {
    slug: 'timestamp-converter',
    category: 'dev',
    nameKey: 'tool_timestamp',
    descKey: 'tool_timestamp_desc',
    icon: '🕐',
  },
  {
    slug: 'chinese-converter',
    category: 'text',
    nameKey: 'tool_chinese',
    descKey: 'tool_chinese_desc',
    icon: '繁',
  },
  {
    slug: 'unicode-converter',
    category: 'dev',
    nameKey: 'tool_unicode',
    descKey: 'tool_unicode_desc',
    icon: 'U+',
  },
]

export const categories = [
  { key: 'dev', labelKey: 'cat_dev' },
  { key: 'finance', labelKey: 'cat_finance' },
  { key: 'health', labelKey: 'cat_health' },
  { key: 'image', labelKey: 'cat_image' },
  { key: 'text', labelKey: 'cat_text' },
  { key: 'units', labelKey: 'cat_units' },
  { key: 'everyday', labelKey: 'cat_everyday' },
] as const

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
    icon: 'braces',
  },
  {
    slug: 'qr-code-generator',
    category: 'dev',
    nameKey: 'tool_qr',
    descKey: 'tool_qr_desc',
    icon: 'qr-code',
  },
  {
    slug: 'jwt-decoder',
    category: 'dev',
    nameKey: 'tool_jwt',
    descKey: 'tool_jwt_desc',
    icon: 'key-round',
  },
  {
    slug: 'cron-expression-generator',
    category: 'dev',
    nameKey: 'tool_cron',
    descKey: 'tool_cron_desc',
    icon: 'clock',
  },
  {
    slug: 'timestamp-converter',
    category: 'dev',
    nameKey: 'tool_timestamp',
    descKey: 'tool_timestamp_desc',
    icon: 'calendar-clock',
  },
  {
    slug: 'chinese-converter',
    category: 'text',
    nameKey: 'tool_chinese',
    descKey: 'tool_chinese_desc',
    icon: 'languages',
  },
  {
    slug: 'unicode-converter',
    category: 'dev',
    nameKey: 'tool_unicode',
    descKey: 'tool_unicode_desc',
    icon: 'binary',
  },
  {
    slug: 'mortgage-calculator',
    category: 'finance',
    nameKey: 'tool_mortgage',
    descKey: 'tool_mortgage_desc',
    icon: 'house',
  },
  {
    slug: 'compound-interest-calculator',
    category: 'finance',
    nameKey: 'tool_compound',
    descKey: 'tool_compound_desc',
    icon: 'trending-up',
  },
  {
    slug: 'loan-calculator',
    category: 'finance',
    nameKey: 'tool_loan',
    descKey: 'tool_loan_desc',
    icon: 'banknote',
  },
  {
    slug: 'credit-card-calculator',
    category: 'finance',
    nameKey: 'tool_creditcard',
    descKey: 'tool_creditcard_desc',
    icon: 'credit-card',
  },
  {
    slug: 'savings-calculator',
    category: 'finance',
    nameKey: 'tool_savings',
    descKey: 'tool_savings_desc',
    icon: 'piggy-bank',
  },
  {
    slug: 'roi-calculator',
    category: 'finance',
    nameKey: 'tool_roi',
    descKey: 'tool_roi_desc',
    icon: 'percent',
  },
  {
    slug: 'retirement-calculator',
    category: 'finance',
    nameKey: 'tool_retirement',
    descKey: 'tool_retirement_desc',
    icon: 'umbrella',
  },
  {
    slug: 'bmi-calculator',
    category: 'health',
    nameKey: 'tool_bmi',
    descKey: 'tool_bmi_desc',
    icon: 'heart-pulse',
  },
  {
    slug: 'tdee-calculator',
    category: 'health',
    nameKey: 'tool_tdee',
    descKey: 'tool_tdee_desc',
    icon: 'flame',
  },
  {
    slug: 'due-date-calculator',
    category: 'health',
    nameKey: 'tool_duedate',
    descKey: 'tool_duedate_desc',
    icon: 'baby',
  },
  {
    slug: 'percentage-calculator',
    category: 'everyday',
    nameKey: 'tool_percentage',
    descKey: 'tool_percentage_desc',
    icon: 'calculator',
  },
  {
    slug: 'age-calculator',
    category: 'everyday',
    nameKey: 'tool_age',
    descKey: 'tool_age_desc',
    icon: 'cake',
  },
  {
    slug: 'password-generator',
    category: 'dev',
    nameKey: 'tool_password',
    descKey: 'tool_password_desc',
    icon: 'shield',
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

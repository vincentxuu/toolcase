export interface ToolConfig {
  slug: string
  category: string
  nameKey: string
  descKey: string
  icon: string
  // 新增欄位（可選）
  isFeatured?: boolean    // 精選工具標記
  isPopular?: boolean     // 熱門工具標記
  isNew?: boolean         // 新增工具標記
  tags?: string[]         // 標籤陣列
  priority?: number       // 排序優先級
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
    category: 'everyday',
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
    slug: 'tax-calculator',
    category: 'finance',
    nameKey: 'tool_tax',
    descKey: 'tool_tax_desc',
    icon: 'receipt',
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
    category: 'everyday',
    nameKey: 'tool_password',
    descKey: 'tool_password_desc',
    icon: 'shield',
  },
  {
    slug: 'length-converter',
    category: 'units',
    nameKey: 'tool_length',
    descKey: 'tool_length_desc',
    icon: 'ruler',
  },
  {
    slug: 'weight-converter',
    category: 'units',
    nameKey: 'tool_weight',
    descKey: 'tool_weight_desc',
    icon: 'weight',
  },
  {
    slug: 'temperature-converter',
    category: 'units',
    nameKey: 'tool_temperature',
    descKey: 'tool_temperature_desc',
    icon: 'thermometer',
  },
  {
    slug: 'area-converter',
    category: 'units',
    nameKey: 'tool_area',
    descKey: 'tool_area_desc',
    icon: 'square',
  },
  {
    slug: 'volume-converter',
    category: 'units',
    nameKey: 'tool_volume',
    descKey: 'tool_volume_desc',
    icon: 'beaker',
  },
  {
    slug: 'speed-converter',
    category: 'units',
    nameKey: 'tool_speed',
    descKey: 'tool_speed_desc',
    icon: 'gauge',
  },
  {
    slug: 'data-size-converter',
    category: 'units',
    nameKey: 'tool_datasize',
    descKey: 'tool_datasize_desc',
    icon: 'hard-drive',
  },
  {
    slug: 'time-converter',
    category: 'units',
    nameKey: 'tool_timeunit',
    descKey: 'tool_timeunit_desc',
    icon: 'timer',
  },
  { slug: 'discount-calculator', category: 'everyday', nameKey: 'tool_discount', descKey: 'tool_discount_desc', icon: 'tag' },
  { slug: 'tip-calculator', category: 'everyday', nameKey: 'tool_tip', descKey: 'tool_tip_desc', icon: 'receipt' },
  { slug: 'body-fat-calculator', category: 'health', nameKey: 'tool_bodyfat', descKey: 'tool_bodyfat_desc', icon: 'activity' },
  { slug: 'calorie-calculator', category: 'health', nameKey: 'tool_calorie', descKey: 'tool_calorie_desc', icon: 'apple' },
  { slug: 'heart-rate-calculator', category: 'health', nameKey: 'tool_heartrate', descKey: 'tool_heartrate_desc', icon: 'heart' },
  { slug: 'word-counter', category: 'text', nameKey: 'tool_wordcount', descKey: 'tool_wordcount_desc', icon: 'file-text' },
  { slug: 'case-converter', category: 'text', nameKey: 'tool_caseconvert', descKey: 'tool_caseconvert_desc', icon: 'type' },
  { slug: 'remove-duplicates', category: 'text', nameKey: 'tool_removedupes', descKey: 'tool_removedupes_desc', icon: 'filter' },
  { slug: 'lorem-ipsum-generator', category: 'text', nameKey: 'tool_loremipsum', descKey: 'tool_loremipsum_desc', icon: 'align-left' },
  { slug: 'diff-checker', category: 'text', nameKey: 'tool_diff', descKey: 'tool_diff_desc', icon: 'columns' },
  { slug: 'text-to-speech', category: 'text', nameKey: 'tool_tts', descKey: 'tool_tts_desc', icon: 'volume-2' },
  { slug: 'countdown-timer', category: 'everyday', nameKey: 'tool_countdown', descKey: 'tool_countdown_desc', icon: 'hourglass' },
  { slug: 'stopwatch', category: 'everyday', nameKey: 'tool_stopwatch', descKey: 'tool_stopwatch_desc', icon: 'timer' },
  { slug: 'random-number-generator', category: 'everyday', nameKey: 'tool_randomnum', descKey: 'tool_randomnum_desc', icon: 'dice-5' },
  { slug: 'random-picker', category: 'everyday', nameKey: 'tool_randompick', descKey: 'tool_randompick_desc', icon: 'shuffle' },
  { slug: 'date-calculator', category: 'everyday', nameKey: 'tool_datecalc', descKey: 'tool_datecalc_desc', icon: 'calendar' },
  { slug: 'color-converter', category: 'css', nameKey: 'tool_color', descKey: 'tool_color_desc', icon: 'palette' },
  { slug: 'base64-encoder-decoder', category: 'dev', nameKey: 'tool_base64', descKey: 'tool_base64_desc', icon: 'file-code' },
  { slug: 'url-encoder-decoder', category: 'dev', nameKey: 'tool_urlencode', descKey: 'tool_urlencode_desc', icon: 'link' },
  { slug: 'hash-generator', category: 'dev', nameKey: 'tool_hash', descKey: 'tool_hash_desc', icon: 'fingerprint' },
  { slug: 'markdown-preview', category: 'dev', nameKey: 'tool_markdown', descKey: 'tool_markdown_desc', icon: 'file-text' },
  { slug: 'regex-tester', category: 'dev', nameKey: 'tool_regex', descKey: 'tool_regex_desc', icon: 'search' },
  { slug: 'yaml-json-converter', category: 'dev', nameKey: 'tool_yamljson', descKey: 'tool_yamljson_desc', icon: 'file-json' },
  { slug: 'csv-json-converter', category: 'dev', nameKey: 'tool_csvjson', descKey: 'tool_csvjson_desc', icon: 'table' },
  { slug: 'image-compressor', category: 'image', nameKey: 'tool_imagecompress', descKey: 'tool_imagecompress_desc', icon: 'image-down' },
  { slug: 'image-converter', category: 'image', nameKey: 'tool_imageconvert', descKey: 'tool_imageconvert_desc', icon: 'image' },
  { slug: 'image-cropper', category: 'image', nameKey: 'tool_imagecrop', descKey: 'tool_imagecrop_desc', icon: 'crop' },
  { slug: 'pdf-tools', category: 'image', nameKey: 'tool_pdftools', descKey: 'tool_pdftools_desc', icon: 'file' },
  { slug: 'image-to-pdf', category: 'image', nameKey: 'tool_image2pdf', descKey: 'tool_image2pdf_desc', icon: 'file-image' },
  { slug: 'utm-builder', category: 'dev', nameKey: 'tool_utm', descKey: 'tool_utm_desc', icon: 'link-2' },
  { slug: 'open-graph-preview', category: 'dev', nameKey: 'tool_ogpreview', descKey: 'tool_ogpreview_desc', icon: 'eye' },
  { slug: 'social-media-counter', category: 'text', nameKey: 'tool_socialcount', descKey: 'tool_socialcount_desc', icon: 'message-square' },
  { slug: 'emoji-search', category: 'text', nameKey: 'tool_emoji', descKey: 'tool_emoji_desc', icon: 'smile' },
  { slug: 'meta-tag-generator', category: 'dev', nameKey: 'tool_metatag', descKey: 'tool_metatag_desc', icon: 'code' },

  // --- New tools ---
  // Tier S: High traffic + pure frontend
  { slug: 'uuid-generator', category: 'dev', nameKey: 'tool_uuid', descKey: 'tool_uuid_desc', icon: 'scan' },
  { slug: 'color-palette-generator', category: 'css', nameKey: 'tool_colorpalette', descKey: 'tool_colorpalette_desc', icon: 'paintbrush' },
  { slug: 'image-resizer', category: 'image', nameKey: 'tool_imageresize', descKey: 'tool_imageresize_desc', icon: 'scaling' },
  { slug: 'favicon-generator', category: 'dev', nameKey: 'tool_favicon', descKey: 'tool_favicon_desc', icon: 'app-window' },
  { slug: 'json-to-typescript', category: 'dev', nameKey: 'tool_jsontots', descKey: 'tool_jsontots_desc', icon: 'file-type' },
  { slug: 'html-entity-encoder', category: 'dev', nameKey: 'tool_htmlentity', descKey: 'tool_htmlentity_desc', icon: 'code-xml' },
  { slug: 'gradient-generator', category: 'css', nameKey: 'tool_gradient', descKey: 'tool_gradient_desc', icon: 'blend' },
  { slug: 'ip-address-lookup', category: 'dev', nameKey: 'tool_iplookup', descKey: 'tool_iplookup_desc', icon: 'globe' },

  // Tier A: Developer tools
  { slug: 'code-minifier', category: 'dev', nameKey: 'tool_minifier', descKey: 'tool_minifier_desc', icon: 'minimize-2' },
  { slug: 'code-beautifier', category: 'dev', nameKey: 'tool_beautifier', descKey: 'tool_beautifier_desc', icon: 'maximize-2' },
  { slug: 'sql-formatter', category: 'dev', nameKey: 'tool_sql', descKey: 'tool_sql_desc', icon: 'database' },
  { slug: 'slug-generator', category: 'dev', nameKey: 'tool_slug', descKey: 'tool_slug_desc', icon: 'text-cursor-input' },
  { slug: 'http-status-codes', category: 'dev', nameKey: 'tool_httpstatus', descKey: 'tool_httpstatus_desc', icon: 'info' },
  { slug: 'bcrypt-generator', category: 'dev', nameKey: 'tool_bcrypt', descKey: 'tool_bcrypt_desc', icon: 'lock' },
  { slug: 'user-agent-parser', category: 'dev', nameKey: 'tool_useragent', descKey: 'tool_useragent_desc', icon: 'monitor-smartphone' },
  { slug: 'markdown-to-html', category: 'dev', nameKey: 'tool_md2html', descKey: 'tool_md2html_desc', icon: 'file-code-2' },

  // Tier B: CSS visual tools
  { slug: 'box-shadow-generator', category: 'css', nameKey: 'tool_boxshadow', descKey: 'tool_boxshadow_desc', icon: 'layers' },
  { slug: 'border-radius-generator', category: 'css', nameKey: 'tool_borderradius', descKey: 'tool_borderradius_desc', icon: 'circle' },
  { slug: 'glassmorphism-generator', category: 'css', nameKey: 'tool_glassmorphism', descKey: 'tool_glassmorphism_desc', icon: 'sparkles' },
  { slug: 'css-clip-path-generator', category: 'css', nameKey: 'tool_clippath', descKey: 'tool_clippath_desc', icon: 'scissors' },
  { slug: 'css-flexbox-playground', category: 'css', nameKey: 'tool_flexbox', descKey: 'tool_flexbox_desc', icon: 'layout' },
  { slug: 'css-grid-generator', category: 'css', nameKey: 'tool_cssgrid', descKey: 'tool_cssgrid_desc', icon: 'grid-3x3' },

  // Tier C: Other tools
  { slug: 'barcode-generator', category: 'everyday', nameKey: 'tool_barcode', descKey: 'tool_barcode_desc', icon: 'scan-barcode' },
  { slug: 'text-to-handwriting', category: 'text', nameKey: 'tool_handwriting', descKey: 'tool_handwriting_desc', icon: 'pen-tool' },
  { slug: 'image-watermark', category: 'image', nameKey: 'tool_watermark', descKey: 'tool_watermark_desc', icon: 'stamp' },
  { slug: 'pomodoro-timer', category: 'everyday', nameKey: 'tool_pomodoro', descKey: 'tool_pomodoro_desc', icon: 'alarm-clock' },
  { slug: 'invoice-generator', category: 'finance', nameKey: 'tool_invoice', descKey: 'tool_invoice_desc', icon: 'receipt-text' },

  // Tier D: Crypto / Encoding tools
  { slug: 'text-encrypt-decrypt', category: 'dev', nameKey: 'tool_encrypt', descKey: 'tool_encrypt_desc', icon: 'shield-check' },
  { slug: 'rsa-key-generator', category: 'dev', nameKey: 'tool_rsa', descKey: 'tool_rsa_desc', icon: 'key' },
  { slug: 'integer-base-converter', category: 'dev', nameKey: 'tool_intbase', descKey: 'tool_intbase_desc', icon: 'hash' },
  { slug: 'jwt-encoder', category: 'dev', nameKey: 'tool_jwtenc', descKey: 'tool_jwtenc_desc', icon: 'ticket' },
  { slug: 'toml-converter', category: 'dev', nameKey: 'tool_toml', descKey: 'tool_toml_desc', icon: 'braces' },

  // --- Wave 3: General-user high-traffic tools ---
  // Everyday
  { slug: 'online-notepad', category: 'everyday', nameKey: 'tool_notepad', descKey: 'tool_notepad_desc', icon: 'notebook' },
  { slug: 'typing-speed-test', category: 'everyday', nameKey: 'tool_typing', descKey: 'tool_typing_desc', icon: 'keyboard' },
  { slug: 'wifi-qr-generator', category: 'everyday', nameKey: 'tool_wifiqr', descKey: 'tool_wifiqr_desc', icon: 'wifi' },
  { slug: 'roman-numeral-converter', category: 'everyday', nameKey: 'tool_roman', descKey: 'tool_roman_desc', icon: 'list-ordered' },
  { slug: 'gpa-calculator', category: 'everyday', nameKey: 'tool_gpa', descKey: 'tool_gpa_desc', icon: 'graduation-cap' },
  { slug: 'electricity-calculator', category: 'everyday', nameKey: 'tool_electricity', descKey: 'tool_electricity_desc', icon: 'zap' },
  { slug: 'fuel-cost-calculator', category: 'everyday', nameKey: 'tool_fuelcost', descKey: 'tool_fuelcost_desc', icon: 'fuel' },
  { slug: 'unit-price-calculator', category: 'everyday', nameKey: 'tool_unitprice', descKey: 'tool_unitprice_desc', icon: 'bar-chart-3' },
  { slug: 'timezone-converter', category: 'everyday', nameKey: 'tool_timezone', descKey: 'tool_timezone_desc', icon: 'globe' },
  { slug: 'digital-signature-pad', category: 'everyday', nameKey: 'tool_signature', descKey: 'tool_signature_desc', icon: 'pen-line' },
  { slug: 'screen-recorder', category: 'everyday', nameKey: 'tool_screenrecord', descKey: 'tool_screenrecord_desc', icon: 'video' },
  { slug: 'scientific-calculator', category: 'everyday', nameKey: 'tool_scicalc', descKey: 'tool_scicalc_desc', icon: 'calculator' },

  // Text
  { slug: 'fancy-text-generator', category: 'text', nameKey: 'tool_fancytext', descKey: 'tool_fancytext_desc', icon: 'wand-2' },
  { slug: 'text-repeater', category: 'text', nameKey: 'tool_textrepeat', descKey: 'tool_textrepeat_desc', icon: 'repeat' },
  { slug: 'morse-code-translator', category: 'text', nameKey: 'tool_morse', descKey: 'tool_morse_desc', icon: 'radio' },
  { slug: 'number-to-words', category: 'text', nameKey: 'tool_num2words', descKey: 'tool_num2words_desc', icon: 'book-open' },

  // Dev
  { slug: 'binary-text-converter', category: 'dev', nameKey: 'tool_binarytext', descKey: 'tool_binarytext_desc', icon: 'binary' },
  { slug: 'chmod-calculator', category: 'dev', nameKey: 'tool_chmod', descKey: 'tool_chmod_desc', icon: 'terminal' },
  { slug: 'ip-subnet-calculator', category: 'dev', nameKey: 'tool_ipsubnet', descKey: 'tool_ipsubnet_desc', icon: 'network' },
  { slug: 'json-path-finder', category: 'dev', nameKey: 'tool_jsonpath', descKey: 'tool_jsonpath_desc', icon: 'folder-search' },

  // CSS & Design
  { slug: 'color-blindness-simulator', category: 'css', nameKey: 'tool_colorblind', descKey: 'tool_colorblind_desc', icon: 'eye-off' },
  { slug: 'css-text-shadow-generator', category: 'css', nameKey: 'tool_textshadow', descKey: 'tool_textshadow_desc', icon: 'heading' },

  // Image
  { slug: 'aspect-ratio-calculator', category: 'image', nameKey: 'tool_aspectratio', descKey: 'tool_aspectratio_desc', icon: 'frame' },
  { slug: 'svg-to-png-converter', category: 'image', nameKey: 'tool_svg2png', descKey: 'tool_svg2png_desc', icon: 'file-output' },
  { slug: 'webp-converter', category: 'image', nameKey: 'tool_webp', descKey: 'tool_webp_desc', icon: 'image-plus' },

  // Units
  { slug: 'shoe-size-converter', category: 'units', nameKey: 'tool_shoesize', descKey: 'tool_shoesize_desc', icon: 'footprints' },
  { slug: 'energy-converter', category: 'units', nameKey: 'tool_energy', descKey: 'tool_energy_desc', icon: 'battery-charging' },
  { slug: 'pressure-converter', category: 'units', nameKey: 'tool_pressure', descKey: 'tool_pressure_desc', icon: 'arrow-down-up' },

  // Video / Social Media
  { slug: 'social-video-speed', category: 'image', nameKey: 'tool_videospeed', descKey: 'tool_videospeed_desc', icon: 'fast-forward' },

  // --- Wave 4: New tools ---
  { slug: 'currency-converter', category: 'finance', nameKey: 'tool_currency', descKey: 'tool_currency_desc', icon: 'dollar-sign' },
  { slug: 'ai-token-counter', category: 'dev', nameKey: 'tool_aitoken', descKey: 'tool_aitoken_desc', icon: 'bot' },
  { slug: 'taiwan-id-validator', category: 'everyday', nameKey: 'tool_taiwanid', descKey: 'tool_taiwanid_desc', icon: 'id-card' },
  { slug: 'lunar-calendar-converter', category: 'everyday', nameKey: 'tool_lunar', descKey: 'tool_lunar_desc', icon: 'moon' },

  // --- Taiwan Tax & Insurance Reference Tables ---
  { slug: 'tw-income-tax-brackets', category: 'finance', nameKey: 'tool_tw_income_tax', descKey: 'tool_tw_income_tax_desc', icon: 'table' },
  { slug: 'tw-salary-withholding-tax', category: 'finance', nameKey: 'tool_tw_withholding', descKey: 'tool_tw_withholding_desc', icon: 'file-spreadsheet' },
  { slug: 'tw-estate-tax', category: 'finance', nameKey: 'tool_tw_estate_tax', descKey: 'tool_tw_estate_tax_desc', icon: 'landmark' },
  { slug: 'tw-gift-tax', category: 'finance', nameKey: 'tool_tw_gift_tax', descKey: 'tool_tw_gift_tax_desc', icon: 'gift' },
  { slug: 'tw-house-tax', category: 'finance', nameKey: 'tool_tw_house_tax', descKey: 'tool_tw_house_tax_desc', icon: 'house' },
  { slug: 'tw-land-value-tax', category: 'finance', nameKey: 'tool_tw_land_tax', descKey: 'tool_tw_land_tax_desc', icon: 'map-pin' },
  { slug: 'tw-securities-tax', category: 'finance', nameKey: 'tool_tw_securities_tax', descKey: 'tool_tw_securities_tax_desc', icon: 'bar-chart-2' },
  { slug: 'tw-vehicle-license-tax', category: 'finance', nameKey: 'tool_tw_vehicle_tax', descKey: 'tool_tw_vehicle_tax_desc', icon: 'car' },
  { slug: 'tw-fuel-tax', category: 'finance', nameKey: 'tool_tw_fuel_tax', descKey: 'tool_tw_fuel_tax_desc', icon: 'fuel' },
  { slug: 'tw-nhi-premium', category: 'finance', nameKey: 'tool_tw_nhi', descKey: 'tool_tw_nhi_desc', icon: 'heart-pulse' },
  { slug: 'tw-labor-insurance', category: 'finance', nameKey: 'tool_tw_labor_ins', descKey: 'tool_tw_labor_ins_desc', icon: 'hard-hat' },
  { slug: 'tw-labor-pension', category: 'finance', nameKey: 'tool_tw_labor_pension', descKey: 'tool_tw_labor_pension_desc', icon: 'piggy-bank' },
  { slug: 'tw-national-pension', category: 'finance', nameKey: 'tool_tw_national_pension', descKey: 'tool_tw_national_pension_desc', icon: 'users' },
  { slug: 'tw-occupational-accident-insurance', category: 'finance', nameKey: 'tool_tw_occupational', descKey: 'tool_tw_occupational_desc', icon: 'shield-alert' },
  { slug: 'tw-supplementary-nhi-premium', category: 'finance', nameKey: 'tool_tw_supp_nhi', descKey: 'tool_tw_supp_nhi_desc', icon: 'plus-circle' },
  { slug: 'tw-minimum-wage', category: 'finance', nameKey: 'tool_tw_min_wage', descKey: 'tool_tw_min_wage_desc', icon: 'badge-dollar-sign' },
  { slug: 'tw-tax-deductions', category: 'finance', nameKey: 'tool_tw_deductions', descKey: 'tool_tw_deductions_desc', icon: 'list-checks' },
  { slug: 'tw-retirement-income-tax', category: 'finance', nameKey: 'tool_tw_retirement_tax', descKey: 'tool_tw_retirement_tax_desc', icon: 'wallet' },

  // --- Lifestyle & Fun Reference Tools ---
  { slug: 'zodiac-sign-lookup', category: 'everyday', nameKey: 'tool_zodiac', descKey: 'tool_zodiac_desc', icon: 'star' },
  { slug: 'chinese-zodiac-lookup', category: 'everyday', nameKey: 'tool_chinese_zodiac', descKey: 'tool_chinese_zodiac_desc', icon: 'rabbit' },
  { slug: 'blood-type-personality', category: 'everyday', nameKey: 'tool_bloodtype', descKey: 'tool_bloodtype_desc', icon: 'droplets' },

  // --- Common Reference & Lookup Tools ---
  { slug: 'special-symbols', category: 'text', nameKey: 'tool_special_symbols', descKey: 'tool_special_symbols_desc', icon: 'at-sign' },
  { slug: 'taiwan-postal-code', category: 'everyday', nameKey: 'tool_postal_code', descKey: 'tool_postal_code_desc', icon: 'mail' },
  { slug: 'name-stroke-calculator', category: 'everyday', nameKey: 'tool_name_stroke', descKey: 'tool_name_stroke_desc', icon: 'pen-tool' },
  { slug: 'clothing-size-chart', category: 'units', nameKey: 'tool_clothing_size', descKey: 'tool_clothing_size_desc', icon: 'shirt' },
  { slug: 'multiplication-table', category: 'everyday', nameKey: 'tool_multiplication', descKey: 'tool_multiplication_desc', icon: 'grid-3x3' },
  { slug: 'address-translator', category: 'everyday', nameKey: 'tool_address_translate', descKey: 'tool_address_translate_desc', icon: 'map' },

  // --- Phase 1: High-value pure frontend tools ---
  // Security & Privacy (3)
  { slug: 'password-strength-checker', category: 'everyday', nameKey: 'tool_password_strength', descKey: 'tool_password_strength_desc', icon: 'shield-check' },
  { slug: 'credit-card-validator', category: 'everyday', nameKey: 'tool_cc_validator', descKey: 'tool_cc_validator_desc', icon: 'credit-card' },
  { slug: 'tax-id-validator', category: 'finance', nameKey: 'tool_tax_id_validator', descKey: 'tool_tax_id_validator_desc', icon: 'building-2' },

  // Daily Tools - Simple (6)
  { slug: 'days-counter', category: 'everyday', nameKey: 'tool_days_counter', descKey: 'tool_days_counter_desc', icon: 'calendar-days' },
  { slug: 'world-clock', category: 'everyday', nameKey: 'tool_world_clock', descKey: 'tool_world_clock_desc', icon: 'globe-2' },
  { slug: 'country-code-lookup', category: 'everyday', nameKey: 'tool_country_code', descKey: 'tool_country_code_desc', icon: 'phone' },
  { slug: 'test-card-generator', category: 'dev', nameKey: 'tool_test_card', descKey: 'tool_test_card_desc', icon: 'credit-card' },

  // Encoding/Decoding (2)
  { slug: 'punycode-converter', category: 'dev', nameKey: 'tool_punycode', descKey: 'tool_punycode_desc', icon: 'globe' },
  { slug: 'html-color-reference', category: 'css', nameKey: 'tool_html_colors', descKey: 'tool_html_colors_desc', icon: 'palette' },

  // Text Tools (5)
  { slug: 'vertical-text-converter', category: 'text', nameKey: 'tool_vertical_text', descKey: 'tool_vertical_text_desc', icon: 'text-cursor' },
  { slug: 'braille-converter', category: 'text', nameKey: 'tool_braille', descKey: 'tool_braille_desc', icon: 'braille' },
  { slug: 'pinyin-converter', category: 'text', nameKey: 'tool_pinyin', descKey: 'tool_pinyin_desc', icon: 'a-large-small' },
  { slug: 'bopomofo-converter', category: 'text', nameKey: 'tool_bopomofo', descKey: 'tool_bopomofo_desc', icon: 'text' },

  // Everyday Tools - Complex
  { slug: 'relative-title-calculator', category: 'everyday', nameKey: 'tool_relative_title', descKey: 'tool_relative_title_desc', icon: 'users' },

  // === Phase 2 Implementation: Advanced Frontend Tools (16 tools) ===
  // Data & Charts (4)
  { slug: 'base64-image-converter', category: 'image', nameKey: 'tool_base64_image', descKey: 'tool_base64_image_desc', icon: 'image-plus' },
  { slug: 'json-diff', category: 'dev', nameKey: 'tool_json_diff', descKey: 'tool_json_diff_desc', icon: 'git-compare' },
  { slug: 'csv-editor', category: 'dev', nameKey: 'tool_csv_editor', descKey: 'tool_csv_editor_desc', icon: 'table' },
  { slug: 'excel-formula-generator', category: 'dev', nameKey: 'tool_excel_formula', descKey: 'tool_excel_formula_desc', icon: 'function-square' },

  // Design Tools (4)
  { slug: 'icon-search', category: 'css', nameKey: 'tool_icon_search', descKey: 'tool_icon_search_desc', icon: 'search' },
  { slug: 'wcag-color-checker', category: 'css', nameKey: 'tool_wcag_color', descKey: 'tool_wcag_color_desc', icon: 'eye' },
  { slug: 'font-preview', category: 'css', nameKey: 'tool_font_preview', descKey: 'tool_font_preview_desc', icon: 'type' },
  { slug: 'logo-generator', category: 'css', nameKey: 'tool_logo_generator', descKey: 'tool_logo_generator_desc', icon: 'image' },

  // Daily Complex Tools (1)
  { slug: 'sunrise-sunset-calculator', category: 'everyday', nameKey: 'tool_sunrise_sunset', descKey: 'tool_sunrise_sunset_desc', icon: 'sunrise' },

  // Education Tools (2)
  { slug: 'math-formula-editor', category: 'everyday', nameKey: 'tool_math_formula', descKey: 'tool_math_formula_desc', icon: 'square-root' },
  { slug: 'latex-editor', category: 'dev', nameKey: 'tool_latex_editor', descKey: 'tool_latex_editor_desc', icon: 'file-code' },

  // Health Records (1)
  { slug: 'menstrual-cycle-calculator', category: 'health', nameKey: 'tool_menstrual_cycle', descKey: 'tool_menstrual_cycle_desc', icon: 'calendar-heart' },

  // Lunar/Almanac (1)
  { slug: 'farmer-almanac', category: 'everyday', nameKey: 'tool_farmer_almanac', descKey: 'tool_farmer_almanac_desc', icon: 'calendar-range' },

  // --- New tools from piliapp-missing-features.md ---
  // Phase 1: Quick value tools
  { slug: 'coin-flip', category: 'everyday', nameKey: 'tool_coinflip', descKey: 'tool_coinflip_desc', icon: 'circle-dot' },
  { slug: 'dice-roller', category: 'everyday', nameKey: 'tool_diceroller', descKey: 'tool_diceroller_desc', icon: 'dice-5' },
  { slug: 'counter', category: 'everyday', nameKey: 'tool_counter', descKey: 'tool_counter_desc', icon: 'hash' },
  { slug: 'digital-clock', category: 'everyday', nameKey: 'tool_digitalclock', descKey: 'tool_digitalclock_desc', icon: 'clock' },
  { slug: 'lucky-number-generator', category: 'everyday', nameKey: 'tool_luckynumber', descKey: 'tool_luckynumber_desc', icon: 'sparkles' },
  { slug: 'strikethrough-generator', category: 'text', nameKey: 'tool_strikethrough', descKey: 'tool_strikethrough_desc', icon: 'strikethrough' },
  { slug: 'phone-number-generator', category: 'everyday', nameKey: 'tool_phonenumber', descKey: 'tool_phonenumber_desc', icon: 'smartphone' },
  { slug: 'screen-dead-pixel-test', category: 'everyday', nameKey: 'tool_screenpixel', descKey: 'tool_screenpixel_desc', icon: 'monitor' },

  // --- Phase 2: Interactive tools ---
  { slug: 'scoreboard', category: 'everyday', nameKey: 'tool_scoreboard', descKey: 'tool_scoreboard_desc', icon: 'trophy' },
  { slug: 'fancy-font-generator', category: 'text', nameKey: 'tool_fancyfont', descKey: 'tool_fancyfont_desc', icon: 'sparkles' },
  { slug: 'online-ruler', category: 'everyday', nameKey: 'tool_ruler', descKey: 'tool_ruler_desc', icon: 'ruler' },
  { slug: 'alarm-clock', category: 'everyday', nameKey: 'tool_alarm', descKey: 'tool_alarm_desc', icon: 'bell' },
  { slug: 'mind-reader', category: 'everyday', nameKey: 'tool_mindreader', descKey: 'tool_mindreader_desc', icon: 'brain' },
  { slug: 'color-blindness-test', category: 'everyday', nameKey: 'tool_colorblind_test', descKey: 'tool_colorblind_test_desc', icon: 'eye' },
  { slug: 'wheel-spinner', category: 'everyday', nameKey: 'tool_wheel', descKey: 'tool_wheel_desc', icon: 'circle-dot' },
  { slug: 'drawing-board', category: 'everyday', nameKey: 'tool_drawingboard', descKey: 'tool_drawingboard_desc', icon: 'pencil' },

  // --- New Health Tools ---
  { slug: 'weight-loss-plan', category: 'health', nameKey: 'tool_weightloss', descKey: 'tool_weightloss_desc', icon: 'target' },
]

export const categories = [
  { key: 'dev', labelKey: 'cat_dev' },
  { key: 'css', labelKey: 'cat_css' },
  { key: 'finance', labelKey: 'cat_finance' },
  { key: 'health', labelKey: 'cat_health' },
  { key: 'image', labelKey: 'cat_image' },
  { key: 'text', labelKey: 'cat_text' },
  { key: 'units', labelKey: 'cat_units' },
  { key: 'everyday', labelKey: 'cat_everyday' },
] as const

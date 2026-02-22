# 🌐 toolcase.cc — 多語言 SEO 架構指南

## 策略摘要

| 項目 | 決定 |
|------|------|
| **語言** | 英文（預設）+ 繁體中文（第一波） |
| **路由** | 子路徑 `/zh-tw/` |
| **SEO** | 每語言獨立靜態頁面 + hreflang 標籤 |
| **未來擴充** | 簡中 `/zh-cn/`、日文 `/ja/` |

---

## URL 結構

```
toolcase.cc/                              ← 英文首頁（預設）
toolcase.cc/json-formatter                ← 英文工具頁
toolcase.cc/mortgage-calculator           ← 英文工具頁

toolcase.cc/zh-tw/                        ← 繁中首頁
toolcase.cc/zh-tw/json-formatter          ← 繁中工具頁
toolcase.cc/zh-tw/mortgage-calculator     ← 繁中工具頁
```

英文路徑不加 `/en/` 前綴，保持最短 URL（SEO 最佳實踐）。

---

## Next.js 專案結構

```
toolcase/
├── src/
│   ├── app/
│   │   ├── layout.tsx                          # Root layout
│   │   ├── page.tsx                            # 英文首頁
│   │   ├── json-formatter/
│   │   │   └── page.tsx                        # 英文 JSON Formatter
│   │   ├── mortgage-calculator/
│   │   │   └── page.tsx
│   │   ├── [... 其他英文工具頁]
│   │   │
│   │   ├── zh-tw/
│   │   │   ├── layout.tsx                      # 繁中 layout（設定 lang="zh-Hant"）
│   │   │   ├── page.tsx                        # 繁中首頁
│   │   │   ├── json-formatter/
│   │   │   │   └── page.tsx                    # 繁中 JSON Formatter
│   │   │   ├── mortgage-calculator/
│   │   │   │   └── page.tsx
│   │   │   └── [... 其他繁中工具頁]
│   │   │
│   │   ├── about/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── LangSwitcher.tsx                # 語言切換器
│   │   ├── shared/
│   │   │   ├── CopyButton.tsx
│   │   │   ├── ToolCard.tsx
│   │   │   ├── AdSlot.tsx
│   │   │   ├── FaqSection.tsx
│   │   │   └── RelatedTools.tsx
│   │   └── tools/
│   │       ├── JsonFormatter.tsx                # 'use client' — 工具邏輯與語言無關
│   │       ├── QrGenerator.tsx
│   │       └── ...
│   │
│   ├── i18n/
│   │   ├── locales/
│   │   │   ├── en.ts                           # 英文翻譯
│   │   │   └── zh-tw.ts                        # 繁中翻譯
│   │   ├── config.ts                           # 語言設定
│   │   └── get-dict.ts                         # 取得翻譯的 helper
│   │
│   ├── lib/
│   │   ├── tools-config.ts
│   │   └── seo.ts
│   │
│   └── styles/
│       └── globals.css
```

---

## 核心實作

### 1. 語言設定

```ts
// src/i18n/config.ts
export const defaultLocale = 'en'
export const locales = ['en', 'zh-tw'] as const
export type Locale = (typeof locales)[number]

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  'zh-tw': '繁體中文',
}

// HTML lang 屬性對應
export const localeHtmlLang: Record<Locale, string> = {
  en: 'en',
  'zh-tw': 'zh-Hant-TW',
}
```

### 2. 翻譯檔

```ts
// src/i18n/locales/en.ts
export default {
  // Nav
  search_placeholder: 'Search tools...',

  // Hero
  hero_badge: '100% Free — No signup required',
  hero_title_1: 'Online tools,',
  hero_title_2: 'ridiculously fast.',
  hero_desc: 'Developer tools, calculators, image processors, converters — everything you need, nothing you don\'t.',
  stat_tools: 'Free Tools',
  stat_signup: 'Signups Needed',
  stat_load: 'Load Time',

  // Categories
  cat_dev: 'Developer Tools',
  cat_finance: 'Finance Calculators',
  cat_health: 'Health & Fitness',
  cat_image: 'Image & File Tools',
  cat_text: 'Text Tools',
  cat_units: 'Unit Converters',
  cat_everyday: 'Everyday Tools',

  // Tools（每個工具的 name + desc）
  tool_json: 'JSON Formatter',
  tool_json_desc: 'Format, validate & beautify JSON',
  // ... 以此類推

  // Footer
  footer_text: '© 2026 toolcase. Built with coffee and simplicity.',
  footer_about: 'About',
  footer_privacy: 'Privacy',
  footer_terms: 'Terms',
} as const
```

```ts
// src/i18n/locales/zh-tw.ts
export default {
  search_placeholder: '搜尋工具...',

  hero_badge: '100% 免費 — 不需要註冊',
  hero_title_1: '線上工具，',
  hero_title_2: '快到不可思議。',
  hero_desc: '開發者工具、計算機、圖片處理、轉換器 — 你需要的都在這裡，多餘的一個都沒有。',
  stat_tools: '免費工具',
  stat_signup: '不需註冊',
  stat_load: '載入時間',

  cat_dev: '開發者工具',
  cat_finance: '財務計算機',
  cat_health: '健康與體適能',
  cat_image: '圖片與檔案工具',
  cat_text: '文字工具',
  cat_units: '單位換算',
  cat_everyday: '日常工具',

  tool_json: 'JSON 格式化',
  tool_json_desc: '格式化、驗證與美化 JSON',

  footer_text: '© 2026 toolcase. 用咖啡和簡約主義打造。',
  footer_about: '關於',
  footer_privacy: '隱私權',
  footer_terms: '使用條款',
} as const
```

### 3. 取得翻譯的 Helper

```ts
// src/i18n/get-dict.ts
import en from './locales/en'
import zhTw from './locales/zh-tw'
import type { Locale } from './config'

const dictionaries: Record<Locale, typeof en> = {
  en,
  'zh-tw': zhTw,
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.en
}
```

### 4. Root Layout（英文）

```tsx
// src/app/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'toolcase — Free Online Tools for Everyone',
  description: 'Free online tools: JSON formatter, QR code generator, calculators, image tools, unit converters and more.',
  alternates: {
    canonical: 'https://toolcase.cc',
    languages: {
      'en': 'https://toolcase.cc',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar locale="en" />
        {children}
        <Footer locale="en" />
      </body>
    </html>
  )
}
```

### 5. 繁中 Layout

```tsx
// src/app/zh-tw/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'toolcase — 免費線上工具',
  description: '免費線上工具：JSON 格式化、QR Code 產生器、計算機、圖片處理、單位換算等。快速、乾淨、不需註冊。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw',
    languages: {
      'en': 'https://toolcase.cc',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw',
    },
  },
}

export default function ZhTwLayout({ children }: { children: React.ReactNode }) {
  return (
    // 不需要再包 <html>，繼承 root layout
    // 但需要設定語言屬性
    <div lang="zh-Hant-TW">
      <Navbar locale="zh-tw" />
      {children}
      <Footer locale="zh-tw" />
    </div>
  )
}
```

### 6. 工具頁面範例（英文）

```tsx
// src/app/json-formatter/page.tsx
import { Metadata } from 'next'
import JsonFormatter from '@/components/tools/JsonFormatter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator - Free Online Tool | toolcase',
  description: 'Format, validate, and beautify JSON data instantly. Free online JSON formatter with syntax highlighting and error detection.',
  alternates: {
    canonical: 'https://toolcase.cc/json-formatter',
    languages: {
      'en': 'https://toolcase.cc/json-formatter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/json-formatter',
    },
  },
}

const faqs = [
  { question: 'What is JSON?', answer: 'JSON (JavaScript Object Notation) is a lightweight data format...' },
  { question: 'How to validate JSON?', answer: 'Paste your JSON into the editor above...' },
  // ...
]

export default function JsonFormatterPage() {
  return (
    <main>
      <h1>JSON Formatter & Validator</h1>
      <p>Paste your JSON below to format, validate, and beautify it instantly.</p>

      {/* 工具元件 — client component，與語言無關 */}
      <JsonFormatter />

      <section>
        <h2>How to Format JSON Online</h2>
        <p>Simply paste your JSON data into the editor above...</p>
      </section>

      <section>
        <h2>What is JSON?</h2>
        <p>JSON (JavaScript Object Notation) is a lightweight data-interchange format...</p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="json-formatter" locale="en" />
    </main>
  )
}
```

### 7. 工具頁面範例（繁中）

```tsx
// src/app/zh-tw/json-formatter/page.tsx
import { Metadata } from 'next'
import JsonFormatter from '@/components/tools/JsonFormatter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'JSON 格式化與驗證 - 免費線上工具 | toolcase',
  description: '即時格式化、驗證與美化 JSON 資料。免費線上 JSON 格式化工具，支援語法高亮與錯誤偵測。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/json-formatter',
    languages: {
      'en': 'https://toolcase.cc/json-formatter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/json-formatter',
    },
  },
}

const faqs = [
  { question: '什麼是 JSON？', answer: 'JSON（JavaScript Object Notation）是一種輕量級的資料交換格式...' },
  { question: '如何驗證 JSON 格式？', answer: '將你的 JSON 資料貼到上方的編輯器...' },
  // ...
]

export default function JsonFormatterPageZhTw() {
  return (
    <main>
      <h1>JSON 格式化與驗證</h1>
      <p>在下方貼上你的 JSON 資料，即時格式化、驗證與美化。</p>

      {/* 同一個 client component！工具邏輯完全共用 */}
      <JsonFormatter />

      <section>
        <h2>如何使用 JSON 格式化工具</h2>
        <p>只需將你的 JSON 資料貼到上方的編輯器...</p>
      </section>

      <section>
        <h2>什麼是 JSON？</h2>
        <p>JSON（JavaScript Object Notation）是一種輕量級的資料交換格式，
        易於人閱讀和撰寫，同時也方便機器解析和生成...</p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="json-formatter" locale="zh-tw" />
    </main>
  )
}
```

**重點：`<JsonFormatter />` client component 是完全共用的。** 工具邏輯不需要翻譯——按鈕文字（Format / Beautify / Copy）可以用 props 傳入，或直接在 component 內判斷 locale。但 SEO 內容（H1、H2、FAQ、meta）必須是獨立的靜態 HTML。

---

## hreflang 標籤

Next.js `metadata.alternates.languages` 會自動產生 hreflang link 標籤：

```html
<!-- 英文頁面的 <head> -->
<link rel="alternate" hreflang="en" href="https://toolcase.cc/json-formatter" />
<link rel="alternate" hreflang="zh-Hant-TW" href="https://toolcase.cc/zh-tw/json-formatter" />

<!-- 繁中頁面的 <head> -->
<link rel="alternate" hreflang="en" href="https://toolcase.cc/json-formatter" />
<link rel="alternate" hreflang="zh-Hant-TW" href="https://toolcase.cc/zh-tw/json-formatter" />
```

**每對語言版本都要互相指向**，Google 才能正確理解它們是同一內容的不同語言版本。

---

## 語言切換器

```tsx
// src/components/layout/LangSwitcher.tsx
'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const localeMap = {
  en: { label: 'EN', prefix: '' },
  'zh-tw': { label: '繁', prefix: '/zh-tw' },
}

export default function LangSwitcher({ locale }: { locale: 'en' | 'zh-tw' }) {
  const pathname = usePathname()

  // 計算另一語言的路徑
  const switchTo = locale === 'en' ? 'zh-tw' : 'en'
  const currentPath = locale === 'en'
    ? pathname                              // /json-formatter
    : pathname.replace('/zh-tw', '')        // /zh-tw/json-formatter → /json-formatter

  const targetPath = switchTo === 'en'
    ? currentPath || '/'
    : `/zh-tw${currentPath}`

  return (
    <Link href={targetPath}>
      {localeMap[switchTo].label}
    </Link>
  )
}
```

**語言切換器用 `<Link>` 而不是 JS 切換**。這樣 Google 爬蟲可以跟著連結發現另一語言的頁面。

---

## Sitemap 設定

```ts
// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://toolcase.cc',
  generateRobotsTxt: true,
  // next-sitemap 會自動掃描所有 /app 路由，
  // 包括 /zh-tw/* 的頁面
  alternateRefs: [
    { href: 'https://toolcase.cc', hreflang: 'en' },
    { href: 'https://toolcase.cc/zh-tw', hreflang: 'zh-Hant-TW' },
  ],
}
```

產出的 sitemap.xml 會包含：

```xml
<url>
  <loc>https://toolcase.cc/json-formatter</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://toolcase.cc/json-formatter"/>
  <xhtml:link rel="alternate" hreflang="zh-Hant-TW" href="https://toolcase.cc/zh-tw/json-formatter"/>
</url>
<url>
  <loc>https://toolcase.cc/zh-tw/json-formatter</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://toolcase.cc/json-formatter"/>
  <xhtml:link rel="alternate" hreflang="zh-Hant-TW" href="https://toolcase.cc/zh-tw/json-formatter"/>
</url>
```

---

## SEO 內容策略

### 英文頁面

- title: `JSON Formatter & Validator - Free Online Tool | toolcase`
- H1: `JSON Formatter & Validator`
- H2: `How to Format JSON Online`（200-300 字）
- H2: `What is JSON?`（300-500 字）
- H2: `FAQ`（5 題 + JSON-LD schema）

### 繁中頁面

- title: `JSON 格式化與驗證 - 免費線上工具 | toolcase`
- H1: `JSON 格式化與驗證`
- H2: `如何使用 JSON 格式化工具`（200-300 字）
- H2: `什麼是 JSON？`（300-500 字）
- H2: `常見問題`（5 題 + JSON-LD schema）

**繁中 SEO 內容不是英文的直譯。** 要用自然的繁中寫法，包含台灣用戶會搜的關鍵字（例如「JSON 格式化」「JSON 驗證」「JSON 美化」）。

---

## 工具元件共用策略

```
頁面結構：

┌─────────────────────────────────┐
│  SSR / Static（語言相關）         │
│  ├── metadata（title, desc）      │ ← 每語言不同
│  ├── H1                          │ ← 每語言不同
│  ├── intro paragraph             │ ← 每語言不同
│  │                               │
│  │  ┌───────────────────────┐   │
│  │  │  Client Component     │   │
│  │  │  （工具互動區）          │   │ ← 共用！按鈕文字用 props
│  │  │  JsonFormatter.tsx    │   │
│  │  └───────────────────────┘   │
│  │                               │
│  ├── H2: How to Use             │ ← 每語言不同
│  ├── H2: What is JSON           │ ← 每語言不同
│  ├── FAQ + JSON-LD              │ ← 每語言不同
│  └── RelatedTools               │ ← 連結路徑依語言不同
└─────────────────────────────────┘
```

**工具互動區（client component）完全共用。** 只有周圍的 SEO 內容需要分語言。

UI 按鈕文字（Format、Copy、Clear 等）可以透過 props 傳入：

```tsx
<JsonFormatter
  labels={{
    format: locale === 'zh-tw' ? '格式化' : 'Format',
    copy: locale === 'zh-tw' ? '複製' : 'Copy',
    clear: locale === 'zh-tw' ? '清除' : 'Clear',
  }}
/>
```

---

## 開發工作量評估

### 第一波（兩週）只做英文

按原計畫開發 7 個工具，全部英文。

### 第二波加繁中（Week 3-4）

每個工具的繁中版需要：

- 複製頁面到 `/zh-tw/` 路徑 — 5 分鐘
- 翻譯 metadata（title, description）— 5 分鐘
- 翻譯/撰寫繁中 SEO 內容（How to Use + What is + FAQ）— 30-60 分鐘
- 用 Claude 輔助撰寫可加速到 15-20 分鐘

**7 個工具 × 20 分鐘 ≈ 2-3 小時**完成所有繁中版本。

之後每做一個新英文工具，順手做繁中版只需多花 15-20 分鐘。

---

## 未來擴充

加新語言只需要：

1. 在 `i18n/config.ts` 加入新 locale
2. 建立 `i18n/locales/zh-cn.ts`（或 `ja.ts`）
3. 建立 `src/app/zh-cn/` 資料夾
4. 複製頁面 + 翻譯內容
5. 更新所有頁面的 `alternates.languages` 加入新語言
6. 更新 `next-sitemap.config.js` 的 `alternateRefs`

架構已經支援，只需要填內容。

---

## Checklist

### Day 1 必做

- [ ] 建立 `src/i18n/` 資料夾結構
- [ ] 建立 `config.ts` + `get-dict.ts`
- [ ] 建立英文翻譯檔 `en.ts`
- [ ] Root layout 設定 `metadata.alternates`
- [ ] Navbar 加入 LangSwitcher（先連到 `/zh-tw` 首頁）
- [ ] `next-sitemap.config.js` 加入 `alternateRefs`

### Week 3 做繁中

- [ ] 建立 `src/app/zh-tw/layout.tsx`
- [ ] 建立繁中翻譯檔 `zh-tw.ts`
- [ ] 為每個工具建立繁中頁面
- [ ] 撰寫繁中 SEO 內容（用 Claude 輔助加速）
- [ ] 驗證所有 hreflang 標籤正確
- [ ] 在 Google Search Console 提交更新後的 sitemap

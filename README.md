# 🧰 toolcase

> **一站式線上工具平台 — 免費、快速、隱私優先**

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

[English](./README.md) | [繁體中文](./README.zh-TW.md)

---

## 📖 關於專案

**toolcase** 是一個開源的線上工具集合平台，提供 **150+ 個免費工具**，涵蓋開發、設計、金融、健康、圖片處理等多個領域。所有工具均採用**純前端運算**，保護使用者隱私，無需註冊即可使用。

🌐 **官方網站**: [toolcase.cc](https://toolcase.cc)

### ✨ 核心特色

- 🚀 **150+ 專業工具** - 開發者工具、金融計算器、健康工具、圖片處理等
- 🔒 **隱私優先** - 所有運算在瀏覽器本地執行，資料不上傳伺服器
- ⚡ **極速載入** - 使用 Next.js App Router 與 Server Components
- 🌍 **多語言支援** - 繁體中文 / English
- 📱 **響應式設計** - 完美支援桌面、平板、手機
- 🎨 **深色模式** - 自動適配系統主題
- 🔍 **SEO 優化** - 完整的 meta tags 與 sitemap
- 💰 **AdSense 整合** - 內建廣告系統支援變現

---

## 🛠️ 工具分類

### 💻 開發者工具 (Developer Tools)
JSON Formatter、JWT Decoder、QR Code Generator、Cron Generator、Base64 Encoder/Decoder、Hash Generator、Regex Tester、Code Beautifier、Markdown Preview、Git Diff Checker...

### 🎨 CSS 工具 (CSS Tools)
Box Shadow Generator、Border Radius Generator、Gradient Generator、Flexbox Playground、Grid Generator、Glassmorphism Generator、Clip Path Generator...

### 💰 金融計算器 (Finance)
房貸計算器、複利計算器、貸款計算器、信用卡計算器、存款計算器、投資報酬率 (ROI)、退休金計算器、稅務計算器...

### 🏥 健康工具 (Health)
BMI 計算器、體脂率計算器、基礎代謝率 (TDEE)、熱量計算器、預產期計算器、心率區間計算器...

### 🖼️ 圖片工具 (Image Tools)
圖片壓縮、圖片格式轉換、圖片裁切、圖片縮放、圖片轉 PDF、浮水印、Favicon 產生器...

### ✏️ 文字處理 (Text Tools)
簡繁轉換、大小寫轉換、字數計算器、重複行移除、Lorem Ipsum Generator、Unicode Converter...

### 📏 單位轉換 (Unit Converters)
長度、重量、溫度、面積、體積、速度、資料大小、時間、壓力、能量轉換器...

### 📅 日常工具 (Everyday Tools)
百分比計算器、年齡計算器、折扣計算器、小費計算器、日期計算器、倒數計時器、碼錶、隨機數產生器、抽籤工具...

**完整工具列表**: 查看 [`src/lib/tools-config.ts`](./src/lib/tools-config.ts)

---

## 🚀 快速開始

### 環境需求

- **Node.js** >= 18.0
- **npm** 或 **pnpm** 或 **yarn**

### 安裝與執行

```bash
# 1. Clone 專案
git clone https://github.com/yourusername/toolcase.git
cd toolcase

# 2. 安裝依賴
npm install

# 3. 執行開發伺服器
npm run dev

# 4. 開啟瀏覽器
open http://localhost:3000
```

### 建置與部署

```bash
# 建置正式版本
npm run build

# 啟動正式伺服器
npm start

# 產生 sitemap
npm run postbuild
```

---

## 📁 專案結構

```
toolcase/
├── src/
│   ├── app/                    # Next.js App Router 頁面
│   │   ├── (en)/              # 英文版頁面
│   │   ├── zh-tw/             # 繁體中文頁面
│   │   └── layout.tsx         # Root Layout (含 AdSense)
│   ├── components/
│   │   ├── tools/             # 148 個工具元件
│   │   ├── shared/            # 共用元件 (AdSlot, ToolCard...)
│   │   └── layout/            # 版面元件 (Navbar, Footer...)
│   ├── lib/
│   │   └── tools-config.ts    # 工具配置檔案
│   ├── i18n/                  # 多語言字典
│   ├── config/
│   │   └── ads.ts             # 廣告配置
│   └── styles/
│       └── globals.css        # 全域樣式
├── public/                     # 靜態資源
├── scripts/                    # 輔助腳本
│   └── check-ads-setup.sh     # 廣告設定檢查
├── .env.example               # 環境變數範例
├── next.config.ts             # Next.js 配置
├── tailwind.config.ts         # Tailwind CSS 配置
├── next-sitemap.config.js     # Sitemap 配置
└── package.json
```

---

## 🧩 技術架構

### 核心技術

- **前端框架**: [Next.js 16](https://nextjs.org/) (App Router)
- **語言**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **樣式**: [Tailwind CSS 4.2](https://tailwindcss.com/)
- **圖示**: [Lucide React](https://lucide.dev/)
- **圖表**: [Recharts](https://recharts.org/)
- **二維碼**: [qrcode](https://github.com/soldair/node-qrcode)
- **影像處理**: [FFmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)

### 關鍵設計決策

#### 1. 純前端運算 (Client-Side Only)

所有工具均使用 `'use client'` 在瀏覽器執行，確保：
- ✅ 使用者資料絕不離開本地端
- ✅ 無伺服器成本（靜態部署即可）
- ✅ 回應速度極快（無網路延遲）

#### 2. SEO 優化策略

- 每個工具頁面都有獨立的 `metadata`
- 使用 `next-sitemap` 自動產生 sitemap
- 支援多語言 `alternates`
- 結構化資料（未來可加入 JSON-LD）

#### 3. 多語言架構

```typescript
// 使用字典檔案管理翻譯
import { getDictionary } from '@/i18n/get-dict'

const t = getDictionary('en')
// or
const t = getDictionary('zh-tw')
```

#### 4. 工具配置驅動開發

所有工具在 `tools-config.ts` 中統一管理：
```typescript
{
  slug: 'json-formatter',
  category: 'dev',
  nameKey: 'tool_json',
  descKey: 'tool_json_desc',
  icon: 'braces',
}
```

新增工具只需：
1. 建立元件: `src/components/tools/MyTool.tsx`
2. 建立頁面: `src/app/(en)/my-tool/page.tsx`
3. 加入配置: `src/lib/tools-config.ts`
4. 新增翻譯: `src/i18n/dictionaries/`

---

## 💰 廣告整合

本專案已完整整合 Google AdSense，支援快速變現。

### 快速設定

```bash
# 1. 複製環境變數範例
cp .env.example .env.local

# 2. 填入您的 AdSense Publisher ID
# NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
# NEXT_PUBLIC_AD_SLOT_IN_CONTENT=1234567890

# 3. 在頁面中使用廣告
```

### 使用範例

```tsx
import AdSlot from '@/components/shared/AdSlot'
import { adConfig, isAdSlotConfigured } from '@/config/ads'

export default function ToolPage() {
  return (
    <div>
      {/* 工具內容 */}

      {/* 加入廣告 */}
      {isAdSlotConfigured('inContent') && (
        <AdSlot
          adSlot={adConfig.slots.inContent.id}
          format={adConfig.slots.inContent.format}
        />
      )}
    </div>
  )
}
```

### 詳細文件

- 📚 [ADSENSE_SETUP.md](./ADSENSE_SETUP.md) - 完整設定指南
- 💡 [EXAMPLE_WITH_ADS.tsx](./EXAMPLE_WITH_ADS.tsx) - 程式碼範例
- 📊 [README_ADS.md](./README_ADS.md) - 收入優化策略

---

## 🎯 開發指南

### 新增工具的標準流程

#### 1. 建立工具元件

```tsx
// src/components/tools/MyTool.tsx
'use client'

export default function MyTool() {
  return (
    <div>
      {/* 工具 UI */}
    </div>
  )
}
```

#### 2. 建立頁面

```tsx
// src/app/(en)/my-tool/page.tsx
import { Metadata } from 'next'
import MyTool from '@/components/tools/MyTool'
import FaqSection from '@/components/shared/FaqSection'

export const metadata: Metadata = {
  title: 'My Tool - Free Online Tool | toolcase',
  description: 'Description of my tool...',
  alternates: {
    canonical: 'https://toolcase.cc/my-tool',
    languages: {
      en: 'https://toolcase.cc/my-tool',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/my-tool',
    },
  },
}

export default function MyToolPage() {
  return (
    <div className="tool-container">
      <h1>My Tool</h1>
      <MyTool />
      <FaqSection items={[...]} />
    </div>
  )
}
```

#### 3. 註冊到工具配置

```typescript
// src/lib/tools-config.ts
export const tools: ToolConfig[] = [
  // ...
  {
    slug: 'my-tool',
    category: 'dev',
    nameKey: 'tool_mytool',
    descKey: 'tool_mytool_desc',
    icon: 'wrench', // Lucide icon name
  },
]
```

#### 4. 新增翻譯

```typescript
// src/i18n/dictionaries/en.ts
export const dict = {
  tool_mytool: 'My Tool',
  tool_mytool_desc: 'Description of my tool',
}

// src/i18n/dictionaries/zh-tw.ts
export const dict = {
  tool_mytool: '我的工具',
  tool_mytool_desc: '工具說明',
}
```

### 開發最佳實踐

- ✅ **所有工具使用 `'use client'`** - 確保純前端運算
- ✅ **使用 TypeScript** - 型別安全
- ✅ **響應式設計** - 支援所有裝置尺寸
- ✅ **加入 FAQ 區塊** - 提升 SEO
- ✅ **使用語意化 HTML** - 改善無障礙性
- ✅ **錯誤處理** - 提供友善的錯誤訊息
- ✅ **載入狀態** - 長時間運算顯示進度

---

## 🚢 部署

### Vercel (推薦)

```bash
# 1. 安裝 Vercel CLI
npm i -g vercel

# 2. 部署
vercel

# 3. 設定環境變數
# 在 Vercel Dashboard → Settings → Environment Variables
# 加入 NEXT_PUBLIC_ADSENSE_CLIENT_ID 等變數
```

### 其他平台

本專案為純靜態網站，可部署到任何支援 Next.js 的平台：

- **Netlify**: `npm run build` → 部署 `.next` 資料夾
- **Cloudflare Pages**: 支援 Next.js
- **AWS Amplify**: 支援 Next.js
- **自架伺服器**: 使用 `npm start`

---

## 📈 開發藍圖

詳細的工具開發計畫請參考：
- 📋 [toolcase-tool-roadmap.md](./toolcase-tool-roadmap.md) - 完整工具藍圖（按 RPM 排序）
- 🌐 [toolcase-i18n-seo-guide.md](./toolcase-i18n-seo-guide.md) - SEO 與多語言策略

### 目前進度

- ✅ **Phase 1**: 核心架構建立
- ✅ **Phase 2**: 150+ 工具上線
- ✅ **Phase 3**: 多語言支援 (en / zh-tw)
- ✅ **Phase 4**: AdSense 整合
- 🚧 **Phase 5**: 效能優化與 SEO 提升
- 📅 **Future**: API 服務、使用者帳戶系統

---

## 🤝 貢獻指南

歡迎任何形式的貢獻！

### 如何貢獻

1. **Fork 本專案**
2. **建立功能分支**: `git checkout -b feature/amazing-tool`
3. **提交變更**: `git commit -m 'Add some amazing tool'`
4. **推送到分支**: `git push origin feature/amazing-tool`
5. **提交 Pull Request**

### 貢獻類型

- 🐛 **修復 Bug**
- ✨ **新增工具**
- 📝 **改善文件**
- 🌍 **新增語言翻譯**
- 🎨 **UI/UX 優化**
- ⚡ **效能優化**

### 程式碼規範

- 遵循 ESLint 規則: `npm run lint`
- 使用 TypeScript
- 元件使用 PascalCase
- 檔案使用 kebab-case (例外: React 元件)

---

## 📄 授權

本專案採用 **MIT License** 授權 - 詳見 [LICENSE](./LICENSE) 檔案。

---

## 💬 聯絡方式

- 🌐 官方網站: [toolcase.cc](https://toolcase.cc)
- 📧 Email: support@toolcase.cc
- 🐛 問題回報: [GitHub Issues](https://github.com/yourusername/toolcase/issues)

---

## 🙏 致謝

感謝所有開源專案的貢獻者：

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Lucide](https://lucide.dev/) - 圖示庫
- [Recharts](https://recharts.org/) - 圖表庫
- 所有貢獻者 ❤️

---

<div align="center">

**⭐ 如果這個專案對您有幫助，請給我們一顆星星！⭐**

Made with ❤️ by toolcase team

</div>

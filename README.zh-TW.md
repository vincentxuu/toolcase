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

### 💻 開發者工具
JSON 格式化工具、JWT 解碼器、QR Code 產生器、Cron 表達式產生器、Base64 編碼/解碼、雜湊產生器、正規表達式測試器、程式碼美化工具、Markdown 預覽、Git Diff 比對工具...

### 🎨 CSS 工具
Box Shadow 產生器、Border Radius 產生器、漸層產生器、Flexbox 遊樂場、Grid 產生器、玻璃擬態產生器、Clip Path 產生器...

### 💰 金融計算器
房貸計算器、複利計算器、貸款計算器、信用卡計算器、存款計算器、投資報酬率 (ROI)、退休金計算器、稅務計算器...

### 🏥 健康工具
BMI 計算器、體脂率計算器、基礎代謝率 (TDEE)、熱量計算器、預產期計算器、心率區間計算器...

### 🖼️ 圖片工具
圖片壓縮、圖片格式轉換、圖片裁切、圖片縮放、圖片轉 PDF、浮水印、Favicon 產生器...

### ✏️ 文字處理
簡繁轉換、大小寫轉換、字數計算器、重複行移除、Lorem Ipsum 產生器、Unicode 轉換器...

### 📏 單位轉換
長度、重量、溫度、面積、體積、速度、資料大小、時間、壓力、能量轉換器...

### 📅 日常工具
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

# 2. 安裝套件
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
├── .env.example               # 環境變數範例
└── package.json
```

---

## 🧩 技術架構

### 核心技術

- **前端框架**: [Next.js 16](https://nextjs.org/) (App Router)
- **程式語言**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **樣式框架**: [Tailwind CSS 4.2](https://tailwindcss.com/)
- **圖示庫**: [Lucide React](https://lucide.dev/)
- **圖表庫**: [Recharts](https://recharts.org/)
- **二維碼**: [qrcode](https://github.com/soldair/node-qrcode)
- **影像處理**: [FFmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)

### 關鍵設計決策

#### 1️⃣ 純前端運算

所有工具均在瀏覽器執行，確保：
- ✅ 使用者資料絕不離開本地端
- ✅ 無伺服器運算成本
- ✅ 回應速度極快

#### 2️⃣ SEO 優化策略

- 每個工具頁面獨立的 metadata
- 自動產生 sitemap
- 多語言 canonical URLs
- 語意化 HTML 結構

#### 3️⃣ 多語言架構

使用字典檔案管理所有翻譯，支援快速新增語言。

#### 4️⃣ 配置驅動開發

新增工具只需 4 步驟：
1. 建立元件
2. 建立頁面
3. 註冊配置
4. 新增翻譯

---

## 💰 廣告整合

本專案已完整整合 Google AdSense，支援快速變現。

### 快速設定（3 步驟）

```bash
# 1. 複製環境變數範例
cp .env.example .env.local

# 2. 編輯 .env.local 填入您的 AdSense ID
# NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx

# 3. 在頁面中使用 AdSlot 元件
```

### 使用範例

```tsx
import AdSlot from '@/components/shared/AdSlot'
import { adConfig } from '@/config/ads'

export default function ToolPage() {
  return (
    <div>
      {/* 工具內容 */}

      {/* 加入廣告 */}
      <AdSlot
        adSlot={adConfig.slots.inContent.id}
        format="rectangle"
      />
    </div>
  )
}
```

### 詳細文件

- 📚 [ADSENSE_SETUP.md](./ADSENSE_SETUP.md) - 完整設定指南
- 💡 [EXAMPLE_WITH_ADS.tsx](./EXAMPLE_WITH_ADS.tsx) - 程式碼範例
- 📊 [README_ADS.md](./README_ADS.md) - 收入優化策略

根據 [toolcase-tool-roadmap.md](./toolcase-tool-roadmap.md) 的分析：
- 💎 **金融計算器** RPM $20-50（房貸、複利、貸款）
- 🏥 **健康工具** RPM $8-20（BMI、TDEE、熱量）
- 🛠️ **一般工具** RPM $2-10

建議優先為高 RPM 工具加入廣告以最大化收入。

---

## 🎯 開發指南

### 新增工具標準流程

#### 1. 建立工具元件

```tsx
// src/components/tools/MyTool.tsx
'use client'

export default function MyTool() {
  return (
    <div className="tool-component">
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

export const metadata: Metadata = {
  title: 'My Tool | toolcase',
  description: '工具說明...',
}

export default function MyToolPage() {
  return (
    <div className="tool-container">
      <h1>My Tool</h1>
      <MyTool />
    </div>
  )
}
```

#### 3. 註冊到配置

```typescript
// src/lib/tools-config.ts
{
  slug: 'my-tool',
  category: 'dev',
  nameKey: 'tool_mytool',
  descKey: 'tool_mytool_desc',
  icon: 'wrench',
}
```

#### 4. 新增翻譯

在 `src/i18n/dictionaries/` 中的語言檔案加入翻譯。

### 開發最佳實踐

- ✅ 使用 `'use client'` 指令
- ✅ TypeScript 型別安全
- ✅ 響應式設計（支援所有裝置）
- ✅ 加入 FAQ 區塊（提升 SEO）
- ✅ 錯誤處理與驗證
- ✅ 載入狀態提示

---

## 🚢 部署

### Vercel（推薦）

1. 連結 GitHub repository 到 Vercel
2. 自動部署
3. 在 Vercel Dashboard 設定環境變數

### 其他平台

支援所有 Next.js 部署平台：
- Netlify
- Cloudflare Pages
- AWS Amplify
- 自架伺服器

---

## 📈 開發藍圖

### 目前進度

- ✅ 核心架構建立
- ✅ 150+ 工具上線
- ✅ 多語言支援 (en / zh-tw)
- ✅ AdSense 整合
- 🚧 效能優化與 SEO 提升
- 📅 未來：API 服務、使用者系統

### 詳細規劃

- 📋 [toolcase-tool-roadmap.md](./toolcase-tool-roadmap.md) - 完整工具藍圖
- 🌐 [toolcase-i18n-seo-guide.md](./toolcase-i18n-seo-guide.md) - SEO 策略

---

## 🤝 貢獻指南

歡迎所有形式的貢獻！

### 如何貢獻

1. Fork 本專案
2. 建立功能分支: `git checkout -b feature/amazing-tool`
3. 提交變更: `git commit -m 'Add amazing tool'`
4. 推送到分支: `git push origin feature/amazing-tool`
5. 提交 Pull Request

### 貢獻類型

- 🐛 修復 Bug
- ✨ 新增工具
- 📝 改善文件
- 🌍 新增語言
- 🎨 UI/UX 優化
- ⚡ 效能優化

---

## 📄 授權

MIT License - 詳見 [LICENSE](./LICENSE)

---

## 💬 聯絡方式

- 🌐 官網: [toolcase.cc](https://toolcase.cc)
- 📧 Email: support@toolcase.cc
- 🐛 問題回報: [GitHub Issues](https://github.com/yourusername/toolcase/issues)

---

## 🙏 致謝

感謝所有開源專案：
- Next.js
- Tailwind CSS
- Lucide Icons
- Recharts
- 所有貢獻者 ❤️

---

<div align="center">

**⭐ 如果這個專案對您有幫助，請給我們一顆星星！⭐**

Made with ❤️ by toolcase team

</div>

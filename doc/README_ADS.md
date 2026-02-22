# 廣告整合完成 ✅

## 📦 已完成的設定

### 1. 核心檔案

- ✅ `src/app/layout.tsx` - 已加入 Google AdSense script
- ✅ `src/components/shared/AdSlot.tsx` - 已更新支援自動推送廣告
- ✅ `src/config/ads.ts` - 廣告配置檔案
- ✅ `.env.example` - 環境變數範例

### 2. 說明文件

- ✅ `ADSENSE_SETUP.md` - 完整設定指南
- ✅ `EXAMPLE_WITH_ADS.tsx` - 程式碼範例
- ✅ `README_ADS.md` - 本檔案

## 🚀 快速開始（3 步驟）

### 步驟 1: 設定環境變數

```bash
# 複製範例檔案
cp .env.example .env.local

# 編輯 .env.local，填入您的 AdSense 資訊
# NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
# NEXT_PUBLIC_AD_SLOT_IN_CONTENT=1234567890
# NEXT_PUBLIC_AD_SLOT_FOOTER=9876543210
```

### 步驟 2: 在頁面中使用廣告

```tsx
import AdSlot from '@/components/shared/AdSlot'
import { adConfig, isAdSlotConfigured } from '@/config/ads'

export default function MyToolPage() {
  return (
    <div>
      {/* 您的工具內容 */}

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

### 步驟 3: 重新啟動開發伺服器

```bash
npm run dev
```

## 📍 建議的廣告策略

根據 `toolcase-tool-roadmap.md` 的規劃：

### 🏆 優先級 1: 高 RPM 工具（金融、健康類）

這些工具的 RPM 是一般工具的 **5-10 倍**，應該優先加入更多廣告：

**金融類**（RPM $20-50）：
- 房貸計算器 `/mortgage-calculator`
- 複利計算器 `/compound-interest-calculator`
- 貸款計算器 `/loan-calculator`
- 信用卡計算器 `/credit-card-calculator`
- 退休金計算器 `/retirement-calculator`

**健康類**（RPM $8-20）：
- BMI 計算器 `/bmi-calculator`
- TDEE / 基礎代謝率 `/tdee-calculator`
- 體脂率計算器 `/body-fat-calculator`
- 熱量計算器 `/calorie-calculator`

**建議廣告配置**：
- ✅ 頁面頂部：1 個橫幅
- ✅ 工具下方：1 個方形
- ✅ 說明與 FAQ 之間：1 個方形
- ✅ 頁面底部：1 個橫幅
- ✅ 側邊欄（桌面版）：1 個摩天大樓

### 🥈 優先級 2: 一般工具

**建議廣告配置**：
- ✅ 工具下方：1 個方形
- ✅ 頁面底部：1 個橫幅

### 🥉 優先級 3: 首頁

- ✅ 頁面頂部：1 個橫幅
- ✅ 工具列表中間：穿插 1-2 個方形廣告

## 📊 預期收入試算（參考 roadmap）

| 工具類型 | 每月流量 | RPM | 預期月收入 |
|---------|---------|-----|-----------|
| 房貸計算器 | 2,000 | $30 | $60 |
| 複利計算器 | 1,500 | $20 | $30 |
| BMI 計算器 | 5,000 | $10 | $50 |
| JSON Formatter | 3,000 | $3 | $9 |
| QR Code Generator | 4,000 | $3 | $12 |

> 💡 **關鍵洞察**：房貸計算器雖然流量較少，但因為 RPM 高，收入可能比流量 2 倍的 JSON Formatter 還要多 6 倍以上。

## 🎯 批量部署建議

### 第一批：優先部署金融工具（預計 1 天）

```bash
# 需要加入廣告的頁面（按優先順序）
src/app/(en)/mortgage-calculator/page.tsx
src/app/(en)/compound-interest-calculator/page.tsx
src/app/(en)/loan-calculator/page.tsx
src/app/(en)/credit-card-calculator/page.tsx
src/app/(en)/savings-calculator/page.tsx
src/app/(en)/roi-calculator/page.tsx
src/app/(en)/retirement-calculator/page.tsx
```

### 第二批：部署健康工具（預計半天）

```bash
src/app/(en)/bmi-calculator/page.tsx
src/app/(en)/body-fat-calculator/page.tsx
src/app/(en)/calorie-calculator/page.tsx
src/app/(en)/heart-rate-calculator/page.tsx
```

### 第三批：高流量泛用工具（預計半天）

```bash
src/app/(en)/json-formatter/page.tsx
src/app/(en)/qr-code-generator/page.tsx
src/app/(en)/currency-converter/page.tsx
src/app/(en)/image-compressor/page.tsx
src/app/(en)/percentage-calculator/page.tsx
```

## 🔧 開發輔助腳本（可選）

建立 `scripts/add-ads-to-page.sh` 來自動化批量加入廣告：

```bash
#!/bin/bash
# 批量為工具頁面加入廣告的腳本
# 使用方式: ./scripts/add-ads-to-page.sh mortgage-calculator

TOOL_NAME=$1
PAGE_FILE="src/app/(en)/$TOOL_NAME/page.tsx"

if [ -f "$PAGE_FILE" ]; then
  echo "為 $PAGE_FILE 加入廣告..."
  # 在此加入自動化邏輯（或手動編輯）
else
  echo "找不到檔案: $PAGE_FILE"
fi
```

## ⚠️ 注意事項

1. **AdSense 政策**
   - 不要點擊自己的廣告
   - 不要鼓勵使用者點擊廣告
   - 確保廣告與內容有明確區隔

2. **使用者體驗**
   - 不要讓廣告影響工具的可用性
   - 確保頁面載入速度不受影響
   - 移動版考慮減少廣告數量

3. **開發環境**
   - AdSense 在 localhost 可能不會顯示廣告
   - 建議部署到測試環境驗證

## 📚 相關文件

- [ADSENSE_SETUP.md](./ADSENSE_SETUP.md) - 詳細設定指南
- [EXAMPLE_WITH_ADS.tsx](./EXAMPLE_WITH_ADS.tsx) - 程式碼範例
- [toolcase-tool-roadmap.md](./toolcase-tool-roadmap.md) - 工具開發藍圖

## 🤝 需要協助？

如果在設定過程中遇到問題：

1. 檢查 `ADSENSE_SETUP.md` 的常見問題區塊
2. 確認環境變數是否正確設定
3. 檢查瀏覽器 Console 是否有錯誤訊息
4. 確認 AdSense 帳戶狀態

---

**準備好了嗎？** 開始為您的工具頁面加入廣告，開始產生收入！💰

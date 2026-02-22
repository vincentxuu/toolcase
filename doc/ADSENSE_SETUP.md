# Google AdSense 設定指南

本專案已整合 Google AdSense 廣告系統。請依照以下步驟完成設定。

## 📋 前置需求

1. 已申請並通過 Google AdSense 審核
2. 已將網站加入 AdSense 帳戶

## 🚀 設定步驟

### 1. 取得 AdSense Client ID

1. 登入 [Google AdSense](https://adsense.google.com)
2. 前往「帳戶」→「帳戶資訊」
3. 複製「發布商 ID」（格式：`ca-pub-xxxxxxxxxxxxxxxx`）

### 2. 建立廣告單元

在 AdSense 後台建立以下廣告單元：

| 廣告位置 | 建議尺寸 | 廣告類型 | 用途 |
|---------|---------|---------|------|
| Header | 橫幅廣告 (728x90 或自動調整) | 多媒體廣告 | 頁面頂部 |
| Sidebar | 摩天大樓 (300x600) | 多媒體廣告 | 工具頁面側邊欄 |
| In-Content | 方形廣告 (300x250) | 多媒體廣告 | 內容中間 |
| Footer | 橫幅廣告 (728x90 或自動調整) | 多媒體廣告 | 頁面底部 |

建立步驟：
1. AdSense 後台 → 「廣告」→ 「依網站」→ 「廣告單元」
2. 點選「+ 建立廣告單元」
3. 選擇「多媒體廣告」
4. 設定名稱和尺寸
5. 點選「建立」並複製 `data-ad-slot` 的值（10 位數字）

### 3. 設定環境變數

建立 `.env.local` 檔案（此檔案不會被 Git 追蹤）：

```bash
cp .env.example .env.local
```

編輯 `.env.local`，填入您的 AdSense 資訊：

```env
# Google AdSense Client ID
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx

# Ad Slot IDs
NEXT_PUBLIC_AD_SLOT_HEADER=1234567890
NEXT_PUBLIC_AD_SLOT_SIDEBAR=1234567890
NEXT_PUBLIC_AD_SLOT_IN_CONTENT=1234567890
NEXT_PUBLIC_AD_SLOT_FOOTER=1234567890
```

### 4. 重新啟動開發伺服器

```bash
npm run dev
```

## 📍 在頁面中使用廣告

### 方法一：使用 AdSlot 元件（簡單）

```tsx
import AdSlot from '@/components/shared/AdSlot'

export default function MyToolPage() {
  return (
    <div>
      {/* 工具內容 */}
      <div className="tool-content">
        {/* ... */}
      </div>

      {/* 內容中廣告 */}
      <AdSlot adSlot="1234567890" />

      {/* FAQ 區塊 */}
      <section>
        {/* ... */}
      </section>
    </div>
  )
}
```

### 方法二：使用配置檔（推薦）

```tsx
import AdSlot from '@/components/shared/AdSlot'
import { adConfig, isAdSlotConfigured } from '@/config/ads'

export default function MyToolPage() {
  return (
    <div>
      {/* 工具內容 */}
      <div className="tool-content">
        {/* ... */}
      </div>

      {/* 使用配置檔中的廣告設定 */}
      {isAdSlotConfigured('inContent') && (
        <AdSlot
          adSlot={adConfig.slots.inContent.id}
          format={adConfig.slots.inContent.format}
          style={adConfig.slots.inContent.style}
        />
      )}

      {/* FAQ 區塊 */}
      <section>
        {/* ... */}
      </section>
    </div>
  )
}
```

## 🎯 建議的廣告位置策略

根據 toolcase roadmap，建議採用以下策略：

### 高 RPM 工具（金融、健康類）
- ✅ 頁面頂部：橫幅廣告
- ✅ 側邊欄：摩天大樓廣告（桌面版）
- ✅ 內容中：2-3 個方形廣告
- ✅ 頁面底部：橫幅廣告

### 一般工具
- ✅ 內容中：1 個方形廣告
- ✅ 頁面底部：橫幅廣告

### 首頁
- ✅ 頁面頂部：橫幅廣告
- ✅ 工具列表中間：穿插 1-2 個廣告

## 🔍 測試廣告顯示

### 開發環境測試
1. 確認 `.env.local` 已正確設定
2. 重新啟動開發伺服器
3. 開啟瀏覽器檢查元素，確認廣告 `<ins>` 標籤存在
4. 檢查是否有 AdSense script 載入錯誤

### 常見問題

**Q: 廣告不顯示？**
- 確認 AdSense 帳戶已通過審核
- 確認網站已加入 AdSense
- 新廣告單元可能需要幾小時才會開始顯示
- 檢查瀏覽器 Console 是否有錯誤訊息
- 確認已關閉廣告攔截器

**Q: 顯示空白區塊？**
- AdSense 可能沒有合適的廣告可投放
- 某些地區或語言的廣告填充率較低
- 等待幾小時讓 AdSense 學習您的內容

**Q: 開發環境看不到廣告？**
- AdSense 在 localhost 可能不會顯示廣告
- 建議部署到正式環境（或使用 ngrok）測試

## 📊 AdSense 政策提醒

1. ⚠️ **不要點擊自己的廣告**（會導致帳戶被停權）
2. ⚠️ **不要鼓勵使用者點擊廣告**
3. ⚠️ **每個頁面最多 3 個內容廣告**（舊政策，新政策已放寬但仍需適度）
4. ⚠️ **確保廣告與內容有明確區隔**
5. ✅ **健康、金融類內容需加上免責聲明**

## 🚀 部署注意事項

### Vercel 部署
1. 在 Vercel 專案設定中加入環境變數
2. Settings → Environment Variables
3. 加入 `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 和相關 AD_SLOT 變數
4. 重新部署

### 其他平台
確保在部署平台的環境變數設定中加入所有 `NEXT_PUBLIC_*` 變數。

## 📈 優化建議

1. **優先在高 RPM 工具加入廣告**（房貸、複利、BMI 計算器等）
2. **使用 A/B 測試找出最佳廣告位置**
3. **定期檢查 AdSense 報表，優化表現不佳的廣告位**
4. **確保廣告不影響使用者體驗**（載入速度、版面配置）
5. **移動版使用自動調整廣告**

## 🔗 相關資源

- [Google AdSense 說明中心](https://support.google.com/adsense)
- [AdSense 政策中心](https://support.google.com/adsense/answer/48182)
- [Next.js Script 優化](https://nextjs.org/docs/app/api-reference/components/script)

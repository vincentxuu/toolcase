# Bug 分析報告: "resolve is not a function"

## 📋 基本資訊

| 項目 | 詳情 |
|------|------|
| **錯誤訊息** | `TypeError: resolve is not a function` |
| **影響 Worker** | `toolcase-cat-dev-production` |
| **影響範圍** | `/dev/*` 分類下的所有工具頁面 |
| **失敗率** | 100% (Worker 初始化即失敗) |
| **執行時間** | ~2ms (立即失敗) |
| **Next.js 版本** | 15.5.9 |
| **發現時間** | 2026-02-23 |

## 🔍 技術分析

### 1. 錯誤堆疊追蹤

```
worker-cat-dev.js:7365:35   ← next/dist/server/require-hook.js
    ↓ (__require3)
worker-cat-dev.js:149250:5  ← next/dist/server/next-server.js
    ↓ (__require3)
worker-cat-dev.js:154200:34 ← .open-next/server-functions/cat-dev/index.mjs
    ↓ (__init)
worker-cat-dev.js:201708:43 ← Worker entry point
```

### 2. 根本原因

#### 問題源碼 (`next/dist/server/require-hook.js:36`)

```javascript
// Next.js 假設 require.resolve 存在
let resolve = process.env.NEXT_MINIMAL
    ? __non_webpack_require__.resolve
    : require.resolve;

// 立即使用 resolve 函數
const defaultOverrides = {
    'styled-jsx': path.dirname(resolve('styled-jsx/package.json')),
    'styled-jsx/style': resolve('styled-jsx/style'),
    'styled-jsx/style.js': resolve('styled-jsx/style')
};
```

#### 執行環境差異

| 環境 | `require` 物件 | `require.resolve` |
|------|---------------|-------------------|
| **Node.js** | 原生 CommonJS | ✅ 存在 |
| **esbuild 打包後** | `__require3` (自訂函數) | ❌ 不存在 |
| **Cloudflare Workers** | esbuild 打包的產物 | ❌ 不存在 |

#### 為什麼會這樣?

1. **esbuild 的 CommonJS 轉換**
   - esbuild 將 CommonJS 模組轉換為自己的載入系統
   - 生成的 `__require3` 函數只是一個簡單的模組載入器
   - **不包含** `require.resolve` 方法

2. **Cloudflare Workers 環境限制**
   - 雖然有 `nodejs_compat_v2` 相容層
   - 但不是完整的 Node.js runtime
   - 無法在 runtime 提供 `require.resolve`

3. **打包時機問題**
   - `require-hook.js` 的程式碼在**模組載入時**立即執行 (第 39-41 行)
   - 不是在請求處理時才執行
   - 所以 Worker 初始化階段就失敗了

### 3. 為什麼本地開發沒問題?

```bash
# 本地開發
pnpm dev  # 使用 Node.js runtime ✅

# Cloudflare Workers
pnpm build:cf  # esbuild 打包 → 轉換 CommonJS → 失去 require.resolve ❌
```

## 🎯 解決方案

### 方案 A: 設定 Wrangler Build 環境變數 (✅ 已採用)

透過環境變數告訴 Wrangler 使用 Node.js 平台的模組解析策略:

```bash
# .env
WRANGLER_BUILD_PLATFORM=node
WRANGLER_BUILD_CONDITIONS=""
```

**原理:**
- 強制 esbuild 使用 `platform: 'node'` 模式
- 保留更多 Node.js API 的相容性
- esbuild 會嘗試 polyfill `require.resolve`

**GitHub Actions 配置:**

```yaml
- name: Build for Cloudflare
  run: pnpm build:cf
  env:
    WRANGLER_BUILD_PLATFORM: node
    WRANGLER_BUILD_CONDITIONS: ""
```

### 方案 B: 升級依賴 (待測試)

```bash
# 升級到最新版本,可能包含修復
pnpm update @opennextjs/cloudflare next
```

### 方案 C: 使用 Edge Runtime (不推薦)

將 Next.js 頁面改用 Edge Runtime,但會失去部分 Node.js API:

```typescript
export const runtime = 'edge';
```

❌ **不適合**,因為工具組件需要完整的 Node.js 功能。

## 📊 影響評估

### 受影響的頁面

所有 `/dev/*` 分類的工具:
- Unicode Converter
- JSON Formatter
- Base64 Encoder/Decoder
- Hash Generator
- ... (約 30+ 個 dev 工具)

### 使用者影響

- ❌ 所有訪問 `/dev/*` 的請求都返回 500 錯誤
- ❌ 無法使用任何開發者工具
- ✅ 其他分類 (finance, health, etc.) 可能也有相同問題

### 商業影響

- 🔴 **嚴重性: 高** - 核心功能完全無法使用
- 📉 SEO 影響: 所有 `/dev/*` 頁面返回 500
- 👥 使用者流失: 開發者工具是主要流量來源

## ✅ 修復狀態

### 已完成
- ✅ 建立 `.env` 檔案,設定 `WRANGLER_BUILD_PLATFORM=node`
- ✅ 更新 `.gitignore` 忽略 `.env`
- ✅ 修正 GitHub Actions 使用 `pnpm build:cf`
- ✅ 在 CI/CD 中設定環境變數

### 待辦事項
- [ ] 本地測試: `pnpm build:cf && pnpm deploy:preview`
- [ ] 監控 GitHub Actions 建置
- [ ] 驗證生產環境修復
- [ ] 檢查其他分類是否有相同問題

### 驗證步驟

1. **本地建置測試**
   ```bash
   pnpm build:cf
   # 檢查 .open-next/server-functions/cat-dev/ 是否正常建置
   ```

2. **Preview 部署測試**
   ```bash
   pnpm deploy:preview
   # 訪問: https://toolcase-preview.workers.dev/dev/unicode-converter
   ```

3. **生產環境驗證**
   - 訪問之前失敗的 URL
   - 檢查 Cloudflare Workers 日誌
   - 確認沒有新的錯誤

## 📚 參考資料

- [OpenNext Cloudflare Troubleshooting](https://opennext.js.org/cloudflare/troubleshooting)
- [Cloudflare Workers Next.js Guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
- [esbuild Platform Documentation](https://esbuild.github.io/api/#platform)
- [Next.js require-hook.js Source](https://github.com/vercel/next.js/blob/canary/packages/next/src/server/require-hook.ts)

## 📝 學習筆記

### 關鍵教訓

1. **環境差異很重要**
   - 本地開發 ≠ 生產環境
   - Node.js ≠ Cloudflare Workers
   - 必須在類似生產的環境中測試

2. **打包工具會改變程式碼**
   - esbuild 轉換 CommonJS 模組系統
   - 不是所有 Node.js API 都能在瀏覽器環境使用
   - 需要明確指定 platform

3. **環境變數很關鍵**
   - `WRANGLER_BUILD_PLATFORM` 影響打包策略
   - CI/CD 不會自動載入 `.env` 檔案
   - 必須在 workflow 中明確設定

### 預防措施

1. **建立 staging 環境**
   - Preview 部署應該在 merge 前測試
   - 自動化 E2E 測試

2. **監控和告警**
   - 設定 Cloudflare Workers 錯誤告警
   - 監控 500 錯誤率

3. **文檔化部署流程**
   - 記錄必要的環境變數
   - 建立部署檢查清單

---

**分析完成時間:** 2026-02-23
**分析者:** Claude Code
**狀態:** 🔧 修復中

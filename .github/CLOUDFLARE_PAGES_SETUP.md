# Cloudflare Pages 設置指南

本文檔說明如何在 Cloudflare Pages 上設置 toolcase 項目。

## 前置需求

1. Cloudflare 帳號
2. GitHub 帳號並連接到 Cloudflare
3. 專案已推送到 GitHub

## 在 Cloudflare Dashboard 設置

### 1. 創建 Pages 專案

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 選擇 **Workers & Pages**
3. 點擊 **Create application**
4. 選擇 **Pages** 標籤
5. 點擊 **Connect to Git**

### 2. 連接 GitHub 儲存庫

1. 選擇您的 GitHub 帳號
2. 選擇 `toolcase` 儲存庫
3. 點擊 **Begin setup**

### 3. 配置構建設置

**生產分支 (Production branch):**
```
main
```

**預覽分支 (Preview branches):**
```
develop
```

**構建設置 (Build configuration):**

| 設定項目 | 值 |
|---------|-----|
| Framework preset | None |
| Build command | `pnpm pages:build` |
| Build output directory | `.vercel/output/static` |
| Root directory | `/` |
| Node version | `20.x` |

**環境變數 (Environment variables):**

如果需要設置 AdSense 等環境變數:
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
- `NEXT_PUBLIC_AD_SLOT_*`

### 4. 部署

點擊 **Save and Deploy** 開始第一次部署。

## 自訂網域設置

### 1. 添加自訂網域

1. 進入 Pages 專案
2. 點擊 **Custom domains** 標籤
3. 點擊 **Set up a custom domain**
4. 輸入 `toolcase.cc`
5. 按照指示配置 DNS 記錄

### 2. 添加 www 子網域

1. 重複上述步驟
2. 輸入 `www.toolcase.cc`
3. 配置 CNAME 記錄

### 3. DNS 設置

在 Cloudflare DNS 設置中添加:

```
Type: CNAME
Name: @
Content: toolcase.pages.dev
Proxied: Yes (橘色雲朵)

Type: CNAME
Name: www
Content: toolcase.pages.dev
Proxied: Yes (橘色雲朵)
```

## GitHub Actions 設置

### 所需 Secrets

在 GitHub 儲存庫設置中添加以下 secrets:

1. **CLOUDFLARE_API_TOKEN**
   - 前往 [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - 點擊 **Create Token**
   - 使用 **Edit Cloudflare Workers** 模板
   - 或自訂權限:
     - Account > Cloudflare Pages > Edit
     - Zone > Cache Purge > Purge

2. **CLOUDFLARE_ACCOUNT_ID**
   - 在 Cloudflare Dashboard 右側欄位可找到
   - 或前往 **Workers & Pages** > 選擇專案 > **Settings** > **Account ID**

3. **CLOUDFLARE_ZONE_ID**
   - 前往 **Websites**
   - 選擇 `toolcase.cc` 網域
   - 在右側欄位找到 **Zone ID**

### 驗證部署

1. 推送代碼到 `main` 分支
2. 檢查 GitHub Actions 是否成功執行
3. 訪問 https://toolcase.cc 驗證部署

## 本地開發與預覽

### 安裝依賴

```bash
pnpm install
```

### 本地開發

```bash
pnpm dev
```

### 本地構建並預覽

```bash
pnpm pages:build
pnpm preview
```

### 手動部署(可選)

```bash
pnpm pages:deploy
```

## 效能優化

### 快取設置

Cloudflare Pages 自動處理快取,但可以在 Pages 設置中調整:

1. 前往專案設置
2. 選擇 **Functions** 標籤
3. 配置快取規則(如需要)

### 快取清除

生產環境部署後,GitHub Actions 會自動清除 Cloudflare 快取。

手動清除快取:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

## 監控與日誌

### 查看部署日誌

1. 前往 Cloudflare Dashboard
2. 選擇 **Workers & Pages**
3. 選擇 `toolcase` 專案
4. 點擊 **Deployments** 查看部署歷史
5. 點擊特定部署查看詳細日誌

### 查看即時日誌

```bash
wrangler pages deployment tail
```

## 故障排除

### 構建失敗

1. 檢查 `pnpm-lock.yaml` 是否已提交
2. 確認 Node.js 版本為 20.x
3. 檢查 Cloudflare Pages 構建日誌

### 404 錯誤

1. 確認 build output directory 設置為 `.vercel/output/static`
2. 確認 `pnpm pages:build` 成功完成
3. 檢查路由配置

### API Routes 不工作

確認使用 `@cloudflare/next-on-pages` 而非純靜態導出。

## 更多資源

- [Cloudflare Pages 文檔](https://developers.cloudflare.com/pages/)
- [@cloudflare/next-on-pages 文檔](https://github.com/cloudflare/next-on-pages)
- [Next.js 文檔](https://nextjs.org/docs)

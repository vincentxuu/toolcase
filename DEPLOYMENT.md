# Toolcase - Cloudflare Workers 部署指南

本專案已配置為可以部署到 Cloudflare Workers，並使用 GitHub Actions 進行自動化 CI/CD 部署。

## 📋 前置需求

1. **Cloudflare 帳號**
   - 註冊帳號：https://dash.cloudflare.com/sign-up
   - 需要一個已添加到 Cloudflare 的網域（可選，用於自訂網域）

2. **Node.js 環境**
   - Node.js 20.x 或更高版本
   - npm 10.x 或更高版本

3. **GitHub 儲存庫**
   - 已推送到 GitHub 的專案儲存庫

## 🚀 本地開發

### 1. 安裝依賴

```bash
npm install
```

### 2. 啟動開發伺服器

```bash
npm run dev
```

開啟瀏覽器訪問 `http://localhost:3000`

### 3. 本地預覽 Cloudflare 建置

```bash
# 建置專案
npm run build

# 使用 wrangler 本地預覽
npm run wrangler pages dev .next
```

## ⚙️ Cloudflare 設置

### 1. 取得 Cloudflare API Token

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 點擊右上角個人資料 → **My Profile**
3. 選擇 **API Tokens** → **Create Token**
4. 使用 "Edit Cloudflare Workers" 模板或自訂權限：
   - Account - Cloudflare Workers Scripts: **Edit**
   - Zone - Workers Routes: **Edit** (如果使用自訂網域)
5. 複製生成的 Token（只會顯示一次）

### 2. 取得 Zone ID（選用，用於清除快取）

1. 在 Cloudflare Dashboard 中選擇您的網域
2. 在 Overview 頁面右側找到 **Zone ID**
3. 複製 Zone ID

### 3. 設置 GitHub Secrets

在您的 GitHub 儲存庫中設置以下 Secrets：

1. 進入儲存庫 → **Settings** → **Secrets and variables** → **Actions**
2. 點擊 **New repository secret** 添加：

| Secret 名稱 | 說明 | 必需 |
|------------|------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token | ✅ 必需 |
| `CLOUDFLARE_ZONE_ID` | Cloudflare Zone ID（用於清除快取） | ⚠️ 選用 |

## 🔧 配置網域路由

編輯 `wrangler.toml` 檔案，設置您的網域路由：

```toml
# 預覽環境
[env.preview]
name = "toolcase-preview"
routes = [
  { pattern = "preview.yourdomain.com/*", zone_name = "yourdomain.com" }
]

# 正式環境
[env.production]
name = "toolcase-production"
routes = [
  { pattern = "yourdomain.com/*", zone_name = "yourdomain.com" },
  { pattern = "www.yourdomain.com/*", zone_name = "yourdomain.com" }
]
```

## 📦 手動部署

### 部署到預覽環境

```bash
npm run deploy:preview
```

### 部署到正式環境

```bash
npm run deploy:production
```

## 🤖 自動化 CI/CD 部署

本專案已配置 GitHub Actions，會在以下情況自動部署：

### 自動觸發條件

- **推送到 `main` 分支** → 自動部署到 **production** 環境
- **推送到 `develop` 分支** → 自動部署到 **preview** 環境
- **建立 Pull Request 到 `main`** → 執行 Lint & Build 檢查（不部署）

### 手動部署

1. 進入 GitHub 儲存庫
2. 點擊 **Actions** 標籤
3. 選擇 "Deploy to Cloudflare Workers" workflow
4. 點擊 **Run workflow**
5. 選擇要部署的環境（preview 或 production）
6. 點擊 **Run workflow** 確認

## 🔍 部署驗證

### 查看部署狀態

1. **GitHub Actions**
   - 在 GitHub 儲存庫的 Actions 標籤查看工作流程執行狀態

2. **Cloudflare Dashboard**
   - 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 選擇 **Workers & Pages**
   - 查看 `toolcase-preview` 或 `toolcase-production` 的部署狀態

### 查看即時日誌

使用 wrangler 查看 Worker 即時日誌：

```bash
# 預覽環境
npx wrangler tail --env preview

# 正式環境
npx wrangler tail --env production
```

## 📝 環境變數

如果您的應用需要環境變數，可以透過以下方式設置：

### 方式一：在 wrangler.toml 中設置（公開變數）

```toml
[env.production.vars]
ENVIRONMENT = "production"
YOUR_PUBLIC_VAR = "value"
```

### 方式二：使用 wrangler secret（敏感資訊）

```bash
# 設置 secret
echo "your_secret_value" | npx wrangler secret put SECRET_NAME --env production
```

### 方式三：在 GitHub Actions 中設置

在 `.github/workflows/deploy.yml` 的 build 步驟中添加環境變數：

```yaml
- name: Build application
  run: npm run build
  env:
    NEXT_PUBLIC_YOUR_VAR: ${{ secrets.YOUR_SECRET }}
```

## 🎯 部署檢查清單

在首次部署前，請確認：

- [ ] 已安裝所有依賴 (`npm install`)
- [ ] 已在 GitHub 設置 `CLOUDFLARE_API_TOKEN` Secret
- [ ] 已在 `wrangler.toml` 中配置正確的網域路由（如果使用自訂網域）
- [ ] 本地測試通過 (`npm run build`)
- [ ] 已推送程式碼到 GitHub

## ❓ 常見問題

### Q: 部署後網站無法訪問？

A: 檢查以下幾點：
1. 確認 `wrangler.toml` 中的路由設置正確
2. 確認網域已正確添加到 Cloudflare
3. 檢查 Cloudflare Dashboard 中 Worker 的狀態

### Q: GitHub Actions 部署失敗？

A: 常見原因：
1. 檢查 `CLOUDFLARE_API_TOKEN` 是否正確設置
2. 檢查 API Token 權限是否足夠
3. 查看 Actions 日誌中的詳細錯誤訊息

### Q: 如何回滾到之前的版本？

A:
1. 在 Cloudflare Dashboard → Workers & Pages 中選擇您的 Worker
2. 點擊 **Deployments** 標籤
3. 找到之前的部署版本，點擊 **Rollback**

## 📚 參考資料

- [Cloudflare Workers 文件](https://developers.cloudflare.com/workers/)
- [Wrangler CLI 文件](https://developers.cloudflare.com/workers/wrangler/)
- [OpenNext.js Cloudflare Adapter](https://opennext.js.org/cloudflare)
- [GitHub Actions 文件](https://docs.github.com/en/actions)

## 🆘 需要協助？

如果遇到問題，請：
1. 查看 GitHub Actions 的執行日誌
2. 檢查 Cloudflare Dashboard 中的 Worker 日誌
3. 參考上述常見問題解答
4. 在專案儲存庫中提交 Issue

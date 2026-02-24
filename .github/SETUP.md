# GitHub Actions 設置指南

## 必要的 Secrets 配置

要啟用自動部署,請在 GitHub Repository Settings → Secrets and variables → Actions 中添加以下 secrets:

### 1. CLOUDFLARE_API_TOKEN

**用途:** 用於部署到 Cloudflare Workers

**如何獲取:**
1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 前往 "My Profile" → "API Tokens"
3. 點擊 "Create Token"
4. 使用 "Edit Cloudflare Workers" 模板
5. 設定權限:
   - Account > Workers Scripts > Edit
   - Account > Workers KV Storage > Edit (如果使用 KV)
   - Zone > Workers Routes > Edit
6. 複製生成的 token

### 2. CLOUDFLARE_ZONE_ID

**用途:** 用於在生產部署後清除 Cloudflare 緩存

**如何獲取:**
1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 選擇你的網站 (toolcase.cc)
3. 在右側欄找到 "API" 區塊
4. 複製 "Zone ID"

## 可選的 Secrets

如果你使用 Google AdSense 或 Analytics,可以添加:

- `ADSENSE_CLIENT_ID` - Google AdSense 客戶端 ID
- `GA_ID` - Google Analytics Measurement ID

## 驗證設置

設置完成後:

1. **測試手動觸發:**
   - 前往 Actions → Deploy to Cloudflare Workers
   - 點擊 "Run workflow"
   - 選擇 `preview` 環境並執行

2. **測試自動部署:**
   - 創建一個 PR 到 `main` 分支
   - 檢查是否自動運行 quality check
   - 合併 PR 後檢查是否自動部署

3. **檢查部署日誌:**
   - 前往 Actions 查看部署狀態
   - 檢查 deployment summary 確認所有 workers 都成功部署

## 常見問題

### Q: 部署失敗提示 "Authentication error"

**A:** 檢查 `CLOUDFLARE_API_TOKEN` 是否正確設置,並確認 token 有足夠的權限。

### Q: Cache purge 失敗

**A:** 確認 `CLOUDFLARE_ZONE_ID` 設置正確,並且 API token 有 "Cache Purge" 權限。

### Q: 如何停用自動部署?

**A:** 在 `.github/workflows/deploy.yml` 中將對應的 workflow 禁用,或移除該文件。

## 支援

遇到問題請查看:
- [GitHub Actions 文檔](https://docs.github.com/en/actions)
- [Cloudflare Workers 文檔](https://developers.cloudflare.com/workers/)
- [Wrangler CLI 文檔](https://developers.cloudflare.com/workers/wrangler/)

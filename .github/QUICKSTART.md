# 🚀 Cloudflare Pages 快速入門

## 本地開發

### 1. 安裝依賴

```bash
pnpm install
```

### 2. 啟動開發伺服器

```bash
pnpm dev
```

訪問: http://localhost:3000

### 3. 構建並預覽

```bash
# 構建 Cloudflare Pages
pnpm pages:build

# 本地預覽(使用 wrangler)
pnpm preview
```

訪問: http://localhost:8788

## 部署到 Cloudflare Pages

### 方法 1: 透過 Cloudflare Dashboard (推薦)

1. **登入 Cloudflare Dashboard**
   - 前往 https://dash.cloudflare.com/
   - 選擇 **Workers & Pages**

2. **創建 Pages 專案**
   - 點擊 **Create application** > **Pages** > **Connect to Git**
   - 選擇您的 GitHub 儲存庫

3. **配置構建設置**
   ```
   Framework preset: None
   Build command: pnpm pages:build
   Build output directory: .vercel/output/static
   Root directory: /
   Node version: 20.x
   ```

4. **設置環境變數(可選)**
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
   - `NEXT_PUBLIC_AD_SLOT_*`

5. **部署**
   - 點擊 **Save and Deploy**
   - 等待部署完成

### 方法 2: 透過 GitHub Actions (自動化)

1. **設置 GitHub Secrets**

   在 GitHub 儲存庫設置中添加:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_ZONE_ID`

2. **推送代碼**
   ```bash
   # 推送到 develop 分支 → 預覽部署
   git push origin develop

   # 推送到 main 分支 → 生產部署
   git push origin main
   ```

3. **查看部署狀態**
   - GitHub Actions 標籤頁
   - Cloudflare Pages 儀表板

### 方法 3: 手動部署(本地)

```bash
# 構建
pnpm pages:build

# 部署到 Cloudflare Pages
pnpm pages:deploy
```

首次部署會提示登入 Cloudflare。

## 常用指令

```bash
# 開發
pnpm dev                    # 啟動開發伺服器
pnpm pages:watch            # 構建並監聽變更

# 構建
pnpm build                  # Next.js 標準構建
pnpm pages:build            # Cloudflare Pages 構建

# 預覽
pnpm preview                # 本地預覽(wrangler)

# 部署
pnpm pages:deploy           # 手動部署到 Pages

# 質量檢查
pnpm lint                   # ESLint
pnpm typecheck              # TypeScript 類型檢查
```

## 目錄結構

```
toolcase/
├── .github/
│   ├── workflows/
│   │   └── deploy.yml              # GitHub Actions 部署
│   ├── CLOUDFLARE_PAGES_SETUP.md   # 詳細設置指南
│   ├── MIGRATION.md                # 遷移文檔
│   └── QUICKSTART.md               # 本文件
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (en)/                   # 英文路由
│   │   ├── zh-tw/                  # 中文路由
│   │   └── api/                    # API Routes
│   ├── components/                 # React 組件
│   ├── i18n/                       # 國際化
│   └── lib/                        # 工具函數
├── public/                         # 靜態資源
├── .vercel/output/static/          # 構建輸出(git ignored)
├── next.config.mjs                 # Next.js 配置
├── wrangler.toml                   # Cloudflare Pages 配置
└── package.json                    # 專案配置
```

## 故障排除

### 問題: 構建失敗

```bash
# 清除快取並重新構建
rm -rf .next .vercel node_modules pnpm-lock.yaml
pnpm install
pnpm pages:build
```

### 問題: 本地預覽不工作

```bash
# 確保先構建
pnpm pages:build

# 再啟動預覽
pnpm preview
```

### 問題: 部署後 API Routes 不工作

確認:
1. API route 文件在 `src/app/api/` 目錄
2. 使用 `@cloudflare/next-on-pages` (不是純靜態導出)
3. `next.config.mjs` 沒有 `output: 'export'`

### 問題: 環境變數未生效

1. 確保變數名稱以 `NEXT_PUBLIC_` 開頭(客戶端)
2. 在 Cloudflare Pages 設置中添加環境變數
3. 重新部署

## 更多資源

- [詳細設置指南](.github/CLOUDFLARE_PAGES_SETUP.md)
- [遷移文檔](.github/MIGRATION.md)
- [CLAUDE.md](../CLAUDE.md) - 專案開發指南
- [Cloudflare Pages 文檔](https://developers.cloudflare.com/pages/)

## 需要幫助?

- [GitHub Issues](https://github.com/your-username/toolcase/issues)
- [Cloudflare Discord](https://discord.gg/cloudflaredev)

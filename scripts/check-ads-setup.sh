#!/bin/bash

# 廣告設定檢查腳本
# 用途：檢查專案的廣告設定狀態

echo "🔍 檢查 toolcase 廣告設定狀態..."
echo ""

# 檢查環境變數檔案
echo "📁 環境變數檔案："
if [ -f ".env.local" ]; then
    echo "  ✅ .env.local 存在"

    # 檢查必要的環境變數
    if grep -q "NEXT_PUBLIC_ADSENSE_CLIENT_ID=" .env.local; then
        CLIENT_ID=$(grep "NEXT_PUBLIC_ADSENSE_CLIENT_ID=" .env.local | cut -d'=' -f2)
        if [ -n "$CLIENT_ID" ]; then
            echo "  ✅ ADSENSE_CLIENT_ID 已設定"
        else
            echo "  ⚠️  ADSENSE_CLIENT_ID 為空，請設定您的 AdSense Publisher ID"
        fi
    else
        echo "  ❌ 缺少 ADSENSE_CLIENT_ID，請參考 .env.example"
    fi

    if grep -q "NEXT_PUBLIC_AD_SLOT_IN_CONTENT=" .env.local; then
        echo "  ✅ AD_SLOT_IN_CONTENT 已設定"
    else
        echo "  ⚠️  AD_SLOT_IN_CONTENT 未設定（可選）"
    fi
else
    echo "  ❌ .env.local 不存在"
    echo "     執行: cp .env.example .env.local"
fi

echo ""

# 檢查核心檔案
echo "📄 核心檔案："

if grep -q "adsbygoogle" src/app/layout.tsx; then
    echo "  ✅ src/app/layout.tsx - AdSense script 已載入"
else
    echo "  ❌ src/app/layout.tsx - 缺少 AdSense script"
fi

if [ -f "src/components/shared/AdSlot.tsx" ]; then
    echo "  ✅ src/components/shared/AdSlot.tsx - 元件存在"
else
    echo "  ❌ src/components/shared/AdSlot.tsx - 元件不存在"
fi

if [ -f "src/config/ads.ts" ]; then
    echo "  ✅ src/config/ads.ts - 配置檔案存在"
else
    echo "  ❌ src/config/ads.ts - 配置檔案不存在"
fi

echo ""

# 檢查已使用廣告的頁面
echo "📊 已整合廣告的頁面："
AD_PAGES=$(grep -r "AdSlot" src/app --include="*.tsx" | grep -v "layout.tsx" | wc -l | xargs)

if [ "$AD_PAGES" -gt 0 ]; then
    echo "  找到 $AD_PAGES 個使用廣告的頁面"
    grep -r "AdSlot" src/app --include="*.tsx" -l | grep -v "layout.tsx" | head -10 | while read file; do
        echo "    - $file"
    done
else
    echo "  ⚠️  尚未有頁面使用廣告"
    echo "     參考 EXAMPLE_WITH_ADS.tsx 開始整合"
fi

echo ""

# 建議的下一步
echo "💡 建議的下一步："
if [ ! -f ".env.local" ]; then
    echo "  1. 建立 .env.local: cp .env.example .env.local"
    echo "  2. 填入您的 AdSense Publisher ID"
    echo "  3. 重新啟動開發伺服器: npm run dev"
elif [ "$AD_PAGES" -eq 0 ]; then
    echo "  1. 參考 EXAMPLE_WITH_ADS.tsx 範例"
    echo "  2. 優先為高 RPM 工具加入廣告（金融、健康類）"
    echo "  3. 參考 README_ADS.md 的優先級列表"
else
    echo "  ✅ 廣告設定完成！"
    echo "  📈 繼續為更多頁面加入廣告以提升收入"
fi

echo ""
echo "📚 更多資訊："
echo "  - ADSENSE_SETUP.md - 完整設定指南"
echo "  - EXAMPLE_WITH_ADS.tsx - 程式碼範例"
echo "  - README_ADS.md - 快速開始指南"

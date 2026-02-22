/**
 * 廣告配置檔案
 *
 * 使用說明：
 * 1. 在 .env.local 設定 NEXT_PUBLIC_ADSENSE_CLIENT_ID
 * 2. 在 AdSense 後台建立廣告單元，取得 ad slot ID
 * 3. 在此檔案中配置不同位置的廣告參數
 */

export const adConfig = {
  // 是否啟用廣告（可用於開發環境關閉廣告）
  enabled: !!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,

  // AdSense Client ID
  clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',

  // 不同位置的廣告配置
  slots: {
    // 頁面頂部橫幅廣告（推薦用於首頁）
    header: {
      id: process.env.NEXT_PUBLIC_AD_SLOT_HEADER || '',
      format: 'horizontal' as const,
      style: { minHeight: '90px' },
    },

    // 側邊欄廣告（推薦用於工具頁面右側）
    sidebar: {
      id: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || '',
      format: 'vertical' as const,
      style: { minHeight: '600px' },
    },

    // 內容中廣告（推薦插入工具說明與常見問題之間）
    inContent: {
      id: process.env.NEXT_PUBLIC_AD_SLOT_IN_CONTENT || '',
      format: 'rectangle' as const,
      style: { minHeight: '250px' },
    },

    // 頁面底部廣告（推薦用於所有頁面 Footer 上方）
    footer: {
      id: process.env.NEXT_PUBLIC_AD_SLOT_FOOTER || '',
      format: 'horizontal' as const,
      style: { minHeight: '90px' },
    },

    // 自動調整型廣告（推薦用於移動裝置）
    auto: {
      id: process.env.NEXT_PUBLIC_AD_SLOT_IN_CONTENT || '', // 可與 inContent 共用
      format: 'auto' as const,
      style: { minHeight: '100px' },
    },
  },
} as const

/**
 * 檢查特定廣告位是否已配置
 */
export function isAdSlotConfigured(slotKey: keyof typeof adConfig.slots): boolean {
  return adConfig.enabled && !!adConfig.slots[slotKey].id
}

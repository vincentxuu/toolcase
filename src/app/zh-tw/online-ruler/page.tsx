import { Metadata } from 'next'
import OnlineRuler from '@/components/tools/OnlineRuler'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: '線上尺規 | 線上工具',
  description: '免費線上尺規工具,支援公分和英寸測量。可校準 DPI、旋轉方向、全螢幕顯示。用螢幕直接測量物品長度,方便實用。',
  keywords: ['線上尺規', '螢幕尺', '測量工具', '公分尺', '英寸尺', 'DPI 校準'],
}

export default async function Page() {
  const dict = await getDictionary('zh-tw')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">線上尺規</h1>
        <p className="mb-8 text-muted-foreground">
          用螢幕直接測量物品長度!支援公分和英寸兩種單位,可校準 DPI 以確保測量準確。提供橫向/直向切換、全螢幕模式。建議使用實體尺或信用卡(標準尺寸 8.56cm)先校準後再使用。
        </p>
        <OnlineRuler
          labels={{
            unit: '單位',
            cm: '公分',
            inch: '英寸',
            fullscreen: '全螢幕',
            rotate: '旋轉',
            calibrate: '校準',
            calibrateDesc: '調整 DPI 以符合您的螢幕',
            measureTip: '使用提示',
            actualSize: '實際尺寸',
            dpi: 'DPI',
          }}
        />
      </div>
    </main>
  )
}

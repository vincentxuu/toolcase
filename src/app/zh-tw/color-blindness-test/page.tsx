import { Metadata } from 'next'
import ColorBlindnessTest from '@/components/tools/ColorBlindnessTest'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: '色弱測試 | 線上工具',
  description: '免費線上色盲/色弱檢測工具,基於 Ishihara 色盲檢測圖。快速檢測紅綠色盲、色覺異常。僅供參考,詳細診斷請諮詢眼科醫師。',
  keywords: ['色盲測試', '色弱檢測', 'Ishihara 測試', '紅綠色盲', '色覺檢查', '視覺測試'],
}

export default async function Page() {
  const dict = await getDictionary('zh-tw')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">色盲/色弱測試</h1>
        <p className="mb-8 text-muted-foreground">
          簡易的線上色盲檢測工具!基於著名的 Ishihara 色盲檢測圖原理,快速檢測是否有紅綠色盲或其他色覺異常。此測試僅供初步篩檢參考,如需專業診斷,請諮詢眼科醫師。
        </p>
        <ColorBlindnessTest
          labels={{
            title: '色盲測試',
            subtitle: 'Ishihara 色盲檢測',
            start: '開始測試',
            next: '下一題',
            submit: '查看結果',
            restart: '重新測試',
            whatNumber: '您看到什麼數字?',
            enterAnswer: '輸入數字',
            correct: '正確',
            incorrect: '錯誤',
            result: '測試結果',
            normalVision: '色覺正常',
            possibleRedGreen: '可能有紅綠色盲',
            possibleProtan: '可能有紅色盲 (Protanopia)',
            possibleDeutan: '可能有綠色盲 (Deuteranopia)',
            disclaimer: '重要提醒',
            disclaimerText: '此測試僅供初步篩檢,不能取代專業醫療診斷。如有疑慮請諮詢眼科醫師。',
            howToUse: '使用說明',
            tip1: '在良好的光線環境下進行測試',
            tip2: '保持正常的觀看距離',
            tip3: '輸入您在每張圖中看到的數字',
          }}
        />
      </div>
    </main>
  )
}

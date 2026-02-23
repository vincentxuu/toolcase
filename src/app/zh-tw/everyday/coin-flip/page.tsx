import { Metadata } from 'next'
import CoinFlip from '@/components/tools/CoinFlip'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: '擲硬幣 | 線上隨機工具',
  description: '免費線上擲硬幣工具,隨機顯示正面或反面,適合決策、抽籤或遊戲使用。即時統計正反面次數。',
  keywords: ['擲硬幣', '隨機', '抽籤', '決策工具', '硬幣', 'coin flip'],
}

export default async function Page() {
  const dict = await getDictionary('zh-tw')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">擲硬幣</h1>
        <p className="mb-8 text-muted-foreground">
          隨機擲硬幣工具,幫助你快速做決定。點擊按鈕即可隨機顯示正面或反面。
        </p>
        <CoinFlip
          labels={{
            flip: '擲硬幣',
            reset: '重置',
            heads: '正面',
            tails: '反面',
            stats: '統計',
            result: '結果',
          }}
        />
      </div>
    </main>
  )
}

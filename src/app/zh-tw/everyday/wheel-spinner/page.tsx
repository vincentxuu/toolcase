import { Metadata } from 'next'
import WheelSpinner from '@/components/tools/WheelSpinner'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: '輪盤抽獎 | 線上工具',
  description: '免費線上輪盤抽獎工具,自訂選項、隨機抽獎。Canvas 動畫效果,適合團隊活動、抽獎、決策等場景。公平公正,隨機選擇。',
  keywords: ['輪盤抽獎', '隨機抽獎', '線上抽獎', '幸運輪盤', '決策工具', '抽籤工具'],
}

export default async function Page() {
  const dict = await getDictionary('zh-tw')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">輪盤抽獎</h1>
        <p className="mb-8 text-muted-foreground">
          有趣的線上輪盤抽獎工具!自訂選項內容,點擊旋轉開始抽獎。使用 Canvas 繪製精美動畫效果,公平公正的隨機選擇。適合團隊活動、抽獎活動、決策輔助等各種場景。
        </p>
        <WheelSpinner
          labels={{
            addOption: '新增選項',
            optionPlaceholder: '輸入選項內容...',
            spin: '開始抽獎!',
            reset: '重設',
            winner: '中獎結果:',
            minOptions: '至少需要 2 個選項才能抽獎',
            delete: '刪除',
          }}
        />
      </div>
    </main>
  )
}

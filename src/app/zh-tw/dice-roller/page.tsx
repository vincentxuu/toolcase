import { Metadata } from 'next'
import DiceRoller from '@/components/tools/DiceRoller'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: '擲骰子 | 線上隨機工具',
  description: '免費線上擲骰子工具,支援 1-6 個骰子同時擲。即時顯示點數和總和,記錄歷史結果。適合桌遊、決策使用。',
  keywords: ['擲骰子', '骰子', '隨機', '桌遊', 'dice roller', '遊戲工具'],
}

export default async function Page() {
  const dict = await getDictionary('zh-tw')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">擲骰子</h1>
        <p className="mb-8 text-muted-foreground">
          線上擲骰子工具,可選擇 1-6 個骰子同時擲。自動計算總和,並記錄歷史結果,適合桌遊、決策或遊戲使用。
        </p>
        <DiceRoller
          labels={{
            roll: '擲骰子',
            reset: '重置',
            diceCount: '骰子數量',
            result: '結果',
            total: '總和',
            history: '歷史紀錄',
          }}
        />
      </div>
    </main>
  )
}

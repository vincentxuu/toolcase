import { Metadata } from 'next'
import MindReader from '@/components/tools/MindReader'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: '讀心術遊戲 | 線上工具',
  description: '有趣的讀心術數學魔術遊戲!想一個數字,跟著步驟操作,系統將猜出你的想法。了解背後的數學原理,適合分享給朋友。',
  keywords: ['讀心術', '數學魔術', '互動遊戲', '猜數字', '魔術遊戲', '娛樂工具'],
}

export default async function Page() {
  const dict = await getDictionary('zh-tw')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">讀心術遊戲</h1>
        <p className="mb-8 text-muted-foreground">
          神奇的讀心術!想一個 1 到 10 之間的數字,跟著步驟進行簡單的數學運算,系統將準確猜出你最終的想法。這是一個經典的數學魔術,了解背後的原理後,你也可以用來驚艷朋友!
        </p>
        <MindReader
          labels={{
            title: '讀心術',
            subtitle: '我能讀出你的想法!',
            start: '開始',
            next: '下一步',
            restart: '重新開始',
            step1: '想一個 1 到 10 之間的數字',
            step2: '將它乘以 9',
            step3: '將結果的各位數字相加',
            step4: '將結果減去 5',
            step5: '將數字轉換成字母 (1=A, 2=B, 3=C, 4=D...)',
            result: '我知道你在想什麼!',
            resultText: '你想的字母是',
            howItWorks: '💡 原理揭秘',
            explanation: '數學原理',
            yourNumber: '你的數字',
            enterNumber: '輸入你的數字',
            tryAgain: '再玩一次',
          }}
        />
      </div>
    </main>
  )
}

import { Metadata } from 'next'
import LuckyNumberGenerator from '@/components/tools/LuckyNumberGenerator'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: '幸運號碼產生器 | 線上隨機工具',
  description: '免費線上幸運號碼產生器,可自訂範圍、數量,支援樂透號碼、密碼產生。隨機產生你的幸運數字。',
  keywords: ['幸運號碼', 'lucky number', '樂透', '隨機數字', '號碼產生器'],
}

export default async function Page() {
  const dict = await getDictionary('zh-tw')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">幸運號碼產生器</h1>
        <p className="mb-8 text-muted-foreground">
          產生你的幸運數字!可自訂數字範圍、數量,支援樂透號碼、密碼產生等多種用途。讓隨機決定你的幸運號碼。
        </p>
        <LuckyNumberGenerator
          labels={{
            generate: '產生號碼',
            minNumber: '最小值',
            maxNumber: '最大值',
            count: '數量',
            allowDuplicates: '允許重複',
            sort: '排序',
            result: '你的幸運號碼',
            copy: '複製',
            copied: '已複製!',
            generateAgain: '重新產生',
          }}
        />
      </div>
    </main>
  )
}

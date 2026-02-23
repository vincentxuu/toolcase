import { Metadata } from 'next'
import Counter from '@/components/tools/Counter'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: '計數器 | 線上實用工具',
  description: '免費線上計數器工具,支援多計數器、自訂步進值、目標設定。自動儲存計數,適合計數、統計使用。',
  keywords: ['計數器', 'counter', '計數工具', '統計', '累計'],
}

export default async function Page() {
  const dict = await getDictionary('zh-tw')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">計數器</h1>
        <p className="mb-8 text-muted-foreground">
          線上計數器工具,支援多個計數器同時使用。可自訂步進值、設定目標值,自動儲存計數狀態。適合活動計數、統計使用。
        </p>
        <Counter
          labels={{
            addCounter: '新增計數器',
            reset: '重置',
            step: '步進值',
            target: '目標',
            optional: '選填',
            counterName: '計數器名稱',
            delete: '刪除',
          }}
        />
      </div>
    </main>
  )
}

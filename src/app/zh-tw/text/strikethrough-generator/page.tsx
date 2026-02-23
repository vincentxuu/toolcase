import { Metadata } from 'next'
import StrikethroughGenerator from '@/components/tools/StrikethroughGenerator'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: '文字刪除線產生器 | 線上工具',
  description: '免費線上文字刪除線產生器,支援單線、雙線、斜線、波浪線、X標記等多種刪除線樣式。可直接複製到社群媒體使用,支援中英文。',
  keywords: ['刪除線', '文字刪除線', '刪除線產生器', 'Unicode 刪除線', '社群媒體文字'],
}

export default async function Page() {
  const dict = await getDictionary('zh-tw')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">文字刪除線產生器</h1>
        <p className="mb-8 text-muted-foreground">
          輕鬆產生各種刪除線文字效果!支援單線、雙線、斜線、波浪線、X標記等樣式,使用 Unicode 組合字元產生,可直接複製到 Facebook、Instagram、Twitter 等社群媒體使用。
        </p>
        <StrikethroughGenerator
          labels={{
            inputText: '輸入文字',
            inputPlaceholder: '在此輸入您的文字...',
            results: '結果',
            copy: '複製',
            copied: '已複製!',
            type1: '單線刪除線',
            type2: '雙線刪除線',
            type3: '斜線刪除線',
            type4: '波浪線',
            type5: 'X 標記',
          }}
        />
      </div>
    </main>
  )
}

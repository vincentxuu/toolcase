import { Metadata } from 'next'
import FancyFontGenerator from '@/components/tools/FancyFontGenerator'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: 'Instagram 字體產生器 | 線上工具',
  description: '免費線上 Instagram 字體產生器,提供粗體、斜體、花體、圓圈、方框等11種特殊字體效果。可直接複製到 Instagram、Facebook、Twitter 使用。',
  keywords: ['Instagram 字體', '特殊字體', '花式字體', 'Unicode 字體', '社群媒體字體', '酷炫文字'],
}

export default async function Page() {
  const dict = await getDictionary('zh-tw')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Instagram 字體產生器</h1>
        <p className="mb-8 text-muted-foreground">
          打造獨特的社群媒體風格!提供粗體、斜體、花體、哥特體、圓圈、方框等11種特殊字體效果。使用 Unicode 字符產生,可直接複製到 Instagram、Facebook、Twitter 等平台,讓你的貼文更吸睛。
        </p>
        <FancyFontGenerator
          labels={{
            inputText: '輸入文字',
            inputPlaceholder: '在此輸入您的文字...',
            results: '特殊字體效果',
            copy: '複製',
            copied: '已複製!',
          }}
        />
      </div>
    </main>
  )
}

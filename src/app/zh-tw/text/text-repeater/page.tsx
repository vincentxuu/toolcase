import { Metadata } from 'next'
import TextRepeater from '@/components/tools/TextRepeater'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '文字重複器 - 重複文字多次 | toolcase',
  description: '重複任何文字多次，可自訂分隔符號。選擇換行、空格、逗號或自訂分隔符號。最多可即時重複 10,000 次。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/text/text-repeater', languages: { en: 'https://toolcase.cc/text/text-repeater', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text/text-repeater' } },
}

const faqs = [
  { question: '文字最多可以重複幾次？', answer: '可以將文字重複 1 到 10,000 次。工具會在瀏覽器中即時產生輸出結果。' },
  { question: '有哪些可用的分隔符號？', answer: '工具提供四種分隔符號選項：換行（每次重複在新的一行）、空格、逗號，或您自訂的分隔字串。' },
  { question: '有字元數限制嗎？', answer: '輸入文字沒有硬性字元限制。但如果輸出非常大（例如長文字重複數千次），可能會使瀏覽器變慢。' },
]

export default function TextRepeaterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '文字重複器', url: 'https://toolcase.cc/zh-tw/text/text-repeater' },
        ]}
      />
      <ToolSchema
        name="文字重複器"
        description="重複任何文字多次，可自訂分隔符號。選擇換行、空格、逗號或自訂分隔符號。最多可即時重複 10,000 次。"
        url="https://toolcase.cc/zh-tw/text/text-repeater"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '文字重複器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>文字重複器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>重複任何文字多次，可選擇分隔符號。適用於產生測試資料、填充文字或重複性內容。</p>
      <TextRepeater labels={{ inputText: '輸入文字', times: '次數', separator: '分隔符號', newline: '換行', space: '空格', comma: '逗號', custom: '自訂', output: '輸出', copy: '複製', copied: '已複製！', characters: '字元' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入要重複的文字，設定重複次數，並選擇分隔符號（換行、空格、逗號或自訂）。輸出會即時產生。點擊複製即可將結果複製到剪貼簿。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="text-repeater" locale="zh-tw" />
    </div>
    </>
  )
}

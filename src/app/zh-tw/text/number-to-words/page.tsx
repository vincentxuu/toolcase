import { Metadata } from 'next'
import NumberToWords from '@/components/tools/NumberToWords'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '數字轉英文單字 - 數字拼寫轉換器 | toolcase',
  description: '將任何數字轉換為英文單字表示。支援整數、小數、負數，以及高達兆的大數值。免費線上數字轉英文工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/text/number-to-words', languages: { en: 'https://toolcase.cc/text/number-to-words', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text/number-to-words' } },
}

const faqs = [
  { question: '支援哪些數字範圍？', answer: '轉換器支援整數、小數和負數。可處理從零到兆的數值。小數部分會在 "point" 之後逐位拼出。' },
  { question: '大數字是如何格式化的？', answer: '大數字會以三位數一組，分配適當的單位詞 — thousand（千）、million（百萬）、billion（十億）或 trillion（兆）。例如 1500000 會轉換為 "one million five hundred thousand"。' },
  { question: '可以用於填寫支票嗎？', answer: '可以！此工具常用於將金額拼寫為英文，適用於支票、法律文件和發票等需要以文字書寫金額的場合。' },
]

export default function NumberToWordsPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '數字轉英文單字', url: 'https://toolcase.cc/zh-tw/text/number-to-words' },
        ]}
      />
      <ToolSchema
        name="數字轉英文單字"
        description="將任何數字轉換為英文單字表示。支援整數、小數、負數，以及高達兆的大數值。免費線上數字轉英文工具。"
        url="https://toolcase.cc/zh-tw/text/number-to-words"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '數字轉英文單字' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>數字轉英文單字</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>將任何數字轉換為英文單字表示。支援小數、負數，以及高達兆的數值。</p>
      <NumberToWords labels={{ number: '數字', words: '英文單字', enterNumber: '輸入數字...', result: '結果', copy: '複製', copied: '已複製！' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在輸入框中輸入數字，工具會即時轉換為英文單字。負數使用減號，小數使用小數點。點擊複製即可將結果複製到剪貼簿。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="number-to-words" locale="zh-tw" />
    </div>
    </>
  )
}

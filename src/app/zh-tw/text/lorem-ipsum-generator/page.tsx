import { Metadata } from 'next'
import LoremIpsumGenerator from '@/components/tools/LoremIpsumGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Lorem Ipsum 產生器 - 免費線上工具 | toolcase',
  description: '產生 Lorem Ipsum 假文字，支援段落、句子和字詞模式。免費佔位文字產生器，適用於設計和排版。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/text/lorem-ipsum-generator', languages: { en: 'https://toolcase.cc/text/lorem-ipsum-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text/lorem-ipsum-generator' } },
}

const faqs = [
  { question: '什麼是 Lorem Ipsum？', answer: 'Lorem Ipsum 是一段源自西元前 45 年拉丁文獻的佔位文字，已被印刷和排版業使用超過五個世紀。它被廣泛用於設計稿和網頁版面中，作為正式內容完成前的填充文字。' },
  { question: '為什麼要用 Lorem Ipsum 而不是隨意文字？', answer: 'Lorem Ipsum 的字詞分佈接近自然語言，讓人可以專注於版面設計而非閱讀內容。使用有意義的中文或英文文字作為佔位可能會讓審閱者分心，無法客觀評估設計本身。' },
  { question: '可以產生多少文字？', answer: '您可以選擇產生段落、句子或字詞，並自訂數量。無論是需要一小段文字測試按鈕，還是需要大量文字模擬長篇文章，都可以自由調整。' },
]

export default function LoremIpsumGeneratorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'Lorem Ipsum 產生器', url: 'https://toolcase.cc/zh-tw/text/lorem-ipsum-generator' },
        ]}
      />
      <ToolSchema
        name="Lorem Ipsum 產生器"
        description="產生 Lorem Ipsum 假文字，支援段落、句子和字詞模式。免費佔位文字產生器，適用於設計和排版。"
        url="https://toolcase.cc/zh-tw/text/lorem-ipsum-generator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'Lorem Ipsum 產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Lorem Ipsum 產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>產生 Lorem Ipsum 佔位文字，適用於設計和排版。</p>
      <LoremIpsumGenerator labels={{ paragraphs: '段落', sentences: '句子', words: '字詞', count: '數量', type: '類型', startWithLorem: '以「Lorem ipsum...」開頭', generate: '產生', copy: '複製', copied: '已複製！' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>選擇要產生的類型（段落、句子或字詞），設定數量，並決定是否以經典的「Lorem ipsum dolor sit amet...」開頭。點擊產生後，文字會立即顯示。您可以一鍵複製產生的文字，貼到您的設計稿、網頁模板或文件中。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="lorem-ipsum-generator" locale="zh-tw" />
    </div>
    </>
  )
}

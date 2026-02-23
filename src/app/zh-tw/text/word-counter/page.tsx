import { Metadata } from 'next'
import WordCounter from '@/components/tools/WordCounter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '字數計算器 - 免費線上工具 | toolcase',
  description: '即時計算文字的字數、字元數、句數和段落數。免費線上字數計算器，還能估算閱讀時間。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/text/word-counter', languages: { en: 'https://toolcase.cc/text/word-counter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text/word-counter' } },
}

const faqs = [
  { question: '字數和字元數有什麼不同？', answer: '字數是指文章中單詞的數量（以空格分隔），而字元數是所有字符的總數，包括字母、數字、標點符號和空格。對中文而言，每個漢字通常算一個字。' },
  { question: '一般文章的閱讀速度是多少？', answer: '一般成年人閱讀中文的速度約為每分鐘 300-500 字，閱讀英文約為每分鐘 200-250 個單詞。本工具的閱讀時間估算是基於平均閱讀速度計算的。' },
  { question: '社群媒體的字數限制是多少？', answer: 'Twitter/X 的推文限制為 280 個字元，Instagram 的貼文說明限制為 2,200 個字元，Facebook 的貼文限制約為 63,206 個字元。使用本工具可以確保您的內容符合各平台的限制。' },
]

export default function WordCounterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '字數計算器', url: 'https://toolcase.cc/zh-tw/text/word-counter' },
        ]}
      />
      <ToolSchema
        name="字數計算器"
        description="即時計算文字的字數、字元數、句數和段落數。免費線上字數計算器，還能估算閱讀時間。"
        url="https://toolcase.cc/zh-tw/text/word-counter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '字數計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>字數計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>即時計算字數、字元數、句數、段落數及預估閱讀時間。</p>
      <WordCounter labels={{ input: '輸入文字', words: '字數', characters: '字元數', charactersNoSpaces: '不含空格', sentences: '句數', paragraphs: '段落數', readingTime: '閱讀時間', minutes: '分鐘' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在文字輸入框中貼上或輸入文字，計算器將即時顯示字數、字元數、句數、段落數及預估閱讀時間。適用於撰寫文章、社群媒體貼文或任何需要控制字數的場合。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="word-counter" locale="zh-tw" />
    </div>
    </>
  )
}

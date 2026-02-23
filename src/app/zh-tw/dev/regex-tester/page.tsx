import { Metadata } from 'next'
import RegexTester from '@/components/tools/RegexTester'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '正規表達式測試器 - 免費線上工具 | toolcase',
  description: '即時測試和除錯正規表達式，支援即時高亮顯示。免費線上正規表達式測試工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/dev/regex-tester', languages: { en: 'https://toolcase.cc/dev/regex-tester', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/regex-tester' } },
}

const faqs = [
  { question: '什麼是正規表達式？', answer: '正規表達式（regex）是用於匹配字串中字元組合的模式。它是程式設計和文字編輯器中搜尋、替換和驗證文字的強大工具。' },
  { question: '有哪些正規表達式標記可用？', answer: '常見標記包括 g（全域 - 找到所有匹配）、i（不區分大小寫）、m（多行 - ^ 和 $ 匹配行邊界）、s（dotAll - 點號匹配換行符）和 u（Unicode 支援）。' },
  { question: '為什麼我的正規表達式沒有匹配到結果？', answer: '請檢查模式語法是否正確，以及是否啟用了正確的標記。常見問題包括忘記轉義特殊字元（如點號或括號）、在預期多個匹配時未設定全域標記，或在未設定 i 標記時的大小寫敏感問題。' },
]

export default function RegexTesterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '正規表達式測試器', url: 'https://toolcase.cc/zh-tw/dev/regex-tester' },
        ]}
      />
      <ToolSchema
        name="正規表達式測試器"
        description="即時測試和除錯正規表達式，支援即時高亮顯示。免費線上正規表達式測試工具。"
        url="https://toolcase.cc/zh-tw/dev/regex-tester"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '正規表達式測試器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>正規表達式測試器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>即時測試和除錯正規表達式，支援即時高亮顯示。</p>
      <RegexTester labels={{ pattern: '模式', flags: '標記', testString: '測試字串', matches: '匹配結果', matchCount: '匹配數', noMatches: '無匹配', invalidRegex: '無效的正規表達式', matchDetails: '匹配詳情' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入正規表達式模式並設定所需的標記，然後在下方輸入或貼上測試字串。匹配結果會即時高亮顯示，並顯示匹配詳情，讓你可以驗證正規表達式是否正確運作。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="regex-tester" locale="zh-tw" />
    </div>
    </>
  )
}

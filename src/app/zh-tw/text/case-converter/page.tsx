import { Metadata } from 'next'
import CaseConverter from '@/components/tools/CaseConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '大小寫轉換器 - 免費線上工具 | toolcase',
  description: '快速轉換文字大小寫格式。支援大寫、小寫、標題格式、camelCase、snake_case 等多種格式。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/text/case-converter', languages: { en: 'https://toolcase.cc/text/case-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text/case-converter' } },
}

const faqs = [
  { question: '什麼是 camelCase 和 PascalCase？', answer: 'camelCase（駝峰式）是第一個單詞小寫、後續單詞首字母大寫的命名方式，如 myVariableName。PascalCase（帕斯卡式）則是每個單詞首字母都大寫，如 MyVariableName。兩者常用於程式設計中的變數和類別命名。' },
  { question: 'snake_case 和 kebab-case 有什麼用途？', answer: 'snake_case（底線式）用底線連接單詞，常用於 Python 變數命名和資料庫欄位名稱。kebab-case（連字號式）用連字號連接，常用於 URL 路徑、CSS 類別名稱和檔案命名。' },
  { question: '標題格式的規則是什麼？', answer: '標題格式（Title Case）將每個主要單詞的首字母大寫。通常介詞、冠詞和連接詞（如 a, an, the, in, on, at, and, or）不會大寫，除非它們是標題的第一個或最後一個單詞。' },
]

export default function CaseConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '大小寫轉換器', url: 'https://toolcase.cc/zh-tw/text/case-converter' },
        ]}
      />
      <ToolSchema
        name="大小寫轉換器"
        description="快速轉換文字大小寫格式。支援大寫、小寫、標題格式、camelCase、snake_case 等多種格式。"
        url="https://toolcase.cc/zh-tw/text/case-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '大小寫轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>大小寫轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>快速轉換文字的大小寫與命名格式。</p>
      <CaseConverter labels={{ input: '輸入', output: '輸出', uppercase: '大寫', lowercase: '小寫', titleCase: '標題格式', sentenceCase: '句首大寫', camelCase: 'camelCase', pascalCase: 'PascalCase', snakeCase: 'snake_case', kebabCase: 'kebab-case', copy: '複製', copied: '已複製！' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在輸入框中貼上或輸入文字，然後點選需要的轉換格式按鈕。支援大寫、小寫、標題格式、句首大寫、camelCase、PascalCase、snake_case 和 kebab-case 等格式，轉換結果可一鍵複製。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="case-converter" locale="zh-tw" />
    </div>
    </>
  )
}

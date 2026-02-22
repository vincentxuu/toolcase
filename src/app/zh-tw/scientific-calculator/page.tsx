import { Metadata } from 'next'
import ScientificCalculator from '@/components/tools/ScientificCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '科學計算機 - 免費線上 | toolcase',
  description: '免費線上科學計算機，支援三角函數（sin、cos、tan）、對數、平方根、指數和度/弧度切換。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/scientific-calculator', languages: { en: 'https://toolcase.cc/scientific-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/scientific-calculator' } },
}

const faqs = [
  { question: '支援哪些功能？', answer: '計算機支援基本運算（+、-、×、÷）、三角函數（sin、cos、tan）、對數（常用對數和自然對數）、平方根、指數、常數（π 和 e）和括號分組。' },
  { question: '如何切換度和弧度？', answer: '點擊 DEG/RAD 按鈕即可在度模式和弧度模式之間切換三角函數計算。' },
]

export default function ScientificCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '科學計算機', url: 'https://toolcase.cc/zh-tw/scientific-calculator' },
        ]}
      />
      <ToolSchema
        name="科學計算機"
        description="免費線上科學計算機，支援三角函數（sin、cos、tan）、對數、平方根、指數和度/弧度切換。"
        url="https://toolcase.cc/zh-tw/scientific-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '科學計算機' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>科學計算機</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>功能完整的科學計算機，支援三角函數、對數等。</p>
      <ScientificCalculator labels={{ result: '結果', clear: 'AC', delete: 'DEL', deg: '度', rad: '弧度' }} />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="scientific-calculator" locale="zh-tw" />
    </div>
    </>
  )
}

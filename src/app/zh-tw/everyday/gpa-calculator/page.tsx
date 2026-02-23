import { Metadata } from 'next'
import GpaCalculator from '@/components/tools/GpaCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'GPA 計算器 - 免費線上工具 | toolcase',
  description: '即時計算累積 GPA 成績。輸入課程名稱、學分數與成績，快速算出您的平均績點。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/everyday/gpa-calculator', languages: { en: 'https://toolcase.cc/everyday/gpa-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/gpa-calculator' } },
}

const faqs = [
  { question: 'GPA 是如何計算的？', answer: 'GPA 的計算方式是將每門課的學分乘以對應的績點，加總後再除以總學分數。例如，3 學分的 A（4.0）和 4 學分的 B+（3.3），GPA = (3×4.0 + 4×3.3) / (3+4) = 3.6。' },
  { question: 'A+ 和 A 的績點有什麼差別？', answer: '在標準的 4.0 制度下，A+ 和 A 都是 4.0 績點。部分學校可能使用 4.3 制度，其中 A+ 為 4.3，但 4.0 上限較為普遍。' },
  { question: '通過/不通過的課程要計入 GPA 嗎？', answer: '通過/不通過的課程通常不計入 GPA，因為它們沒有對應的績點。只有獲得字母等級（A 到 F）的課程才需要納入 GPA 計算。' },
]

export default function GpaCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'GPA 計算器', url: 'https://toolcase.cc/zh-tw/everyday/gpa-calculator' },
        ]}
      />
      <ToolSchema
        name="GPA 計算器"
        description="即時計算累積 GPA 成績。輸入課程名稱、學分數與成績，快速算出您的平均績點。"
        url="https://toolcase.cc/zh-tw/everyday/gpa-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'GPA 計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>GPA 計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>輸入課程與學分，計算您的累積平均績點。</p>
      <GpaCalculator labels={{ courseName: '課程名稱', credits: '學分', grade: '成績', addCourse: '新增課程', remove: '移除', totalCredits: '總學分', cumulativeGpa: '累積 GPA', course: '課程' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入課程名稱、選擇學分數（1-6）和獲得的成績等級。計算器會即時計算您的累積 GPA 和總學分。點擊「新增課程」可以加入更多課程，也可以移除不需要的課程。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="gpa-calculator" locale="zh-tw" />
    </div>
    </>
  )
}

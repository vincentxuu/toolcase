import { Metadata } from 'next'
import DateCalculator from '@/components/tools/DateCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '日期計算器 - 免費線上工具 | toolcase',
  description: '計算兩個日期之間的差異，或從日期加減天數。免費線上日期計算器。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/date-calculator', languages: { en: 'https://toolcase.cc/date-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/date-calculator' } },
}

const faqs = [
  { question: '日期差異是如何計算的？', answer: '計算器會精確計算兩個日期之間的年、月、日差異，同時顯示總天數和總週數，並正確處理不同月份天數和閏年。' },
  { question: '可以從某個日期加減天數嗎？', answer: '可以！切換到「加減天數」模式，輸入開始日期和要加減的天數，計算器會即時顯示結果日期。' },
  { question: '計算器會處理閏年嗎？', answer: '會的，日期計算器在計算日期差異和加減天數時都會正確處理閏年。' },
]

export default function DateCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '日期計算器', url: 'https://toolcase.cc/zh-tw/date-calculator' },
        ]}
      />
      <ToolSchema
        name="日期計算器"
        description="計算兩個日期之間的差異，或從日期加減天數。免費線上日期計算器。"
        url="https://toolcase.cc/zh-tw/date-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '日期計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>日期計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>計算兩個日期之間的差異，或從日期加減天數。</p>
      <DateCalculator labels={{ difference: '日期差異', addSubtract: '加減天數', startDate: '開始日期', endDate: '結束日期', resultDate: '結果日期', daysToAdd: '天數', add: '加', subtract: '減', years: '年', months: '月', days: '日', totalDays: '總天數', totalWeeks: '總週數' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>選擇「日期差異」或「加減天數」模式。在日期差異模式中，選擇開始日期和結束日期即可看到精確的時間間隔。在加減天數模式中，輸入開始日期和天數即可計算結果日期。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="date-calculator" locale="zh-tw" />
    </div>
    </>
  )
}

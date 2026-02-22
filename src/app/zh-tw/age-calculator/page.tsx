import { Metadata } from 'next'
import AgeCalculator from '@/components/tools/AgeCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '年齡計算器 - 免費線上工具 | toolcase',
  description: '計算你的精確年齡，以年、月、日表示。查看距離下次生日還有幾天。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/age-calculator', languages: { en: 'https://toolcase.cc/age-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/age-calculator' } },
}

const faqs = [
  { question: '年齡如何計算？', answer: '年齡是透過計算出生日期與目標日期之間的年、月、日差異來得出。' },
  { question: '可以計算特定日期的年齡嗎？', answer: '可以！更改「計算日期」為任何日期，就能知道那天的年齡。' },
  { question: '閏年如何處理？', answer: '計算器在計算精確天數時會正確處理閏年。' },
]

export default function AgeCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '年齡計算器', url: 'https://toolcase.cc/zh-tw/age-calculator' },
        ]}
      />
      <ToolSchema
        name="年齡計算器"
        description="計算你的精確年齡，以年、月、日表示。查看距離下次生日還有幾天。"
        url="https://toolcase.cc/zh-tw/age-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '年齡計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>年齡計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>計算你的精確年齡，以年、月、週、日表示。</p>
      <AgeCalculator labels={{ birthDate: '出生日期', targetDate: '計算日期', age: '年齡', years: '年', months: '月', days: '日', totalDays: '總天數', totalWeeks: '總週數', totalMonths: '總月數', nextBirthday: '下次生日', daysUntilBirthday: '距離生日' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入你的出生日期，也可以更改目標日期。計算器會顯示你的精確年齡分解和距離下次生日的天數。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="age-calculator" locale="zh-tw" />
    </div>
    </>
  )
}

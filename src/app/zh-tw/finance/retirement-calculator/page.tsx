import { Metadata } from 'next'
import RetirementCalculator from '@/components/tools/RetirementCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '退休金計算器 - 免費線上工具 | toolcase',
  description: '規劃你的退休生活。查看預估存款、估算退休收入，以及資金可以維持多久的視覺化圖表。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/finance/retirement-calculator',
    languages: {
      en: 'https://toolcase.cc/finance/retirement-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/retirement-calculator',
    },
  },
}

const faqs = [
  {
    question: '什麼是 4% 法則？',
    answer: '4% 法則建議你每年可以提取退休存款的 4%（根據通膨調整），這樣你的資金至少可以維持 30 年。這是一個粗略估算可持續退休收入的方式。',
  },
  {
    question: '為什麼通膨對退休規劃很重要？',
    answer: '通膨會隨時間降低金錢的購買力。本計算器會根據通膨調整報酬率，以今天的幣值顯示數據，讓你更真實地了解未來的購買力。',
  },
  {
    question: '我應該存多少退休金？',
    answer: '常見建議是將稅前收入的 15-20% 存為退休金。確切金額取決於你期望的退休生活方式、預期支出和其他收入來源。',
  },
]

export default function RetirementCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '退休金計算器', url: 'https://toolcase.cc/zh-tw/finance/retirement-calculator' },
        ]}
      />
      <ToolSchema
        name="退休金計算器"
        description="規劃你的退休生活。查看預估存款、估算退休收入，以及資金可以維持多久的視覺化圖表。"
        url="https://toolcase.cc/zh-tw/finance/retirement-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '退休金計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>退休金計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        規劃退休 — 查看存款如何成長，以及考慮通膨後資金能維持多久。
      </p>

      <RetirementCalculator
        labels={{
          currentAge: '目前年齡',
          retirementAge: '退休年齡',
          currentSavings: '目前存款',
          monthlyContribution: '每月投入',
          annualReturn: '年報酬率 (%)',
          inflationRate: '通膨率 (%)',
          monthlyRetirementSpending: '退休後每月支出',
          projectedSavings: '退休時存款',
          totalContributions: '總投入金額',
          retirementIncome: '每月收入 (4% 法則)',
          yearsOfRetirement: '退休資金維持',
          savingsLastUntilAge: '資金可用至幾歲',
          projectionChart: '退休預估圖',
          age: '年齡',
          savings: '存款',
          retirementPhase: '退休',
          currency: 'NT$',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          輸入你的目前年齡、退休年齡、目前存款、每月投入金額、預期年報酬率、通膨率和退休後每月支出。
          計算器會顯示退休時的預估存款、以 4% 法則計算的可持續月收入，以及你的資金可以維持多久。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="retirement-calculator" locale="zh-tw" />
    </div>
    </>
  )
}

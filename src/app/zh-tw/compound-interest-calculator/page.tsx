import { Metadata } from 'next'
import CompoundInterestCalculator from '@/components/tools/CompoundInterestCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '複利計算器 - 免費線上工具 | toolcase',
  description: '計算複利增長，包含每月定期投入。以互動圖表查看你的投資如何隨時間成長。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/compound-interest-calculator',
    languages: {
      en: 'https://toolcase.cc/compound-interest-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/compound-interest-calculator',
    },
  },
}

const faqs = [
  {
    question: '什麼是複利？',
    answer: '複利是指將利息加入本金，然後在新的本金基礎上再計算利息。這使你的資金呈指數級成長，也稱為「利滾利」。',
  },
  {
    question: '複利頻率如何影響報酬？',
    answer: '複利計算越頻繁，你獲得的總利息越多。月複利略高於季複利，季複利又略高於年複利，但差距通常不大。',
  },
  {
    question: '什麼是 72 法則？',
    answer: '72 法則是估算投資翻倍時間的快速方法。用 72 除以年利率即可得到大約的年數。例如，年報酬率 8%，約 9 年就能翻倍。',
  },
]

export default function CompoundInterestPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>複利計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        計算複利成長，搭配定期投入，以圖表視覺化你的投資增長。
      </p>

      <CompoundInterestCalculator
        labels={{
          initialInvestment: '初始投資金額',
          monthlyContribution: '每月定期投入',
          annualRate: '年報酬率 (%)',
          investmentPeriod: '投資期間',
          years: '年',
          compoundFrequency: '複利頻率',
          monthly: '每月',
          quarterly: '每季',
          annually: '每年',
          finalBalance: '最終餘額',
          totalContributions: '總投入金額',
          totalInterest: '總利息收入',
          growthChart: '成長趨勢',
          year: '年',
          contributions: '投入',
          interest: '利息',
          currency: 'NT$',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          輸入初始投資金額、每月定期投入、預期年報酬率和投資期間。選擇複利頻率（每月、每季或每年）。
          計算器會顯示最終餘額、總投入金額、總利息收入，以及成長趨勢圖。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="compound-interest-calculator" locale="zh-tw" />
    </div>
  )
}

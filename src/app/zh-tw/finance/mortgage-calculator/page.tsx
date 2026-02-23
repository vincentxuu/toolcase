import { Metadata } from 'next'
import MortgageCalculator from '@/components/tools/MortgageCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '房貸計算器 - 免費線上工具 | toolcase',
  description: '計算每月房貸還款金額、總利息支出，並查看還款攤還表。免費線上房貸計算器，附互動圖表。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/finance/mortgage-calculator',
    languages: {
      en: 'https://toolcase.cc/finance/mortgage-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/mortgage-calculator',
    },
  },
}

const faqs = [
  {
    question: '每月房貸還款是如何計算的？',
    answer: '每月還款使用標準攤還公式計算：M = P[r(1+r)^n]/[(1+r)^n-1]，其中 P 是貸款金額，r 是月利率，n 是總還款期數。',
  },
  {
    question: '什麼是攤還表？',
    answer: '攤還表顯示每期還款中本金和利息的比例。初期還款大部分用於支付利息，後期則大部分用於償還本金。',
  },
  {
    question: '這個計算器包含房屋稅和保險嗎？',
    answer: '本計算器僅顯示本金和利息部分。實際每月付款可能更高，因為還需要加上房屋稅、房屋保險等費用。',
  },
]

export default function MortgageCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '房貸計算器', url: 'https://toolcase.cc/zh-tw/finance/mortgage-calculator' },
        ]}
      />
      <ToolSchema
        name="房貸計算器"
        description="計算每月房貸還款金額、總利息支出，並查看還款攤還表。免費線上房貸計算器，附互動圖表。"
        url="https://toolcase.cc/zh-tw/finance/mortgage-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '房貸計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>房貸計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        計算每月房貸還款金額，並查看互動式還款攤還圖表。
      </p>

      <MortgageCalculator
        labels={{
          loanAmount: '貸款金額',
          interestRate: '年利率 (%)',
          loanTerm: '貸款期限',
          years: '年',
          monthlyPayment: '每月還款',
          totalPayment: '總還款金額',
          totalInterest: '總利息',
          principal: '本金',
          interest: '利息',
          balance: '剩餘本金',
          year: '年',
          amortizationChart: '還款攤還表',
          calculate: '計算',
          currency: 'NT$',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          輸入貸款金額、年利率和貸款期限（年），計算器會即時顯示每月還款金額、貸款期間的總還款額和總利息支出。
          攤還圖表會以視覺化的方式顯示每年的還款中本金和利息的比例。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="mortgage-calculator" locale="zh-tw" />
    </div>
    </>
  )
}

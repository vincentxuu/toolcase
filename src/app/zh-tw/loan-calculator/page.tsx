import { Metadata } from 'next'
import LoanCalculator from '@/components/tools/LoanCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '貸款計算器 - 免費線上工具 | toolcase',
  description: '計算每月貸款還款金額、總利息支出，適用於汽車貸款、個人貸款和學生貸款。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/loan-calculator',
    languages: {
      en: 'https://toolcase.cc/loan-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/loan-calculator',
    },
  },
}

const faqs = [
  {
    question: '這個計算器適用於哪些貸款？',
    answer: '本計算器適用於所有固定利率分期貸款，包括汽車貸款、個人信貸、學生貸款等。',
  },
  {
    question: '如何減少總利息支出？',
    answer: '你可以透過增加頭期款、選擇較短的貸款期限、取得較低的利率，或額外償還本金來減少總利息。',
  },
  {
    question: 'APR 和利率有什麼不同？',
    answer: '利率是借款本金的成本。APR（年百分率）則包含利率加上其他費用，能更完整地反映總借款成本。',
  },
]

export default function LoanCalculatorPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>貸款計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        計算汽車貸款、個人貸款、學生貸款的每月還款和總利息。
      </p>

      <LoanCalculator
        labels={{
          loanAmount: '貸款金額',
          interestRate: '年利率 (%)',
          loanTerm: '貸款期限',
          years: '年',
          months: '月',
          monthlyPayment: '每月還款',
          totalPayment: '總還款金額',
          totalInterest: '總利息',
          principal: '本金',
          interest: '利息',
          balance: '剩餘本金',
          year: '年',
          paymentBreakdown: '還款明細',
          currency: 'NT$',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          輸入貸款金額、年利率和貸款期限（年）。計算器會即時顯示每月還款金額、貸款期間的總還款額和總利息。
          還款明細圖表會顯示每年還款中本金和利息的比例。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="loan-calculator" locale="zh-tw" />
    </div>
  )
}

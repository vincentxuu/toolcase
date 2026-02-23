import { Metadata } from 'next'
import CreditCardCalculator from '@/components/tools/CreditCardCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '信用卡利息計算器 - 免費線上工具 | toolcase',
  description: '了解還清信用卡債務需要多久。比較最低還款與固定還款，節省數千元利息。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/finance/credit-card-calculator',
    languages: {
      en: 'https://toolcase.cc/finance/credit-card-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/credit-card-calculator',
    },
  },
}

const faqs = [
  {
    question: '為什麼只付最低還款要這麼久？',
    answer: '最低還款通常只有餘額的 1-3%，其中大部分用來支付利息，只有很少部分減少本金。這造成還款可能需要數十年。',
  },
  {
    question: '多付一些能省多少？',
    answer: '即使只多付一點點超過最低還款，就能省下數千元利息和數年的還款時間。使用本計算器比較不同的還款金額。',
  },
  {
    question: '還清信用卡債務有什麼好策略？',
    answer: '常見策略包括雪崩法（先還最高利率的卡）和雪球法（先還最小餘額的卡）。兩種都比只付最低還款有效得多。',
  },
]

export default function CreditCardCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '信用卡利息計算器', url: 'https://toolcase.cc/zh-tw/finance/credit-card-calculator' },
        ]}
      />
      <ToolSchema
        name="信用卡利息計算器"
        description="了解還清信用卡債務需要多久。比較最低還款與固定還款，節省數千元利息。"
        url="https://toolcase.cc/zh-tw/finance/credit-card-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '信用卡利息計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>信用卡利息計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        比較最低還款與固定還款，了解你可以節省多少信用卡利息。
      </p>

      <CreditCardCalculator
        labels={{
          balance: '信用卡餘額',
          interestRate: '年利率 (%)',
          minimumPayment: '最低還款比例 (%)',
          fixedPayment: '固定每月還款',
          monthsToPayoff: '還清所需月數',
          totalInterest: '總利息',
          totalPayment: '總還款金額',
          payoffChart: '還款時間表',
          month: '月',
          remainingBalance: '剩餘餘額',
          minPaymentWarning: '只付最低還款會花更長時間，利息支出也會大幅增加！',
          currency: 'NT$',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          輸入信用卡餘額、年利率、最低還款比例，以及你想比較的固定月付金額。
          計算器會並排顯示兩種策略需要多久才能還清債務，以及總利息支出。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="credit-card-calculator" locale="zh-tw" />
    </div>
    </>
  )
}

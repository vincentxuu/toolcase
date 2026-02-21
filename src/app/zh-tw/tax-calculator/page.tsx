import { Metadata } from 'next'
import TaxCalculator from '@/components/tools/TaxCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '薪資所得稅計算器 - 免費線上工具 | toolcase',
  description:
    '估算美國聯邦所得稅，包含稅率級距明細。查看應稅所得、有效稅率和稅後收入，支援單身與已婚合併申報。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/tax-calculator',
    languages: {
      en: 'https://toolcase.cc/tax-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tax-calculator',
    },
  },
}

const faqs = [
  {
    question: '什麼是有效稅率？',
    answer:
      '有效稅率是您的總收入實際繳納稅款的百分比。由於美國採用累進稅制，您的有效稅率一定低於最高邊際稅率級距。',
  },
  {
    question: '2024 年的標準扣除額是多少？',
    answer:
      '2024 稅年的標準扣除額為：單身 $14,600、已婚合併申報 $29,200。大多數納稅人使用標準扣除額而非逐項扣除。',
  },
  {
    question: '這個計算器包含州稅嗎？',
    answer:
      '本計算器僅估算聯邦所得稅。各州的州所得稅差異很大 — 德州和佛州等州沒有州所得稅，而加州等州可能在聯邦稅之上再加 10% 以上。',
  },
]

export default function TaxCalculatorPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>薪資所得稅計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        估算美國聯邦所得稅，包含詳細的稅率級距明細。查看您的有效稅率和稅後收入。
      </p>

      <TaxCalculator
        labels={{
          grossIncome: '年度總收入',
          filingStatus: '申報身份',
          single: '單身',
          married: '已婚合併申報',
          deductions: '扣除額',
          standardDeduction: '標準扣除額',
          itemized: '逐項扣除',
          deductionAmount: '扣除金額',
          calculate: '計算',
          taxableIncome: '應稅所得',
          totalTax: '聯邦所得稅',
          effectiveRate: '有效稅率',
          afterTax: '稅後收入',
          bracketBreakdown: '稅率級距明細',
          bracket: '級距',
          taxableAt: '應稅金額',
          taxAmount: '稅額',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          輸入您的年度總收入，選擇申報身份（單身或已婚合併申報），然後選擇標準扣除額或逐項扣除。計算器會即時顯示您的應稅所得、聯邦所得稅總額、有效稅率和稅後收入，以及詳細的稅率級距明細。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="tax-calculator" locale="zh-tw" />
    </div>
  )
}

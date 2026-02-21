import { Metadata } from 'next'
import RetirementCalculator from '@/components/tools/RetirementCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Retirement Calculator - Free Online Tool | toolcase',
  description:
    'Plan your retirement with this free calculator. See projected savings, estimate retirement income, and visualize how long your money will last.',
  alternates: {
    canonical: 'https://toolcase.cc/retirement-calculator',
    languages: {
      en: 'https://toolcase.cc/retirement-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/retirement-calculator',
    },
  },
}

const faqs = [
  {
    question: 'What is the 4% rule?',
    answer:
      'The 4% rule suggests you can withdraw 4% of your retirement savings each year (adjusted for inflation) and likely not run out of money for at least 30 years. It provides a rough estimate of sustainable retirement income.',
  },
  {
    question: 'Why does inflation matter for retirement planning?',
    answer:
      'Inflation reduces the purchasing power of money over time. This calculator adjusts returns for inflation to show values in today\'s dollars, giving you a realistic picture of future buying power.',
  },
  {
    question: 'How much should I save for retirement?',
    answer:
      'A common guideline is to save 15-20% of your gross income for retirement. The exact amount depends on your desired retirement lifestyle, expected expenses, and other income sources like Social Security.',
  },
]

export default function RetirementCalculatorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Retirement Calculator
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Plan your retirement — see how your savings grow and how long they&apos;ll last with inflation-adjusted projections.
      </p>

      <RetirementCalculator />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter your current age, retirement age, current savings, monthly contribution, expected annual return,
          inflation rate, and planned monthly spending in retirement. The calculator shows your projected savings at
          retirement, sustainable monthly income using the 4% rule, and how long your savings will last.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="retirement-calculator" locale="en" />
    </div>
  )
}

import { Metadata } from 'next'
import TaxCalculator from '@/components/tools/TaxCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Tax Calculator - Free US Federal Income Tax Estimator | toolcase',
  description:
    'Estimate your US federal income tax with bracket breakdown. See taxable income, effective rate, and after-tax income for single or married filing.',
  alternates: {
    canonical: 'https://toolcase.cc/tax-calculator',
    languages: {
      en: 'https://toolcase.cc/tax-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tax-calculator',
    },
  },
}

const faqs = [
  {
    question: 'What is the effective tax rate?',
    answer:
      'The effective tax rate is the actual percentage of your total income paid in taxes. Because the US uses a progressive tax system, your effective rate is always lower than your highest marginal bracket.',
  },
  {
    question: 'What is the standard deduction for 2024?',
    answer:
      'For tax year 2024, the standard deduction is $14,600 for single filers and $29,200 for married filing jointly. Most taxpayers use the standard deduction rather than itemizing.',
  },
  {
    question: 'Does this calculator include state taxes?',
    answer:
      'This calculator estimates federal income tax only. State income taxes vary widely — some states like Texas and Florida have no state income tax, while others like California can add 10%+ on top of federal taxes.',
  },
]

export default function TaxCalculatorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Tax Calculator
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Estimate your US federal income tax with a detailed bracket breakdown. See your effective rate and after-tax income.
      </p>

      <TaxCalculator />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter your gross annual income, select your filing status (Single or Married Filing Jointly),
          and choose between standard or itemized deductions. The calculator instantly shows your taxable income,
          total federal tax, effective tax rate, and after-tax income, along with a detailed breakdown by tax bracket.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="tax-calculator" locale="en" />
    </div>
  )
}

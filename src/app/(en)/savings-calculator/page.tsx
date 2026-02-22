import { Metadata } from 'next'
import SavingsCalculator from '@/components/tools/SavingsCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Savings Calculator - Free Online Tool | toolcase',
  description:
    'Calculate how your savings will grow with regular monthly deposits and compound interest. Free savings growth calculator with charts.',
  alternates: {
    canonical: 'https://toolcase.cc/savings-calculator',
    languages: {
      en: 'https://toolcase.cc/savings-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/savings-calculator',
    },
  },
}

const faqs = [
  {
    question: 'What interest rate should I use?',
    answer:
      'Use the APY (Annual Percentage Yield) offered by your bank for savings accounts. High-yield savings accounts typically offer 4-5%, while standard accounts may offer 0.01-0.5%.',
  },
  {
    question: 'How often is savings account interest compounded?',
    answer:
      'Most savings accounts compound interest daily or monthly. This calculator uses monthly compounding, which is a good approximation for most accounts.',
  },
  {
    question: 'Is my data sent to a server?',
    answer:
      'No. All calculations happen locally in your browser. Your financial data never leaves your device.',
  },
]

export default function SavingsCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Savings Calculator', url: 'https://toolcase.cc/savings-calculator' },
        ]}
      />
      <ToolSchema
        name="Savings Calculator"
        description="Calculate how your savings will grow with regular monthly deposits and compound interest. Free savings growth calculator with charts."
        url="https://toolcase.cc/savings-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Savings Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Savings Calculator
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Calculate how your savings grow over time with regular deposits and compound interest.
      </p>

      <SavingsCalculator />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter your initial deposit, monthly deposit amount, annual interest rate, and savings period. The calculator
          shows your final balance, total deposits made, and interest earned over the period with a visual growth chart.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="savings-calculator" locale="en" />
    </div>
    </>
  )
}

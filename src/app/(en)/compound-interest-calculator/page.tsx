import { Metadata } from 'next'
import CompoundInterestCalculator from '@/components/tools/CompoundInterestCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Compound Interest Calculator - Free Online Tool | toolcase',
  description:
    'Calculate compound interest with monthly contributions. See how your investments grow over time with interactive growth charts.',
  alternates: {
    canonical: 'https://toolcase.cc/compound-interest-calculator',
    languages: {
      en: 'https://toolcase.cc/compound-interest-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/compound-interest-calculator',
    },
  },
}

const faqs = [
  {
    question: 'What is compound interest?',
    answer:
      'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. It makes your money grow exponentially over time, often called "interest on interest."',
  },
  {
    question: 'How does compound frequency affect returns?',
    answer:
      'The more frequently interest is compounded, the more total interest you earn. Monthly compounding yields slightly more than quarterly, which yields more than annual compounding, though the difference is often small.',
  },
  {
    question: 'What is the Rule of 72?',
    answer:
      'The Rule of 72 is a quick way to estimate how long it takes for an investment to double. Divide 72 by the annual interest rate to get the approximate number of years. For example, at 8% interest, your money doubles in about 9 years.',
  },
]

export default function CompoundInterestPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Compound Interest Calculator', url: 'https://toolcase.cc/compound-interest-calculator' },
        ]}
      />
      <ToolSchema
        name="Compound Interest Calculator"
        description="Calculate compound interest with monthly contributions. See how your investments grow over time with interactive growth charts."
        url="https://toolcase.cc/compound-interest-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Compound Interest Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Compound Interest Calculator
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Calculate compound interest growth with regular contributions and visualize your investment over time.
      </p>

      <CompoundInterestCalculator />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter your initial investment, monthly contribution amount, expected annual return rate, and investment period.
          Choose how often interest compounds (monthly, quarterly, or annually). The calculator will show your final
          balance, total contributions, and total interest earned, along with a growth chart.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="compound-interest-calculator" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import RoiCalculator from '@/components/tools/RoiCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'ROI Calculator - Free Online Tool | toolcase',
  description:
    'Calculate return on investment (ROI) and annualized ROI. Simple and free investment return calculator.',
  alternates: {
    canonical: 'https://toolcase.cc/finance/roi-calculator',
    languages: {
      en: 'https://toolcase.cc/finance/roi-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/roi-calculator',
    },
  },
}

const faqs = [
  {
    question: 'What is ROI?',
    answer:
      'ROI (Return on Investment) measures the percentage gain or loss on an investment relative to its cost. It is calculated as (Final Value - Cost) / Cost × 100%.',
  },
  {
    question: 'What is annualized ROI?',
    answer:
      'Annualized ROI converts total ROI into a yearly rate, making it easier to compare investments with different time horizons. It accounts for compounding.',
  },
  {
    question: 'What is a good ROI?',
    answer:
      'A "good" ROI depends on the investment type and risk. The S&P 500 historically returns about 10% per year. Real estate typically returns 8-12%. Any positive ROI means you made a profit.',
  },
]

export default function RoiCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'ROI Calculator', url: 'https://toolcase.cc/finance/roi-calculator' },
        ]}
      />
      <ToolSchema
        name="ROI Calculator"
        description="Calculate return on investment (ROI) and annualized ROI. Simple and free investment return calculator."
        url="https://toolcase.cc/finance/roi-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'ROI Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        ROI Calculator
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Calculate your return on investment (ROI) and annualized ROI instantly.
      </p>

      <RoiCalculator />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter your initial investment cost, the final return value, and the investment period in years. The calculator
          instantly shows your total ROI percentage, annualized ROI, and net profit or loss.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="roi-calculator" locale="en" />
    </div>
    </>
  )
}

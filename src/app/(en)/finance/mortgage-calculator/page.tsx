import { Metadata } from 'next'
import MortgageCalculator from '@/components/tools/MortgageCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Mortgage Calculator - Free Online Tool | toolcase',
  description:
    'Calculate your monthly mortgage payments, total interest, and view amortization schedule. Free online mortgage calculator with interactive charts.',
  alternates: {
    canonical: 'https://toolcase.cc/finance/mortgage-calculator',
    languages: {
      en: 'https://toolcase.cc/finance/mortgage-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/mortgage-calculator',
    },
  },
}

const faqs = [
  {
    question: 'How is the monthly mortgage payment calculated?',
    answer:
      'The monthly payment is calculated using the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1], where P is the loan amount, r is the monthly interest rate, and n is the total number of payments.',
  },
  {
    question: 'What is an amortization schedule?',
    answer:
      'An amortization schedule shows how each payment is split between principal and interest over the life of the loan. Early payments go mostly toward interest, while later payments go mostly toward principal.',
  },
  {
    question: 'Does this include property taxes and insurance?',
    answer:
      'This calculator shows the principal and interest portion only. Your actual monthly payment may be higher when including property taxes, homeowner\'s insurance, and PMI.',
  },
]

export default function MortgageCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Mortgage Calculator', url: 'https://toolcase.cc/finance/mortgage-calculator' },
        ]}
      />
      <ToolSchema
        name="Mortgage Calculator"
        description="Calculate your monthly mortgage payments, total interest, and view amortization schedule. Free online mortgage calculator with interactive charts."
        url="https://toolcase.cc/finance/mortgage-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Mortgage Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Mortgage Calculator
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Calculate your monthly mortgage payments and view the amortization schedule with interactive charts.
      </p>

      <MortgageCalculator />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter your loan amount, annual interest rate, and loan term in years. The calculator will instantly show your
          monthly payment, total payment over the life of the loan, and total interest paid. The amortization chart
          visualizes how your payments are split between principal and interest each year.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="mortgage-calculator" locale="en" />
    </div>
    </>
  )
}

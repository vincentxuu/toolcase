import { Metadata } from 'next'
import CreditCardCalculator from '@/components/tools/CreditCardCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Credit Card Interest Calculator - Free Online Tool | toolcase',
  description:
    'See how long it takes to pay off credit card debt. Compare minimum payments vs fixed payments and save thousands in interest.',
  alternates: {
    canonical: 'https://toolcase.cc/credit-card-calculator',
    languages: {
      en: 'https://toolcase.cc/credit-card-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/credit-card-calculator',
    },
  },
}

const faqs = [
  {
    question: 'Why does paying only the minimum take so long?',
    answer:
      'Minimum payments are usually 1-3% of the balance. Most of this goes toward interest, so very little reduces the principal. This creates a cycle where payoff can take decades.',
  },
  {
    question: 'How much can I save by paying more than the minimum?',
    answer:
      'Even small increases above the minimum payment can save thousands in interest and years of payments. Use this calculator to compare different payment amounts.',
  },
  {
    question: 'What is a good strategy to pay off credit card debt?',
    answer:
      'Common strategies include the avalanche method (pay highest interest rate first) and the snowball method (pay smallest balance first). Both are more effective than paying only the minimum.',
  },
]

export default function CreditCardCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Credit Card Interest Calculator', url: 'https://toolcase.cc/credit-card-calculator' },
        ]}
      />
      <ToolSchema
        name="Credit Card Interest Calculator"
        description="See how long it takes to pay off credit card debt. Compare minimum payments vs fixed payments and save thousands in interest."
        url="https://toolcase.cc/credit-card-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Credit Card Interest Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Credit Card Interest Calculator
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Compare minimum payments vs fixed payments and see how much you can save on credit card interest.
      </p>

      <CreditCardCalculator />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter your credit card balance, annual interest rate (APR), minimum payment percentage, and a fixed monthly
          payment amount you&apos;d like to compare. The calculator shows side-by-side how long each strategy takes to pay
          off the debt and how much total interest you&apos;ll pay.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="credit-card-calculator" locale="en" />
    </div>
    </>
  )
}

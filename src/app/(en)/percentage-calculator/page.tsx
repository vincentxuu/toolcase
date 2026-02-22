import { Metadata } from 'next'
import PercentageCalculator from '@/components/tools/PercentageCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Percentage Calculator - Free Online Tool | toolcase',
  description: 'Calculate percentages instantly. Find what percent of a number, percentage change, and more.',
  alternates: { canonical: 'https://toolcase.cc/percentage-calculator', languages: { en: 'https://toolcase.cc/percentage-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/percentage-calculator' } },
}

const faqs = [
  { question: 'How do I calculate a percentage?', answer: 'To find X% of Y, multiply Y by X/100. For example, 25% of 200 = 200 × 0.25 = 50.' },
  { question: 'How do I calculate percentage change?', answer: 'Percentage change = ((New - Old) / Old) × 100. A positive result means increase, negative means decrease.' },
  { question: 'What is X% of Y vs Y is X% of what?', answer: 'These are different calculations. "What is 25% of 200" = 50. "50 is 25% of what" = 200.' },
]

export default function PercentageCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Percentage Calculator', url: 'https://toolcase.cc/percentage-calculator' },
        ]}
      />
      <ToolSchema
        name="Percentage Calculator"
        description="Calculate percentages instantly. Find what percent of a number, percentage change, and more."
        url="https://toolcase.cc/percentage-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Percentage Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Percentage Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Calculate percentages, find percentage of a number, and compute percentage change.</p>
      <PercentageCalculator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Use the three calculators above: find what X% of Y is, find what percent X is of Y, or calculate the percentage change between two values.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="percentage-calculator" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import DueDateCalculator from '@/components/tools/DueDateCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Due Date Calculator - Free Pregnancy Tool | toolcase',
  description: 'Calculate your estimated due date based on your last menstrual period. Track pregnancy weeks and trimesters.',
  alternates: { canonical: 'https://toolcase.cc/health/due-date-calculator', languages: { en: 'https://toolcase.cc/health/due-date-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/health/due-date-calculator' } },
}

const faqs = [
  { question: 'How is the due date calculated?', answer: 'The due date is estimated by adding 280 days (40 weeks) to the first day of your last menstrual period, adjusted for cycle length.' },
  { question: 'How accurate is this calculator?', answer: 'This provides an estimate. Only about 5% of babies arrive on the exact due date. Most are born within 2 weeks before or after.' },
  { question: 'What if my cycle is not 28 days?', answer: 'The calculator adjusts for different cycle lengths. If your cycle is longer or shorter than 28 days, the due date is adjusted accordingly.' },
]

export default function DueDateCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Due Date Calculator', url: 'https://toolcase.cc/health/due-date-calculator' },
        ]}
      />
      <ToolSchema
        name="Due Date Calculator"
        description="Calculate your estimated due date based on your last menstrual period. Track pregnancy weeks and trimesters."
        url="https://toolcase.cc/health/due-date-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Due Date Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Due Date Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Estimate your due date and track pregnancy progress.</p>
      <DueDateCalculator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter the first day of your last menstrual period and your average cycle length. The calculator shows your estimated due date, current week of pregnancy, and trimester progress.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="due-date-calculator" locale="en" />
    </div>
    </>
  )
}

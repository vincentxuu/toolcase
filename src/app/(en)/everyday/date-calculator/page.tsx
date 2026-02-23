import { Metadata } from 'next'
import DateCalculator from '@/components/tools/DateCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Date Calculator - Free Online Tool | toolcase',
  description: 'Calculate the difference between two dates or add/subtract days from a date. Free online date calculator.',
  alternates: { canonical: 'https://toolcase.cc/everyday/date-calculator', languages: { en: 'https://toolcase.cc/everyday/date-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/date-calculator' } },
}

const faqs = [
  { question: 'How does the date difference calculation work?', answer: 'The calculator finds the exact difference between two dates in years, months, and days. It also shows the total number of days and weeks between the dates, correctly accounting for varying month lengths and leap years.' },
  { question: 'Can I add or subtract days from a date?', answer: 'Yes! Switch to the Add/Subtract mode, enter a start date and the number of days you want to add or subtract. The calculator will show the resulting date instantly.' },
  { question: 'Does the calculator handle leap years?', answer: 'Yes, the date calculator correctly handles leap years when computing date differences and when adding or subtracting days from a date.' },
]

export default function DateCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Date Calculator', url: 'https://toolcase.cc/everyday/date-calculator' },
        ]}
      />
      <ToolSchema
        name="Date Calculator"
        description="Calculate the difference between two dates or add/subtract days from a date. Free online date calculator."
        url="https://toolcase.cc/everyday/date-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Date Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Date Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Calculate the difference between two dates or add/subtract days from a date.</p>
      <DateCalculator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Choose between date difference and add/subtract modes. For date difference, select a start date and an end date to see the exact duration between them. For add/subtract, enter a start date and the number of days to calculate the resulting date.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="date-calculator" locale="en" />
    </div>
    </>
  )
}

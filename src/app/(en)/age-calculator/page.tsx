import { Metadata } from 'next'
import AgeCalculator from '@/components/tools/AgeCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Age Calculator - Free Online Tool | toolcase',
  description: 'Calculate your exact age in years, months, days, and more. Find days until your next birthday.',
  alternates: { canonical: 'https://toolcase.cc/age-calculator', languages: { en: 'https://toolcase.cc/age-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/age-calculator' } },
}

const faqs = [
  { question: 'How is age calculated?', answer: 'Age is calculated by finding the difference between the birth date and the target date in years, months, and days.' },
  { question: 'Can I calculate age on a specific date?', answer: 'Yes! Change the "Calculate Age On" date to any date to find out the age on that specific day.' },
  { question: 'How are leap years handled?', answer: 'The calculator correctly accounts for leap years when calculating the exact number of days.' },
]

export default function AgeCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Age Calculator', url: 'https://toolcase.cc/age-calculator' },
        ]}
      />
      <ToolSchema
        name="Age Calculator"
        description="Calculate your exact age in years, months, days, and more. Find days until your next birthday."
        url="https://toolcase.cc/age-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Age Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Age Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Calculate your exact age in years, months, weeks, and days.</p>
      <AgeCalculator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter your date of birth and optionally change the target date. The calculator shows your exact age breakdown plus days until your next birthday.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="age-calculator" locale="en" />
    </div>
    </>
  )
}

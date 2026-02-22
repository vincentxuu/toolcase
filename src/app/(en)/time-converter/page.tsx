import { Metadata } from 'next'
import UnitConverter from '@/components/tools/UnitConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Time Converter - Free Online Tool | toolcase',
  description:
    'Convert between seconds, minutes, hours, days, weeks, months, and years. Free online time converter with instant results.',
  alternates: {
    canonical: 'https://toolcase.cc/time-converter',
    languages: {
      en: 'https://toolcase.cc/time-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/time-converter',
    },
  },
}

const faqs = [
  {
    question: 'How many seconds are in an hour?',
    answer:
      'There are exactly 3,600 seconds in one hour. This is calculated as 60 seconds per minute multiplied by 60 minutes per hour. This conversion is fundamental in programming, physics, and everyday time calculations.',
  },
  {
    question: 'How does this converter handle months and years?',
    answer:
      'This converter uses standardized values for months and years: one month is treated as 30 days (2,592,000 seconds) and one year is treated as 365 days (31,536,000 seconds). These are approximations since actual months vary from 28 to 31 days, and leap years have 366 days.',
  },
  {
    question: 'What are milliseconds and when are they used?',
    answer:
      'A millisecond is one-thousandth of a second (0.001 seconds). Milliseconds are commonly used in computing for measuring response times, animation durations, and API latency. For example, a typical web page load time is measured in hundreds of milliseconds.',
  },
]

export default function TimeConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Time Converter', url: 'https://toolcase.cc/time-converter' },
        ]}
      />
      <ToolSchema
        name="Time Converter"
        description="Convert between seconds, minutes, hours, days, weeks, months, and years. Free online time converter with instant results."
        url="https://toolcase.cc/time-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Time Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Time Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Convert between milliseconds, seconds, minutes, hours, days, weeks, months, and years.
      </p>

      <UnitConverter unitType="time" defaultFrom={3} defaultTo={1} defaultValue={1} />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select your source unit from the &quot;From&quot; dropdown and your target unit from the &quot;To&quot; dropdown.
          Enter the time value you want to convert, and the result will appear instantly. You can also click the swap
          button to reverse the conversion direction. Supported units include milliseconds, seconds, minutes, hours,
          days, weeks, months (30 days), and years (365 days).
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="time-converter" locale="en" />
    </div>
    </>
  )
}

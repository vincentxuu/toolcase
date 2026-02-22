import { Metadata } from 'next'
import UnitConverter from '@/components/tools/UnitConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Length Converter - Free Online Tool | toolcase',
  description:
    'Convert between meters, kilometers, miles, feet, inches, and more. Free online length converter with instant results.',
  alternates: {
    canonical: 'https://toolcase.cc/length-converter',
    languages: {
      en: 'https://toolcase.cc/length-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/length-converter',
    },
  },
}

const faqs = [
  {
    question: 'How many feet are in a meter?',
    answer:
      'One meter is equal to approximately 3.28084 feet. Conversely, one foot is equal to 0.3048 meters. The meter is the base unit of length in the International System of Units (SI).',
  },
  {
    question: 'How do I convert kilometers to miles?',
    answer:
      'To convert kilometers to miles, multiply the value by 0.621371. For example, 10 kilometers is approximately 6.21 miles. This converter handles the calculation automatically for you.',
  },
  {
    question: 'What is the difference between metric and imperial length units?',
    answer:
      'Metric units (millimeters, centimeters, meters, kilometers) are based on powers of 10, making conversions straightforward. Imperial units (inches, feet, yards, miles) use varying conversion factors (12 inches per foot, 3 feet per yard, 1760 yards per mile). Most countries use the metric system, while the US primarily uses imperial.',
  },
]

export default function LengthConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Length Converter', url: 'https://toolcase.cc/length-converter' },
        ]}
      />
      <ToolSchema
        name="Length Converter"
        description="Convert between meters, kilometers, miles, feet, inches, and more. Free online length converter with instant results."
        url="https://toolcase.cc/length-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Length Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Length Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Convert between metric and imperial length units instantly.
      </p>

      <UnitConverter unitType="length" defaultFrom={2} defaultTo={3} defaultValue={1000} />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select your source unit from the &quot;From&quot; dropdown and your target unit from the &quot;To&quot; dropdown.
          Enter the value you want to convert, and the result will appear instantly. You can also click the swap button
          to reverse the conversion direction. Supported units include millimeters, centimeters, meters, kilometers,
          inches, feet, yards, and miles.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="length-converter" locale="en" />
    </div>
    </>
  )
}

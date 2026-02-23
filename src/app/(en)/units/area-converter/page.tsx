import { Metadata } from 'next'
import UnitConverter from '@/components/tools/UnitConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Area Converter - Free Online Tool | toolcase',
  description:
    'Convert between square meters, square feet, acres, hectares, ping, and more. Free online area converter with instant results.',
  alternates: {
    canonical: 'https://toolcase.cc/units/area-converter',
    languages: {
      en: 'https://toolcase.cc/units/area-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/units/area-converter',
    },
  },
}

const faqs = [
  {
    question: 'What is a ping and how is it used?',
    answer:
      'A ping (坪) is a unit of area commonly used in Taiwan, Japan, and Korea for real estate. One ping equals approximately 3.30579 square meters or about 35.58 square feet. In Taiwan, property sizes are almost always listed in ping, making this conversion essential for real estate transactions.',
  },
  {
    question: 'How do I convert square meters to square feet?',
    answer:
      'One square meter is equal to approximately 10.7639 square feet. To convert, multiply the number of square meters by 10.7639. For example, a 50 square meter apartment is approximately 538.2 square feet.',
  },
  {
    question: 'What is the difference between an acre and a hectare?',
    answer:
      'An acre is an imperial unit equal to 4,046.86 square meters, while a hectare is a metric unit equal to 10,000 square meters. One hectare is approximately 2.471 acres. Hectares are commonly used worldwide, while acres are primarily used in the US and UK.',
  },
]

export default function AreaConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Area Converter', url: 'https://toolcase.cc/units/area-converter' },
        ]}
      />
      <ToolSchema
        name="Area Converter"
        description="Convert between square meters, square feet, acres, hectares, ping, and more. Free online area converter with instant results."
        url="https://toolcase.cc/units/area-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Area Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Area Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Convert between square meters, square feet, acres, hectares, ping, and more.
      </p>

      <UnitConverter unitType="area" defaultFrom={0} defaultTo={6} defaultValue={100} />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select your source unit from the &quot;From&quot; dropdown and your target unit from the &quot;To&quot; dropdown.
          Enter the value you want to convert, and the result will appear instantly. You can also click the swap button
          to reverse the conversion direction. This tool supports square meters, square kilometers, square feet, square
          yards, acres, hectares, and ping (坪) -- a unit widely used in Taiwan real estate.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="area-converter" locale="en" />
    </div>
    </>
  )
}

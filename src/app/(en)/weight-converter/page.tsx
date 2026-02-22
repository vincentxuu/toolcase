import { Metadata } from 'next'
import UnitConverter from '@/components/tools/UnitConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Weight Converter - Free Online Tool | toolcase',
  description:
    'Convert between kilograms, pounds, ounces, grams, and more. Free online weight converter with instant results.',
  alternates: {
    canonical: 'https://toolcase.cc/weight-converter',
    languages: {
      en: 'https://toolcase.cc/weight-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/weight-converter',
    },
  },
}

const faqs = [
  {
    question: 'How many pounds are in a kilogram?',
    answer:
      'One kilogram is equal to approximately 2.20462 pounds. Conversely, one pound is approximately 0.453592 kilograms. The kilogram is the base unit of mass in the SI system.',
  },
  {
    question: 'What is the difference between mass and weight?',
    answer:
      'Mass measures the amount of matter in an object (measured in kilograms), while weight measures the force of gravity on that object (measured in newtons). In everyday use, the terms are used interchangeably, and this converter works with the commonly used weight/mass units.',
  },
  {
    question: 'How do I convert ounces to grams?',
    answer:
      'One ounce is equal to approximately 28.3495 grams. To convert ounces to grams, multiply by 28.3495. For example, 8 ounces equals approximately 226.8 grams. This is commonly used in cooking and food packaging.',
  },
]

export default function WeightConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Weight Converter', url: 'https://toolcase.cc/weight-converter' },
        ]}
      />
      <ToolSchema
        name="Weight Converter"
        description="Convert between kilograms, pounds, ounces, grams, and more. Free online weight converter with instant results."
        url="https://toolcase.cc/weight-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Weight Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Weight Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Convert between metric and imperial weight units instantly.
      </p>

      <UnitConverter unitType="weight" defaultFrom={2} defaultTo={3} defaultValue={1} />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select your source unit from the &quot;From&quot; dropdown and your target unit from the &quot;To&quot; dropdown.
          Enter the value you want to convert, and the result will appear instantly. You can also click the swap button
          to reverse the conversion direction. Supported units include milligrams, grams, kilograms, pounds, ounces,
          stones, and metric tons.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="weight-converter" locale="en" />
    </div>
    </>
  )
}

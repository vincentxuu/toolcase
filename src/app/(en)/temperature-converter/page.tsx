import { Metadata } from 'next'
import UnitConverter from '@/components/tools/UnitConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Temperature Converter - Free Online Tool | toolcase',
  description:
    'Convert between Celsius, Fahrenheit, and Kelvin. Free online temperature converter with instant results.',
  alternates: {
    canonical: 'https://toolcase.cc/temperature-converter',
    languages: {
      en: 'https://toolcase.cc/temperature-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/temperature-converter',
    },
  },
}

const faqs = [
  {
    question: 'How do I convert Celsius to Fahrenheit?',
    answer:
      'To convert Celsius to Fahrenheit, multiply the Celsius value by 9/5 and then add 32. The formula is: F = (C x 9/5) + 32. For example, 100°C equals 212°F (the boiling point of water).',
  },
  {
    question: 'What is absolute zero?',
    answer:
      'Absolute zero is the lowest possible temperature, where all molecular motion ceases. It is defined as 0 Kelvin, which equals -273.15°C or -459.67°F. No object can reach a temperature lower than absolute zero.',
  },
  {
    question: 'When should I use Kelvin instead of Celsius or Fahrenheit?',
    answer:
      'Kelvin is primarily used in scientific contexts, especially in physics and chemistry. It is the SI base unit for temperature. Unlike Celsius and Fahrenheit, Kelvin does not use degree symbols and starts at absolute zero, making it ideal for scientific calculations.',
  },
]

export default function TemperatureConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Temperature Converter', url: 'https://toolcase.cc/temperature-converter' },
        ]}
      />
      <ToolSchema
        name="Temperature Converter"
        description="Convert between Celsius, Fahrenheit, and Kelvin. Free online temperature converter with instant results."
        url="https://toolcase.cc/temperature-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Temperature Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Temperature Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Convert between Celsius, Fahrenheit, and Kelvin instantly.
      </p>

      <UnitConverter unitType="temperature" defaultFrom={0} defaultTo={1} defaultValue={100} />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select your source temperature scale from the &quot;From&quot; dropdown and your target scale from the
          &quot;To&quot; dropdown. Enter the temperature value you want to convert, and the result will appear instantly.
          You can also click the swap button to reverse the conversion direction. This tool supports Celsius, Fahrenheit,
          and Kelvin conversions.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="temperature-converter" locale="en" />
    </div>
    </>
  )
}

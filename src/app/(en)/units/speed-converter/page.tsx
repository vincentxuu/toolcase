import { Metadata } from 'next'
import UnitConverter from '@/components/tools/UnitConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Speed Converter - Free Online Tool | toolcase',
  description:
    'Convert between km/h, mph, m/s, knots, and ft/s. Free online speed converter with instant results.',
  alternates: {
    canonical: 'https://toolcase.cc/units/speed-converter',
    languages: {
      en: 'https://toolcase.cc/units/speed-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/units/speed-converter',
    },
  },
}

const faqs = [
  {
    question: 'How do I convert km/h to mph?',
    answer:
      'To convert kilometers per hour to miles per hour, multiply by 0.621371. For example, 100 km/h is approximately 62.14 mph. Conversely, to convert mph to km/h, multiply by 1.60934.',
  },
  {
    question: 'What is a knot and where is it used?',
    answer:
      'A knot is a unit of speed equal to one nautical mile per hour, which is approximately 1.852 km/h or 1.151 mph. Knots are primarily used in maritime and aviation navigation because nautical miles relate directly to degrees of latitude on the Earth.',
  },
  {
    question: 'What is the speed of sound in different units?',
    answer:
      'The speed of sound in dry air at 20°C is approximately 343 m/s, which equals about 1,235 km/h, 767 mph, or 667 knots. This is often referred to as Mach 1. The actual speed varies with temperature and altitude.',
  },
]

export default function SpeedConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Speed Converter', url: 'https://toolcase.cc/units/speed-converter' },
        ]}
      />
      <ToolSchema
        name="Speed Converter"
        description="Convert between km/h, mph, m/s, knots, and ft/s. Free online speed converter with instant results."
        url="https://toolcase.cc/units/speed-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Speed Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Speed Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Convert between km/h, mph, m/s, knots, and other speed units instantly.
      </p>

      <UnitConverter unitType="speed" defaultFrom={1} defaultTo={2} defaultValue={100} />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select your source unit from the &quot;From&quot; dropdown and your target unit from the &quot;To&quot; dropdown.
          Enter the speed value you want to convert, and the result will appear instantly. You can also click the swap
          button to reverse the conversion direction. Supported units include meters per second, kilometers per hour,
          miles per hour, knots, and feet per second.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="speed-converter" locale="en" />
    </div>
    </>
  )
}

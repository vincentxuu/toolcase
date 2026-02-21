import { Metadata } from 'next'
import UnitConverter from '@/components/tools/UnitConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Volume Converter - Free Online Tool | toolcase',
  description:
    'Convert between liters, milliliters, gallons, cups, fluid ounces, and more. Free online volume converter with instant results.',
  alternates: {
    canonical: 'https://toolcase.cc/volume-converter',
    languages: {
      en: 'https://toolcase.cc/volume-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/volume-converter',
    },
  },
}

const faqs = [
  {
    question: 'How many milliliters are in a liter?',
    answer:
      'One liter is equal to exactly 1,000 milliliters. The prefix "milli" means one-thousandth, so a milliliter is one-thousandth of a liter. This is the most common volume conversion in everyday life.',
  },
  {
    question: 'How do I convert cups to milliliters?',
    answer:
      'One US cup is equal to approximately 236.588 milliliters. To convert cups to milliliters, multiply the number of cups by 236.588. For example, 2 cups equals approximately 473.2 mL. Note that the US cup differs from the metric cup (250 mL) and the imperial cup (284.1 mL).',
  },
  {
    question: 'How many liters are in a US gallon?',
    answer:
      'One US gallon is equal to approximately 3.78541 liters. This is different from the imperial (UK) gallon, which is approximately 4.54609 liters. This converter uses US gallon measurements.',
  },
]

export default function VolumeConverterPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Volume Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Convert between liters, milliliters, gallons, cups, and more.
      </p>

      <UnitConverter unitType="volume" defaultFrom={1} defaultTo={0} defaultValue={1} />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select your source unit from the &quot;From&quot; dropdown and your target unit from the &quot;To&quot; dropdown.
          Enter the value you want to convert, and the result will appear instantly. You can also click the swap button
          to reverse the conversion direction. Supported units include milliliters, liters, US cups, US fluid ounces,
          US gallons, tablespoons, and teaspoons.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="volume-converter" locale="en" />
    </div>
  )
}

import { Metadata } from 'next'
import EnergyConverter from '@/components/tools/EnergyConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Energy Converter - J, kJ, cal, kcal, Wh, kWh, BTU | toolcase',
  description: 'Convert between energy units including joules, kilojoules, calories, kilocalories, watt-hours, kilowatt-hours, BTU, foot-pounds, and electron-volts.',
  alternates: { canonical: 'https://toolcase.cc/units/energy-converter', languages: { en: 'https://toolcase.cc/units/energy-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/units/energy-converter' } },
}

const faqs = [
  { question: 'What energy units are supported?', answer: 'The converter supports joules (J), kilojoules (kJ), calories (cal), kilocalories (kcal), watt-hours (Wh), kilowatt-hours (kWh), BTU, foot-pounds (ft-lbf), and electron-volts (eV).' },
  { question: 'What is the difference between calories and kilocalories?', answer: 'A kilocalorie (kcal) equals 1000 calories (cal). The "Calories" shown on food labels are actually kilocalories. 1 kcal = 4184 joules.' },
  { question: 'How do I convert kWh to joules?', answer: '1 kilowatt-hour equals 3,600,000 joules. Simply multiply kWh by 3,600,000 to get the value in joules.' },
]

export default function EnergyConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Energy Converter', url: 'https://toolcase.cc/units/energy-converter' },
        ]}
      />
      <ToolSchema
        name="Energy Converter"
        description="Convert between energy units including joules, kilojoules, calories, kilocalories, watt-hours, kilowatt-hours, BTU, foot-pounds, and electron-volts."
        url="https://toolcase.cc/units/energy-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Energy Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Energy Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert between all common energy units instantly.</p>
      <EnergyConverter />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter a numeric value and select the source energy unit from the dropdown. All equivalent values in other energy units will be displayed instantly below. The converter uses joules as the base unit for accurate conversions.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="energy-converter" locale="en" />
    </div>
    </>
  )
}

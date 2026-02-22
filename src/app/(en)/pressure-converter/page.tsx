import { Metadata } from 'next'
import PressureConverter from '@/components/tools/PressureConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Pressure Converter - Pa, bar, PSI, atm, mmHg | toolcase',
  description: 'Convert between pressure units including Pascal, bar, PSI, atmosphere, Torr, mmHg, and more. Instant conversions with all common pressure units.',
  alternates: { canonical: 'https://toolcase.cc/pressure-converter', languages: { en: 'https://toolcase.cc/pressure-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/pressure-converter' } },
}

const faqs = [
  { question: 'What pressure units are supported?', answer: 'The converter supports Pascal (Pa), hectopascal (hPa), kilopascal (kPa), megapascal (MPa), bar, millibar, PSI, atmosphere (atm), Torr, mmHg, and inHg.' },
  { question: 'What is standard atmospheric pressure?', answer: 'Standard atmospheric pressure is 1 atm = 101,325 Pa = 1.01325 bar = 14.696 PSI = 760 mmHg = 760 Torr.' },
]

export default function PressureConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Pressure Converter', url: 'https://toolcase.cc/pressure-converter' },
        ]}
      />
      <ToolSchema
        name="Pressure Converter"
        description="Convert between pressure units including Pascal, bar, PSI, atmosphere, Torr, mmHg, and more. Instant conversions with all common pressure units."
        url="https://toolcase.cc/pressure-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Pressure Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Pressure Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert between all common pressure units instantly.</p>
      <PressureConverter />
      <FaqSection items={faqs} />
      <RelatedTools current="pressure-converter" locale="en" />
    </div>
    </>
  )
}

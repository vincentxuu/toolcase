import { Metadata } from 'next'
import ShoeSizeConverter from '@/components/tools/ShoeSizeConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Shoe Size Converter - US, EU, UK, JP | toolcase',
  description: 'Convert between US, EU, UK, and JP shoe sizes for men and women. Includes a complete size chart for reference.',
  alternates: { canonical: 'https://toolcase.cc/shoe-size-converter', languages: { en: 'https://toolcase.cc/shoe-size-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/shoe-size-converter' } },
}

const faqs = [
  { question: 'Are shoe sizes exact between systems?', answer: 'Shoe size conversions are approximate since each system uses different measurement bases. The chart provides the commonly accepted equivalents, but actual fit may vary between brands.' },
  { question: 'What sizing systems are supported?', answer: 'The converter supports US Men, US Women, EU (European), UK, and JP (Japanese, in centimeters) sizing systems.' },
]

export default function ShoeSizeConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Shoe Size Converter', url: 'https://toolcase.cc/shoe-size-converter' },
        ]}
      />
      <ToolSchema
        name="Shoe Size Converter"
        description="Convert between US, EU, UK, and JP shoe sizes for men and women. Includes a complete size chart for reference."
        url="https://toolcase.cc/shoe-size-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Shoe Size Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Shoe Size Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert between US, EU, UK, and JP shoe sizes with a complete reference chart.</p>
      <ShoeSizeConverter />
      <FaqSection items={faqs} />
      <RelatedTools current="shoe-size-converter" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import UnitConverter from '@/components/tools/UnitConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Data Size Converter - Free Online Tool | toolcase',
  description:
    'Convert between bytes, KB, MB, GB, TB, and PB. Free online data size converter with instant results using binary (1024) units.',
  alternates: {
    canonical: 'https://toolcase.cc/data-size-converter',
    languages: {
      en: 'https://toolcase.cc/data-size-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/data-size-converter',
    },
  },
}

const faqs = [
  {
    question: 'What is the difference between KB and KiB?',
    answer:
      'KB (kilobyte) traditionally means 1,024 bytes in computing contexts, while KiB (kibibyte) is the IEC standard term for 1,024 bytes. In the SI standard, 1 KB equals 1,000 bytes. This converter uses the binary (1024-based) convention, which is the most common in operating systems and programming.',
  },
  {
    question: 'How many megabytes are in a gigabyte?',
    answer:
      'Using binary (computing) convention, 1 GB equals 1,024 MB. Using decimal (SI) convention, 1 GB equals 1,000 MB. This converter uses the binary convention (1,024), which matches how most operating systems report file sizes.',
  },
  {
    question: 'Why does my hard drive show less space than advertised?',
    answer:
      'Hard drive manufacturers use decimal units (1 GB = 1,000,000,000 bytes), while operating systems use binary units (1 GB = 1,073,741,824 bytes). This difference means a 1 TB drive shows approximately 931 GB in your operating system. The actual storage capacity is the same -- only the unit definitions differ.',
  },
]

export default function DataSizeConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Data Size Converter', url: 'https://toolcase.cc/data-size-converter' },
        ]}
      />
      <ToolSchema
        name="Data Size Converter"
        description="Convert between bytes, KB, MB, GB, TB, and PB. Free online data size converter with instant results using binary (1024) units."
        url="https://toolcase.cc/data-size-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Data Size Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Data Size Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Convert between bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes.
      </p>

      <UnitConverter unitType="dataSize" defaultFrom={3} defaultTo={2} defaultValue={1} />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select your source unit from the &quot;From&quot; dropdown and your target unit from the &quot;To&quot; dropdown.
          Enter the value you want to convert, and the result will appear instantly. You can also click the swap button
          to reverse the conversion direction. This converter uses binary (1024-based) units, which is the standard in
          operating systems and programming. Supported units include bytes, kilobytes, megabytes, gigabytes, terabytes,
          and petabytes.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="data-size-converter" locale="en" />
    </div>
    </>
  )
}

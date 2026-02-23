import { Metadata } from 'next'
import CsvJsonConverter from '@/components/tools/CsvJsonConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'CSV ↔ JSON Converter - Free Online Tool | toolcase',
  description:
    'Convert between CSV and JSON formats instantly. Supports CSV to JSON and JSON to CSV with customizable delimiters and formatting options.',
  alternates: {
    canonical: 'https://toolcase.cc/dev/csv-json-converter',
    languages: {
      en: 'https://toolcase.cc/dev/csv-json-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/csv-json-converter',
    },
  },
}

const faqs = [
  {
    question: 'How do I convert CSV to JSON?',
    answer:
      'Paste your CSV data into the input area and click the convert button. The tool automatically detects column headers from the first row and maps each subsequent row into a JSON object. The result is a JSON array of objects you can copy or download.',
  },
  {
    question: 'Can I convert JSON back to CSV?',
    answer:
      'Yes. Switch the conversion direction to JSON → CSV, paste a JSON array of objects, and the tool will generate a CSV file using the object keys as column headers and the values as row data.',
  },
  {
    question: 'What delimiters are supported?',
    answer:
      'By default the tool uses commas as the delimiter, but you can also choose tabs, semicolons, or pipes. This is especially useful when working with European-style CSV files that use semicolons instead of commas.',
  },
]

export default function CsvJsonConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'CSV ↔ JSON Converter', url: 'https://toolcase.cc/dev/csv-json-converter' },
        ]}
      />
      <ToolSchema
        name="CSV ↔ JSON Converter"
        description="Convert between CSV and JSON formats instantly. Supports CSV to JSON and JSON to CSV with customizable delimiters and formatting options."
        url="https://toolcase.cc/dev/csv-json-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'CSV ↔ JSON Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>CSV ↔ JSON Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Convert between CSV and JSON formats instantly in your browser.
      </p>

      <CsvJsonConverter />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select the conversion direction (CSV → JSON or JSON → CSV), then paste your data into the input panel. Choose
          your preferred delimiter if your CSV does not use commas. Click &quot;Convert&quot; and the result will appear
          in the output panel. You can copy the output to your clipboard or download it as a file. All processing happens
          locally in your browser — no data is uploaded to any server.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="csv-json-converter" locale="en" />
    </div>
    </>
  )
}

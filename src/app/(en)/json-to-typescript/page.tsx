import { Metadata } from 'next'
import JsonToTypescript from '@/components/tools/JsonToTypescript'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'JSON to TypeScript - Free Online Converter | toolcase',
  description:
    'Convert JSON data to TypeScript interfaces and type definitions instantly. Supports nested objects, arrays, and optional fields.',
  alternates: {
    canonical: 'https://toolcase.cc/json-to-typescript',
    languages: {
      en: 'https://toolcase.cc/json-to-typescript',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/json-to-typescript',
    },
  },
}

const faqs = [
  {
    question: 'How does the JSON to TypeScript converter work?',
    answer:
      'The tool parses your JSON data and infers TypeScript types for each field. Objects become interfaces, arrays are typed based on their contents, and primitive values are mapped to their corresponding TypeScript types (string, number, boolean, null).',
  },
  {
    question: 'Does it handle nested objects and arrays?',
    answer:
      'Yes. Nested objects are automatically converted into separate TypeScript interfaces. Arrays of objects generate their own interface types. The tool handles deeply nested structures recursively.',
  },
  {
    question: 'Is my data safe?',
    answer:
      'All processing happens directly in your browser. Your JSON data never leaves your device — nothing is sent to any server.',
  },
]

export default function JsonToTypescriptPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>JSON to TypeScript Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Paste your JSON below to generate TypeScript interfaces and type definitions instantly.
      </p>

      <JsonToTypescript />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Paste your JSON data into the left panel and click &quot;Convert&quot;. The tool will generate TypeScript
          interface definitions in the right panel. You can customize the root interface name using the input field
          in the toolbar. Nested objects automatically produce separate interfaces. Copy the generated types with
          one click and use them directly in your TypeScript projects.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="json-to-typescript" locale="en" />
    </div>
  )
}

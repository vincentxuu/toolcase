import { Metadata } from 'next'
import TomlConverter from '@/components/tools/TomlConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'TOML Converter - Free Online Tool | toolcase',
  description:
    'Convert between TOML and JSON formats instantly. Parse TOML to JSON or generate TOML from JSON data with two-way conversion.',
  alternates: {
    canonical: 'https://toolcase.cc/dev/toml-converter',
    languages: {
      en: 'https://toolcase.cc/dev/toml-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/toml-converter',
    },
  },
}

const faqs = [
  {
    question: 'What is TOML?',
    answer:
      'TOML (Tom\'s Obvious Minimal Language) is a configuration file format that is easy to read due to its clear semantics. It is designed to map unambiguously to a hash table and is commonly used in Rust (Cargo.toml), Python (pyproject.toml), and other project configurations.',
  },
  {
    question: 'What TOML features are supported?',
    answer:
      'This converter handles common TOML features including key-value pairs, tables ([table]), array of tables ([[table]]), inline tables, arrays, strings (basic and literal), integers, floats, booleans, and datetime values.',
  },
  {
    question: 'Is my data safe?',
    answer:
      'All conversion happens directly in your browser. Your data never leaves your device — nothing is sent to any server.',
  },
]

export default function TomlConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'TOML Converter', url: 'https://toolcase.cc/dev/toml-converter' },
        ]}
      />
      <ToolSchema
        name="TOML Converter"
        description="Convert between TOML and JSON formats instantly. Parse TOML to JSON or generate TOML from JSON data with two-way conversion."
        url="https://toolcase.cc/dev/toml-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'TOML Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>TOML Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Convert between TOML and JSON formats. Paste your TOML or JSON data below and convert in either direction.
      </p>

      <TomlConverter />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Paste your TOML or JSON data into the left panel. Click &quot;TOML &rarr; JSON&quot; to convert TOML input
          to JSON format, or click &quot;JSON &rarr; TOML&quot; to convert JSON input to TOML format. The converted
          result appears in the right panel and can be copied with one click. The tool supports tables, arrays,
          inline tables, strings, numbers, booleans, and nested structures.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="toml-converter" locale="en" />
    </div>
    </>
  )
}

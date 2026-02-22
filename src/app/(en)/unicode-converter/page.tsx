import { Metadata } from 'next'
import UnicodeConverter from '@/components/tools/UnicodeConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Unicode Converter - Free Online Tool | toolcase',
  description:
    'Encode and decode Unicode characters. Convert text to Unicode escape sequences, HTML entities, CSS escapes, and code points.',
  alternates: {
    canonical: 'https://toolcase.cc/unicode-converter',
    languages: {
      en: 'https://toolcase.cc/unicode-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/unicode-converter',
    },
  },
}

const faqs = [
  {
    question: 'What is Unicode?',
    answer:
      'Unicode is a universal character encoding standard that assigns a unique number (code point) to every character in every language, including emojis and special symbols. It supports over 149,000 characters from 161 scripts.',
  },
  {
    question: 'What encoding formats are supported?',
    answer:
      'This tool supports Unicode escape sequences (\\u0041), HTML entities (&#65;), JavaScript escapes, CSS escapes, and Unicode code points (U+0041).',
  },
  {
    question: 'When would I need to convert Unicode?',
    answer:
      'Unicode conversion is useful when working with internationalized content, debugging character encoding issues, inserting special characters in code, or preparing text for different encoding contexts like HTML, CSS, or JavaScript.',
  },
  {
    question: 'Does it support emoji?',
    answer:
      'Yes! The converter supports the full Unicode range including emojis, CJK characters, mathematical symbols, and other special characters. Supplementary characters (code points above U+FFFF) are handled using surrogate pairs where needed.',
  },
]

export default function UnicodeConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Unicode Converter', url: 'https://toolcase.cc/unicode-converter' },
        ]}
      />
      <ToolSchema
        name="Unicode Converter"
        description="Encode and decode Unicode characters. Convert text to Unicode escape sequences, HTML entities, CSS escapes, and code points."
        url="https://toolcase.cc/unicode-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Unicode Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Unicode Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Encode and decode Unicode characters in multiple formats.
      </p>

      <UnicodeConverter />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use the Unicode Converter</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select the conversion direction (Text to Unicode or Unicode to Text) and choose the encoding format.
          Then type or paste your input in the left panel. The converted output appears instantly in the right panel.
          You can switch between different encoding formats at any time, and the output will update automatically.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="unicode-converter" locale="en" />
    </div>
    </>
  )
}

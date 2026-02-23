import { Metadata } from 'next'
import BinaryTextConverter from '@/components/tools/BinaryTextConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Binary Text Converter - Text to Binary & Back | toolcase',
  description: 'Convert text to binary and binary back to text instantly. Encode any text as 8-bit binary bytes or decode binary strings to readable text.',
  alternates: { canonical: 'https://toolcase.cc/dev/binary-text-converter', languages: { en: 'https://toolcase.cc/dev/binary-text-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/binary-text-converter' } },
}

const faqs = [
  { question: 'How does text to binary conversion work?', answer: 'Each character is converted to its ASCII code, then represented as an 8-bit binary number. For example, "A" is ASCII 65, which is 01000001 in binary.' },
  { question: 'What format should binary input use?', answer: 'Enter binary bytes separated by spaces. Each byte should be 8 binary digits (0s and 1s). For example: 01001000 01101001 represents "Hi".' },
]

export default function BinaryTextConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Binary Text Converter', url: 'https://toolcase.cc/dev/binary-text-converter' },
        ]}
      />
      <ToolSchema
        name="Binary Text Converter"
        description="Convert text to binary and binary back to text instantly. Encode any text as 8-bit binary bytes or decode binary strings to readable text."
        url="https://toolcase.cc/dev/binary-text-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Binary Text Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Binary Text Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert between text and binary representation. Each character maps to its 8-bit binary form.</p>
      <BinaryTextConverter />
      <FaqSection items={faqs} />
      <RelatedTools current="binary-text-converter" locale="en" />
    </div>
    </>
  )
}

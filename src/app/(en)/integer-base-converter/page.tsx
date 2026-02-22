import { Metadata } from 'next'
import IntegerBaseConverter from '@/components/tools/IntegerBaseConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Integer Base Converter - Free Online Tool | toolcase',
  description: 'Convert numbers between binary, octal, decimal, hexadecimal and custom bases. Free online base converter for developers.',
  alternates: { canonical: 'https://toolcase.cc/integer-base-converter', languages: { en: 'https://toolcase.cc/integer-base-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/integer-base-converter' } },
}

const faqs = [
  { question: 'What are number bases (radixes)?', answer: 'A number base (or radix) is the number of unique digits used to represent numbers. Decimal (base 10) uses digits 0-9, binary (base 2) uses 0 and 1, octal (base 8) uses 0-7, and hexadecimal (base 16) uses 0-9 and A-F. Different bases are useful in different computing contexts — binary for hardware, hex for memory addresses and colors, octal for Unix file permissions.' },
  { question: 'Why is hexadecimal used in programming?', answer: 'Hexadecimal (base 16) is popular in programming because each hex digit maps exactly to 4 binary digits (bits), making it a compact way to represent binary data. For example, the byte 11111111 in binary is simply FF in hex. This makes hex ideal for representing memory addresses, color codes (#FF0000), MAC addresses, and binary data in a human-readable format.' },
  { question: 'How does binary relate to computing?', answer: 'Computers operate using electrical signals that are either on or off, which naturally maps to binary (base 2) with digits 0 and 1. All data in a computer — numbers, text, images — is ultimately stored and processed as sequences of binary digits (bits). Understanding binary is fundamental to understanding how computers work at the hardware level.' },
]

export default function IntegerBaseConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Integer Base Converter', url: 'https://toolcase.cc/integer-base-converter' },
        ]}
      />
      <ToolSchema
        name="Integer Base Converter"
        description="Convert numbers between binary, octal, decimal, hexadecimal and custom bases. Free online base converter for developers."
        url="https://toolcase.cc/integer-base-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Integer Base Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Integer Base Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert integers between binary, octal, decimal, hexadecimal and custom bases.</p>
      <IntegerBaseConverter />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Select the input base (binary, octal, decimal, hexadecimal, or a custom base from 2 to 36), then enter your number. The tool instantly converts and displays the value in all common bases simultaneously. Click the copy button next to any result to copy it to your clipboard. The converter supports arbitrarily large integers.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="integer-base-converter" locale="en" />
    </div>
    </>
  )
}

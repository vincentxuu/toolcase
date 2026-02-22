import { Metadata } from 'next'
import RomanNumeralConverter from '@/components/tools/RomanNumeralConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Roman Numeral Converter - Decimal to Roman & Back | toolcase',
  description: 'Convert between decimal numbers and Roman numerals instantly. Supports values from 1 to 3999 with a full conversion reference table.',
  alternates: { canonical: 'https://toolcase.cc/roman-numeral-converter', languages: { en: 'https://toolcase.cc/roman-numeral-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/roman-numeral-converter' } },
}

const faqs = [
  { question: 'What range of numbers is supported?', answer: 'The converter supports numbers from 1 to 3999, which is the standard range representable using classical Roman numeral notation (I through MMMCMXCIX).' },
  { question: 'How are subtractive forms handled?', answer: 'The converter uses standard subtractive notation: IV (4), IX (9), XL (40), XC (90), CD (400), and CM (900). This is the conventional way Roman numerals are written today.' },
  { question: 'Can I convert in both directions?', answer: 'Yes! You can convert decimal numbers to Roman numerals or Roman numerals back to decimal numbers by switching between the two modes.' },
]

export default function RomanNumeralConverterPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Roman Numeral Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert between decimal numbers and Roman numerals. Supports values from 1 to 3999.</p>
      <RomanNumeralConverter />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Choose a conversion direction — Decimal to Roman or Roman to Decimal — then enter your value. The conversion happens instantly. Toggle the conversion table to see the full list of Roman numeral values for reference.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="roman-numeral-converter" locale="en" />
    </div>
  )
}

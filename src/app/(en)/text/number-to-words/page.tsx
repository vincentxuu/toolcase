import { Metadata } from 'next'
import NumberToWords from '@/components/tools/NumberToWords'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Number to Words Converter - Spell Out Numbers | toolcase',
  description: 'Convert any number to its English word representation. Supports integers, decimals, negative numbers, and large values up to trillions. Free online number to words tool.',
  alternates: { canonical: 'https://toolcase.cc/text/number-to-words', languages: { en: 'https://toolcase.cc/text/number-to-words', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text/number-to-words' } },
}

const faqs = [
  { question: 'What numbers are supported?', answer: 'The converter supports integers, decimal numbers, and negative numbers. It can handle values from zero up to the trillions. Decimal places are spelled out digit by digit after the word "point".' },
  { question: 'How are large numbers formatted?', answer: 'Large numbers are broken into groups of three digits and assigned the appropriate scale word — thousand, million, billion, or trillion. For example, 1500000 becomes "one million five hundred thousand".' },
  { question: 'Can I use this for writing checks?', answer: 'Yes! This tool is commonly used to spell out dollar amounts for checks, legal documents, and invoices where the amount must be written in words.' },
]

export default function NumberToWordsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Number to Words Converter', url: 'https://toolcase.cc/text/number-to-words' },
        ]}
      />
      <ToolSchema
        name="Number to Words Converter"
        description="Convert any number to its English word representation. Supports integers, decimals, negative numbers, and large values up to trillions. Free online number to words tool."
        url="https://toolcase.cc/text/number-to-words"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Number to Words Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Number to Words Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert any number into its English word representation. Supports decimals, negatives, and values up to trillions.</p>
      <NumberToWords />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter a number in the input field and the tool will instantly convert it to English words. Use a minus sign for negative numbers and a decimal point for fractions. Click Copy to copy the result to your clipboard.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="number-to-words" locale="en" />
    </div>
    </>
  )
}

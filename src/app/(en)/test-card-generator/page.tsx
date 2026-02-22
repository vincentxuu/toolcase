import { Metadata } from 'next'
import TestCardGenerator from '@/components/tools/TestCardGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Test Card Generator - Generate Valid Test Credit Cards | toolcase',
  description: 'Generate valid test credit card numbers for development and testing. Supports Visa, MasterCard, Amex, Discover, JCB, and Diners Club.',
  alternates: { canonical: 'https://toolcase.cc/test-card-generator', languages: { en: 'https://toolcase.cc/test-card-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/test-card-generator' } },
}

const faqs = [
  { question: 'Are these real credit card numbers?', answer: 'No! These are test numbers that pass Luhn validation but are NOT real credit cards. They cannot be used for actual transactions.' },
  { question: 'What can I use these numbers for?', answer: 'These numbers are useful for testing payment forms, validating credit card input fields, and development/testing purposes only.' },
  { question: 'Will these work on real payment processors?', answer: 'No. Payment processors require more than just a valid format - they check against actual card databases. These will fail on real payment systems.' },
  { question: 'How does the generator ensure valid numbers?', answer: 'The tool uses the Luhn algorithm to calculate the correct checksum digit, ensuring the generated number passes format validation.' },
]

export default function TestCardGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Test Card Generator', url: 'https://toolcase.cc/test-card-generator' },
        ]}
      />
      <ToolSchema
        name="Test Card Generator"
        description="Generate valid test credit card numbers for development and testing. Supports Visa, MasterCard, Amex, Discover, JCB, and Diners Club."
        url="https://toolcase.cc/test-card-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Test Card Generator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Test Card Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Generate valid test credit card numbers for development and testing purposes.</p>
      <TestCardGenerator
        labels={{
          title: 'Test Card Generator',
          cardType: 'Card Type',
          generate: 'Generate',
          generatedCard: 'Generated Card Number',
          copy: 'Copy',
          copied: 'Copied!',
          note: 'Note: These are test card numbers for development purposes only.',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Select a card type (Visa, MasterCard, etc.) and click Generate. The tool will create a valid test card number that passes Luhn validation. Use these for testing payment forms and validators.</p>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>Important Warning</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>These numbers are for testing ONLY. They are not real credit cards and cannot be used for actual purchases. Attempting to use them fraudulently is illegal.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="test-card-generator" locale="en" />
    </div>
    </>
  )
}

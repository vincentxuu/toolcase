import { Metadata } from 'next'
import CreditCardValidator from '@/components/tools/CreditCardValidator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Credit Card Validator - Check Card Number Validity | toolcase',
  description: 'Validate credit card numbers using the Luhn algorithm. Detects card type (Visa, MasterCard, Amex, etc.). All validation happens in your browser.',
  alternates: { canonical: 'https://toolcase.cc/everyday/credit-card-validator', languages: { en: 'https://toolcase.cc/everyday/credit-card-validator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/credit-card-validator' } },
}

const faqs = [
  { question: 'How does credit card validation work?', answer: 'This tool uses the Luhn algorithm (also called modulus 10 or mod 10 algorithm), a checksum formula used to validate card numbers. It detects simple errors in typing or transmission of card numbers.' },
  { question: 'Can this tool verify if a card is active?', answer: 'No. This tool only validates the card number format using mathematical algorithms. It cannot verify if the card is active, has funds, or belongs to a real person. Only the card issuer can verify those details.' },
  { question: 'Is it safe to enter my real card number?', answer: 'All validation happens entirely in your browser using JavaScript. Your card number never leaves your device. However, we recommend using test card numbers for security best practices.' },
  { question: 'What card types are supported?', answer: 'This tool detects Visa, MasterCard, American Express, Discover, Diners Club, JCB, and UnionPay based on their number patterns.' },
]

export default function CreditCardValidatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Credit Card Validator', url: 'https://toolcase.cc/everyday/credit-card-validator' },
        ]}
      />
      <ToolSchema
        name="Credit Card Validator"
        description="Validate credit card numbers using the Luhn algorithm. Detects card type (Visa, MasterCard, Amex, etc.). All validation happens in your browser."
        url="https://toolcase.cc/everyday/credit-card-validator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Credit Card Validator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Credit Card Validator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Validate credit card numbers and detect card type using the Luhn algorithm.</p>
      <CreditCardValidator
        labels={{
          title: 'Credit Card Validator',
          inputLabel: 'Card Number',
          inputPlaceholder: 'Enter credit card number...',
          validate: 'Validate',
          clear: 'Clear',
          result: 'Result',
          valid: 'Valid',
          invalid: 'Invalid',
          cardType: 'Card Type',
          cardNumber: 'Card Number',
          unknown: 'Unknown',
          visa: 'Visa',
          mastercard: 'MasterCard',
          amex: 'American Express',
          discover: 'Discover',
          dinersclub: 'Diners Club',
          jcb: 'JCB',
          unionpay: 'UnionPay',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter a credit card number in the input field. The tool will automatically format it with spaces. Click the Validate button to check if the number is valid using the Luhn algorithm and see the detected card type.</p>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>Test Card Numbers</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>You can use these test numbers to try the validator:</p>
        <ul style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, paddingLeft: '1.5rem', fontFamily: "'Fira Code', monospace", fontSize: '0.875rem' }}>
          <li>Visa: 4532 1488 0343 6467</li>
          <li>MasterCard: 5425 2334 3010 9903</li>
          <li>American Express: 3782 822463 10005</li>
          <li>Discover: 6011 1111 1111 1117</li>
        </ul>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="credit-card-validator" locale="en" />
    </div>
    </>
  )
}

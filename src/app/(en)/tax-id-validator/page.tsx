import { Metadata } from 'next'
import TaxIdValidator from '@/components/tools/TaxIdValidator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan Tax ID Validator - Validate Business Number | toolcase',
  description: 'Validate Taiwan Business Tax ID (統一編號) using the official algorithm. Instantly check if an 8-digit tax ID is valid.',
  alternates: { canonical: 'https://toolcase.cc/tax-id-validator', languages: { en: 'https://toolcase.cc/tax-id-validator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tax-id-validator' } },
}

const faqs = [
  { question: 'What is a Taiwan Tax ID?', answer: 'A Taiwan Business Tax ID (統一編號) is an 8-digit unique identifier assigned to businesses and organizations registered in Taiwan. It\'s similar to an EIN in the US or a VAT number in Europe.' },
  { question: 'How is the Tax ID validated?', answer: 'The validation uses the official algorithm set by Taiwan\'s Ministry of Finance, which applies specific weights to each digit and calculates a checksum. There\'s a special rule for IDs with 7 in the 7th position.' },
  { question: 'Can this verify if a business is active?', answer: 'No. This tool only validates the number format using the checksum algorithm. It cannot verify if the business is currently registered or active. For that, you\'d need to check with the Taiwan Ministry of Finance or tax bureau.' },
]

export default function TaxIdValidatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan Tax ID Validator', url: 'https://toolcase.cc/tax-id-validator' },
        ]}
      />
      <ToolSchema
        name="Taiwan Tax ID Validator"
        description="Validate Taiwan Business Tax ID (統一編號) using the official algorithm. Instantly check if an 8-digit tax ID is valid."
        url="https://toolcase.cc/tax-id-validator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan Tax ID Validator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Tax ID Validator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Validate Taiwan Business Tax ID (統一編號) using the official algorithm.</p>
      <TaxIdValidator
        labels={{
          title: 'Taiwan Tax ID Validator',
          inputLabel: 'Tax ID (統一編號)',
          inputPlaceholder: 'Enter 8-digit tax ID...',
          validate: 'Validate',
          clear: 'Clear',
          result: 'Result',
          valid: 'Valid',
          invalid: 'Invalid',
          format: 'Format',
          status: 'Status',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter an 8-digit Taiwan Business Tax ID and click Validate. The tool will check if the number is valid using the official Ministry of Finance algorithm.</p>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>About Taiwan Tax ID</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>The Tax ID consists of 8 digits. The validation algorithm uses weighted checksums with special handling for numbers with 7 in the 7th position. This ensures the number follows the correct format specified by Taiwan's tax authorities.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="tax-id-validator" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import TaiwanIdValidator from '@/components/tools/TaiwanIdValidator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan ID Validator - Free Online Tool | toolcase',
  description: 'Validate Taiwan business IDs (統一編號) and national identification numbers (身分證字號) online. Free format checker with random ID generator for testing.',
  alternates: { canonical: 'https://toolcase.cc/taiwan-id-validator', languages: { en: 'https://toolcase.cc/taiwan-id-validator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/taiwan-id-validator' } },
}

const faqs = [
  { question: 'How does the business ID validation work?', answer: 'Taiwan business IDs (統一編號) are 8-digit numbers validated using a weighted checksum algorithm. Each digit is multiplied by a weight [1,2,1,2,1,2,4,1], digits of products are summed, and the total must be divisible by 5.' },
  { question: 'How does the national ID validation work?', answer: 'Taiwan national IDs consist of 1 letter followed by 9 digits. The letter maps to a 2-digit number, then a weighted checksum is applied. The second digit indicates gender: 1 for male, 2 for female, and 8 or 9 for the newer format.' },
  { question: 'Are the generated IDs real?', answer: 'No. The generated IDs are random numbers that pass the format validation algorithm. They are intended for testing and development purposes only. They do not correspond to any real person or business.' },
]

export default function TaiwanIdValidatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan ID Validator', url: 'https://toolcase.cc/taiwan-id-validator' },
        ]}
      />
      <ToolSchema
        name="Taiwan ID Validator"
        description="Validate Taiwan business IDs (統一編號) and national identification numbers (身分證字號) online. Free format checker with random ID generator for testing."
        url="https://toolcase.cc/taiwan-id-validator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan ID Validator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan ID Validator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Validate Taiwan business IDs and national identification numbers.</p>
      <TaiwanIdValidator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter a Taiwan business ID (統一編號, 8 digits) or national ID (身分證字號, 1 letter + 9 digits) and click Validate. The tool checks whether the number passes the official checksum algorithm. You can also use the random generator to create valid test IDs for development purposes.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="taiwan-id-validator" locale="en" />
    </div>
    </>
  )
}

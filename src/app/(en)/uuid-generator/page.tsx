import { Metadata } from 'next'
import UuidGenerator from '@/components/tools/UuidGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'UUID Generator - Free Online Tool | toolcase',
  description: 'Generate UUID v4 and ULID identifiers instantly. Free online UUID generator with bulk generation support for developers.',
  alternates: { canonical: 'https://toolcase.cc/uuid-generator', languages: { en: 'https://toolcase.cc/uuid-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/uuid-generator' } },
}

const faqs = [
  { question: 'What is the difference between UUID and ULID?', answer: 'UUID v4 is a 128-bit randomly generated identifier following RFC 4122. It has no inherent ordering. ULID (Universally Unique Lexicographically Sortable Identifier) is also 128-bit but encodes a timestamp in the first 48 bits, making ULIDs sortable by creation time. ULIDs use Crockford Base32 encoding and are case-insensitive.' },
  { question: 'Are UUID v4 values truly unique?', answer: 'UUID v4 generates 122 random bits, producing 2^122 possible values (approximately 5.3 x 10^36). The probability of generating two identical UUIDs is astronomically small — you would need to generate about 2.71 quintillion UUIDs to have a 50% chance of a collision. For all practical purposes, they are unique.' },
  { question: 'When should I use UUID vs ULID?', answer: 'Use UUID v4 when you need a widely-supported standard identifier with maximum randomness. Use ULID when you need sortable identifiers — for example, as database primary keys where insertion order matters, or in distributed systems where you want time-ordered IDs without a central coordinator.' },
]

export default function UuidGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'UUID Generator', url: 'https://toolcase.cc/uuid-generator' },
        ]}
      />
      <ToolSchema
        name="UUID Generator"
        description="Generate UUID v4 and ULID identifiers instantly. Free online UUID generator with bulk generation support for developers."
        url="https://toolcase.cc/uuid-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'UUID Generator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>UUID Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Generate UUID v4 and ULID identifiers for your applications.</p>
      <UuidGenerator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Select the identifier type — UUID v4 or ULID — and click the generate button. The result is displayed instantly and can be copied to your clipboard. Use the bulk generation feature to generate 1, 5, 10 or 50 identifiers at once. All generation is done in your browser using the Web Crypto API.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="uuid-generator" locale="en" />
    </div>
    </>
  )
}

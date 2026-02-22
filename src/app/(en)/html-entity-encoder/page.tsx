import { Metadata } from 'next'
import HtmlEntityEncoder from '@/components/tools/HtmlEntityEncoder'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'HTML Entity Encoder/Decoder - Free Online Tool | toolcase',
  description: 'Encode and decode HTML entities online. Convert special characters to HTML entities and back. Supports named and numeric entities.',
  alternates: { canonical: 'https://toolcase.cc/html-entity-encoder', languages: { en: 'https://toolcase.cc/html-entity-encoder', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/html-entity-encoder' } },
}

const faqs = [
  { question: 'What are HTML entities?', answer: 'HTML entities are special codes used to represent characters that have special meaning in HTML or are not easily typed on a keyboard. For example, < is represented as &lt; and & as &amp;. They can be named (like &amp;) or numeric (like &#38; or &#x26;). Using entities ensures your HTML renders correctly and prevents XSS vulnerabilities.' },
  { question: 'When should I encode HTML entities?', answer: 'You should encode HTML entities whenever you display user-generated content in HTML to prevent XSS (Cross-Site Scripting) attacks. Also encode when you need to display HTML code as visible text (like showing code examples), or when using special characters that might conflict with HTML syntax like <, >, &, and quotes.' },
  { question: 'What is the difference between named and numeric entities?', answer: 'Named entities use a human-readable name (e.g., &amp; for &, &lt; for <), while numeric entities use the Unicode code point in decimal (&#38;) or hexadecimal (&#x26;) form. Named entities are easier to read but only a subset of characters have named versions. Numeric entities can represent any Unicode character.' },
]

export default function HtmlEntityEncoderPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'HTML Entity Encoder/Decoder', url: 'https://toolcase.cc/html-entity-encoder' },
        ]}
      />
      <ToolSchema
        name="HTML Entity Encoder/Decoder"
        description="Encode and decode HTML entities online. Convert special characters to HTML entities and back. Supports named and numeric entities."
        url="https://toolcase.cc/html-entity-encoder"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'HTML Entity Encoder/Decoder' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>HTML Entity Encoder/Decoder</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Encode special characters to HTML entities or decode HTML entities back to characters.</p>
      <HtmlEntityEncoder />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter your text in the left textarea. Click "Encode" to convert special characters to their HTML entity equivalents, or enter HTML entities and click "Decode" to convert them back to readable characters. The tool supports both named entities (like &amp;amp;) and numeric entities (like &amp;#38;). Click the copy button to copy the result to your clipboard.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="html-entity-encoder" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import PunycodeConverter from '@/components/tools/PunycodeConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Punycode Converter - IDN Encoder & Decoder | toolcase',
  description: 'Convert internationalized domain names (IDN) to Punycode format. Encode and decode non-ASCII domain names for DNS compatibility.',
  alternates: { canonical: 'https://toolcase.cc/punycode-converter', languages: { en: 'https://toolcase.cc/punycode-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/punycode-converter' } },
}

const faqs = [
  { question: 'What is Punycode?', answer: 'Punycode is a way to represent Unicode characters (like Chinese, Arabic, Emoji) in ASCII characters for use in domain names. It allows internationalized domain names (IDN) to work with the existing DNS infrastructure.' },
  { question: 'When do I need Punycode?', answer: 'You need Punycode when working with domain names that contain non-ASCII characters. For example, if you have a Chinese domain like "中文.com", it needs to be encoded as "xn--fiq228c.com" for DNS systems.' },
  { question: 'How does Punycode encoding work?', answer: 'Punycode uses a special algorithm to convert Unicode characters into ASCII. The encoded result starts with "xn--" followed by ASCII characters that represent the original Unicode text.' },
]

export default function PunycodeConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Punycode Converter', url: 'https://toolcase.cc/punycode-converter' },
        ]}
      />
      <ToolSchema
        name="Punycode Converter"
        description="Convert internationalized domain names (IDN) to Punycode format. Encode and decode non-ASCII domain names for DNS compatibility."
        url="https://toolcase.cc/punycode-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Punycode Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Punycode Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert internationalized domain names to Punycode format and back.</p>
      <PunycodeConverter
        labels={{
          title: 'Punycode Converter',
          input: 'Input',
          inputPlaceholder: 'Enter domain or punycode...',
          encode: 'Encode',
          decode: 'Decode',
          clear: 'Clear',
          result: 'Result',
          copy: 'Copy',
          copied: 'Copied!',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter a domain name with Unicode characters and click Encode to convert it to Punycode. Or enter a Punycode domain (starting with xn--) and click Decode to see the original Unicode text.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="punycode-converter" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import BopomofoConverter from '@/components/tools/BopomofoConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Bopomofo Converter - Chinese to Zhuyin (ㄅㄆㄇㄈ) | toolcase',
  description: 'Convert Chinese characters to Bopomofo (Zhuyin) phonetic symbols. Learn Taiwan phonetic system with this converter tool.',
  alternates: { canonical: 'https://toolcase.cc/text/bopomofo-converter', languages: { en: 'https://toolcase.cc/text/bopomofo-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text/bopomofo-converter' } },
}

const faqs = [
  { question: 'What is Bopomofo?', answer: 'Bopomofo (ㄅㄆㄇㄈ), also called Zhuyin (注音符號), is a phonetic system for transcribing Mandarin Chinese. It\'s primarily used in Taiwan for teaching Chinese pronunciation to children and learners.' },
  { question: 'How is Bopomofo different from Pinyin?', answer: 'While Pinyin uses Latin alphabet, Bopomofo uses unique phonetic symbols. Bopomofo is more commonly used in Taiwan, while Pinyin is the standard in mainland China and internationally.' },
  { question: 'Can I use this for learning Chinese?', answer: 'Yes! This tool is especially useful if you\'re learning Traditional Chinese or planning to study in Taiwan, where Bopomofo is the standard phonetic system taught in schools.' },
]

export default function BopomofoConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Bopomofo Converter', url: 'https://toolcase.cc/text/bopomofo-converter' },
        ]}
      />
      <ToolSchema
        name="Bopomofo Converter"
        description="Convert Chinese characters to Bopomofo (Zhuyin) phonetic symbols. Learn Taiwan phonetic system with this converter tool."
        url="https://toolcase.cc/text/bopomofo-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Bopomofo Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Bopomofo Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert Chinese characters to Bopomofo (Zhuyin) phonetic symbols used in Taiwan.</p>
      <BopomofoConverter
        labels={{
          title: 'Bopomofo Converter',
          input: 'Chinese Text',
          inputPlaceholder: 'Enter Chinese characters...',
          convert: 'Convert',
          clear: 'Clear',
          result: 'Result',
          copy: 'Copy',
          copied: 'Copied!',
          note: 'Note: This converter supports common Chinese characters.',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter Chinese characters in the input field and click Convert. The tool will display the Bopomofo phonetic symbols for each character. Characters not in the dictionary will be shown in brackets.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="bopomofo-converter" locale="en" />
    </div>
    </>
  )
}

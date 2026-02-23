import { Metadata } from 'next'
import ChineseConverter from '@/components/tools/ChineseConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Chinese Simplified/Traditional Converter - Free Online Tool | toolcase',
  description:
    'Convert between Simplified Chinese and Traditional Chinese instantly. Free online Chinese character converter with real-time conversion.',
  alternates: {
    canonical: 'https://toolcase.cc/text/chinese-converter',
    languages: {
      en: 'https://toolcase.cc/text/chinese-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text/chinese-converter',
    },
  },
}

const faqs = [
  {
    question: 'What is the difference between Simplified and Traditional Chinese?',
    answer:
      'Simplified Chinese characters were introduced in the 1950s-60s in mainland China to increase literacy. They have fewer strokes than their Traditional counterparts. Traditional Chinese is used in Taiwan, Hong Kong, and Macau.',
  },
  {
    question: 'How accurate is the conversion?',
    answer:
      'The converter handles the most common character mappings covering everyday text. Some context-dependent conversions (where one simplified character maps to multiple traditional characters) may need manual review.',
  },
  {
    question: 'Can I convert long texts?',
    answer:
      'Yes! The converter works with text of any length. Conversion happens in real-time as you type, directly in your browser.',
  },
  {
    question: 'Is my text sent to a server?',
    answer:
      'No. All conversion happens locally in your browser using a built-in character mapping table. Your text never leaves your device.',
  },
]

export default function ChineseConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Chinese Simplified/Traditional Converter', url: 'https://toolcase.cc/text/chinese-converter' },
        ]}
      />
      <ToolSchema
        name="Chinese Simplified/Traditional Converter"
        description="Convert between Simplified Chinese and Traditional Chinese instantly. Free online Chinese character converter with real-time conversion."
        url="https://toolcase.cc/text/chinese-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Chinese Simplified/Traditional Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Chinese Simplified/Traditional Converter
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Convert between Simplified Chinese and Traditional Chinese characters in real-time.
      </p>

      <ChineseConverter />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Convert Chinese Text</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select the conversion direction (Simplified to Traditional or Traditional to Simplified), then paste or
          type your Chinese text in the left panel. The converted text appears instantly in the right panel. Use the
          &quot;Swap&quot; button to reverse the direction and swap the input and output text.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="chinese-converter" locale="en" />
    </div>
    </>
  )
}

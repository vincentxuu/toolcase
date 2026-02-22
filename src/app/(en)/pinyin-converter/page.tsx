import { Metadata } from 'next'
import PinyinConverter from '@/components/tools/PinyinConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Pinyin Converter - Chinese to Pinyin with Tones | toolcase',
  description: 'Convert Chinese characters to Pinyin with tone marks. Supports multiple output formats including tones, numbers, and first letters.',
  alternates: { canonical: 'https://toolcase.cc/pinyin-converter', languages: { en: 'https://toolcase.cc/pinyin-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/pinyin-converter' } },
}

const faqs = [
  { question: 'What is Pinyin?', answer: 'Pinyin is the official romanization system for Standard Chinese. It uses Latin alphabet to represent Chinese pronunciation, making it easier for learners to pronounce Chinese characters.' },
  { question: 'What are the different tone formats?', answer: 'With tone marks (āáǎà) shows diacritical marks above vowels. Tone numbers (a1 a2 a3 a4) uses digits 1-4 after each syllable. Without tone removes all tone indicators. First letters only shows initial letters of each character.' },
  { question: 'Can I use this for learning Chinese?', answer: 'Yes! This tool is perfect for Chinese learners. It helps you learn correct pronunciation and understand tones, which are crucial in Mandarin Chinese.' },
]

export default function PinyinConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Pinyin Converter', url: 'https://toolcase.cc/pinyin-converter' },
        ]}
      />
      <ToolSchema
        name="Pinyin Converter"
        description="Convert Chinese characters to Pinyin with tone marks. Supports multiple output formats including tones, numbers, and first letters."
        url="https://toolcase.cc/pinyin-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Pinyin Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Pinyin Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert Chinese characters to Pinyin romanization with multiple output formats.</p>
      <PinyinConverter
        labels={{
          title: 'Pinyin Converter',
          input: 'Chinese Text',
          inputPlaceholder: 'Enter Chinese characters...',
          mode: 'Output Mode',
          withTone: 'With Tone Marks (āáǎà)',
          withoutTone: 'Without Tone',
          toneNumber: 'Tone Numbers (a1 a2 a3 a4)',
          firstLetter: 'First Letters Only',
          convert: 'Convert',
          clear: 'Clear',
          result: 'Result',
          copy: 'Copy',
          copied: 'Copied!',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter Chinese characters in the input field, select your preferred output format, and click Convert. The tool supports tone marks, tone numbers, plain text without tones, and first letter abbreviations.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="pinyin-converter" locale="en" />
    </div>
    </>
  )
}

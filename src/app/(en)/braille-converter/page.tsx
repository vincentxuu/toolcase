import { Metadata } from 'next'
import BrailleConverter from '@/components/tools/BrailleConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Braille Converter - Text to Braille Translator | toolcase',
  description: 'Convert text to Braille and Braille to text. Learn and practice Braille reading with this online converter tool.',
  alternates: { canonical: 'https://toolcase.cc/braille-converter', languages: { en: 'https://toolcase.cc/braille-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/braille-converter' } },
}

const faqs = [
  { question: 'What is Braille?', answer: 'Braille is a tactile writing system used by people who are blind or visually impaired. It consists of patterns of raised dots arranged in cells, with each cell representing a letter, number, or symbol.' },
  { question: 'What grade of Braille does this use?', answer: 'This converter uses English Braille Grade 1, which is a direct letter-for-letter transcription. It includes basic letters, numbers, and common punctuation marks.' },
  { question: 'Can I use this to learn Braille?', answer: 'Yes! This tool is great for learning and practicing Braille. You can type regular text to see the Braille equivalent, or practice reading Braille by converting it back to text.' },
]

export default function BrailleConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Braille Converter', url: 'https://toolcase.cc/braille-converter' },
        ]}
      />
      <ToolSchema
        name="Braille Converter"
        description="Convert text to Braille and Braille to text. Learn and practice Braille reading with this online converter tool."
        url="https://toolcase.cc/braille-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Braille Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Braille Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert text to Braille and vice versa. Learn and practice Braille reading online.</p>
      <BrailleConverter
        labels={{
          title: 'Braille Converter',
          input: 'Input',
          inputPlaceholder: 'Enter text or braille...',
          toBraille: 'To Braille',
          toText: 'To Text',
          clear: 'Clear',
          result: 'Result',
          copy: 'Copy',
          copied: 'Copied!',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter regular text and click "To Braille" to convert it to Braille characters. Or enter Braille characters and click "To Text" to convert them back to regular text. This is useful for learning Braille or creating Braille content.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="braille-converter" locale="en" />
    </div>
    </>
  )
}

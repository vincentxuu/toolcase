import { Metadata } from 'next'
import TextRepeater from '@/components/tools/TextRepeater'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Text Repeater - Repeat Text Multiple Times | toolcase',
  description: 'Repeat any text multiple times with custom separators. Choose newline, space, comma, or custom separator. Generate repeated text up to 10,000 times instantly.',
  alternates: { canonical: 'https://toolcase.cc/text-repeater', languages: { en: 'https://toolcase.cc/text-repeater', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text-repeater' } },
}

const faqs = [
  { question: 'How many times can I repeat text?', answer: 'You can repeat text from 1 to 10,000 times. The tool generates the output instantly in your browser.' },
  { question: 'What separators are available?', answer: 'The tool offers four separator options: newline (each repetition on a new line), space, comma, or a custom separator string that you define.' },
  { question: 'Is there a character limit?', answer: 'There is no hard character limit on the input text. However, very large outputs (e.g. long text repeated thousands of times) may slow down your browser.' },
]

export default function TextRepeaterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Text Repeater', url: 'https://toolcase.cc/text-repeater' },
        ]}
      />
      <ToolSchema
        name="Text Repeater"
        description="Repeat any text multiple times with custom separators. Choose newline, space, comma, or custom separator. Generate repeated text up to 10,000 times instantly."
        url="https://toolcase.cc/text-repeater"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Text Repeater' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Text Repeater</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Repeat any text multiple times with your choice of separator. Great for generating test data, filler text, or repetitive content.</p>
      <TextRepeater />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter the text you want to repeat, set how many times it should repeat, and choose a separator (newline, space, comma, or custom). The output is generated instantly. Click Copy to copy the result to your clipboard.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="text-repeater" locale="en" />
    </div>
    </>
  )
}

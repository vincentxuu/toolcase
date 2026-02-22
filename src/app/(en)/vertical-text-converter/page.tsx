import { Metadata } from 'next'
import VerticalTextConverter from '@/components/tools/VerticalTextConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Vertical Text Converter - Display Text Vertically | toolcase',
  description: 'Convert text to vertical writing format. Preview traditional vertical text layout used in Chinese, Japanese, and Korean typography.',
  alternates: { canonical: 'https://toolcase.cc/vertical-text-converter', languages: { en: 'https://toolcase.cc/vertical-text-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/vertical-text-converter' } },
}

const faqs = [
  { question: 'What is vertical text?', answer: 'Vertical text is a writing mode where text flows from top to bottom instead of left to right. It\'s traditionally used in Chinese, Japanese, and Korean (CJK) typography, especially for formal documents and classical literature.' },
  { question: 'What\'s the difference between right-to-left and left-to-right?', answer: 'Right-to-left (traditional) starts columns from the right side of the page. Left-to-right (modern) starts from the left. Traditional Chinese and Japanese use right-to-left vertical text.' },
  { question: 'Can I use this for web design?', answer: 'Yes! This preview shows how vertical text looks using CSS writing-mode property. You can use the same CSS technique in your web designs for vertical layouts.' },
]

export default function VerticalTextConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Vertical Text Converter', url: 'https://toolcase.cc/vertical-text-converter' },
        ]}
      />
      <ToolSchema
        name="Vertical Text Converter"
        description="Convert text to vertical writing format. Preview traditional vertical text layout used in Chinese, Japanese, and Korean typography."
        url="https://toolcase.cc/vertical-text-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Vertical Text Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Vertical Text Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert and preview text in traditional vertical writing format.</p>
      <VerticalTextConverter
        labels={{
          title: 'Vertical Text Converter',
          input: 'Input Text',
          inputPlaceholder: 'Enter text to display vertically...',
          orientation: 'Orientation',
          rightToLeft: 'Right to Left',
          leftToRight: 'Left to Right',
          preview: 'Preview',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter your text in the input field and select an orientation. The preview will show how your text looks in vertical format. This is especially useful for designing traditional Asian typography.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="vertical-text-converter" locale="en" />
    </div>
    </>
  )
}

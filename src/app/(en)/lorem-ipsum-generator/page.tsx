import { Metadata } from 'next'
import LoremIpsumGenerator from '@/components/tools/LoremIpsumGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator - Free Online Tool | toolcase',
  description:
    'Generate placeholder text for your designs and layouts. Create paragraphs, sentences, or words of lorem ipsum text with one click.',
  alternates: {
    canonical: 'https://toolcase.cc/lorem-ipsum-generator',
    languages: {
      en: 'https://toolcase.cc/lorem-ipsum-generator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/lorem-ipsum-generator',
    },
  },
}

const faqs = [
  {
    question: 'What is lorem ipsum?',
    answer:
      'Lorem ipsum is placeholder text commonly used in the design and typesetting industries. It originates from a scrambled passage of "De Finibus Bonorum et Malorum" by Cicero, written in 45 BC. Designers use it to fill layouts so that viewers focus on visual design rather than the content.',
  },
  {
    question: 'Can I generate text by paragraphs, sentences, or words?',
    answer:
      'Yes. You can choose to generate a specific number of paragraphs, sentences, or individual words. This flexibility lets you produce exactly the amount of placeholder text you need for your project.',
  },
  {
    question: 'Does the generated text always start with "Lorem ipsum dolor sit amet"?',
    answer:
      'By default, the first paragraph starts with the classic "Lorem ipsum dolor sit amet" opening. You can toggle this option off if you prefer fully randomised text from the very beginning.',
  },
]

export default function LoremIpsumGeneratorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Lorem Ipsum Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Generate placeholder text for your designs, mockups, and layouts.
      </p>

      <LoremIpsumGenerator />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select the unit of text you want — paragraphs, sentences, or words — and enter the quantity. Click
          &quot;Generate&quot; to create the placeholder text instantly. The output can be copied to your clipboard with
          one click. Use the generated text in website mockups, graphic designs, print layouts, or anywhere you need
          realistic-looking content without writing actual copy.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="lorem-ipsum-generator" locale="en" />
    </div>
  )
}

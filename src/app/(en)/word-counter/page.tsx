import { Metadata } from 'next'
import WordCounter from '@/components/tools/WordCounter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Word Counter - Free Online Tool | toolcase',
  description: 'Count words, characters, sentences and paragraphs instantly. Free online word counter for writers, students and professionals.',
  alternates: { canonical: 'https://toolcase.cc/word-counter', languages: { en: 'https://toolcase.cc/word-counter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/word-counter' } },
}

const faqs = [
  { question: 'How does the word counter work?', answer: 'The word counter analyzes your text in real time as you type or paste it. It counts words by splitting text on whitespace, counts every individual character (with and without spaces), and also tallies sentences and paragraphs for a complete overview of your text.' },
  { question: 'Does it count special characters and punctuation?', answer: 'Yes, all characters including punctuation marks, symbols and special characters are included in the character count. The tool provides both a character count with spaces and without spaces so you can use whichever metric you need.' },
  { question: 'What is the average reading time based on?', answer: 'Reading time is estimated based on an average reading speed of about 200-250 words per minute for adults. Speaking time, useful for presentations, is based on approximately 130-150 words per minute. These are general averages and individual speeds may vary.' },
]

export default function WordCounterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Word Counter', url: 'https://toolcase.cc/word-counter' },
        ]}
      />
      <ToolSchema
        name="Word Counter"
        description="Count words, characters, sentences and paragraphs instantly. Free online word counter for writers, students and professionals."
        url="https://toolcase.cc/word-counter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Word Counter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Word Counter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Count words, characters, sentences and paragraphs in your text.</p>
      <WordCounter />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Type or paste your text into the input area. The tool instantly displays the word count, character count, sentence count and paragraph count. Use it to check essay lengths, meet word limits or estimate reading time for your content.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="word-counter" locale="en" />
    </div>
    </>
  )
}

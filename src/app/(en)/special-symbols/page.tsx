import { Metadata } from 'next'
import SpecialSymbols from '@/components/tools/SpecialSymbols'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Special Symbols - Copy & Paste Symbols | toolcase',
  description: 'Arrows, checkmarks, hearts, stars, math symbols, currency signs and more. Click to copy any symbol instantly.',
  alternates: { canonical: 'https://toolcase.cc/special-symbols', languages: { en: 'https://toolcase.cc/special-symbols', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/special-symbols' } },
}

const faqs = [
  { question: 'How do I use special symbols?', answer: 'Simply click on any symbol to copy it to your clipboard, then paste it anywhere with Ctrl+V (or Cmd+V).' },
  { question: 'Where can I use these symbols?', answer: 'These Unicode symbols work on most platforms including social media, email, documents, messaging apps, and more.' },
]

export default function SpecialSymbolsPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Special Symbols</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Copy & paste special symbols. Arrows, checkmarks, hearts, stars, math symbols and more.</p>
      <SpecialSymbols labels={{ clickToCopy: 'Click to copy', copied: 'Copied!', search: 'Search', searchPlaceholder: 'Search symbols...', categories: [] }} />
      <FaqSection items={faqs} title="FAQ" />
      <RelatedTools current="special-symbols" locale="en" />
    </div>
  )
}

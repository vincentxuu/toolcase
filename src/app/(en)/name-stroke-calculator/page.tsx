import { Metadata } from 'next'
import NameStrokeCalculator from '@/components/tools/NameStrokeCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Chinese Name Stroke Calculator - Fortune Analysis | toolcase',
  description: 'Calculate the total stroke count of Chinese characters in a name and check fortune based on traditional numerology.',
  alternates: { canonical: 'https://toolcase.cc/name-stroke-calculator', languages: { en: 'https://toolcase.cc/name-stroke-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/name-stroke-calculator' } },
}

const faqs = [
  { question: 'How does stroke counting work?', answer: 'Each Chinese character has a fixed number of brush strokes. This tool counts the strokes for each character and sums them up.' },
  { question: 'Is the fortune analysis accurate?', answer: 'Name stroke fortune analysis is a traditional folk practice for entertainment purposes only. It should not be used for major decisions.' },
]

export default function NameStrokeCalculatorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Chinese Name Stroke Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Calculate stroke counts for Chinese names and check fortune based on traditional numerology.</p>
      <NameStrokeCalculator labels={{ title: 'Name Stroke Calculator', inputPlaceholder: 'Enter Chinese name', calculate: 'Calculate', totalStrokes: 'Total Strokes', eachChar: 'Each Character', fortune: 'Fortune', strokeBreakdown: 'Breakdown' }} />
      <FaqSection items={faqs} title="FAQ" />
      <RelatedTools current="name-stroke-calculator" locale="en" />
    </div>
  )
}

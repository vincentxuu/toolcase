import { Metadata } from 'next'
import RandomNumberGenerator from '@/components/tools/RandomNumberGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Random Number Generator - Free Online Tool | toolcase',
  description: 'Generate random numbers within any range. Free online random number generator for games, lotteries, statistics and more.',
  alternates: { canonical: 'https://toolcase.cc/random-number-generator', languages: { en: 'https://toolcase.cc/random-number-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/random-number-generator' } },
}

const faqs = [
  { question: 'Are the generated numbers truly random?', answer: 'The tool uses a cryptographically secure pseudo-random number generator (CSPRNG) provided by your browser, which produces numbers that are statistically random and unpredictable. While not based on physical randomness, they are suitable for virtually all everyday purposes including games, drawings and simulations.' },
  { question: 'Can I generate multiple random numbers at once?', answer: 'Yes, you can specify how many random numbers you want to generate in a single batch. You can also choose whether to allow duplicate numbers or require all numbers to be unique, which is useful for lottery-style drawings.' },
  { question: 'Can I generate decimal numbers or only integers?', answer: 'You can generate both whole numbers (integers) and decimal numbers. Set your minimum and maximum values and choose the number of decimal places you need. The default mode generates integers, which works for most common use cases like dice rolls and lottery picks.' },
]

export default function RandomNumberGeneratorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Random Number Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Generate random numbers within a custom range.</p>
      <RandomNumberGenerator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Set your minimum and maximum values to define the range. Choose how many numbers to generate and whether duplicates are allowed. Click generate to get your random numbers instantly. Results can be copied to your clipboard.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="random-number-generator" locale="en" />
    </div>
  )
}

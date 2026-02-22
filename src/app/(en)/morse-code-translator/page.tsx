import { Metadata } from 'next'
import MorseCodeTranslator from '@/components/tools/MorseCodeTranslator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Morse Code Translator - Text to Morse & Morse to Text | toolcase',
  description: 'Translate text to Morse code and Morse code to text instantly. Includes audio playback, reference chart, and copy to clipboard. Free online Morse code converter.',
  alternates: { canonical: 'https://toolcase.cc/morse-code-translator', languages: { en: 'https://toolcase.cc/morse-code-translator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/morse-code-translator' } },
}

const faqs = [
  { question: 'How does the Morse code translator work?', answer: 'The tool maps each letter, number and common punctuation to its International Morse Code representation using dots (.) and dashes (-). Words are separated by a forward slash (/). You can translate in both directions: text to Morse and Morse to text.' },
  { question: 'Can I listen to the Morse code?', answer: 'Yes! Click the Play button to hear the Morse code as audio tones. The tool uses the Web Audio API to generate accurate dot and dash sounds at 600 Hz, following standard Morse code timing ratios.' },
  { question: 'What characters are supported?', answer: 'The translator supports all 26 English letters (A-Z), digits (0-9), and common punctuation marks including period, comma, question mark, exclamation mark, slash, parentheses, colon, semicolon, and more.' },
]

export default function MorseCodeTranslatorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Morse Code Translator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert text to Morse code and back. Listen to the Morse code audio or view the full reference chart.</p>
      <MorseCodeTranslator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Choose a direction — Text to Morse or Morse to Text — then type or paste your input. The translation appears instantly in the output field. Click Copy to copy the result. Use the Play button to hear the Morse code as audio, or toggle the Reference Chart to see the full mapping of characters to Morse code.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="morse-code-translator" locale="en" />
    </div>
  )
}

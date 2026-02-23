import { Metadata } from 'next'
import MorseCodeTranslator from '@/components/tools/MorseCodeTranslator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Morse Code Translator - Text to Morse & Morse to Text | toolcase',
  description: 'Translate text to Morse code and Morse code to text instantly. Includes audio playback, reference chart, and copy to clipboard. Free online Morse code converter.',
  alternates: { canonical: 'https://toolcase.cc/text/morse-code-translator', languages: { en: 'https://toolcase.cc/text/morse-code-translator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text/morse-code-translator' } },
}

const faqs = [
  { question: 'How does the Morse code translator work?', answer: 'The tool maps each letter, number and common punctuation to its International Morse Code representation using dots (.) and dashes (-). Words are separated by a forward slash (/). You can translate in both directions: text to Morse and Morse to text.' },
  { question: 'Can I listen to the Morse code?', answer: 'Yes! Click the Play button to hear the Morse code as audio tones. The tool uses the Web Audio API to generate accurate dot and dash sounds at 600 Hz, following standard Morse code timing ratios.' },
  { question: 'What characters are supported?', answer: 'The translator supports all 26 English letters (A-Z), digits (0-9), and common punctuation marks including period, comma, question mark, exclamation mark, slash, parentheses, colon, semicolon, and more.' },
]

export default function MorseCodeTranslatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Morse Code Translator', url: 'https://toolcase.cc/text/morse-code-translator' },
        ]}
      />
      <ToolSchema
        name="Morse Code Translator"
        description="Translate text to Morse code and Morse code to text instantly. Includes audio playback, reference chart, and copy to clipboard. Free online Morse code converter."
        url="https://toolcase.cc/text/morse-code-translator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Morse Code Translator' },
          ]}
        />
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
    </>
  )
}

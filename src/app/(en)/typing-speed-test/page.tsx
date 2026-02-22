import { Metadata } from 'next'
import TypingSpeedTest from '@/components/tools/TypingSpeedTest'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Typing Speed Test - WPM & Accuracy | toolcase',
  description: 'Test your typing speed and accuracy with our free online typing test. Measures words per minute (WPM), net WPM, and accuracy in real time.',
  alternates: { canonical: 'https://toolcase.cc/typing-speed-test', languages: { en: 'https://toolcase.cc/typing-speed-test', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/typing-speed-test' } },
}

const faqs = [
  { question: 'How is WPM calculated?', answer: 'Words per minute (WPM) is calculated by dividing the total number of characters typed by 5 (the standard word length) and then dividing by the elapsed time in minutes. Net WPM subtracts errors from the gross WPM.' },
  { question: 'What does accuracy measure?', answer: 'Accuracy is the percentage of correctly typed characters out of all characters typed. A 100% accuracy means every character was typed correctly.' },
  { question: 'Can I restart the test?', answer: 'Yes, click the Restart button at any time to reset the test with a new random text passage.' },
]

export default function TypingSpeedTestPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Typing Speed Test</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Test your typing speed and accuracy. See your WPM, accuracy, and detailed results in real time.</p>
      <TypingSpeedTest />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Click Start to begin the typing test. A passage of text will appear — type it as quickly and accurately as you can. The timer starts when you begin typing. Your WPM, accuracy, and other statistics are shown in real time and in a results summary when the test ends.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="typing-speed-test" locale="en" />
    </div>
  )
}

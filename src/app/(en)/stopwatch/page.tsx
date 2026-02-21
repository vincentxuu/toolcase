import { Metadata } from 'next'
import Stopwatch from '@/components/tools/Stopwatch'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Stopwatch - Free Online Tool | toolcase',
  description: 'Free online stopwatch with lap timing. Accurate stopwatch for sports, workouts, cooking and productivity.',
  alternates: { canonical: 'https://toolcase.cc/stopwatch', languages: { en: 'https://toolcase.cc/stopwatch', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/stopwatch' } },
}

const faqs = [
  { question: 'How accurate is the online stopwatch?', answer: 'The stopwatch is accurate to the millisecond level using your browser\'s high-resolution timer. While it is suitable for most everyday timing needs, it relies on your device\'s clock and may not be appropriate for official competitive timing.' },
  { question: 'Can I record lap times?', answer: 'Yes, you can record lap times by pressing the lap button while the stopwatch is running. Each lap time is recorded and displayed in a list, along with the split time. This is useful for tracking intervals during workouts or timing multiple events.' },
  { question: 'Will the stopwatch keep running if I leave the page?', answer: 'The stopwatch continues to track time accurately even if you switch to another browser tab. However, if you close the browser tab entirely, the stopwatch will stop and the recorded time will be lost.' },
]

export default function StopwatchPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Stopwatch</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>A precise online stopwatch with lap timing support.</p>
      <Stopwatch />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Press start to begin timing. Use the lap button to record split times as the stopwatch runs. Press stop to pause and reset to clear. All lap times are displayed in a list that you can review after your session.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="stopwatch" locale="en" />
    </div>
  )
}

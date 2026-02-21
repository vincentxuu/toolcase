import { Metadata } from 'next'
import CountdownTimer from '@/components/tools/CountdownTimer'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Countdown Timer - Free Online Tool | toolcase',
  description: 'Set a countdown timer with alarm. Free online countdown timer for cooking, studying, workouts and more.',
  alternates: { canonical: 'https://toolcase.cc/countdown-timer', languages: { en: 'https://toolcase.cc/countdown-timer', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/countdown-timer' } },
}

const faqs = [
  { question: 'Will the timer keep running if I switch tabs?', answer: 'Yes, the countdown timer continues to run in the background even if you switch to another browser tab or minimize the window. You will still receive a notification or alarm sound when the timer reaches zero.' },
  { question: 'Can I set a custom time duration?', answer: 'Yes, you can set any custom duration in hours, minutes and seconds. Simply enter the desired time and start the countdown. The timer supports durations from a few seconds up to many hours.' },
  { question: 'Does the timer play a sound when it finishes?', answer: 'Yes, an alarm sound plays when the countdown reaches zero to alert you. Make sure your device volume is turned up so you can hear the notification, especially if you are in another tab or away from your screen.' },
]

export default function CountdownTimerPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Countdown Timer</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Set a countdown timer for any duration with an alarm alert.</p>
      <CountdownTimer />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Set your desired countdown duration using hours, minutes and seconds. Press start to begin the countdown. You can pause, resume or reset the timer at any time. An alarm will sound when the countdown completes.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="countdown-timer" locale="en" />
    </div>
  )
}

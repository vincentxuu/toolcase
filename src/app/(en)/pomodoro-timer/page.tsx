import { Metadata } from 'next'
import PomodoroTimer from '@/components/tools/PomodoroTimer'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Pomodoro Timer - Free Online Tool | toolcase',
  description:
    'Boost your productivity with a free Pomodoro timer. Customisable work and break durations, circular progress indicator, audio notifications, and session tracking.',
  alternates: {
    canonical: 'https://toolcase.cc/pomodoro-timer',
    languages: {
      en: 'https://toolcase.cc/pomodoro-timer',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/pomodoro-timer',
    },
  },
}

const faqs = [
  {
    question: 'What is the Pomodoro Technique?',
    answer:
      'The Pomodoro Technique is a time management method developed by Francesco Cirillo. You work in focused intervals (traditionally 25 minutes) called "pomodoros", followed by short breaks (5 minutes). After four pomodoros, take a longer break. This helps maintain focus and prevent burnout.',
  },
  {
    question: 'Can I customise the work and break durations?',
    answer:
      'Yes. You can set the work duration from 1 to 120 minutes and the break duration from 1 to 60 minutes. The traditional settings are 25 minutes of work and 5 minutes of break, but feel free to adjust them to suit your workflow.',
  },
  {
    question: 'Will I hear a notification when the timer ends?',
    answer:
      'Yes. The timer plays an audio beep using the Web Audio API when each work or break period ends. Make sure your device volume is not muted. The timer also automatically switches between work and break periods.',
  },
]

export default function PomodoroTimerPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Pomodoro Timer</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Stay focused and productive with customisable work and break intervals.
      </p>

      <PomodoroTimer />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Set your desired work and break durations using the input fields. Click &quot;Start&quot; to begin
          the work timer. The circular progress indicator shows how much time has elapsed. When the timer
          reaches zero, you will hear a beep and the timer automatically switches to a break period. Use
          &quot;Pause&quot; to temporarily stop and &quot;Reset&quot; to start over. The session counter
          tracks how many work intervals you have completed.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="pomodoro-timer" locale="en" />
    </div>
  )
}

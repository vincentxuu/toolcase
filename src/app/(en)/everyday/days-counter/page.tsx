import { Metadata } from 'next'
import DaysCounter from '@/components/tools/DaysCounter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Days Counter - Countdown to Any Date | toolcase',
  description: 'Count days, hours, minutes, and seconds until or since any date. Perfect for tracking birthdays, anniversaries, deadlines, and special events.',
  alternates: { canonical: 'https://toolcase.cc/everyday/days-counter', languages: { en: 'https://toolcase.cc/everyday/days-counter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/days-counter' } },
}

const faqs = [
  { question: 'How accurate is the countdown?', answer: 'The countdown updates every second and is accurate to the second. It accounts for your local timezone automatically.' },
  { question: 'Can I count days since a past date?', answer: 'Yes! If you select a date in the past, the counter will show you how many days, hours, minutes, and seconds have passed since that date.' },
  { question: 'Does it work for future dates far in the future?', answer: 'Yes, you can count down to any date in the future, whether it\'s tomorrow or years from now.' },
]

export default function DaysCounterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Days Counter', url: 'https://toolcase.cc/everyday/days-counter' },
        ]}
      />
      <ToolSchema
        name="Days Counter"
        description="Count days, hours, minutes, and seconds until or since any date. Perfect for tracking birthdays, anniversaries, deadlines, and special events."
        url="https://toolcase.cc/everyday/days-counter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Days Counter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Days Counter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Count down to any special date or see how much time has passed since an important event.</p>
      <DaysCounter
        labels={{
          title: 'Days Counter',
          eventName: 'Event Name',
          eventNamePlaceholder: 'e.g., My Birthday, Wedding Anniversary...',
          targetDate: 'Target Date',
          today: 'Today',
          calculate: 'Calculate',
          clear: 'Clear',
          result: 'Result',
          daysRemaining: 'Days Remaining',
          daysPassed: 'Days Passed',
          days: 'days',
          hours: 'hours',
          minutes: 'minutes',
          seconds: 'seconds',
          isToday: 'The event is today!',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter an event name and select a target date. Click Calculate to see a live countdown showing days, hours, minutes, and seconds. The countdown updates automatically every second.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="days-counter" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import WorldClock from '@/components/tools/WorldClock'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'World Clock - Current Time in Major Cities | toolcase',
  description: 'Check the current time in major cities worldwide. See live time updates for different timezones around the globe.',
  alternates: { canonical: 'https://toolcase.cc/world-clock', languages: { en: 'https://toolcase.cc/world-clock', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/world-clock' } },
}

const faqs = [
  { question: 'How often does the time update?', answer: 'The time for all cities updates every second in real-time, so you always see the current time.' },
  { question: 'Can I search for a specific city?', answer: 'Yes! Use the search box to filter the list and quickly find the city you\'re looking for.' },
  { question: 'Are daylight saving time changes included?', answer: 'Yes, the times automatically adjust for daylight saving time based on each city\'s timezone rules.' },
]

export default function WorldClockPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'World Clock', url: 'https://toolcase.cc/world-clock' },
        ]}
      />
      <ToolSchema
        name="World Clock"
        description="Check the current time in major cities worldwide. See live time updates for different timezones around the globe."
        url="https://toolcase.cc/world-clock"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'World Clock' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>World Clock</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Check the current time in major cities around the world with live updates.</p>
      <WorldClock
        labels={{
          title: 'World Clock',
          searchPlaceholder: 'Search city...',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>The world clock displays the current time in popular cities worldwide. Times update automatically every second. Use the search box to quickly find a specific city.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="world-clock" locale="en" />
    </div>
    </>
  )
}

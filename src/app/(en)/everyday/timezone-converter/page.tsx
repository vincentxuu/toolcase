import { Metadata } from 'next'
import TimezoneConverter from '@/components/tools/TimezoneConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Timezone Converter - Free Online Tool | toolcase',
  description: 'Convert time between timezones instantly. Supports UTC, EST, PST, GMT, CET, JST, CST, and more. View current time and time differences between any two timezones.',
  alternates: { canonical: 'https://toolcase.cc/everyday/timezone-converter', languages: { en: 'https://toolcase.cc/everyday/timezone-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/timezone-converter' } },
}

const faqs = [
  { question: 'How does timezone conversion work?', answer: 'The converter uses the Intl.DateTimeFormat API to accurately convert times between timezones, automatically accounting for daylight saving time (DST) transitions.' },
  { question: 'Does it handle daylight saving time?', answer: 'Yes. The converter uses the browser\'s built-in timezone database which includes DST rules for all supported timezones. Conversions are accurate for both standard and daylight saving periods.' },
  { question: 'What timezones are supported?', answer: 'The tool supports 16 common timezones including UTC, US time zones (EST, CST, PST), European zones (GMT, CET), and Asian/Pacific zones (JST, CST, KST, SGT, AEST, NZST).' },
]

export default function TimezoneConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Timezone Converter', url: 'https://toolcase.cc/everyday/timezone-converter' },
        ]}
      />
      <ToolSchema
        name="Timezone Converter"
        description="Convert time between timezones instantly. Supports UTC, EST, PST, GMT, CET, JST, CST, and more. View current time and time differences between any two timezones."
        url="https://toolcase.cc/everyday/timezone-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Timezone Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Timezone Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert time between timezones instantly with live clock display.</p>
      <TimezoneConverter
        locale="en"
        labels={{
        modeConverter: 'Time Converter',
        modeMeeting: 'Meeting Planner',
        sourceTimezone: 'Source Timezone',
        targetTimezone: 'Target Timezone',
        date: 'Date',
        time: 'Time',
        convertedTime: 'Converted Time',
        currentTime: 'Current Time',
        timeDifference: 'Time Difference',
        swap: 'Swap',
        hours: 'hours',
        workingHoursLabel: 'Good meeting times (both awake: 7AM-11PM)',
        meetingPlannerDesc: 'Find the best meeting time across timezones',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Select a source timezone and a target timezone from the dropdown menus. Enter a date and time to convert. The converted time will appear instantly below, along with the time difference between the two zones. The current time in both timezones is shown at the top for quick reference.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="timezone-converter" locale="en" />
    </div>
    </>
  )
}

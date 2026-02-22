import { Metadata } from 'next'
import TimestampConverter from '@/components/tools/TimestampConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Timestamp Converter - Free Online Tool | toolcase',
  description:
    'Convert between Unix timestamps and human-readable dates. Free online timestamp converter with live clock, relative time, and ISO 8601 output.',
  alternates: {
    canonical: 'https://toolcase.cc/timestamp-converter',
    languages: {
      en: 'https://toolcase.cc/timestamp-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/timestamp-converter',
    },
  },
}

const faqs = [
  {
    question: 'What is a Unix timestamp?',
    answer:
      'A Unix timestamp (also called Epoch time or POSIX time) is the number of seconds that have elapsed since January 1, 1970 00:00:00 UTC. It is a universal way to represent time across different systems and time zones.',
  },
  {
    question: 'What is the difference between seconds and milliseconds?',
    answer:
      'Unix timestamps are traditionally in seconds (10 digits, e.g., 1700000000). Many modern systems like JavaScript use milliseconds (13 digits, e.g., 1700000000000). This tool automatically detects which format you are using.',
  },
  {
    question: 'Does the tool handle time zones?',
    answer:
      'The tool shows both your local time zone and UTC. When converting a date to a timestamp, it uses your browser\'s local time zone. The UTC and ISO 8601 outputs are time zone-independent.',
  },
  {
    question: 'What is ISO 8601?',
    answer:
      'ISO 8601 is an international standard for date and time representation (e.g., 2024-01-15T10:30:00.000Z). The "Z" suffix indicates UTC time. This format is widely used in APIs and data exchange.',
  },
]

export default function TimestampConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Timestamp Converter', url: 'https://toolcase.cc/timestamp-converter' },
        ]}
      />
      <ToolSchema
        name="Timestamp Converter"
        description="Convert between Unix timestamps and human-readable dates. Free online timestamp converter with live clock, relative time, and ISO 8601 output."
        url="https://toolcase.cc/timestamp-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Timestamp Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Timestamp Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Convert between Unix timestamps and human-readable dates with a live clock.
      </p>

      <TimestampConverter />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Convert Timestamps</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter a Unix timestamp (seconds or milliseconds) in the first section to convert it to a human-readable
          date. Or use the date picker in the second section to convert a specific date and time to a Unix timestamp.
          The live clock at the top shows the current Unix timestamp, which you can copy with one click.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="timestamp-converter" locale="en" />
    </div>
    </>
  )
}

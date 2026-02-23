import { Metadata } from 'next'
import CronGenerator from '@/components/tools/CronGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Cron Expression Generator - Free Online Tool | toolcase',
  description:
    'Build and understand cron expressions visually. Free online cron generator with presets, human-readable descriptions, and easy editing.',
  alternates: {
    canonical: 'https://toolcase.cc/dev/cron-expression-generator',
    languages: {
      en: 'https://toolcase.cc/dev/cron-expression-generator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/cron-expression-generator',
    },
  },
}

const faqs = [
  {
    question: 'What is a cron expression?',
    answer:
      'A cron expression is a string of five fields separated by spaces that defines a schedule for running automated tasks. The fields represent: minute, hour, day of month, month, and day of week.',
  },
  {
    question: 'What does * mean in a cron expression?',
    answer:
      'The asterisk (*) is a wildcard that means "every" value. For example, * in the minute field means "every minute", and * in the day of week field means "every day of the week".',
  },
  {
    question: 'What does */5 mean?',
    answer:
      'The */N syntax means "every N units". So */5 in the minute field means "every 5 minutes", and */2 in the hour field means "every 2 hours".',
  },
  {
    question: 'Can I use ranges and lists?',
    answer:
      'Yes. Use a hyphen for ranges (e.g., 1-5 for Monday through Friday) and commas for lists (e.g., 1,15 for the 1st and 15th of the month).',
  },
]

export default function CronExpressionGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Cron Expression Generator', url: 'https://toolcase.cc/dev/cron-expression-generator' },
        ]}
      />
      <ToolSchema
        name="Cron Expression Generator"
        description="Build and understand cron expressions visually. Free online cron generator with presets, human-readable descriptions, and easy editing."
        url="https://toolcase.cc/dev/cron-expression-generator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Cron Expression Generator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Cron Expression Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Build cron expressions visually with presets and human-readable descriptions.
      </p>

      <CronGenerator />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use the Cron Generator</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Use the five input fields to customize each part of the cron expression, or select a preset to start with
          a common schedule. The tool provides a real-time human-readable description of your expression. Click any
          preset button to quickly set a common pattern, then modify individual fields as needed.
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>Cron Expression Syntax</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          A standard cron expression has five fields: minute (0-59), hour (0-23), day of month (1-31),
          month (1-12), and day of week (0-6, where 0 is Sunday). Special characters include * (every),
          */N (every N), N-M (range), and N,M (list). This format is used by crontab on Unix/Linux systems,
          cloud schedulers (AWS CloudWatch, Google Cloud Scheduler), and CI/CD pipelines.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="cron-expression-generator" locale="en" />
    </div>
    </>
  )
}

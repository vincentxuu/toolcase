import { Metadata } from 'next'
import SqlFormatter from '@/components/tools/SqlFormatter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'SQL Formatter - Free Online Tool | toolcase',
  description:
    'Format and beautify SQL queries instantly. Uppercase keywords, add proper indentation and line breaks for readable SQL.',
  alternates: {
    canonical: 'https://toolcase.cc/dev/sql-formatter',
    languages: {
      en: 'https://toolcase.cc/dev/sql-formatter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/sql-formatter',
    },
  },
}

const faqs = [
  {
    question: 'What does the SQL formatter do?',
    answer:
      'The SQL formatter takes a SQL query and reformats it with proper indentation, line breaks, and optionally uppercases SQL keywords like SELECT, FROM, WHERE, and JOIN. This makes complex queries much easier to read and debug.',
  },
  {
    question: 'Which SQL dialects are supported?',
    answer:
      'The formatter handles standard SQL syntax that works across most dialects including MySQL, PostgreSQL, SQL Server, SQLite, and Oracle. It focuses on formatting structure rather than dialect-specific features.',
  },
  {
    question: 'Is my SQL safe?',
    answer:
      'All processing happens directly in your browser. Your SQL queries never leave your device — nothing is sent to any server.',
  },
]

export default function SqlFormatterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'SQL Formatter', url: 'https://toolcase.cc/dev/sql-formatter' },
        ]}
      />
      <ToolSchema
        name="SQL Formatter"
        description="Format and beautify SQL queries instantly. Uppercase keywords, add proper indentation and line breaks for readable SQL."
        url="https://toolcase.cc/dev/sql-formatter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'SQL Formatter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>SQL Formatter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Paste your SQL query below to format it with proper indentation, line breaks, and uppercase keywords.
      </p>

      <SqlFormatter />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Paste your SQL query into the left panel and click &quot;Format&quot;. The tool will add proper line breaks
          and indentation, making your query easier to read. You can toggle uppercase keywords on or off, and choose
          between 2 or 4 spaces for indentation. The formatted result can be copied with one click.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="sql-formatter" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import DiffChecker from '@/components/tools/DiffChecker'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Diff Checker - Free Online Tool | toolcase',
  description:
    'Compare two blocks of text side by side and instantly see additions, deletions, and modifications highlighted in color.',
  alternates: {
    canonical: 'https://toolcase.cc/text/diff-checker',
    languages: {
      en: 'https://toolcase.cc/text/diff-checker',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text/diff-checker',
    },
  },
}

const faqs = [
  {
    question: 'What types of text can I compare?',
    answer:
      'You can compare any plain text including source code, configuration files, prose, and structured data like JSON or XML. The tool works with any language or format since it compares raw text content line by line.',
  },
  {
    question: 'How are differences displayed?',
    answer:
      'Additions are highlighted in green, deletions in red, and modifications show both the old and new versions. You can switch between a side-by-side view and a unified (inline) view depending on your preference.',
  },
  {
    question: 'Is there a size limit for the text I can compare?',
    answer:
      'The tool runs entirely in your browser, so there is no server-imposed limit. However, very large files (over 100,000 lines) may cause the browser to slow down. For best performance, keep each input under 50,000 lines.',
  },
]

export default function DiffCheckerPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Diff Checker', url: 'https://toolcase.cc/text/diff-checker' },
        ]}
      />
      <ToolSchema
        name="Diff Checker"
        description="Compare two blocks of text side by side and instantly see additions, deletions, and modifications highlighted in color."
        url="https://toolcase.cc/text/diff-checker"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Diff Checker' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Diff Checker</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Compare two pieces of text and instantly spot every difference.
      </p>

      <DiffChecker />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Paste the original text into the left panel and the modified text into the right panel. Click
          &quot;Compare&quot; to generate the diff. Differences will be colour-coded: green for additions, red for
          deletions, and yellow for changed lines. You can toggle between side-by-side and inline views, and optionally
          ignore whitespace changes. Everything runs in your browser — your text is never sent to a server.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="diff-checker" locale="en" />
    </div>
    </>
  )
}

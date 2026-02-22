import { Metadata } from 'next'
import JsonDiffComparator from '@/components/tools/JsonDiffComparator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'JSON Diff Comparator - Compare JSON Objects Online | toolcase',
  description: 'Compare two JSON objects and visualize differences with syntax highlighting. Supports unified and split view, JSON and text mode comparison. Free browser tool.',
  alternates: { canonical: 'https://toolcase.cc/json-diff', languages: { en: 'https://toolcase.cc/json-diff', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/json-diff' } },
}

const faqs = [
  { question: 'How do I compare two JSON objects?', answer: 'Paste your original JSON in the left textarea and the modified JSON in the right textarea. Click "Compare" to see the differences highlighted in green (added) and red (removed).' },
  { question: 'What is the difference between JSON mode and Text mode?', answer: 'JSON mode parses and compares the actual JSON structure, ignoring formatting differences. Text mode compares the raw text line by line, useful when JSON is invalid or you want to see formatting changes.' },
  { question: 'What is Unified vs Split view?', answer: 'Unified view shows all changes in a single panel with + and - prefixes. Split view displays the original and modified JSON side by side for easier comparison.' },
  { question: 'Can I format my JSON before comparing?', answer: 'Yes! Click the "Format JSON" button above each textarea to automatically indent and beautify your JSON for better readability.' },
]

export default function JsonDiffPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'JSON Diff Comparator', url: 'https://toolcase.cc/json-diff' },
        ]}
      />
      <ToolSchema
        name="JSON Diff Comparator"
        description="Compare two JSON objects and visualize differences with syntax highlighting. Supports unified and split view, JSON and text mode comparison. Free browser tool."
        url="https://toolcase.cc/json-diff"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'JSON Diff Comparator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>JSON Diff Comparator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Compare two JSON objects and visualize their differences with syntax highlighting.</p>
      <JsonDiffComparator
        labels={{
          title: 'JSON Diff Comparator',
          leftJson: 'Original JSON',
          rightJson: 'Modified JSON',
          leftPlaceholder: 'Paste original JSON here...',
          rightPlaceholder: 'Paste modified JSON here...',
          compare: 'Compare',
          clear: 'Clear',
          viewMode: 'View Mode',
          unifiedView: 'Unified',
          splitView: 'Split',
          jsonMode: 'JSON Mode',
          textMode: 'Text Mode',
          formatJson: 'Format JSON',
          invalidJson: 'Invalid JSON',
          noDifferences: 'No differences found',
          differences: 'Differences',
          added: 'Added',
          removed: 'Removed',
          unchanged: 'Unchanged',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
          Paste your JSON data into the left and right panels, then click "Compare" to highlight the differences. Green highlights indicate added content, red highlights indicate removed content, and unchanged parts remain unhighlighted.
        </p>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Use the "Format JSON" button to beautify your JSON before comparing. Switch between JSON mode (structure comparison) and Text mode (line-by-line comparison) depending on your needs. Choose Unified or Split view for different visualization preferences.
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="json-diff" locale="en" />
    </div>
    </>
  )
}

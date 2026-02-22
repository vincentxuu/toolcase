import { Metadata } from 'next'
import RegexTester from '@/components/tools/RegexTester'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Regex Tester - Free Online Tool | toolcase',
  description: 'Test and debug regular expressions with real-time highlighting. Free online regex tester and debugger.',
  alternates: { canonical: 'https://toolcase.cc/regex-tester', languages: { en: 'https://toolcase.cc/regex-tester', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/regex-tester' } },
}

const faqs = [
  { question: 'What are regular expressions?', answer: 'Regular expressions (regex) are patterns used to match character combinations in strings. They are a powerful tool for searching, replacing, and validating text in programming and text editors.' },
  { question: 'What regex flags are available?', answer: 'Common flags include g (global - find all matches), i (case-insensitive matching), m (multiline - ^ and $ match line boundaries), s (dotAll - dot matches newline), and u (Unicode support).' },
  { question: 'Why is my regex not matching?', answer: 'Check that your pattern syntax is correct and that you have the right flags enabled. Common issues include forgetting to escape special characters like dots or brackets, missing the global flag when expecting multiple matches, or case sensitivity when the i flag is not set.' },
]

export default function RegexTesterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Regex Tester', url: 'https://toolcase.cc/regex-tester' },
        ]}
      />
      <ToolSchema
        name="Regex Tester"
        description="Test and debug regular expressions with real-time highlighting. Free online regex tester and debugger."
        url="https://toolcase.cc/regex-tester"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Regex Tester' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Regex Tester</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Test and debug regular expressions with real-time highlighting.</p>
      <RegexTester />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter your regular expression pattern and set the desired flags. Then type or paste your test string below. Matches will be highlighted in real time, and match details will be displayed so you can verify your regex works as expected.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="regex-tester" locale="en" />
    </div>
    </>
  )
}

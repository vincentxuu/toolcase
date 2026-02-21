import { Metadata } from 'next'
import CaseConverter from '@/components/tools/CaseConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Case Converter - Free Online Tool | toolcase',
  description: 'Convert text between uppercase, lowercase, title case, camelCase, snake_case and more. Free online case converter tool.',
  alternates: { canonical: 'https://toolcase.cc/case-converter', languages: { en: 'https://toolcase.cc/case-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/case-converter' } },
}

const faqs = [
  { question: 'What text cases are supported?', answer: 'This tool supports uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, kebab-case and more. Each format is commonly used in different contexts such as programming, writing and data formatting.' },
  { question: 'What is the difference between camelCase and PascalCase?', answer: 'In camelCase, the first word starts with a lowercase letter and subsequent words are capitalized (e.g., myVariableName). In PascalCase, every word including the first starts with an uppercase letter (e.g., MyVariableName). camelCase is typically used for variables and functions, while PascalCase is used for class names.' },
  { question: 'When should I use snake_case vs kebab-case?', answer: 'snake_case uses underscores between words (e.g., my_variable_name) and is common in Python, Ruby and database column names. kebab-case uses hyphens (e.g., my-variable-name) and is commonly used in URLs, CSS class names and HTML attributes.' },
]

export default function CaseConverterPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Case Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert text between different letter cases instantly.</p>
      <CaseConverter />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Paste or type your text into the input field, then select the desired case format. The converted text appears instantly and can be copied to your clipboard with one click. Use it for formatting code identifiers, titles, headings or any text that needs consistent casing.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="case-converter" locale="en" />
    </div>
  )
}

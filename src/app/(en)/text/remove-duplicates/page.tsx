import { Metadata } from 'next'
import RemoveDuplicates from '@/components/tools/RemoveDuplicates'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Remove Duplicates - Free Online Tool | toolcase',
  description: 'Remove duplicate lines from text instantly. Free online tool to deduplicate lists, data and text content.',
  alternates: { canonical: 'https://toolcase.cc/text/remove-duplicates', languages: { en: 'https://toolcase.cc/text/remove-duplicates', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text/remove-duplicates' } },
}

const faqs = [
  { question: 'How does the duplicate removal work?', answer: 'The tool compares each line of your text and removes any lines that appear more than once, keeping only the first occurrence. This is useful for cleaning up lists, email addresses, data entries and any text that may contain repeated lines.' },
  { question: 'Is the comparison case-sensitive?', answer: 'By default, the comparison is case-sensitive, meaning "Hello" and "hello" are treated as different lines. You can enable case-insensitive mode to treat them as duplicates and remove the repeated entries regardless of letter casing.' },
  { question: 'Does it preserve the original order of lines?', answer: 'Yes, the tool preserves the original order of your text. When duplicates are found, the first occurrence is kept in its original position and subsequent duplicates are removed. You can also choose to sort the output alphabetically if needed.' },
]

export default function RemoveDuplicatesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Remove Duplicates', url: 'https://toolcase.cc/text/remove-duplicates' },
        ]}
      />
      <ToolSchema
        name="Remove Duplicates"
        description="Remove duplicate lines from text instantly. Free online tool to deduplicate lists, data and text content."
        url="https://toolcase.cc/text/remove-duplicates"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Remove Duplicates' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Remove Duplicates</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Remove duplicate lines from your text quickly and easily.</p>
      <RemoveDuplicates />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Paste your text with duplicate lines into the input area. The tool will automatically identify and remove duplicate lines, showing you the cleaned result. Copy the deduplicated text to your clipboard with one click.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="remove-duplicates" locale="en" />
    </div>
    </>
  )
}

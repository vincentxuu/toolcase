import { Metadata } from 'next'
import JsonPathFinder from '@/components/tools/JsonPathFinder'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'JSON Path Finder - Free Online Tool | toolcase',
  description: 'Paste JSON and explore its structure in a tree view. Click any node to get its JSON path in dot or bracket notation. Copy paths to clipboard instantly.',
  alternates: { canonical: 'https://toolcase.cc/json-path-finder', languages: { en: 'https://toolcase.cc/json-path-finder', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/json-path-finder' } },
}

const faqs = [
  { question: 'What is a JSON path?', answer: 'A JSON path is a string expression that identifies a specific value within a JSON document. For example, $.data[0].name refers to the "name" property of the first element in the "data" array.' },
  { question: 'What is the difference between dot and bracket notation?', answer: 'Dot notation ($.data.name) is shorter and more readable. Bracket notation ($["data"]["name"]) is required when keys contain special characters, spaces, or start with a number.' },
  { question: 'Can I navigate nested JSON structures?', answer: 'Yes. The tree view supports deeply nested objects and arrays. Click the arrow icons to expand or collapse nodes, and click any node to see its full path and value.' },
]

export default function JsonPathFinderPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'JSON Path Finder', url: 'https://toolcase.cc/json-path-finder' },
        ]}
      />
      <ToolSchema
        name="JSON Path Finder"
        description="Paste JSON and explore its structure in a tree view. Click any node to get its JSON path in dot or bracket notation. Copy paths to clipboard instantly."
        url="https://toolcase.cc/json-path-finder"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'JSON Path Finder' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>JSON Path Finder</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Explore JSON structure and find paths to any value.</p>
      <JsonPathFinder />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Paste your JSON in the left panel and click Parse. A tree view of the JSON structure will appear in the right panel. Click on any node to see its path in both dot notation and bracket notation, along with the node value. Use the copy button to copy the path to your clipboard.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="json-path-finder" locale="en" />
    </div>
    </>
  )
}

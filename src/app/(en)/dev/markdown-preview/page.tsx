import { Metadata } from 'next'
import MarkdownPreview from '@/components/tools/MarkdownPreview'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Markdown Preview - Free Online Tool | toolcase',
  description: 'Write Markdown and see the rendered HTML preview in real-time. Free online Markdown editor and previewer.',
  alternates: { canonical: 'https://toolcase.cc/dev/markdown-preview', languages: { en: 'https://toolcase.cc/dev/markdown-preview', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/markdown-preview' } },
}

const faqs = [
  { question: 'What is Markdown?', answer: 'Markdown is a lightweight markup language that lets you format text using simple syntax. It is widely used for documentation, README files, blogs, and more. Common syntax includes # for headings, ** for bold, * for italics, and - for lists.' },
  { question: 'Does the preview update in real time?', answer: 'Yes! As you type or edit Markdown in the input area, the rendered HTML preview updates instantly so you can see exactly how your content will look.' },
  { question: 'What Markdown features are supported?', answer: 'The previewer supports standard Markdown features including headings, bold, italics, links, images, code blocks, blockquotes, ordered and unordered lists, horizontal rules, and more.' },
]

export default function MarkdownPreviewPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Markdown Preview', url: 'https://toolcase.cc/dev/markdown-preview' },
        ]}
      />
      <ToolSchema
        name="Markdown Preview"
        description="Write Markdown and see the rendered HTML preview in real-time. Free online Markdown editor and previewer."
        url="https://toolcase.cc/dev/markdown-preview"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Markdown Preview' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Markdown Preview</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Write Markdown and see the rendered HTML preview in real-time.</p>
      <MarkdownPreview />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Type or paste your Markdown content into the input area on the left. The rendered HTML preview will appear on the right in real time. Use standard Markdown syntax for headings, lists, links, code blocks and more.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="markdown-preview" locale="en" />
    </div>
    </>
  )
}

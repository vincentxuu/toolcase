import { Metadata } from 'next'
import MarkdownToHtml from '@/components/tools/MarkdownToHtml'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Markdown to HTML Converter - Free Online Tool | toolcase',
  description: 'Convert Markdown text to clean HTML source code. Free online Markdown to HTML converter for developers and content creators.',
  alternates: { canonical: 'https://toolcase.cc/markdown-to-html', languages: { en: 'https://toolcase.cc/markdown-to-html', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/markdown-to-html' } },
}

const faqs = [
  { question: 'What is Markdown?', answer: 'Markdown is a lightweight markup language created by John Gruber in 2004. It uses simple text formatting syntax — like # for headings, ** for bold, and - for lists — that can be easily converted to HTML. Markdown is widely used in documentation, README files, forums, and content management systems because it is easy to read and write.' },
  { question: 'How is this different from Markdown Preview?', answer: 'Markdown Preview renders your Markdown as a formatted visual preview, showing you how it will look in a browser. This Markdown to HTML tool instead outputs the raw HTML source code generated from your Markdown. Use this tool when you need the actual HTML markup to paste into a website, email template, or CMS that accepts HTML.' },
  { question: 'What Markdown features are supported?', answer: 'This converter supports headings (h1-h6), bold, italic, bold-italic, inline code, fenced code blocks with language hints, unordered and ordered lists, blockquotes, horizontal rules, links, and images. It produces clean, semantic HTML without inline styles or unnecessary attributes.' },
]

export default function MarkdownToHtmlPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Markdown to HTML Converter', url: 'https://toolcase.cc/markdown-to-html' },
        ]}
      />
      <ToolSchema
        name="Markdown to HTML Converter"
        description="Convert Markdown text to clean HTML source code. Free online Markdown to HTML converter for developers and content creators."
        url="https://toolcase.cc/markdown-to-html"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Markdown to HTML Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Markdown to HTML Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert Markdown text to clean HTML source code.</p>
      <MarkdownToHtml />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter or paste your Markdown text in the left panel. The corresponding HTML source code appears instantly in the right panel as you type. Click the copy button to copy the HTML output to your clipboard. The converter handles headings, bold, italic, lists, code blocks, blockquotes, links, and more.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="markdown-to-html" locale="en" />
    </div>
    </>
  )
}

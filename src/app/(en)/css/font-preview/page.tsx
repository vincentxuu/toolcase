import { Metadata } from 'next'
import FontPreview from '@/components/tools/FontPreview'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Font Preview - Google Fonts Browser & Previewer | toolcase',
  description: 'Preview and compare Google Fonts with custom text. Browse 20+ popular fonts across serif, sans-serif, display, handwriting, and monospace categories. Copy font imports instantly.',
  alternates: { canonical: 'https://toolcase.cc/css/font-preview', languages: { en: 'https://toolcase.cc/css/font-preview', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css/font-preview' } },
}

const faqs = [
  { question: 'How do I use Google Fonts in my website?', answer: 'Click "Copy Import" to get the CSS @import statement and paste it in your stylesheet. Then click "Copy CSS" to get the font-family property for your elements. Google Fonts are free to use for both personal and commercial projects.' },
  { question: 'Can I customize the preview text?', answer: 'Yes! Use the "Preview Text" input to type any custom text. This helps you see how your actual content will look in each font. You can also adjust the font size slider to preview different sizes.' },
  { question: 'What font categories are available?', answer: 'Fonts are categorized as Sans Serif (clean, modern), Serif (traditional, formal), Display (decorative, attention-grabbing), Handwriting (script, casual), and Monospace (code, technical).' },
  { question: 'Are these fonts free?', answer: 'Yes! All Google Fonts are open source and free to use in any project, commercial or otherwise. They are optimized for web use and load quickly.' },
]

export default function FontPreviewPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Font Preview', url: 'https://toolcase.cc/css/font-preview' },
        ]}
      />
      <ToolSchema
        name="Font Preview"
        description="Preview and compare Google Fonts with custom text. Browse 20+ popular fonts across serif, sans-serif, display, handwriting, and monospace categories. Copy font imports instantly."
        url="https://toolcase.cc/css/font-preview"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Font Preview' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Font Preview</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Preview Google Fonts with custom text and copy import code instantly.</p>
      <FontPreview
        labels={{
          title: 'Font Preview',
          searchPlaceholder: 'Search fonts...',
          previewText: 'Preview Text',
          previewPlaceholder: 'The quick brown fox jumps over the lazy dog',
          fontSize: 'Font Size',
          category: 'Category',
          allCategories: 'All Categories',
          serif: 'Serif',
          sansSerif: 'Sans Serif',
          display: 'Display',
          handwriting: 'Handwriting',
          monospace: 'Monospace',
          copyImport: 'Copy Import',
          copyCss: 'Copy CSS',
          copied: 'Copied!',
          showingFonts: 'Showing',
          noResults: 'No fonts found',
          variants: 'Variants',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Browse fonts by category or search by name. Enter custom preview text to see how your content will look. Adjust the font size slider to test readability at different sizes. Click &quot;Copy Import&quot; to get the Google Fonts CSS import, then &quot;Copy CSS&quot; to get the font-family property for your stylesheet.
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="font-preview" locale="en" />
    </div>
    </>
  )
}

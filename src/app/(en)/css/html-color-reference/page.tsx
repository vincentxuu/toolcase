import { Metadata } from 'next'
import HtmlColorReference from '@/components/tools/HtmlColorReference'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'HTML Color Reference - All Named Colors with Hex Codes | toolcase',
  description: 'Browse all 140+ HTML named colors with hex codes. Searchable color reference chart for web development and design.',
  alternates: { canonical: 'https://toolcase.cc/css/html-color-reference', languages: { en: 'https://toolcase.cc/css/html-color-reference', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css/html-color-reference' } },
}

const faqs = [
  { question: 'What are HTML named colors?', answer: 'HTML named colors are predefined color names that can be used in CSS and HTML instead of hex codes. For example, you can use "red" instead of "#FF0000". There are 140+ named colors standardized in HTML and CSS.' },
  { question: 'Can I use these color names in CSS?', answer: 'Yes! All these color names can be used directly in CSS properties like color, background-color, border-color, etc. For example: color: tomato; or background-color: lightblue;' },
  { question: 'Are hex codes better than color names?', answer: 'Hex codes give you access to millions of colors, while named colors are limited to 140+. However, named colors are more readable and memorable for common colors. Use whichever makes your code clearer.' },
]

export default function HtmlColorReferencePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'HTML Color Reference', url: 'https://toolcase.cc/css/html-color-reference' },
        ]}
      />
      <ToolSchema
        name="HTML Color Reference"
        description="Browse all 140+ HTML named colors with hex codes. Searchable color reference chart for web development and design."
        url="https://toolcase.cc/css/html-color-reference"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'HTML Color Reference' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>HTML Color Reference</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Browse all HTML named colors with their hex codes for web development and design.</p>
      <HtmlColorReference
        labels={{
          title: 'HTML Color Reference',
          searchPlaceholder: 'Search color name or hex...',
          colorName: 'Color Name',
          hexCode: 'Hex Code',
          copy: 'Copy',
          copied: 'Copied!',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Browse the color grid or use the search box to find specific colors. Click the copy button to copy the hex code. Each color shows its name, visual preview, and hex value.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="html-color-reference" locale="en" />
    </div>
    </>
  )
}

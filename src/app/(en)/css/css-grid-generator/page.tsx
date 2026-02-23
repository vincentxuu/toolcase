import { Metadata } from 'next'
import CssGridGenerator from '@/components/tools/CssGridGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'CSS Grid Generator - Free Online Tool | toolcase',
  description: 'Generate CSS Grid layouts visually. Set columns, rows, gaps and column widths with fr, px or auto units. Live preview with numbered cells.',
  alternates: { canonical: 'https://toolcase.cc/css/css-grid-generator', languages: { en: 'https://toolcase.cc/css/css-grid-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css/css-grid-generator' } },
}

const faqs = [
  { question: 'What is CSS Grid?', answer: 'CSS Grid is a two-dimensional layout system that lets you create complex web layouts with rows and columns. Unlike Flexbox which works in one dimension, Grid gives you control over both axes simultaneously, making it ideal for page layouts and component grids.' },
  { question: 'What do fr, px, and auto mean for column widths?', answer: 'The "fr" unit represents a fraction of the available space (e.g., 1fr 2fr gives the second column twice the width of the first). "px" sets a fixed pixel width. "auto" sizes the column to fit its content. You can mix these units freely for flexible layouts.' },
  { question: 'How many columns and rows can I create?', answer: 'This tool supports 1 to 12 columns and 1 to 12 rows, which covers the vast majority of grid layout needs. You can define individual widths for each column using fr, px, or auto units.' },
]

export default function CssGridGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'CSS Grid Generator', url: 'https://toolcase.cc/css/css-grid-generator' },
        ]}
      />
      <ToolSchema
        name="CSS Grid Generator"
        description="Generate CSS Grid layouts visually. Set columns, rows, gaps and column widths with fr, px or auto units. Live preview with numbered cells."
        url="https://toolcase.cc/css/css-grid-generator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'CSS Grid Generator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>CSS Grid Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Build CSS Grid layouts visually and copy the code.</p>
      <CssGridGenerator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Set the number of columns and rows using the sliders. Adjust column and row gap for spacing. Define the width of each column using fr (fractional), px (fixed), or auto units. The visual grid preview updates instantly with numbered cells. Copy the CSS code to use in your project.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="css-grid-generator" locale="en" />
    </div>
    </>
  )
}

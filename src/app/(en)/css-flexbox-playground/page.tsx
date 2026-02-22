import { Metadata } from 'next'
import CssFlexboxPlayground from '@/components/tools/CssFlexboxPlayground'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'CSS Flexbox Playground - Free Online Tool | toolcase',
  description: 'Interactive CSS Flexbox playground. Adjust flex-direction, justify-content, align-items, flex-wrap and gap with live visual preview.',
  alternates: { canonical: 'https://toolcase.cc/css-flexbox-playground', languages: { en: 'https://toolcase.cc/css-flexbox-playground', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css-flexbox-playground' } },
}

const faqs = [
  { question: 'What is CSS Flexbox?', answer: 'CSS Flexbox (Flexible Box Layout) is a one-dimensional layout system for arranging items in rows or columns. It makes it easy to distribute space, align items, and handle dynamic sizing without using floats or positioning hacks.' },
  { question: 'What properties can I control?', answer: 'This playground lets you adjust the five key flex container properties: flex-direction (row/column and their reverses), justify-content (main axis alignment), align-items (cross axis alignment), flex-wrap (single or multi-line), and gap (spacing between items). You can also change the number of child items.' },
  { question: 'When should I use Flexbox vs CSS Grid?', answer: 'Use Flexbox for one-dimensional layouts — arranging items in a single row or column. Use CSS Grid for two-dimensional layouts where you need control over both rows and columns simultaneously. They complement each other and can be used together in the same project.' },
]

export default function CssFlexboxPlaygroundPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'CSS Flexbox Playground', url: 'https://toolcase.cc/css-flexbox-playground' },
        ]}
      />
      <ToolSchema
        name="CSS Flexbox Playground"
        description="Interactive CSS Flexbox playground. Adjust flex-direction, justify-content, align-items, flex-wrap and gap with live visual preview."
        url="https://toolcase.cc/css-flexbox-playground"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'CSS Flexbox Playground' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>CSS Flexbox Playground</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Experiment with CSS Flexbox properties and see the results in real time.</p>
      <CssFlexboxPlayground />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Use the dropdown menus to change flex-direction, justify-content, align-items, and flex-wrap. Adjust the gap slider and the number of child items. Watch the colored boxes rearrange in the preview area as you change each property. Copy the CSS code when you have the layout you want.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="css-flexbox-playground" locale="en" />
    </div>
    </>
  )
}

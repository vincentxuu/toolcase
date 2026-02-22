import { Metadata } from 'next'
import BorderRadiusGenerator from '@/components/tools/BorderRadiusGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Border Radius Generator - Free Online Tool | toolcase',
  description: 'Generate CSS border-radius with visual controls for each corner. Link or unlink corners, preview the shape, and copy the CSS code.',
  alternates: { canonical: 'https://toolcase.cc/border-radius-generator', languages: { en: 'https://toolcase.cc/border-radius-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/border-radius-generator' } },
}

const faqs = [
  { question: 'What does border-radius do?', answer: 'The CSS border-radius property rounds the corners of an element. You can set a single value for all four corners or different values for each corner (top-left, top-right, bottom-right, bottom-left) to create asymmetric rounded shapes.' },
  { question: 'What does the link/unlink toggle do?', answer: 'When corners are linked, changing one value updates all four corners equally. Unlink the corners to control each one independently — useful for creating pill shapes, organic blobs, or other creative forms.' },
  { question: 'What is the maximum border-radius value?', answer: 'You can set border-radius up to any pixel value. Using 50% on a square element creates a perfect circle. This tool supports values up to 200px, which is enough for most use cases.' },
]

export default function BorderRadiusGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Border Radius Generator', url: 'https://toolcase.cc/border-radius-generator' },
        ]}
      />
      <ToolSchema
        name="Border Radius Generator"
        description="Generate CSS border-radius with visual controls for each corner. Link or unlink corners, preview the shape, and copy the CSS code."
        url="https://toolcase.cc/border-radius-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Border Radius Generator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Border Radius Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Visually design CSS border-radius for each corner and copy the code.</p>
      <BorderRadiusGenerator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Use the sliders or number inputs to set the radius for each corner. Toggle the link button to adjust all corners at once or independently. The preview square updates in real time. Copy the CSS code when you are satisfied with the shape.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="border-radius-generator" locale="en" />
    </div>
    </>
  )
}

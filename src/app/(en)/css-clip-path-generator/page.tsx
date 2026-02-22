import { Metadata } from 'next'
import CssClipPathGenerator from '@/components/tools/CssClipPathGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'CSS Clip Path Generator - Free Online Tool | toolcase',
  description: 'Generate CSS clip-path shapes visually. Choose from circle, ellipse, triangle, polygon, pentagon, hexagon, and star presets with live preview.',
  alternates: { canonical: 'https://toolcase.cc/css-clip-path-generator', languages: { en: 'https://toolcase.cc/css-clip-path-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css-clip-path-generator' } },
}

const faqs = [
  { question: 'What is CSS clip-path?', answer: 'CSS clip-path is a property that clips an element to a specific shape, hiding everything outside the defined region. It supports basic shapes like circle(), ellipse(), and polygon(), allowing you to create non-rectangular layouts and creative visual effects.' },
  { question: 'Which shapes are available?', answer: 'This tool provides seven preset shapes: Circle, Ellipse, Triangle, Polygon (trapezoid), Pentagon, Hexagon, and Star. Circle and ellipse shapes have adjustable radius parameters. Polygon-based shapes use calculated coordinate points.' },
  { question: 'Does clip-path work in all browsers?', answer: 'CSS clip-path with basic shapes is well supported in all modern browsers including Chrome, Firefox, Safari, and Edge. For the widest compatibility, test with your target browsers. Note that clip-path does not affect the element\'s layout — it only changes what is visually rendered.' },
]

export default function CssClipPathGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'CSS Clip Path Generator', url: 'https://toolcase.cc/css-clip-path-generator' },
        ]}
      />
      <ToolSchema
        name="CSS Clip Path Generator"
        description="Generate CSS clip-path shapes visually. Choose from circle, ellipse, triangle, polygon, pentagon, hexagon, and star presets with live preview."
        url="https://toolcase.cc/css-clip-path-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'CSS Clip Path Generator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>CSS Clip Path Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Create CSS clip-path shapes with preset templates and live preview.</p>
      <CssClipPathGenerator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Select a shape preset from the buttons. For circle and ellipse shapes, adjust the radius sliders to fine-tune the size. The preview area shows the clipped shape in real time. Copy the CSS clip-path code to use in your stylesheets.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="css-clip-path-generator" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import BoxShadowGenerator from '@/components/tools/BoxShadowGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Box Shadow Generator - Free Online Tool | toolcase',
  description: 'Generate CSS box-shadow with visual controls. Adjust offset, blur, spread, color and opacity. Support for multiple shadows and inset mode.',
  alternates: { canonical: 'https://toolcase.cc/box-shadow-generator', languages: { en: 'https://toolcase.cc/box-shadow-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/box-shadow-generator' } },
}

const faqs = [
  { question: 'What parameters does box-shadow support?', answer: 'CSS box-shadow takes offset-x, offset-y, blur-radius, spread-radius, and color. Offset values move the shadow horizontally and vertically. Blur controls the softness. Spread expands or contracts the shadow. You can also toggle the inset keyword to create inner shadows.' },
  { question: 'Can I add multiple shadows?', answer: 'Yes. Click "Add Shadow" to layer multiple shadows on the same element. Each shadow has its own controls for offset, blur, spread, color, opacity, and inset. Multiple shadows are comma-separated in the CSS output.' },
  { question: 'How do I create a soft, modern shadow?', answer: 'For a soft modern shadow, use small offset values (e.g., 0px 4px), a moderate blur (16-24px), no spread, and a low opacity (0.1-0.2). You can also stack two shadows with different blur values for added depth.' },
]

export default function BoxShadowGeneratorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Box Shadow Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Generate CSS box-shadow visually with multiple shadow layers.</p>
      <BoxShadowGenerator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Adjust the sliders for offset X/Y, blur, spread, and opacity to shape your shadow. Pick a color and optionally toggle inset for an inner shadow. Add more shadow layers for complex effects. The live preview box shows your shadow in real time. Copy the CSS when ready.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="box-shadow-generator" locale="en" />
    </div>
  )
}

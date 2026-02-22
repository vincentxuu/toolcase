import { Metadata } from 'next'
import CssTextShadowGenerator from '@/components/tools/CssTextShadowGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'CSS Text Shadow Generator - Free Online Tool | toolcase',
  description: 'Generate CSS text-shadow with visual controls. Adjust offset, blur, color and opacity. Support for multiple shadow layers with live preview and copy CSS.',
  alternates: { canonical: 'https://toolcase.cc/css-text-shadow-generator', languages: { en: 'https://toolcase.cc/css-text-shadow-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css-text-shadow-generator' } },
}

const faqs = [
  { question: 'What parameters does text-shadow support?', answer: 'CSS text-shadow takes offset-x, offset-y, blur-radius, and color. Offset values move the shadow horizontally and vertically. Blur controls the softness. Unlike box-shadow, text-shadow does not support spread or inset.' },
  { question: 'Can I add multiple text shadows?', answer: 'Yes. Click "Add Shadow" to layer multiple shadows on the same text. Each shadow has its own controls for offset, blur, color, and opacity. Multiple shadows are comma-separated in the CSS output.' },
  { question: 'How do I create a glowing text effect?', answer: 'Set both offset values to 0, increase the blur radius (10-20px), and use a bright color with full opacity. You can stack multiple shadows with increasing blur values for a stronger glow effect.' },
]

export default function CssTextShadowGeneratorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>CSS Text Shadow Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Generate CSS text-shadow visually with multiple shadow layers.</p>
      <CssTextShadowGenerator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter your preview text and adjust the font size slider. Use the sliders for offset X/Y, blur, and opacity to shape your text shadow. Pick a shadow color using the color picker. Add more shadow layers for complex effects like glows or outlines. The live preview shows your shadow in real time. Copy the CSS when ready.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="css-text-shadow-generator" locale="en" />
    </div>
  )
}

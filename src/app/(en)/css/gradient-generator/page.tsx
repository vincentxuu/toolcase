import { Metadata } from 'next'
import GradientGenerator from '@/components/tools/GradientGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'CSS Gradient Generator - Free Online Tool | toolcase',
  description: 'Create beautiful CSS gradients with a visual builder. Support for linear and radial gradients with multiple color stops and live preview.',
  alternates: { canonical: 'https://toolcase.cc/css/gradient-generator', languages: { en: 'https://toolcase.cc/css/gradient-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css/gradient-generator' } },
}

const faqs = [
  { question: 'What types of gradients can I create?', answer: 'You can create linear gradients (with a customizable angle from 0 to 360 degrees) and radial gradients (circular, radiating from the center). Both types support two or more color stops positioned anywhere along the gradient.' },
  { question: 'How do I add more color stops?', answer: 'Click the "Add Color Stop" button to add a new color stop. Each stop has its own color picker, HEX input, and position slider (0-100%). You can add as many stops as you like and remove any stop when you have more than two.' },
  { question: 'How do I use the generated CSS?', answer: 'Click the Copy button next to the CSS code output. The generated code includes the full background property with the gradient value. Paste it directly into your stylesheet. All modern browsers support CSS gradients without vendor prefixes.' },
]

export default function GradientGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'CSS Gradient Generator', url: 'https://toolcase.cc/css/gradient-generator' },
        ]}
      />
      <ToolSchema
        name="CSS Gradient Generator"
        description="Create beautiful CSS gradients with a visual builder. Support for linear and radial gradients with multiple color stops and live preview."
        url="https://toolcase.cc/css/gradient-generator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'CSS Gradient Generator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>CSS Gradient Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Build beautiful CSS gradients with a visual editor and copy the code.</p>
      <GradientGenerator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Choose between linear or radial gradient. For linear gradients, adjust the angle with the slider. Add or remove color stops and position them along the gradient. The live preview updates instantly. When you are happy with the result, click Copy to grab the CSS code.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="gradient-generator" locale="en" />
    </div>
    </>
  )
}

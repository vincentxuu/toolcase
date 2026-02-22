import { Metadata } from 'next'
import GlassmorphismGenerator from '@/components/tools/GlassmorphismGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Glassmorphism Generator - Free Online Tool | toolcase',
  description: 'Create stunning frosted glass effects with CSS. Adjust blur, transparency, border opacity and saturation with live preview.',
  alternates: { canonical: 'https://toolcase.cc/glassmorphism-generator', languages: { en: 'https://toolcase.cc/glassmorphism-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/glassmorphism-generator' } },
}

const faqs = [
  { question: 'What is glassmorphism?', answer: 'Glassmorphism is a UI design trend that uses semi-transparent backgrounds with a frosted glass blur effect. It relies on CSS backdrop-filter to blur content behind an element, creating a layered, depth-rich look popular in modern interfaces.' },
  { question: 'Is backdrop-filter supported in all browsers?', answer: 'backdrop-filter is supported in all modern browsers including Chrome, Firefox, Safari, and Edge. The generated code includes the -webkit-backdrop-filter prefix for broader compatibility. For older browsers, the background color provides a graceful fallback.' },
  { question: 'How do I customize the glass effect?', answer: 'Use the sliders to adjust blur amount (higher = more frosted), transparency (lower = more see-through), border opacity (controls the glass edge visibility), and saturation (boosts or mutes colors behind the glass). Pick a background color to tint the glass panel.' },
]

export default function GlassmorphismGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Glassmorphism Generator', url: 'https://toolcase.cc/glassmorphism-generator' },
        ]}
      />
      <ToolSchema
        name="Glassmorphism Generator"
        description="Create stunning frosted glass effects with CSS. Adjust blur, transparency, border opacity and saturation with live preview."
        url="https://toolcase.cc/glassmorphism-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Glassmorphism Generator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Glassmorphism Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Create frosted glass CSS effects with live preview.</p>
      <GlassmorphismGenerator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Adjust the sliders for blur amount, transparency, border opacity, and saturation. Choose a background color with the color picker. The preview area shows a glass card over colorful shapes so you can see the frosted effect in action. Copy the CSS code to use it in your project.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="glassmorphism-generator" locale="en" />
    </div>
    </>
  )
}

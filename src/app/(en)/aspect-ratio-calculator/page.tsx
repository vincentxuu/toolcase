import { Metadata } from 'next'
import AspectRatioCalculator from '@/components/tools/AspectRatioCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Aspect Ratio Calculator - Free Online Tool | toolcase',
  description: 'Calculate and simplify aspect ratios instantly. Lock ratios, use presets like 16:9, 4:3, 1:1, and find the simplified ratio for any resolution.',
  alternates: { canonical: 'https://toolcase.cc/aspect-ratio-calculator', languages: { en: 'https://toolcase.cc/aspect-ratio-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/aspect-ratio-calculator' } },
}

const faqs = [
  { question: 'What is an aspect ratio?', answer: 'An aspect ratio is the proportional relationship between the width and height of an image or screen. For example, 16:9 means for every 16 units of width, there are 9 units of height.' },
  { question: 'What does the Lock Ratio feature do?', answer: 'When you lock the ratio, changing the width will automatically recalculate the height to maintain the same aspect ratio, and vice versa. This is useful for resizing images while preserving proportions.' },
  { question: 'What is the most common aspect ratio?', answer: '16:9 is the most common aspect ratio for modern displays, TVs, and videos. 4:3 was the traditional TV standard, and 1:1 is popular for social media posts.' },
]

export default function AspectRatioCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Aspect Ratio Calculator', url: 'https://toolcase.cc/aspect-ratio-calculator' },
        ]}
      />
      <ToolSchema
        name="Aspect Ratio Calculator"
        description="Calculate and simplify aspect ratios instantly. Lock ratios, use presets like 16:9, 4:3, 1:1, and find the simplified ratio for any resolution."
        url="https://toolcase.cc/aspect-ratio-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Aspect Ratio Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Aspect Ratio Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Calculate, simplify, and lock aspect ratios for any resolution with preset options.</p>
      <AspectRatioCalculator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter a width and height to instantly see the simplified aspect ratio. Use the Lock Ratio button to maintain the ratio while changing dimensions, or click a preset ratio to apply common formats like 16:9 or 4:3.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="aspect-ratio-calculator" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import ScientificCalculator from '@/components/tools/ScientificCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Scientific Calculator - Free Online | toolcase',
  description: 'A free online scientific calculator with trigonometric functions (sin, cos, tan), logarithms, square root, exponents, and degree/radian toggle.',
  alternates: { canonical: 'https://toolcase.cc/everyday/scientific-calculator', languages: { en: 'https://toolcase.cc/everyday/scientific-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/scientific-calculator' } },
}

const faqs = [
  { question: 'What functions are supported?', answer: 'The calculator supports basic arithmetic (+, -, ×, ÷), trigonometric functions (sin, cos, tan), logarithms (log base 10 and natural log), square root, exponents, constants (π and e), and parentheses for grouping.' },
  { question: 'How do I switch between degrees and radians?', answer: 'Click the DEG/RAD button to toggle between degree mode and radian mode for trigonometric calculations.' },
]

export default function ScientificCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Scientific Calculator', url: 'https://toolcase.cc/everyday/scientific-calculator' },
        ]}
      />
      <ToolSchema
        name="Scientific Calculator"
        description="A free online scientific calculator with trigonometric functions (sin, cos, tan), logarithms, square root, exponents, and degree/radian toggle."
        url="https://toolcase.cc/everyday/scientific-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Scientific Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Scientific Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>A full-featured scientific calculator with trig functions, logarithms, and more.</p>
      <ScientificCalculator />
      <FaqSection items={faqs} />
      <RelatedTools current="scientific-calculator" locale="en" />
    </div>
    </>
  )
}

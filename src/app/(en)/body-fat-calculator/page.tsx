import { Metadata } from 'next'
import BodyFatCalculator from '@/components/tools/BodyFatCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Body Fat Calculator - Free Online Tool | toolcase',
  description: 'Estimate body fat percentage using the US Navy method. Free online body fat calculator with instant results.',
  alternates: { canonical: 'https://toolcase.cc/body-fat-calculator', languages: { en: 'https://toolcase.cc/body-fat-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/body-fat-calculator' } },
}

const faqs = [
  { question: 'What is the US Navy body fat method?', answer: 'The US Navy method estimates body fat percentage using circumference measurements of the neck, waist, and hips (for women), along with height. It was developed by the US Navy as a simple and reliable way to assess body composition without specialized equipment.' },
  { question: 'What is a healthy body fat percentage?', answer: 'Healthy body fat ranges vary by gender and age. For men, 10-20% is generally considered healthy, while for women, 18-28% is typical. Essential fat is about 3-5% for men and 10-13% for women. Athletes often have lower body fat percentages.' },
  { question: 'How accurate is the body fat calculator?', answer: 'The US Navy method provides a reasonable estimate with an accuracy of about 3-4% compared to more precise methods like DEXA scans. For the most accurate results, take your measurements first thing in the morning and measure at the same points each time.' },
]

export default function BodyFatCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Body Fat Calculator', url: 'https://toolcase.cc/body-fat-calculator' },
        ]}
      />
      <ToolSchema
        name="Body Fat Calculator"
        description="Estimate body fat percentage using the US Navy method. Free online body fat calculator with instant results."
        url="https://toolcase.cc/body-fat-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Body Fat Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Body Fat Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Estimate body fat percentage using the US Navy method.</p>
      <BodyFatCalculator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Select your gender and enter your height, neck circumference, waist circumference, and hip circumference (for women). The calculator uses the US Navy formula to estimate your body fat percentage and shows which category you fall into.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="body-fat-calculator" locale="en" />
    </div>
    </>
  )
}

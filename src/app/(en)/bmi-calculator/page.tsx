import { Metadata } from 'next'
import BmiCalculator from '@/components/tools/BmiCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'BMI Calculator - Free Online Tool | toolcase',
  description: 'Calculate your Body Mass Index (BMI) instantly. Free online BMI calculator with visual scale and category breakdown.',
  alternates: { canonical: 'https://toolcase.cc/bmi-calculator', languages: { en: 'https://toolcase.cc/bmi-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/bmi-calculator' } },
}

const faqs = [
  { question: 'What is BMI?', answer: 'BMI (Body Mass Index) is a measure of body fat based on height and weight. It is calculated as weight (kg) divided by height (m) squared.' },
  { question: 'Is BMI accurate?', answer: 'BMI is a useful screening tool but has limitations. It does not distinguish between muscle and fat mass, so athletes may have a high BMI despite being healthy.' },
  { question: 'What is a healthy BMI range?', answer: 'A BMI between 18.5 and 24.9 is generally considered normal weight. Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is obese.' },
]

export default function BmiCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'BMI Calculator', url: 'https://toolcase.cc/bmi-calculator' },
        ]}
      />
      <ToolSchema
        name="BMI Calculator"
        description="Calculate your Body Mass Index (BMI) instantly. Free online BMI calculator with visual scale and category breakdown."
        url="https://toolcase.cc/bmi-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'BMI Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>BMI Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Calculate your Body Mass Index and see which category you fall into.</p>
      <BmiCalculator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter your height in centimeters and weight in kilograms. Your BMI is calculated instantly with a visual scale showing where you fall.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="bmi-calculator" locale="en" />
    </div>
    </>
  )
}

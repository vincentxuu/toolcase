import { Metadata } from 'next'
import TdeeCalculator from '@/components/tools/TdeeCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'TDEE & BMR Calculator - Free Online Tool | toolcase',
  description: 'Calculate your Total Daily Energy Expenditure (TDEE) and Basal Metabolic Rate (BMR). Know exactly how many calories you need.',
  alternates: { canonical: 'https://toolcase.cc/tdee-calculator', languages: { en: 'https://toolcase.cc/tdee-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tdee-calculator' } },
}

const faqs = [
  { question: 'What is TDEE?', answer: 'TDEE (Total Daily Energy Expenditure) is the total number of calories you burn each day, including your basal metabolism, physical activity, and food digestion.' },
  { question: 'What is BMR?', answer: 'BMR (Basal Metabolic Rate) is the number of calories your body needs at rest to maintain basic functions like breathing and circulation.' },
  { question: 'How is TDEE calculated?', answer: 'TDEE is calculated using the Mifflin-St Jeor equation for BMR, then multiplied by an activity factor based on your exercise level.' },
]

export default function TdeeCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'TDEE & BMR Calculator', url: 'https://toolcase.cc/tdee-calculator' },
        ]}
      />
      <ToolSchema
        name="TDEE & BMR Calculator"
        description="Calculate your Total Daily Energy Expenditure (TDEE) and Basal Metabolic Rate (BMR). Know exactly how many calories you need."
        url="https://toolcase.cc/tdee-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'TDEE & BMR Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>TDEE & BMR Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Calculate your daily calorie needs based on your activity level.</p>
      <TdeeCalculator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter your age, gender, height, weight, and activity level. The calculator shows your BMR, TDEE, and calorie targets for weight loss, maintenance, and weight gain.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="tdee-calculator" locale="en" />
    </div>
    </>
  )
}

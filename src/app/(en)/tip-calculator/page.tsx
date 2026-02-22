import { Metadata } from 'next'
import TipCalculator from '@/components/tools/TipCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Tip Calculator - Free Online Tool | toolcase',
  description: 'Calculate tips and split bills between friends easily. Free online tip calculator for restaurants, bars and services.',
  alternates: { canonical: 'https://toolcase.cc/tip-calculator', languages: { en: 'https://toolcase.cc/tip-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tip-calculator' } },
}

const faqs = [
  { question: 'How much should I tip at a restaurant?', answer: 'In the United States, the standard tip at a restaurant is 15-20% of the pre-tax bill. For exceptional service, 20-25% is appropriate. In many other countries, tipping customs vary — some include a service charge automatically.' },
  { question: 'Should I tip on the pre-tax or post-tax amount?', answer: 'It is generally recommended to tip on the pre-tax subtotal of your bill. However, tipping on the post-tax total is also common and often simpler, and many people choose to do so for convenience.' },
  { question: 'How do I split the tip when dining with a group?', answer: 'Calculate the total tip on the full bill amount, then divide the tip equally among all diners. Alternatively, each person can tip individually based on what they ordered. This calculator can handle bill splitting for you automatically.' },
]

export default function TipCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Tip Calculator', url: 'https://toolcase.cc/tip-calculator' },
        ]}
      />
      <ToolSchema
        name="Tip Calculator"
        description="Calculate tips and split bills between friends easily. Free online tip calculator for restaurants, bars and services."
        url="https://toolcase.cc/tip-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Tip Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Tip Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Calculate tips and split bills between friends.</p>
      <TipCalculator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter your bill amount and select a tip percentage. If you are splitting the bill, enter the number of people. The calculator will show the tip amount, total bill and each person's share instantly.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="tip-calculator" locale="en" />
    </div>
    </>
  )
}

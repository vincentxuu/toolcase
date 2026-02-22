import { Metadata } from 'next'
import UnitPriceCalculator from '@/components/tools/UnitPriceCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Unit Price Calculator - Free Online Tool | toolcase',
  description: 'Compare unit prices to find the best deal. Add items with price, quantity, and unit to see which product offers the lowest cost per unit.',
  alternates: { canonical: 'https://toolcase.cc/unit-price-calculator', languages: { en: 'https://toolcase.cc/unit-price-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/unit-price-calculator' } },
}

const faqs = [
  { question: 'What is unit price?', answer: 'Unit price is the cost per single unit of measurement (per gram, per ounce, per piece, etc.). It lets you compare products of different sizes fairly. The item with the lowest unit price gives you the most value for your money.' },
  { question: 'Why does the calculator normalize units?', answer: 'To compare products accurately, quantities must be in the same unit. The calculator automatically converts kg to g, L to mL, and lb to oz so that all items are compared on the same basis. If items use incompatible units (e.g., grams vs. pieces), a direct comparison is not meaningful.' },
  { question: 'Is the bigger size always a better deal?', answer: 'Not always. While bulk sizes often have a lower unit price, this is not guaranteed. Some stores price smaller packages more competitively during sales. Always check the unit price rather than assuming the largest option is cheapest.' },
]

export default function UnitPriceCalculatorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Unit Price Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Compare products side by side to find the best deal based on unit price.</p>
      <UnitPriceCalculator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter the name, price, quantity, and unit for each item you want to compare. The calculator will compute the unit price for each and highlight the best deal in green. You can compare up to 4 items. Make sure items use compatible units (e.g., g/kg or mL/L) for an accurate comparison.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="unit-price-calculator" locale="en" />
    </div>
  )
}

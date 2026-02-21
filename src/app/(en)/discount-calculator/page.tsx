import { Metadata } from 'next'
import DiscountCalculator from '@/components/tools/DiscountCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Discount Calculator - Free Online Tool | toolcase',
  description: 'Calculate sale prices, savings and discount percentages instantly.',
  alternates: { canonical: 'https://toolcase.cc/discount-calculator', languages: { en: 'https://toolcase.cc/discount-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/discount-calculator' } },
}

const faqs = [
  { question: 'How do I calculate a discount percentage?', answer: 'To calculate the discount percentage, subtract the sale price from the original price, divide the result by the original price, and multiply by 100. For example, if an item drops from $100 to $75, the discount is (100-75)/100 x 100 = 25%.' },
  { question: 'What is the difference between a discount and a markdown?', answer: 'A discount is a temporary price reduction usually offered as a promotion, while a markdown is a permanent reduction in the retail price of an item. Both reduce the price you pay, but discounts are typically time-limited.' },
  { question: 'How do stacked or multiple discounts work?', answer: 'When multiple discounts are applied sequentially, each discount is calculated on the already-reduced price, not the original. For example, 20% off then 10% off a $100 item gives $80 after the first discount, then $72 after the second — not $70 as you might expect from simply adding 20% + 10%.' },
]

export default function DiscountCalculatorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Discount Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Calculate discounted prices, savings and sale percentages.</p>
      <DiscountCalculator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter the original price and the discount percentage. The calculator will instantly show you the final sale price and the amount you save. You can also enter a sale price to find out what discount percentage was applied.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="discount-calculator" locale="en" />
    </div>
  )
}

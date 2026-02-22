import { Metadata } from 'next'
import FuelCostCalculator from '@/components/tools/FuelCostCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Fuel Cost Calculator - Free Online Tool | toolcase',
  description: 'Calculate fuel costs for your trip. Enter distance, fuel efficiency, and fuel price to estimate how much fuel and money you need.',
  alternates: { canonical: 'https://toolcase.cc/fuel-cost-calculator', languages: { en: 'https://toolcase.cc/fuel-cost-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/fuel-cost-calculator' } },
}

const faqs = [
  { question: 'How do I find my car\'s fuel efficiency?', answer: 'Check your vehicle\'s owner manual or the fuel economy sticker. You can also calculate it yourself by filling your tank, driving until near empty, noting the distance traveled and fuel used, then dividing distance by fuel consumed. Online databases like fueleconomy.gov also provide estimates by make and model.' },
  { question: 'What is the difference between km/L and mpg?', answer: 'Kilometers per liter (km/L) is used in metric countries and measures how many km you can drive on one liter of fuel. Miles per gallon (mpg) is used in the US and UK and measures how many miles you can drive on one gallon. To convert: 1 mpg is roughly 0.425 km/L.' },
  { question: 'How can I improve fuel efficiency?', answer: 'Maintain steady speeds, avoid aggressive acceleration and braking, keep tires properly inflated, remove excess weight, use cruise control on highways, and keep up with regular vehicle maintenance. Air conditioning at high speeds uses less fuel than open windows due to aerodynamic drag.' },
]

export default function FuelCostCalculatorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Fuel Cost Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Estimate how much fuel and money you need for your trip.</p>
      <FuelCostCalculator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Select your preferred unit system (metric or imperial), enter the trip distance, your vehicle&apos;s fuel efficiency, and the current fuel price. Toggle round trip if you need to account for the return journey. The calculator will show the total fuel required and estimated cost.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="fuel-cost-calculator" locale="en" />
    </div>
  )
}

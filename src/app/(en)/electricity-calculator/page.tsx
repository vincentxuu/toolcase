import { Metadata } from 'next'
import ElectricityCalculator from '@/components/tools/ElectricityCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Electricity Cost Calculator - Free Online Tool | toolcase',
  description: 'Calculate electricity costs for your devices. Enter wattage, usage hours, and rate to see daily, monthly, and yearly costs.',
  alternates: { canonical: 'https://toolcase.cc/electricity-calculator', languages: { en: 'https://toolcase.cc/electricity-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/electricity-calculator' } },
}

const faqs = [
  { question: 'How do I find the wattage of my device?', answer: 'Check the label on your device or its power adapter — it usually shows wattage (W) or voltage (V) and amperage (A). If only volts and amps are listed, multiply them together to get watts (W = V × A). You can also look up the model specifications online.' },
  { question: 'What is a kWh?', answer: 'A kilowatt-hour (kWh) is a unit of energy. It represents using 1,000 watts of power for one hour. For example, a 100W light bulb running for 10 hours consumes 1 kWh. Your electricity bill is based on the number of kWh you consume.' },
  { question: 'How can I reduce my electricity costs?', answer: 'Switch to energy-efficient appliances and LED bulbs, unplug devices when not in use, use timers and smart plugs, and adjust thermostat settings. Even small changes like reducing AC usage by an hour a day can lead to meaningful savings over a year.' },
]

export default function ElectricityCalculatorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Electricity Cost Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Calculate how much your electrical devices cost to run per day, month, and year.</p>
      <ElectricityCalculator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Set your electricity rate at the top, then add your devices. For each device, enter its wattage, how many hours per day it runs, and how many days per month it is used. The calculator will show the energy consumption and cost for each device, as well as totals across all devices.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="electricity-calculator" locale="en" />
    </div>
  )
}

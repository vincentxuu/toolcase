import { Metadata } from 'next'
import TwVehicleLicenseTax from '@/components/tools/TwVehicleLicenseTax'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Taiwan Vehicle License Tax - Car & Motorcycle Tax by Engine Size | toolcase',
  description: 'Taiwan vehicle license tax (use license tax) rates for cars, motorcycles, and electric vehicles by engine displacement and motor horsepower.',
  alternates: { canonical: 'https://toolcase.cc/tw-vehicle-license-tax', languages: { en: 'https://toolcase.cc/tw-vehicle-license-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-vehicle-license-tax' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Vehicle License Tax</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan vehicle license tax rates for tax year 2024 (ROC year 113). Look up annual tax amounts for cars, motorcycles, and electric vehicles.</p>
      <TwVehicleLicenseTax labels={{ title: 'Vehicle License Tax', desc: 'Tax Year 2024 (ROC 113)', carTab: 'Cars', motorcycleTab: 'Motorcycles', evTab: 'Electric Vehicles', displacement: 'Engine Displacement', privateTax: 'Private Use (Annual)', businessTax: 'Business Use (Annual)', annualTax: 'Annual Tax', power: 'Motor Horsepower' }} />
      <RelatedTools current="tw-vehicle-license-tax" locale="en" />
    </div>
  )
}

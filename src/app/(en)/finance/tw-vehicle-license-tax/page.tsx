import { Metadata } from 'next'
import TwVehicleLicenseTax from '@/components/tools/TwVehicleLicenseTax'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan Vehicle License Tax - Car & Motorcycle Tax by Engine Size | toolcase',
  description: 'Taiwan vehicle license tax (use license tax) rates for cars, motorcycles, and electric vehicles by engine displacement and motor horsepower.',
  alternates: { canonical: 'https://toolcase.cc/finance/tw-vehicle-license-tax', languages: { en: 'https://toolcase.cc/finance/tw-vehicle-license-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/tw-vehicle-license-tax' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan Vehicle License Tax', url: 'https://toolcase.cc/finance/tw-vehicle-license-tax' },
        ]}
      />
      <ToolSchema
        name="Taiwan Vehicle License Tax"
        description="Taiwan vehicle license tax (use license tax) rates for cars, motorcycles, and electric vehicles by engine displacement and motor horsepower."
        url="https://toolcase.cc/finance/tw-vehicle-license-tax"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan Vehicle License Tax' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Vehicle License Tax</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan vehicle license tax rates for tax year 2024 (ROC year 113). Look up annual tax amounts for cars, motorcycles, and electric vehicles.</p>
      <TwVehicleLicenseTax labels={{ title: 'Vehicle License Tax', desc: 'Tax Year 2024 (ROC 113)', carTab: 'Cars', motorcycleTab: 'Motorcycles', evTab: 'Electric Vehicles', displacement: 'Engine Displacement', privateTax: 'Private Use (Annual)', businessTax: 'Business Use (Annual)', annualTax: 'Annual Tax', power: 'Motor Horsepower' }} />
      <RelatedTools current="tw-vehicle-license-tax" locale="en" />
    </div>
    </>
  )
}

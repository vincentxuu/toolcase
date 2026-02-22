import { Metadata } from 'next'
import TwFuelTax from '@/components/tools/TwFuelTax'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan Fuel Tax (Vehicle Fuel Fee) - Annual & Quarterly Rates | toolcase',
  description: 'Taiwan vehicle fuel usage fee schedule for cars and motorcycles by engine displacement. Includes both annual and quarterly payment amounts.',
  alternates: { canonical: 'https://toolcase.cc/tw-fuel-tax', languages: { en: 'https://toolcase.cc/tw-fuel-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-fuel-tax' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan Fuel Tax (Vehicle Fuel Fee)', url: 'https://toolcase.cc/tw-fuel-tax' },
        ]}
      />
      <ToolSchema
        name="Taiwan Fuel Tax (Vehicle Fuel Fee)"
        description="Taiwan vehicle fuel usage fee schedule for cars and motorcycles by engine displacement. Includes both annual and quarterly payment amounts."
        url="https://toolcase.cc/tw-fuel-tax"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan Fuel Tax (Vehicle Fuel Fee)' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Fuel Tax</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan vehicle fuel usage fee schedule for tax year 2024 (ROC year 113). Look up annual and quarterly fees by engine displacement.</p>
      <TwFuelTax labels={{ title: 'Vehicle Fuel Usage Fee', desc: 'Tax Year 2024 (ROC 113)', carTab: 'Cars', motorcycleTab: 'Motorcycles', displacement: 'Engine Displacement', annualFee: 'Annual Fee (NTD)', quarterlyFee: 'Quarterly Fee (NTD)' }} />
      <RelatedTools current="tw-fuel-tax" locale="en" />
    </div>
    </>
  )
}

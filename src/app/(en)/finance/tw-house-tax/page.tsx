import { Metadata } from 'next'
import TwHouseTax from '@/components/tools/TwHouseTax'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan House Tax Rates - Property Tax by Usage Type | toolcase',
  description: 'Taiwan house tax (property tax) rates by usage type including residential, commercial, and non-residential categories. Includes calculation formula.',
  alternates: { canonical: 'https://toolcase.cc/finance/tw-house-tax', languages: { en: 'https://toolcase.cc/finance/tw-house-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/tw-house-tax' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan House Tax Rates', url: 'https://toolcase.cc/finance/tw-house-tax' },
        ]}
      />
      <ToolSchema
        name="Taiwan House Tax Rates"
        description="Taiwan house tax (property tax) rates by usage type including residential, commercial, and non-residential categories. Includes calculation formula."
        url="https://toolcase.cc/finance/tw-house-tax"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan House Tax Rates' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan House Tax</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan house tax (property tax) rates for tax year 2024 (ROC year 113), categorized by usage type with calculation details.</p>
      <TwHouseTax labels={{ title: 'House Tax Rates', desc: 'Tax Year 2024 (ROC 113)', category: 'Category', type: 'Usage Type', rate: 'Rate', note: 'Note', formulaTitle: 'Calculation Details', item: 'Item', description: 'Description' }} />
      <RelatedTools current="tw-house-tax" locale="en" />
    </div>
    </>
  )
}

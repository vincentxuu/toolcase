import { Metadata } from 'next'
import TwHouseTax from '@/components/tools/TwHouseTax'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Taiwan House Tax Rates - Property Tax by Usage Type | toolcase',
  description: 'Taiwan house tax (property tax) rates by usage type including residential, commercial, and non-residential categories. Includes calculation formula.',
  alternates: { canonical: 'https://toolcase.cc/tw-house-tax', languages: { en: 'https://toolcase.cc/tw-house-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-house-tax' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan House Tax</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan house tax (property tax) rates for tax year 2024 (ROC year 113), categorized by usage type with calculation details.</p>
      <TwHouseTax labels={{ title: 'House Tax Rates', desc: 'Tax Year 2024 (ROC 113)', category: 'Category', type: 'Usage Type', rate: 'Rate', note: 'Note', formulaTitle: 'Calculation Details', item: 'Item', description: 'Description' }} />
      <RelatedTools current="tw-house-tax" locale="en" />
    </div>
  )
}

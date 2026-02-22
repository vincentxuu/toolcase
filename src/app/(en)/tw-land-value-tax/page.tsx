import { Metadata } from 'next'
import TwLandValueTax from '@/components/tools/TwLandValueTax'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Taiwan Land Value Tax Rates - Progressive & Special Rates | toolcase',
  description: 'Taiwan land value tax rates including progressive rates for general land and special rates for self-use residential, industrial, and agricultural land.',
  alternates: { canonical: 'https://toolcase.cc/tw-land-value-tax', languages: { en: 'https://toolcase.cc/tw-land-value-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-land-value-tax' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Land Value Tax</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan land value tax rates for tax year 2024 (ROC year 113), including progressive rates and special rates for different land types.</p>
      <TwLandValueTax labels={{ title: 'Land Value Tax Rates', desc: 'Tax Year 2024 (ROC 113)', generalTitle: 'General Land Progressive Rates', specialTitle: 'Special Rates', infoTitle: 'Key Information', bracket: 'Bracket', rate: 'Rate', note: 'Note', type: 'Land Type', condition: 'Eligibility', item: 'Item', description: 'Description' }} />
      <RelatedTools current="tw-land-value-tax" locale="en" />
    </div>
  )
}

import { Metadata } from 'next'
import TwOccupationalAccidentInsurance from '@/components/tools/TwOccupationalAccidentInsurance'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Taiwan Occupational Accident Insurance - Industry Rates & Benefits | toolcase',
  description: 'Taiwan occupational accident insurance rates by industry classification, plus an overview of benefits including medical, disability, and death payments.',
  alternates: { canonical: 'https://toolcase.cc/tw-occupational-accident-insurance', languages: { en: 'https://toolcase.cc/tw-occupational-accident-insurance', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-occupational-accident-insurance' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Occupational Accident Insurance</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan occupational accident insurance for 2024 (ROC year 113). View industry-specific rates and benefit details.</p>
      <TwOccupationalAccidentInsurance labels={{ title: 'Occupational Accident Insurance', desc: 'Year 2024 (ROC 113)', keyInfoTitle: 'Key Information', item: 'Item', description: 'Description', industryTitle: 'Industry Rate Table', code: 'Code', industry: 'Industry', rate: 'Rate', benefitsTitle: 'Benefit Overview', type: 'Benefit Type' }} />
      <RelatedTools current="tw-occupational-accident-insurance" locale="en" />
    </div>
  )
}

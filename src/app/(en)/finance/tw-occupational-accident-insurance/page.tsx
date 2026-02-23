import { Metadata } from 'next'
import TwOccupationalAccidentInsurance from '@/components/tools/TwOccupationalAccidentInsurance'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan Occupational Accident Insurance - Industry Rates & Benefits | toolcase',
  description: 'Taiwan occupational accident insurance rates by industry classification, plus an overview of benefits including medical, disability, and death payments.',
  alternates: { canonical: 'https://toolcase.cc/finance/tw-occupational-accident-insurance', languages: { en: 'https://toolcase.cc/finance/tw-occupational-accident-insurance', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/tw-occupational-accident-insurance' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan Occupational Accident Insurance', url: 'https://toolcase.cc/finance/tw-occupational-accident-insurance' },
        ]}
      />
      <ToolSchema
        name="Taiwan Occupational Accident Insurance"
        description="Taiwan occupational accident insurance rates by industry classification, plus an overview of benefits including medical, disability, and death payments."
        url="https://toolcase.cc/finance/tw-occupational-accident-insurance"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan Occupational Accident Insurance' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Occupational Accident Insurance</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan occupational accident insurance for 2024 (ROC year 113). View industry-specific rates and benefit details.</p>
      <TwOccupationalAccidentInsurance labels={{ title: 'Occupational Accident Insurance', desc: 'Year 2024 (ROC 113)', keyInfoTitle: 'Key Information', item: 'Item', description: 'Description', industryTitle: 'Industry Rate Table', code: 'Code', industry: 'Industry', rate: 'Rate', benefitsTitle: 'Benefit Overview', type: 'Benefit Type' }} />
      <RelatedTools current="tw-occupational-accident-insurance" locale="en" />
    </div>
    </>
  )
}

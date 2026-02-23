import { Metadata } from 'next'
import TwSupplementaryNhiPremium from '@/components/tools/TwSupplementaryNhiPremium'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan Supplementary NHI Premium - 2nd-Gen NHI Surcharge Calculator | toolcase',
  description: 'Taiwan supplementary NHI premium (2nd-generation NHI surcharge) rates, thresholds by income type, and a quick calculator for bonus, dividend, and rental income.',
  alternates: { canonical: 'https://toolcase.cc/finance/tw-supplementary-nhi-premium', languages: { en: 'https://toolcase.cc/finance/tw-supplementary-nhi-premium', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/tw-supplementary-nhi-premium' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan Supplementary NHI Premium', url: 'https://toolcase.cc/finance/tw-supplementary-nhi-premium' },
        ]}
      />
      <ToolSchema
        name="Taiwan Supplementary NHI Premium"
        description="Taiwan supplementary NHI premium (2nd-generation NHI surcharge) rates, thresholds by income type, and a quick calculator for bonus, dividend, and rental income."
        url="https://toolcase.cc/finance/tw-supplementary-nhi-premium"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan Supplementary NHI Premium' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Supplementary NHI Premium</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan supplementary NHI premium (2nd-generation NHI surcharge) for 2024 (ROC year 113). Check thresholds and calculate surcharges by income type.</p>
      <TwSupplementaryNhiPremium labels={{ title: 'Supplementary NHI Premium', desc: 'Year 2024 (ROC 113)', thresholdTitle: 'Key Thresholds', item: 'Item', value: 'Amount / Rate', incomeTitle: 'Income Types Subject to Surcharge', type: 'Income Type', threshold: 'Threshold', note: 'Note', quickCalc: 'Quick Calculator', incomeType: 'Income Type', amount: 'Payment Amount', premiumDue: 'Supplementary Premium', netAmount: 'Net Amount' }} />
      <RelatedTools current="tw-supplementary-nhi-premium" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import TwNationalPension from '@/components/tools/TwNationalPension'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Taiwan National Pension Insurance - Rates, Subsidies & Benefits | toolcase',
  description: 'Taiwan National Pension Insurance overview including premium rates, government subsidies by category, and benefit types such as old-age pension and disability.',
  alternates: { canonical: 'https://toolcase.cc/tw-national-pension', languages: { en: 'https://toolcase.cc/tw-national-pension', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-national-pension' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan National Pension Insurance</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan National Pension Insurance for 2024 (ROC year 113). View premium rates, government subsidies, and benefit details.</p>
      <TwNationalPension labels={{ title: 'National Pension Insurance', desc: 'Year 2024 (ROC 113)', basicInfo: 'Basic Information', item: 'Item', value: 'Amount / Rate', subsidyTitle: 'Premium Sharing by Category', category: 'Category', selfPay: 'Self-Pay Ratio', govSubsidy: 'Government Subsidy', monthlyPay: 'Monthly Self-Pay', benefitsTitle: 'Benefit Types', type: 'Benefit Type', description: 'Benefit Standard', condition: 'Eligibility' }} />
      <RelatedTools current="tw-national-pension" locale="en" />
    </div>
  )
}

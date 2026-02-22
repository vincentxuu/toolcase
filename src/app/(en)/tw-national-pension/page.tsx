import { Metadata } from 'next'
import TwNationalPension from '@/components/tools/TwNationalPension'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan National Pension Insurance - Rates, Subsidies & Benefits | toolcase',
  description: 'Taiwan National Pension Insurance overview including premium rates, government subsidies by category, and benefit types such as old-age pension and disability.',
  alternates: { canonical: 'https://toolcase.cc/tw-national-pension', languages: { en: 'https://toolcase.cc/tw-national-pension', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-national-pension' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan National Pension Insurance', url: 'https://toolcase.cc/tw-national-pension' },
        ]}
      />
      <ToolSchema
        name="Taiwan National Pension Insurance"
        description="Taiwan National Pension Insurance overview including premium rates, government subsidies by category, and benefit types such as old-age pension and disability."
        url="https://toolcase.cc/tw-national-pension"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan National Pension Insurance' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan National Pension Insurance</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan National Pension Insurance for 2024 (ROC year 113). View premium rates, government subsidies, and benefit details.</p>
      <TwNationalPension labels={{ title: 'National Pension Insurance', desc: 'Year 2024 (ROC 113)', basicInfo: 'Basic Information', item: 'Item', value: 'Amount / Rate', subsidyTitle: 'Premium Sharing by Category', category: 'Category', selfPay: 'Self-Pay Ratio', govSubsidy: 'Government Subsidy', monthlyPay: 'Monthly Self-Pay', benefitsTitle: 'Benefit Types', type: 'Benefit Type', description: 'Benefit Standard', condition: 'Eligibility' }} />
      <RelatedTools current="tw-national-pension" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import TwGiftTax from '@/components/tools/TwGiftTax'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan Gift Tax Brackets - Gift Tax Rates & Calculator | toolcase',
  description: 'Taiwan gift tax brackets with progressive rates of 10%, 15%, and 20%. Includes the NT$2.44 million annual exemption and a quick gift tax calculator.',
  alternates: { canonical: 'https://toolcase.cc/finance/tw-gift-tax', languages: { en: 'https://toolcase.cc/finance/tw-gift-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/tw-gift-tax' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan Gift Tax Brackets', url: 'https://toolcase.cc/finance/tw-gift-tax' },
        ]}
      />
      <ToolSchema
        name="Taiwan Gift Tax Brackets"
        description="Taiwan gift tax brackets with progressive rates of 10%, 15%, and 20%. Includes the NT$2.44 million annual exemption and a quick gift tax calculator."
        url="https://toolcase.cc/finance/tw-gift-tax"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan Gift Tax Brackets' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Gift Tax</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan gift tax brackets for tax year 2024 (ROC year 113), including the annual exemption amount and a quick calculator.</p>
      <TwGiftTax labels={{ title: 'Gift Tax Brackets', desc: 'Tax Year 2024 (ROC 113)', bracket: 'Net Gift Bracket', rate: 'Rate', cumDeduction: 'Cumulative Deduction', formula: 'Quick Formula', quickCalc: 'Quick Calculator', giftAmount: 'Total Gift Amount', taxDue: 'Tax Due', effectiveRate: 'Effective Rate', annualExemption: 'Annual Exemption', taxableAmount: 'Taxable Gift Amount' }} />
      <RelatedTools current="tw-gift-tax" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import TwEstateTax from '@/components/tools/TwEstateTax'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Taiwan Estate Tax Brackets - Inheritance Tax Rates & Calculator | toolcase',
  description: 'Taiwan estate (inheritance) tax brackets with progressive rates of 10%, 15%, and 20%. Includes exemptions, deductions, and a quick estate tax calculator.',
  alternates: { canonical: 'https://toolcase.cc/tw-estate-tax', languages: { en: 'https://toolcase.cc/tw-estate-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-estate-tax' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Estate Tax</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan estate (inheritance) tax brackets for tax year 2024 (ROC year 113), with exemptions, deductions, and a quick calculator.</p>
      <TwEstateTax labels={{ title: 'Estate Tax Brackets', desc: 'Tax Year 2024 (ROC 113)', bracket: 'Net Estate Bracket', rate: 'Rate', cumDeduction: 'Cumulative Deduction', formula: 'Quick Formula', quickCalc: 'Quick Calculator', estateValue: 'Net Estate Value', taxDue: 'Tax Due', effectiveRate: 'Effective Rate', deductionsTitle: 'Exemptions & Deductions', item: 'Item', amount: 'Amount' }} />
      <RelatedTools current="tw-estate-tax" locale="en" />
    </div>
  )
}

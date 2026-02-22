import { Metadata } from 'next'
import TwGiftTax from '@/components/tools/TwGiftTax'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Taiwan Gift Tax Brackets - Gift Tax Rates & Calculator | toolcase',
  description: 'Taiwan gift tax brackets with progressive rates of 10%, 15%, and 20%. Includes the NT$2.44 million annual exemption and a quick gift tax calculator.',
  alternates: { canonical: 'https://toolcase.cc/tw-gift-tax', languages: { en: 'https://toolcase.cc/tw-gift-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-gift-tax' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Gift Tax</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan gift tax brackets for tax year 2024 (ROC year 113), including the annual exemption amount and a quick calculator.</p>
      <TwGiftTax labels={{ title: 'Gift Tax Brackets', desc: 'Tax Year 2024 (ROC 113)', bracket: 'Net Gift Bracket', rate: 'Rate', cumDeduction: 'Cumulative Deduction', formula: 'Quick Formula', quickCalc: 'Quick Calculator', giftAmount: 'Total Gift Amount', taxDue: 'Tax Due', effectiveRate: 'Effective Rate', annualExemption: 'Annual Exemption', taxableAmount: 'Taxable Gift Amount' }} />
      <RelatedTools current="tw-gift-tax" locale="en" />
    </div>
  )
}

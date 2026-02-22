import { Metadata } from 'next'
import TwIncomeTaxBrackets from '@/components/tools/TwIncomeTaxBrackets'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Taiwan Income Tax Brackets - Consolidated Income Tax Rates | toolcase',
  description: 'Taiwan consolidated income tax brackets with progressive rates from 5% to 40%. Includes cumulative deduction amounts and a quick tax calculator.',
  alternates: { canonical: 'https://toolcase.cc/tw-income-tax-brackets', languages: { en: 'https://toolcase.cc/tw-income-tax-brackets', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-income-tax-brackets' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Income Tax Brackets</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan consolidated income tax brackets for tax year 2024 (ROC year 113), with progressive rates and a quick calculator.</p>
      <TwIncomeTaxBrackets labels={{ title: 'Income Tax Brackets', desc: 'Tax Year 2024 (ROC 113)', bracket: 'Net Income Bracket', rate: 'Rate', cumDeduction: 'Cumulative Deduction', quickCalc: 'Quick Calculator', netIncome: 'Net Taxable Income', taxDue: 'Tax Due', effectiveRate: 'Effective Rate', year: 'Year' }} />
      <RelatedTools current="tw-income-tax-brackets" locale="en" />
    </div>
  )
}

import { Metadata } from 'next'
import TwIncomeTaxBrackets from '@/components/tools/TwIncomeTaxBrackets'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan Income Tax Brackets - Consolidated Income Tax Rates | toolcase',
  description: 'Taiwan consolidated income tax brackets with progressive rates from 5% to 40%. Includes cumulative deduction amounts and a quick tax calculator.',
  alternates: { canonical: 'https://toolcase.cc/tw-income-tax-brackets', languages: { en: 'https://toolcase.cc/tw-income-tax-brackets', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-income-tax-brackets' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan Income Tax Brackets', url: 'https://toolcase.cc/tw-income-tax-brackets' },
        ]}
      />
      <ToolSchema
        name="Taiwan Income Tax Brackets"
        description="Taiwan consolidated income tax brackets with progressive rates from 5% to 40%. Includes cumulative deduction amounts and a quick tax calculator."
        url="https://toolcase.cc/tw-income-tax-brackets"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan Income Tax Brackets' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Income Tax Brackets</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan consolidated income tax brackets for tax year 2024 (ROC year 113), with progressive rates and a quick calculator.</p>
      <TwIncomeTaxBrackets labels={{ title: 'Income Tax Brackets', desc: 'Tax Year 2024 (ROC 113)', bracket: 'Net Income Bracket', rate: 'Rate', cumDeduction: 'Cumulative Deduction', quickCalc: 'Quick Calculator', netIncome: 'Net Taxable Income', taxDue: 'Tax Due', effectiveRate: 'Effective Rate', year: 'Year' }} />
      <RelatedTools current="tw-income-tax-brackets" locale="en" />
    </div>
    </>
  )
}

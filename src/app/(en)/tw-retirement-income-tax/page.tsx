import { Metadata } from 'next'
import TwRetirementIncomeTax from '@/components/tools/TwRetirementIncomeTax'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan Retirement Income Tax Exemption - Lump Sum & Annuity Rules | toolcase',
  description: 'Taiwan retirement income tax exemption rules for lump-sum and annuity payments. Includes tax-free thresholds by service years and a quick calculator.',
  alternates: { canonical: 'https://toolcase.cc/tw-retirement-income-tax', languages: { en: 'https://toolcase.cc/tw-retirement-income-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-retirement-income-tax' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan Retirement Income Tax Exemption', url: 'https://toolcase.cc/tw-retirement-income-tax' },
        ]}
      />
      <ToolSchema
        name="Taiwan Retirement Income Tax Exemption"
        description="Taiwan retirement income tax exemption rules for lump-sum and annuity payments. Includes tax-free thresholds by service years and a quick calculator."
        url="https://toolcase.cc/tw-retirement-income-tax"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan Retirement Income Tax Exemption' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Retirement Income Tax</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan retirement income tax exemption rules for 2024 (ROC year 113). Calculate tax-free thresholds for lump-sum and annuity payments.</p>
      <TwRetirementIncomeTax labels={{ title: 'Retirement Income Tax Exemption', desc: 'Tax Year 2024 (ROC 113)', rulesTitle: 'Tax Rules', type: 'Payment Type', rule: 'Calculation Method', detail: 'Details', quickCalc: 'Lump Sum Calculator', serviceYears: 'Years of Service', lumpSum: 'Lump Sum Amount', taxFree: 'Tax-Free Amount', halfTaxable: 'Half Taxable', fullyTaxable: 'Fully Taxable', exemptionHistory: 'Exemption History', year: 'Year', perYear: 'Per-Year Tax-Free Amount', annualExemption: 'Annual Annuity Exemption' }} />
      <RelatedTools current="tw-retirement-income-tax" locale="en" />
    </div>
    </>
  )
}

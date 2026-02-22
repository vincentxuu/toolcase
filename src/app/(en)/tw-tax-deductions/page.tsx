import { Metadata } from 'next'
import TwTaxDeductions from '@/components/tools/TwTaxDeductions'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan Tax Deductions & Exemptions - Income Tax Filing Guide | toolcase',
  description: 'Complete guide to Taiwan income tax exemptions, standard deductions, itemized deductions, special deductions, and basic living expense allowance for 2024.',
  alternates: { canonical: 'https://toolcase.cc/tw-tax-deductions', languages: { en: 'https://toolcase.cc/tw-tax-deductions', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-tax-deductions' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan Tax Deductions & Exemptions', url: 'https://toolcase.cc/tw-tax-deductions' },
        ]}
      />
      <ToolSchema
        name="Taiwan Tax Deductions & Exemptions"
        description="Complete guide to Taiwan income tax exemptions, standard deductions, itemized deductions, special deductions, and basic living expense allowance for 2024."
        url="https://toolcase.cc/tw-tax-deductions"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan Tax Deductions & Exemptions' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Tax Deductions & Exemptions</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan income tax exemptions and deductions for tax year 2024 (ROC year 113). Covers personal exemptions, standard and itemized deductions, and special deductions.</p>
      <TwTaxDeductions labels={{ title: 'Exemptions & Deductions', desc: 'Tax Year 2024 (ROC 113) Filing', exemptionTitle: 'Personal Exemptions', standardTitle: 'Standard Deductions', itemizedTitle: 'Itemized Deductions', specialTitle: 'Special Deductions', basicLivingTitle: 'Basic Living Expense', item: 'Item', amount: 'Amount', limit: 'Limit', note: 'Note' }} />
      <RelatedTools current="tw-tax-deductions" locale="en" />
    </div>
    </>
  )
}

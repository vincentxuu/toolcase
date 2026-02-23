import { Metadata } from 'next'
import TwLaborPension from '@/components/tools/TwLaborPension'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan Labor Pension Contribution Table - Monthly Grades | toolcase',
  description: 'Taiwan labor pension (new system) contribution table with wage grades and employer 6% mandatory contribution amounts. Includes voluntary contribution info.',
  alternates: { canonical: 'https://toolcase.cc/finance/tw-labor-pension', languages: { en: 'https://toolcase.cc/finance/tw-labor-pension', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/tw-labor-pension' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan Labor Pension Contribution Table', url: 'https://toolcase.cc/finance/tw-labor-pension' },
        ]}
      />
      <ToolSchema
        name="Taiwan Labor Pension Contribution Table"
        description="Taiwan labor pension (new system) contribution table with wage grades and employer 6% mandatory contribution amounts. Includes voluntary contribution info."
        url="https://toolcase.cc/finance/tw-labor-pension"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan Labor Pension Contribution Table' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Labor Pension</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan labor pension contribution table for 2024 (ROC year 113). Look up wage grades and employer/voluntary contribution amounts.</p>
      <TwLaborPension labels={{ title: 'Labor Pension Contribution Table', desc: 'Year 2024 (ROC 113)', grade: 'Grade', wageGrade: 'Monthly Contribution Wage', employerContrib: 'Employer Contribution (6%)', voluntaryContrib: 'Voluntary Contribution (0–6%)', quickLookup: 'Quick Lookup', monthlySalary: 'Monthly Salary', yourGrade: 'Your Grade', monthlyEmployer: 'Monthly Employer Contribution', annualEmployer: 'Annual Employer Contribution', voluntaryNote: 'Voluntary Contribution Info' }} />
      <RelatedTools current="tw-labor-pension" locale="en" />
    </div>
    </>
  )
}

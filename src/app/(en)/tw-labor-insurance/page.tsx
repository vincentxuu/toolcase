import { Metadata } from 'next'
import TwLaborInsurance from '@/components/tools/TwLaborInsurance'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan Labor Insurance Premium Table - Salary Grades & Rates | toolcase',
  description: 'Taiwan labor insurance premium table with salary grades, employee self-pay amounts, and employer contributions. Includes rate breakdown for 2024.',
  alternates: { canonical: 'https://toolcase.cc/tw-labor-insurance', languages: { en: 'https://toolcase.cc/tw-labor-insurance', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-labor-insurance' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan Labor Insurance Premium Table', url: 'https://toolcase.cc/tw-labor-insurance' },
        ]}
      />
      <ToolSchema
        name="Taiwan Labor Insurance Premium Table"
        description="Taiwan labor insurance premium table with salary grades, employee self-pay amounts, and employer contributions. Includes rate breakdown for 2024."
        url="https://toolcase.cc/tw-labor-insurance"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan Labor Insurance Premium Table' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Labor Insurance</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan labor insurance premium table for 2024 (ROC year 113). Look up your insurance grade and monthly premium by salary.</p>
      <TwLaborInsurance labels={{ title: 'Labor Insurance Premium Table', desc: 'Year 2024 (ROC 113)', grade: 'Grade', insuredSalary: 'Insured Salary', employeePremium: 'Employee Self-Pay', employerPremium: 'Employer Contribution', quickLookup: 'Quick Lookup', monthlySalary: 'Monthly Salary', yourGrade: 'Your Grade', monthlyPremium: 'Monthly Self-Pay', annualPremium: 'Annual Self-Pay', rateInfo: 'Rate Information', rateBreakdown: 'Rate Breakdown', item: 'Item', rate: 'Rate' }} />
      <RelatedTools current="tw-labor-insurance" locale="en" />
    </div>
    </>
  )
}

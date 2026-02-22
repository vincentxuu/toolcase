import { Metadata } from 'next'
import TwNhiPremium from '@/components/tools/TwNhiPremium'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan NHI Premium Table - National Health Insurance Rates | toolcase',
  description: 'Taiwan National Health Insurance (NHI) premium table with salary grades, employee self-pay amounts, and employer contributions for 2024.',
  alternates: { canonical: 'https://toolcase.cc/tw-nhi-premium', languages: { en: 'https://toolcase.cc/tw-nhi-premium', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-nhi-premium' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan NHI Premium Table', url: 'https://toolcase.cc/tw-nhi-premium' },
        ]}
      />
      <ToolSchema
        name="Taiwan NHI Premium Table"
        description="Taiwan National Health Insurance (NHI) premium table with salary grades, employee self-pay amounts, and employer contributions for 2024."
        url="https://toolcase.cc/tw-nhi-premium"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan NHI Premium Table' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan NHI Premium</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan National Health Insurance premium table for 2024 (ROC year 113). Look up your NHI grade and monthly premium by salary.</p>
      <TwNhiPremium labels={{ title: 'NHI Premium Table', desc: 'Year 2024 (ROC 113)', grade: 'Grade', insuredSalary: 'Insured Amount', employeePremium: 'Employee Self-Pay', employerPremium: 'Employer Contribution', quickLookup: 'Quick Lookup', monthlySalary: 'Monthly Salary', yourGrade: 'Your Grade', monthlyPremium: 'Monthly Self-Pay', annualPremium: 'Annual Self-Pay', rateInfo: 'Rate Information' }} />
      <RelatedTools current="tw-nhi-premium" locale="en" />
    </div>
    </>
  )
}

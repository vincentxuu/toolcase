import { Metadata } from 'next'
import TwSalaryWithholdingTax from '@/components/tools/TwSalaryWithholdingTax'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Taiwan Salary Withholding Tax Table - Monthly Withholding Amounts | toolcase',
  description: 'Taiwan salary withholding tax table for residents and non-residents. Look up monthly withholding amounts by salary range for tax year 2025.',
  alternates: { canonical: 'https://toolcase.cc/tw-salary-withholding-tax', languages: { en: 'https://toolcase.cc/tw-salary-withholding-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-salary-withholding-tax' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Salary Withholding Tax</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan salary withholding tax table for tax year 2025 (ROC year 114). Look up monthly withholding amounts for residents and non-residents.</p>
      <TwSalaryWithholdingTax labels={{ title: 'Salary Withholding Tax Table', desc: 'Tax Year 2025 (ROC 114)', residentTab: 'Resident', nonResidentTab: 'Non-Resident', monthlySalary: 'Monthly Salary', monthlyWithholding: 'Monthly Withholding', annualEstimate: 'Annual Estimated Withholding', salaryRange: 'Salary Range', withholdingAmount: 'Withholding Amount', note: 'Note', incomeType: 'Income Type', rate: 'Rate' }} />
      <RelatedTools current="tw-salary-withholding-tax" locale="en" />
    </div>
  )
}

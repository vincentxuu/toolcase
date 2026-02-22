import { Metadata } from 'next'
import TaxCalculator from '@/components/tools/TaxCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Tax Calculator - US Federal & Taiwan Income Tax | toolcase',
  description:
    'Estimate US federal income tax or Taiwan consolidated income tax with bracket breakdown. See taxable income, effective rate, and after-tax income.',
  alternates: {
    canonical: 'https://toolcase.cc/tax-calculator',
    languages: {
      en: 'https://toolcase.cc/tax-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tax-calculator',
    },
  },
}

const faqs = [
  {
    question: 'What is the effective tax rate?',
    answer:
      'The effective tax rate is the actual percentage of your total income paid in taxes. Because both the US and Taiwan use progressive tax systems, your effective rate is always lower than your highest marginal bracket.',
  },
  {
    question: 'What are the US standard deductions for 2024?',
    answer:
      'For tax year 2024, the US standard deduction is $14,600 for single filers and $29,200 for married filing jointly. Most taxpayers use the standard deduction rather than itemizing.',
  },
  {
    question: 'How does the Taiwan income tax system work?',
    answer:
      'Taiwan uses a consolidated income tax with 5 progressive brackets (5%, 12%, 20%, 30%, 40%). Deductions include personal exemptions (NT$97,000 per person, NT$145,500 for seniors 70+), standard or itemized deductions, and a salary income special deduction of NT$218,000 per earner.',
  },
  {
    question: 'Does this calculator include state or local taxes?',
    answer:
      'For the US, this calculator estimates federal income tax only. State taxes vary widely. For Taiwan, the consolidated income tax is a national tax — there is no separate local income tax.',
  },
]

export default function TaxCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Tax Calculator', url: 'https://toolcase.cc/tax-calculator' },
        ]}
      />
      <ToolSchema
        name="Tax Calculator"
        description="Estimate US federal income tax or Taiwan consolidated income tax with bracket breakdown. See taxable income, effective rate, and after-tax income."
        url="https://toolcase.cc/tax-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Tax Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Tax Calculator
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Estimate your income tax with a detailed bracket breakdown. Switch between US federal and Taiwan tax systems.
      </p>

      <TaxCalculator
        defaultTaxSystem="us"
        labels={{
          taxSystem: 'Tax System',
          us: 'US Federal',
          taiwan: 'Taiwan',
          grossIncome: 'Gross Annual Income',
          filingStatus: 'Filing Status',
          single: 'Single',
          married: 'Married Filing Jointly',
          deductions: 'Deductions',
          standardDeduction: 'Standard Deduction',
          itemized: 'Itemized',
          deductionAmount: 'Deduction Amount',
          calculate: 'Calculate',
          taxableIncome: 'Taxable Income',
          totalTax: 'Total Tax',
          effectiveRate: 'Effective Tax Rate',
          afterTax: 'After-Tax Income',
          bracketBreakdown: 'Tax Bracket Breakdown',
          bracket: 'Bracket',
          taxableAt: 'Taxable Amount',
          taxAmount: 'Tax',
          exemptions: 'Exemptions',
          generalExemptions: 'Exemptions (persons)',
          seniorExemptions: 'Senior (70+) Exemptions',
          salaryDeduction: 'Salary Income Deduction',
          salaryEarners: 'Salary Earners',
          deductionSummary: 'Deduction Summary',
          exemptionSubtotal: 'Exemption Subtotal',
          deductionSubtotal: 'Deduction Subtotal',
          specialDeductionSubtotal: 'Salary Special Deduction',
          netTaxableIncome: 'Net Taxable Income',
          person: ' persons',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select a tax system (US Federal or Taiwan), enter your gross annual income, and configure your filing status and deductions.
          For Taiwan, you can set the number of exemptions (including seniors 70+), choose between standard or itemized deductions,
          and specify the number of salary earners. The calculator instantly shows your net taxable income, total tax,
          effective tax rate, and after-tax income, along with a detailed breakdown by tax bracket.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="tax-calculator" locale="en" />
    </div>
    </>
  )
}

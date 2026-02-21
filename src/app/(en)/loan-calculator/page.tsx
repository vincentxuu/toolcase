import { Metadata } from 'next'
import LoanCalculator from '@/components/tools/LoanCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Loan Calculator - Free Online Tool | toolcase',
  description:
    'Calculate monthly loan payments, total interest, and view payment breakdown charts. Works for auto loans, personal loans, and student loans.',
  alternates: {
    canonical: 'https://toolcase.cc/loan-calculator',
    languages: {
      en: 'https://toolcase.cc/loan-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/loan-calculator',
    },
  },
}

const faqs = [
  {
    question: 'What types of loans does this calculator support?',
    answer:
      'This calculator works for any fixed-rate installment loan, including auto loans, personal loans, student loans, and other fixed-term borrowing.',
  },
  {
    question: 'How can I reduce the total interest paid?',
    answer:
      'You can reduce total interest by making a larger down payment, choosing a shorter loan term, securing a lower interest rate, or making extra payments toward the principal.',
  },
  {
    question: 'What is the difference between APR and interest rate?',
    answer:
      'The interest rate is the cost of borrowing the principal. APR (Annual Percentage Rate) includes the interest rate plus other fees and charges, giving a more complete picture of the total borrowing cost.',
  },
]

export default function LoanCalculatorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Loan Calculator
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Calculate monthly payments and total interest for auto loans, personal loans, and student loans.
      </p>

      <LoanCalculator />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter the loan amount, annual interest rate, and loan term in years. The calculator instantly shows your monthly
          payment, total amount paid over the loan term, and the total interest cost. The payment breakdown chart shows
          how each year&apos;s payment is split between principal and interest.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="loan-calculator" locale="en" />
    </div>
  )
}

import { Metadata } from 'next'
import MenstrualCycleCalculator from '@/components/tools/MenstrualCycleCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Menstrual Cycle Calculator - Track Period, Ovulation & Fertility | toolcase',
  description: 'Calculate your next period, ovulation day, fertility window, and current cycle phase. Free menstrual cycle calculator with date predictions.',
  alternates: { canonical: 'https://toolcase.cc/health/menstrual-cycle-calculator', languages: { en: 'https://toolcase.cc/health/menstrual-cycle-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/health/menstrual-cycle-calculator' } },
}

const faqs = [
  { question: 'How accurate is the menstrual cycle calculator?', answer: 'The calculator provides estimates based on average cycle data and standard formulas. Individual cycles can vary significantly, so results should be used as a guide, not absolute predictions. For medical advice, always consult a healthcare provider.' },
  { question: 'What is the typical cycle length?', answer: 'The average menstrual cycle length is 28 days, but normal cycles can range from 21 to 35 days. The calculator uses your custom cycle length for more personalized predictions.' },
  { question: 'How is ovulation calculated?', answer: 'Ovulation typically occurs 14 days before the next period. The calculator uses this standard formula: next period date minus 14 days. The fertile window is 5 days before ovulation plus ovulation day.' },
  { question: 'Can I use this to plan or prevent pregnancy?', answer: 'This calculator provides educational estimates only and should NOT be used as a sole method for family planning or contraception. Always consult healthcare professionals for pregnancy planning or birth control.' },
]

export default function MenstrualCycleCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Menstrual Cycle Calculator', url: 'https://toolcase.cc/health/menstrual-cycle-calculator' },
        ]}
      />
      <ToolSchema
        name="Menstrual Cycle Calculator"
        description="Calculate your next period, ovulation day, fertility window, and current cycle phase. Free menstrual cycle calculator with date predictions."
        url="https://toolcase.cc/health/menstrual-cycle-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Menstrual Cycle Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Menstrual Cycle Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Track your menstrual cycle, predict next period, ovulation day, and fertility window.</p>
      <MenstrualCycleCalculator
        labels={{
          title: 'Menstrual Cycle Calculator',
          lastPeriodDate: 'Last Period Start Date',
          cycleLength: 'Average Cycle Length',
          periodLength: 'Average Period Length',
          calculate: 'Calculate',
          clear: 'Clear',
          days: 'days',
          results: 'Results',
          nextPeriod: 'Next Period',
          ovulation: 'Ovulation Day',
          fertilityWindow: 'Fertility Window',
          dueDate: 'Estimated Due Date (if pregnant)',
          currentPhase: 'Current Phase',
          phaseFollicular: 'Follicular Phase',
          phaseOvulation: 'Ovulation',
          phaseLuteal: 'Luteal Phase',
          phaseMenstruation: 'Menstruation',
          note: 'Note',
          noteText: 'This calculator provides estimates based on average cycle data. Actual cycles may vary. Consult a healthcare provider for medical advice.',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter the start date of your last period and your average cycle and period lengths. Click &quot;Calculate&quot; to see predictions for your next period, ovulation day, fertility window, current cycle phase, and estimated due date if pregnant. The calculator uses standard formulas: ovulation is typically 14 days before the next period, and the fertile window is 5 days before ovulation plus ovulation day.
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="menstrual-cycle-calculator" locale="en" />
    </div>
    </>
  )
}

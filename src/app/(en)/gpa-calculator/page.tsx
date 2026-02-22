import { Metadata } from 'next'
import GpaCalculator from '@/components/tools/GpaCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'GPA Calculator - Free Online Tool | toolcase',
  description: 'Calculate your cumulative GPA instantly. Add courses with grades and credits to see your grade point average.',
  alternates: { canonical: 'https://toolcase.cc/gpa-calculator', languages: { en: 'https://toolcase.cc/gpa-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/gpa-calculator' } },
}

const faqs = [
  { question: 'How is GPA calculated?', answer: 'GPA is calculated by multiplying each course\'s credit hours by its grade points, summing those values, and dividing by total credit hours. For example, a 3-credit A (4.0) and a 4-credit B+ (3.3) gives (3×4.0 + 4×3.3) / (3+4) = 3.6 GPA.' },
  { question: 'What is the difference between A+ and A?', answer: 'On the standard 4.0 scale used by most universities, both A+ and A are worth 4.0 grade points. Some institutions may use a 4.3 scale where A+ equals 4.3, but the 4.0 cap is more common.' },
  { question: 'Can I include pass/fail courses?', answer: 'Pass/fail courses typically do not factor into GPA calculations because they carry no grade points. Only courses with letter grades (A through F) should be included when calculating GPA.' },
]

export default function GpaCalculatorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>GPA Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Calculate your cumulative grade point average from your courses and credits.</p>
      <GpaCalculator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Add your courses by entering the course name, selecting the number of credit hours (1-6), and choosing the letter grade you received. The calculator will instantly compute your cumulative GPA and total credits. Use the Add Course button to add more courses, or remove courses you no longer need.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="gpa-calculator" locale="en" />
    </div>
  )
}

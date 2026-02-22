import { Metadata } from 'next'
import ChmodCalculator from '@/components/tools/ChmodCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Chmod Calculator - Unix File Permissions | toolcase',
  description: 'Calculate Unix file permissions with an interactive chmod calculator. Toggle read, write, and execute for owner, group, and others to get numeric and symbolic notation.',
  alternates: { canonical: 'https://toolcase.cc/chmod-calculator', languages: { en: 'https://toolcase.cc/chmod-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/chmod-calculator' } },
}

const faqs = [
  { question: 'What does chmod 755 mean?', answer: 'chmod 755 gives the owner full permissions (read, write, execute = 7), while group and others get read and execute (5). This is the typical permission for web directories and scripts.' },
  { question: 'What is the difference between numeric and symbolic notation?', answer: 'Numeric notation uses three digits (e.g., 644), where each digit represents permissions for owner, group, and others. Symbolic notation uses letters like rwxr--r-- to show the same information.' },
]

export default function ChmodCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Chmod Calculator', url: 'https://toolcase.cc/chmod-calculator' },
        ]}
      />
      <ToolSchema
        name="Chmod Calculator"
        description="Calculate Unix file permissions with an interactive chmod calculator. Toggle read, write, and execute for owner, group, and others to get numeric and symbolic notation."
        url="https://toolcase.cc/chmod-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Chmod Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Chmod Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Calculate Unix file permissions interactively. Get numeric and symbolic chmod notation instantly.</p>
      <ChmodCalculator />
      <FaqSection items={faqs} />
      <RelatedTools current="chmod-calculator" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import MultiplicationTable from '@/components/tools/MultiplicationTable'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Multiplication Table - Interactive Times Table | toolcase',
  description: 'Interactive multiplication table up to 19×19. Click any cell to copy the equation. Great for students and teachers.',
  alternates: { canonical: 'https://toolcase.cc/multiplication-table', languages: { en: 'https://toolcase.cc/multiplication-table', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/multiplication-table' } },
}

const faqs = [
  { question: 'What range does the multiplication table cover?', answer: 'The default range is 1×1 to 9×9. You can expand it to 12×12, 15×15, or 19×19 using the range selector.' },
  { question: 'How do I copy an equation?', answer: 'Click any cell in the table to copy the equation (e.g., "3 × 7 = 21") to your clipboard.' },
]

export default function MultiplicationTablePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Multiplication Table', url: 'https://toolcase.cc/multiplication-table' },
        ]}
      />
      <ToolSchema
        name="Multiplication Table"
        description="Interactive multiplication table up to 19×19. Click any cell to copy the equation. Great for students and teachers."
        url="https://toolcase.cc/multiplication-table"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Multiplication Table' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Multiplication Table</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Interactive times table. Click any cell to copy the equation. Supports up to 19×19.</p>
      <MultiplicationTable labels={{ range: 'Range', highlight: 'Click any cell to copy the equation', clickToCopy: 'Click to copy', copied: 'Copied!' }} />
      <FaqSection items={faqs} title="FAQ" />
      <RelatedTools current="multiplication-table" locale="en" />
    </div>
    </>
  )
}

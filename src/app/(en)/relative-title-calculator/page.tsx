import { Metadata } from 'next'
import RelativeTitleCalculator from '@/components/tools/RelativeTitleCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Relative Title Calculator - Taiwan Family Relationships | toolcase',
  description: 'Calculate Taiwan family relationship titles. Learn how to address relatives in Chinese family structure with this interactive tool.',
  alternates: { canonical: 'https://toolcase.cc/relative-title-calculator', languages: { en: 'https://toolcase.cc/relative-title-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/relative-title-calculator' } },
}

const faqs = [
  { question: 'How do I use this calculator?', answer: 'Select relationships step by step from you to the target person. For example, to find your father\'s father, select "Father" twice. The tool will show you the correct Chinese title for that relationship.' },
  { question: 'Why are there different titles for similar relationships?', answer: 'Chinese family structure distinguishes between paternal and maternal sides, and uses different titles based on age hierarchy and marriage connections. This reflects the importance of family structure in Chinese culture.' },
  { question: 'Can I use this for learning Chinese?', answer: 'Absolutely! This tool is great for learning family relationship vocabulary in Chinese, especially if you\'re preparing to meet a Chinese-speaking family or studying Chinese culture.' },
]

export default function RelativeTitleCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Relative Title Calculator', url: 'https://toolcase.cc/relative-title-calculator' },
        ]}
      />
      <ToolSchema
        name="Relative Title Calculator"
        description="Calculate Taiwan family relationship titles. Learn how to address relatives in Chinese family structure with this interactive tool."
        url="https://toolcase.cc/relative-title-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Relative Title Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Relative Title Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Calculate Taiwan family relationship titles and learn how to address relatives in Chinese.</p>
      <RelativeTitleCalculator
        labels={{
          title: 'Relative Title Calculator',
          selectRelation: 'Select Relationship',
          addRelation: 'Add',
          clear: 'Clear',
          result: 'Relationship',
          you: 'You',
          relation: 'Relation',
          noRelation: 'Unknown relation',
          father: 'Father',
          mother: 'Mother',
          son: 'Son',
          daughter: 'Daughter',
          elderBrother: 'Elder Brother',
          youngerBrother: 'Younger Brother',
          elderSister: 'Elder Sister',
          youngerSister: 'Younger Sister',
          husband: 'Husband',
          wife: 'Wife',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Build the family tree by selecting relationships one by one. Start from yourself and add each relationship step. For example: Father → Father = Grandfather (爺爺), Mother → Brother = Uncle (舅舅).</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="relative-title-calculator" locale="en" />
    </div>
    </>
  )
}

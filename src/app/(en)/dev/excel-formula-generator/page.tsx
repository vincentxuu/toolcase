import { Metadata } from 'next'
import ExcelFormulaGenerator from '@/components/tools/ExcelFormulaGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Excel Formula Generator - Common Formulas with Examples | toolcase',
  description: 'Browse and copy common Excel formulas with syntax and examples. Includes math, statistical, logical, text, date, lookup, and financial functions. Free reference tool.',
  alternates: { canonical: 'https://toolcase.cc/dev/excel-formula-generator', languages: { en: 'https://toolcase.cc/dev/excel-formula-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/excel-formula-generator' } },
}

const faqs = [
  { question: 'How do I use these formulas in Excel?', answer: 'Click the "Copy" button next to any formula to copy it to your clipboard. Then paste it into your Excel cell. Replace the example cell references (like A1, B1) with your actual cell references.' },
  { question: 'What formula categories are available?', answer: 'The tool includes Math & Trig, Statistical, Logical, Text, Date & Time, Lookup & Reference, and Financial formulas. Use the category dropdown to filter, or search by formula name or description.' },
  { question: 'Can I modify the formulas?', answer: 'Yes! The syntax shown is a template. After copying, replace the generic parameters with your specific cell references, values, or conditions. The examples show you how to structure the formula correctly.' },
  { question: 'What does the syntax mean?', answer: 'The syntax shows the formula structure. Required parameters are shown without brackets, while optional parameters are in [brackets]. For example, =SUM(number1, [number2]) means number1 is required but number2 is optional.' },
]

export default function ExcelFormulaGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Excel Formula Generator', url: 'https://toolcase.cc/dev/excel-formula-generator' },
        ]}
      />
      <ToolSchema
        name="Excel Formula Generator"
        description="Browse and copy common Excel formulas with syntax and examples. Includes math, statistical, logical, text, date, lookup, and financial functions. Free reference tool."
        url="https://toolcase.cc/dev/excel-formula-generator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Excel Formula Generator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Excel Formula Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Browse common Excel formulas with syntax, descriptions, and examples. Copy and use in your spreadsheets.</p>
      <ExcelFormulaGenerator
        labels={{
          title: 'Excel Formula Generator',
          category: 'Category',
          allCategories: 'All Categories',
          math: 'Math & Trig',
          statistical: 'Statistical',
          logical: 'Logical',
          text: 'Text',
          dateTime: 'Date & Time',
          lookup: 'Lookup & Reference',
          financial: 'Financial',
          searchPlaceholder: 'Search formulas...',
          formulaName: 'Formula',
          syntax: 'Syntax',
          description: 'Description',
          example: 'Example',
          copy: 'Copy',
          copied: 'Copied!',
          noResults: 'No formulas found',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
          Browse formulas by category or search for specific functions. Each formula card shows the syntax (how to structure it), a description of what it does, and a practical example. Click &quot;Copy&quot; to copy the formula syntax to your clipboard.
        </p>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          After copying, paste the formula into your Excel cell and replace the generic references (A1, B1, etc.) with your actual cell references. The examples show you how to use the formula with real data.
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="excel-formula-generator" locale="en" />
    </div>
    </>
  )
}

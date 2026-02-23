import { Metadata } from 'next'
import MathFormulaEditor from '@/components/tools/MathFormulaEditor'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Math Formula Editor - Create & Render Mathematical Formulas | toolcase',
  description: 'Create and render beautiful mathematical formulas with KaTeX. Support for LaTeX syntax, fractions, integrals, matrices, Greek letters and more.',
  alternates: { canonical: 'https://toolcase.cc/math-formula-editor', languages: { en: 'https://toolcase.cc/math-formula-editor', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/math-formula-editor' } },
}

const faqs = [
  { question: 'What is KaTeX?', answer: 'KaTeX is a fast, easy-to-use JavaScript library for TeX math rendering on the web. It supports a wide range of LaTeX mathematical notation and renders formulas quickly and beautifully in web browsers.' },
  { question: 'What LaTeX syntax is supported?', answer: 'The editor supports most common LaTeX math commands including fractions (\\frac), square roots (\\sqrt), integrals (\\int), summations (\\sum), matrices (\\begin{matrix}), Greek letters (\\alpha, \\beta), subscripts/superscripts, and many more mathematical symbols and operators.' },
  { question: 'What is the difference between inline and display mode?', answer: 'Inline mode renders formulas in a compact style suitable for embedding within text, while display mode renders formulas centered and in a larger, more prominent style suitable for standalone equations.' },
  { question: 'Can I copy the LaTeX code?', answer: 'Yes! Click the "Copy LaTeX" button to copy the LaTeX source code to your clipboard. You can then paste it into other applications that support LaTeX math notation.' },
]

export default function MathFormulaEditorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Math Formula Editor', url: 'https://toolcase.cc/math-formula-editor' },
        ]}
      />
      <ToolSchema
        name="Math Formula Editor"
        description="Create and render beautiful mathematical formulas with KaTeX. Support for LaTeX syntax, fractions, integrals, matrices, Greek letters and more."
        url="https://toolcase.cc/math-formula-editor"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Math Formula Editor' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Math Formula Editor</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Create and render mathematical formulas using LaTeX syntax with KaTeX.</p>
      <MathFormulaEditor
        labels={{
          title: 'Math Formula Editor',
          input: 'LaTeX Input',
          inputPlaceholder: 'Enter LaTeX formula (e.g., x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a})',
          mode: 'Display Mode',
          inline: 'Inline',
          display: 'Display',
          output: 'Rendered Output',
          examples: 'Examples',
          exampleFraction: 'Fraction',
          exampleSqrt: 'Square Root',
          exampleSum: 'Summation',
          exampleIntegral: 'Integral',
          exampleMatrix: 'Matrix',
          exampleGreek: 'Greek Letters',
          copyLatex: 'Copy LaTeX',
          clear: 'Clear',
          error: 'Error',
          note: 'Note',
          noteText: 'This editor uses KaTeX to render mathematical formulas. Enter LaTeX syntax in the input field.',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter LaTeX mathematical notation in the input field and see the rendered formula instantly. Choose between inline mode (compact, for embedding in text) or display mode (centered, larger). Click on example formulas to insert them quickly. Use standard LaTeX commands like \frac for fractions, \sqrt for square roots, \int for integrals, and Greek letter commands like \alpha, \beta, \gamma.
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="math-formula-editor" locale="en" />
    </div>
    </>
  )
}

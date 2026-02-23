import { Metadata } from 'next'
import LatexEditor from '@/components/tools/LatexEditor'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'LaTeX Editor - Write & Preview Mathematical Expressions | toolcase',
  description: 'Online LaTeX editor with live preview. Write LaTeX code and see rendered mathematical formulas in real-time. Quick symbols and formula templates included.',
  alternates: { canonical: 'https://toolcase.cc/latex-editor', languages: { en: 'https://toolcase.cc/latex-editor', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/latex-editor' } },
}

const faqs = [
  { question: 'What is LaTeX?', answer: 'LaTeX is a document preparation system and markup language widely used for technical and scientific documents. It excels at typesetting mathematical formulas and equations with professional quality.' },
  { question: 'How do I insert symbols quickly?', answer: 'Use the Quick Symbols section below the editor. Click any symbol button to insert it at your cursor position in the editor. Common symbols include Greek letters (α, β, γ), operators (±, ×, ÷), and mathematical symbols (∑, ∫, √).' },
  { question: 'Can I use formula templates?', answer: 'Yes! The editor provides common formula templates like the quadratic formula, Pythagorean theorem, Euler\'s identity, limits, derivatives, and Taylor series. Click any template to replace the editor content with that formula.' },
  { question: 'What is the difference between inline and display mode?', answer: 'Inline mode renders formulas compactly for embedding within text lines. Display mode renders formulas centered and larger, suitable for standalone equations. Choose the mode that fits your use case.' },
]

export default function LatexEditorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'LaTeX Editor', url: 'https://toolcase.cc/latex-editor' },
        ]}
      />
      <ToolSchema
        name="LaTeX Editor"
        description="Online LaTeX editor with live preview. Write LaTeX code and see rendered mathematical formulas in real-time. Quick symbols and formula templates included."
        url="https://toolcase.cc/latex-editor"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'LaTeX Editor' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>LaTeX Editor</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Write LaTeX code and preview rendered mathematical formulas in real-time.</p>
      <LatexEditor
        labels={{
          title: 'LaTeX Editor',
          editor: 'LaTeX Editor',
          editorPlaceholder: 'Enter your LaTeX code here...',
          preview: 'Live Preview',
          mode: 'Display Mode',
          inline: 'Inline',
          display: 'Display',
          copyLatex: 'Copy LaTeX',
          clear: 'Clear',
          insertSymbol: 'Insert Symbol',
          symbols: 'Quick Symbols',
          templates: 'Formula Templates',
          templateQuadratic: 'Quadratic Formula',
          templatePythagorean: 'Pythagorean Theorem',
          templateEuler: "Euler's Identity",
          templateLimit: 'Limit',
          templateDerivative: 'Derivative',
          templateSeries: 'Taylor Series',
          error: 'Error',
          note: 'Note',
          noteText: 'Write LaTeX code in the editor and see the rendered mathematical formulas in real-time. Use templates and symbols for quick insertion.',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Type LaTeX code in the left editor panel and see the rendered output in the right preview panel in real-time. Click quick symbol buttons to insert mathematical symbols at your cursor position. Use formula templates for common equations like the quadratic formula or Pythagorean theorem. Choose between inline and display modes for different rendering styles. Click &quot;Copy LaTeX&quot; to copy your code for use in other applications.
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="latex-editor" locale="en" />
    </div>
    </>
  )
}

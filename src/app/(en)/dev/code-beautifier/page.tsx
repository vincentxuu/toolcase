import { Metadata } from 'next'
import CodeBeautifier from '@/components/tools/CodeBeautifier'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'HTML/CSS/JS Beautifier - Free Online Tool | toolcase',
  description:
    'Beautify and format HTML, CSS, and JavaScript code instantly. Add proper indentation and formatting to minified or ugly code.',
  alternates: {
    canonical: 'https://toolcase.cc/dev/code-beautifier',
    languages: {
      en: 'https://toolcase.cc/dev/code-beautifier',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/code-beautifier',
    },
  },
}

const faqs = [
  {
    question: 'What does a code beautifier do?',
    answer:
      'A code beautifier takes minified or poorly formatted code and reformats it with proper indentation, line breaks, and spacing. This makes the code much easier to read, understand, and debug.',
  },
  {
    question: 'Does beautifying change how my code works?',
    answer:
      'No. Beautifying only changes the formatting (whitespace and indentation). The actual functionality of your code remains exactly the same.',
  },
  {
    question: 'Is my code safe?',
    answer:
      'All processing happens directly in your browser. Your code never leaves your device — nothing is sent to any server.',
  },
]

export default function CodeBeautifierPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'HTML/CSS/JS Beautifier', url: 'https://toolcase.cc/dev/code-beautifier' },
        ]}
      />
      <ToolSchema
        name="HTML/CSS/JS Beautifier"
        description="Beautify and format HTML, CSS, and JavaScript code instantly. Add proper indentation and formatting to minified or ugly code."
        url="https://toolcase.cc/dev/code-beautifier"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'HTML/CSS/JS Beautifier' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>HTML / CSS / JS Beautifier</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Paste your minified or ugly code below to beautify it with proper indentation and formatting.
      </p>

      <CodeBeautifier />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select the language tab (HTML, CSS, or JavaScript), paste your minified or messy code into the left panel,
          and click &quot;Beautify&quot;. The tool will reformat your code with proper indentation and line breaks.
          You can choose between 2 or 4 spaces for indentation using the dropdown menu.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="code-beautifier" locale="en" />
    </div>
    </>
  )
}

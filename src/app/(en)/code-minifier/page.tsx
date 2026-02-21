import { Metadata } from 'next'
import CodeMinifier from '@/components/tools/CodeMinifier'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'HTML/CSS/JS Minifier - Free Online Tool | toolcase',
  description:
    'Minify HTML, CSS, and JavaScript code instantly. Remove comments, whitespace, and unnecessary characters to reduce file size.',
  alternates: {
    canonical: 'https://toolcase.cc/code-minifier',
    languages: {
      en: 'https://toolcase.cc/code-minifier',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/code-minifier',
    },
  },
}

const faqs = [
  {
    question: 'What does minification do?',
    answer:
      'Minification removes unnecessary characters from code — such as whitespace, newlines, and comments — without changing its functionality. This reduces file size, leading to faster download times and improved website performance.',
  },
  {
    question: 'Does minification break my code?',
    answer:
      'Basic minification (removing whitespace and comments) is generally safe. However, advanced JavaScript minification with variable renaming is not performed by this tool. The minification here focuses on safe whitespace and comment removal.',
  },
  {
    question: 'Is my code safe?',
    answer:
      'All processing happens directly in your browser. Your code never leaves your device — nothing is sent to any server.',
  },
]

export default function CodeMinifierPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>HTML / CSS / JS Minifier</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Paste your HTML, CSS, or JavaScript code below to minify it instantly and reduce file size.
      </p>

      <CodeMinifier />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select the language tab (HTML, CSS, or JavaScript), paste your code into the left panel, and click
          &quot;Minify&quot;. The tool will remove comments, extra whitespace, and unnecessary characters. The
          minified output appears in the right panel along with a size comparison showing how much space was saved.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="code-minifier" locale="en" />
    </div>
  )
}

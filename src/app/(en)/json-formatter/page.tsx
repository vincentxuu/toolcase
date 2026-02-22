import { Metadata } from 'next'
import JsonFormatter from '@/components/tools/JsonFormatter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator - Free Online Tool | toolcase',
  description:
    'Format, validate, and beautify JSON data instantly. Free online JSON formatter with syntax highlighting and error detection.',
  alternates: {
    canonical: 'https://toolcase.cc/json-formatter',
    languages: {
      en: 'https://toolcase.cc/json-formatter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/json-formatter',
    },
  },
}

const faqs = [
  {
    question: 'What is JSON?',
    answer:
      'JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate. It is based on a subset of JavaScript and is commonly used for transmitting data between a server and web application.',
  },
  {
    question: 'How to validate JSON?',
    answer:
      'Paste your JSON into the editor above and click "Format". If the JSON is valid, it will be formatted with proper indentation. If there are errors, the tool will display a detailed error message showing exactly where the issue is.',
  },
  {
    question: 'What is the difference between JSON format and minify?',
    answer:
      'Formatting (beautifying) adds whitespace and indentation to make JSON readable. Minifying removes all unnecessary whitespace to reduce the file size, which is useful for production environments and API responses.',
  },
  {
    question: 'Is my data safe?',
    answer:
      'All processing happens directly in your browser. Your JSON data never leaves your device — nothing is sent to any server.',
  },
  {
    question: 'What JSON features does this tool support?',
    answer:
      'This tool supports all valid JSON including objects, arrays, strings, numbers, booleans, and null values. It also detects and reports syntax errors like missing commas, unmatched brackets, and invalid values.',
  },
]

export default function JsonFormatterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'JSON Formatter & Validator', url: 'https://toolcase.cc/json-formatter' },
        ]}
      />
      <ToolSchema
        name="JSON Formatter & Validator"
        description="Format, validate, and beautify JSON data instantly. Free online JSON formatter with syntax highlighting and error detection."
        url="https://toolcase.cc/json-formatter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'JSON Formatter & Validator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>JSON Formatter & Validator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Paste your JSON below to format, validate, and beautify it instantly.
      </p>

      <JsonFormatter />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Format JSON Online</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Simply paste your JSON data into the left editor panel and click the &quot;Format&quot; button. The tool will
          instantly parse and format your JSON with proper indentation. You can choose between 2, 4, or 8-space
          indentation. If your JSON contains errors, the tool will highlight exactly where the problem is. You can also
          use the &quot;Minify&quot; button to compress your JSON by removing all whitespace.
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>What is JSON?</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          JSON (JavaScript Object Notation) is a lightweight data-interchange format that has become the de facto
          standard for data exchange on the web. Originally derived from JavaScript, JSON is now language-independent
          and supported by virtually every programming language. It uses human-readable text to represent data objects
          consisting of key-value pairs and arrays. JSON is widely used in REST APIs, configuration files, and data
          storage due to its simplicity and flexibility.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="json-formatter" locale="en" />
    </div>
    </>
  )
}

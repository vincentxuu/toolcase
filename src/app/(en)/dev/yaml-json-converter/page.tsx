import { Metadata } from 'next'
import YamlJsonConverter from '@/components/tools/YamlJsonConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'YAML ↔ JSON Converter - Free Online Tool | toolcase',
  description:
    'Convert between YAML and JSON formats instantly. Validate syntax, preserve structure, and switch between formats with a single click.',
  alternates: {
    canonical: 'https://toolcase.cc/dev/yaml-json-converter',
    languages: {
      en: 'https://toolcase.cc/dev/yaml-json-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/yaml-json-converter',
    },
  },
}

const faqs = [
  {
    question: 'What is the difference between YAML and JSON?',
    answer:
      'Both are data serialisation formats. JSON uses braces and brackets with strict syntax, making it ideal for APIs and data exchange. YAML uses indentation instead of braces, making it more human-readable and popular for configuration files like Docker Compose, Kubernetes manifests, and CI/CD pipelines.',
  },
  {
    question: 'Will the conversion preserve my data structure?',
    answer:
      'Yes. The converter maintains the full data structure including nested objects, arrays, strings, numbers, booleans, and null values. Comments in YAML are not carried over to JSON since JSON does not support comments.',
  },
  {
    question: 'Can I validate my YAML or JSON before converting?',
    answer:
      'The tool validates your input automatically. If there is a syntax error in your YAML or JSON, it will display a clear error message indicating what went wrong and where, so you can fix the issue before converting.',
  },
]

export default function YamlJsonConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'YAML ↔ JSON Converter', url: 'https://toolcase.cc/dev/yaml-json-converter' },
        ]}
      />
      <ToolSchema
        name="YAML ↔ JSON Converter"
        description="Convert between YAML and JSON formats instantly. Validate syntax, preserve structure, and switch between formats with a single click."
        url="https://toolcase.cc/dev/yaml-json-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'YAML ↔ JSON Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>YAML ↔ JSON Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Convert between YAML and JSON formats with instant validation and formatting.
      </p>

      <YamlJsonConverter />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Choose the conversion direction — YAML to JSON or JSON to YAML — then paste your data into the input panel.
          The tool will validate and convert your data instantly, displaying the result in the output panel. If there
          are syntax errors, a detailed error message will appear so you can correct the issue. Click &quot;Copy&quot;
          to copy the converted output or &quot;Download&quot; to save it as a file. All processing happens locally in
          your browser.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="yaml-json-converter" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import InvoiceGenerator from '@/components/tools/InvoiceGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Invoice Generator - Free Online Tool | toolcase',
  description:
    'Create professional invoices online for free. Add company details, line items with automatic calculations, tax rates, and print directly from your browser.',
  alternates: {
    canonical: 'https://toolcase.cc/invoice-generator',
    languages: {
      en: 'https://toolcase.cc/invoice-generator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/invoice-generator',
    },
  },
}

const faqs = [
  {
    question: 'Can I save the invoice as a PDF?',
    answer:
      'Click the "Print Invoice" button and choose "Save as PDF" in your browser\'s print dialogue. This is the most reliable way to generate a PDF from any browser without needing additional software.',
  },
  {
    question: 'Does this tool calculate taxes automatically?',
    answer:
      'Yes. Enter the tax rate as a percentage in the Tax Rate field. The tool automatically calculates the tax amount based on the subtotal and adds it to produce the final total.',
  },
  {
    question: 'Is my invoice data stored anywhere?',
    answer:
      'No. All data stays in your browser and is never sent to any server. If you close or refresh the page, the data will be lost. Make sure to print or save your invoice as PDF before leaving the page.',
  },
]

export default function InvoiceGeneratorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Invoice Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Create professional invoices with automatic calculations — print or save as PDF.
      </p>

      <InvoiceGenerator />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Fill in your company name, client name, invoice number, dates, and tax rate. Add line items
          with descriptions, quantities, and unit prices — amounts are calculated automatically. The
          invoice preview updates in real time. Click &quot;Print Invoice&quot; to print or save as PDF
          using your browser&apos;s print dialogue.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="invoice-generator" locale="en" />
    </div>
  )
}

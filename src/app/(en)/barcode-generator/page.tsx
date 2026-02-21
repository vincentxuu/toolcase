import { Metadata } from 'next'
import BarcodeGenerator from '@/components/tools/BarcodeGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Barcode Generator - Free Online Tool | toolcase',
  description:
    'Generate Code 128 barcodes online for free. Enter text or numbers, customise bar width and height, preview and download as PNG. No uploads needed.',
  alternates: {
    canonical: 'https://toolcase.cc/barcode-generator',
    languages: {
      en: 'https://toolcase.cc/barcode-generator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/barcode-generator',
    },
  },
}

const faqs = [
  {
    question: 'What barcode format does this tool generate?',
    answer:
      'This tool generates Code 128 (subset B) barcodes, which is one of the most widely used barcode formats. It supports all standard ASCII characters including letters, numbers, and common symbols.',
  },
  {
    question: 'Can I scan the generated barcodes?',
    answer:
      'Yes. The generated barcodes follow the Code 128 standard and can be scanned by any standard barcode scanner or smartphone barcode-reading app. Make sure the bar width is at least 2px for reliable scanning.',
  },
  {
    question: 'What is the maximum length of text I can encode?',
    answer:
      'Code 128 can technically encode any length of text, but very long strings produce very wide barcodes that may be difficult to print or scan. For best results, keep your input under 40 characters.',
  },
]

export default function BarcodeGeneratorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Barcode Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Generate Code 128 barcodes from text or numbers — download as PNG.
      </p>

      <BarcodeGenerator />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter the text or number you want to encode in the input field. Adjust the bar width and barcode
          height as needed. Click &quot;Generate&quot; to create the barcode. The preview shows the barcode
          with the encoded text printed below it. Click &quot;Download PNG&quot; to save the barcode image.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="barcode-generator" locale="en" />
    </div>
  )
}

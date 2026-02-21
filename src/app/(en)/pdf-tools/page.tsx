import { Metadata } from 'next'
import PdfTools from '@/components/tools/PdfTools'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'PDF Tools - Free Online Tool | toolcase',
  description:
    'Merge, split, rotate, and organise PDF files for free. All processing runs in your browser — your documents are never uploaded to any server.',
  alternates: {
    canonical: 'https://toolcase.cc/pdf-tools',
    languages: {
      en: 'https://toolcase.cc/pdf-tools',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/pdf-tools',
    },
  },
}

const faqs = [
  {
    question: 'What operations can I perform on PDFs?',
    answer:
      'This tool lets you merge multiple PDFs into one file, split a PDF into individual pages or page ranges, rotate pages, and reorder pages by dragging and dropping. All operations produce a new downloadable PDF.',
  },
  {
    question: 'Is there a file size limit?',
    answer:
      'Since all processing runs in your browser, there is no server-imposed file size limit. However, very large PDFs (over 200 MB) may take longer to process and could be constrained by your device\'s available memory.',
  },
  {
    question: 'Are my PDF files kept private?',
    answer:
      'Absolutely. Your PDFs are processed entirely on your device using client-side JavaScript. No files are uploaded to any server. Once you close the browser tab, all data is gone.',
  },
]

export default function PdfToolsPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>PDF Tools</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Merge, split, rotate, and organise your PDF documents — all in the browser.
      </p>

      <PdfTools />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select the operation you need: merge, split, or rotate. For merging, upload two or more PDF files and
          arrange them in the desired order. For splitting, upload a single PDF and specify the page ranges you want to
          extract. For rotating, select the pages and the rotation angle. Click the action button to process, then
          download the result. Everything happens locally in your browser — your documents never leave your device.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="pdf-tools" locale="en" />
    </div>
  )
}

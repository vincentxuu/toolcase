import { Metadata } from 'next'
import ImageToPdf from '@/components/tools/ImageToPdf'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Image to PDF - Free Online Tool | toolcase',
  description:
    'Convert one or more images into a single PDF document for free. Supports PNG, JPEG, and WebP. Arrange pages, set orientation, and download instantly.',
  alternates: {
    canonical: 'https://toolcase.cc/image-to-pdf',
    languages: {
      en: 'https://toolcase.cc/image-to-pdf',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/image-to-pdf',
    },
  },
}

const faqs = [
  {
    question: 'How many images can I combine into one PDF?',
    answer:
      'There is no hard limit since the tool runs in your browser. You can add dozens of images to a single PDF. However, very large batches (over 100 high-resolution images) may slow down your browser depending on available memory.',
  },
  {
    question: 'Can I reorder the pages before generating the PDF?',
    answer:
      'Yes. After uploading your images, you can drag and drop them to rearrange the page order. You can also remove individual images from the list before generating the final PDF.',
  },
  {
    question: 'What page sizes and orientations are available?',
    answer:
      'You can choose from standard page sizes such as A4, Letter, and Legal. Each page can be set to portrait or landscape orientation. The images will be scaled to fit within the chosen page dimensions while preserving their aspect ratio.',
  },
]

export default function ImageToPdfPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Image to PDF</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Combine multiple images into a single PDF document — fast and private.
      </p>

      <ImageToPdf />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Upload one or more images by dragging them into the drop zone or clicking to browse your files. Rearrange the
          order by dragging the thumbnails. Choose a page size and orientation, then click &quot;Generate PDF&quot;.
          The tool will combine all images into a multi-page PDF that you can download immediately. The entire process
          runs locally in your browser — your images are never uploaded to a server.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="image-to-pdf" locale="en" />
    </div>
  )
}

import { Metadata } from 'next'
import TextToHandwriting from '@/components/tools/TextToHandwriting'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Text to Handwriting - Free Online Tool | toolcase',
  description:
    'Convert typed text into handwriting-style images. Choose font size, ink colour, and paper style (white, lined, or grid). Download as PNG. Free online tool.',
  alternates: {
    canonical: 'https://toolcase.cc/text-to-handwriting',
    languages: {
      en: 'https://toolcase.cc/text-to-handwriting',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text-to-handwriting',
    },
  },
}

const faqs = [
  {
    question: 'What font is used for the handwriting?',
    answer:
      'The tool uses the generic "cursive" font family, which maps to a handwriting-style font available on your operating system (such as Comic Sans, Segoe Script on Windows, or Apple Chancery on macOS). The result may vary slightly between devices.',
  },
  {
    question: 'Can I choose different paper styles?',
    answer:
      'Yes. You can select from three paper styles: plain white, lined (like notebook paper with a red margin line), and grid (like graph paper). The paper background is rendered on the canvas along with your text.',
  },
  {
    question: 'Does the output look like real handwriting?',
    answer:
      'The tool simulates handwriting by using a cursive font and adding subtle random positioning offsets to each line. While it may not perfectly replicate natural handwriting, it produces a convincing handwritten appearance for most use cases.',
  },
]

export default function TextToHandwritingPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Text to Handwriting</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Convert typed text into handwriting-style images with customisable paper and ink options.
      </p>

      <TextToHandwriting />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Type or paste your text in the text area. Choose the font size, ink colour, and paper style
          (white, lined, or grid). Click &quot;Generate&quot; to render the text in a handwriting-style
          font on the selected paper background. Preview the result and click &quot;Download PNG&quot;
          to save the image.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="text-to-handwriting" locale="en" />
    </div>
  )
}

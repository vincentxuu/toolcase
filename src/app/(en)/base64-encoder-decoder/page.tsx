import { Metadata } from 'next'
import Base64Tool from '@/components/tools/Base64Tool'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Base64 Encoder/Decoder - Free Online Tool | toolcase',
  description: 'Encode and decode Base64 strings instantly. Free online Base64 tool for developers and data processing.',
  alternates: { canonical: 'https://toolcase.cc/base64-encoder-decoder', languages: { en: 'https://toolcase.cc/base64-encoder-decoder', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/base64-encoder-decoder' } },
}

const faqs = [
  { question: 'What is Base64 encoding?', answer: 'Base64 is a binary-to-text encoding scheme that represents binary data using a set of 64 ASCII characters (A-Z, a-z, 0-9, + and /). It is commonly used to embed binary data like images in HTML or CSS, transmit data over text-based protocols like email, and store binary data in JSON or XML formats.' },
  { question: 'Is Base64 the same as encryption?', answer: 'No, Base64 is an encoding scheme, not encryption. It transforms data into a different representation but does not protect or secure the data in any way. Anyone can decode a Base64 string back to its original form. If you need to secure data, use proper encryption algorithms instead.' },
  { question: 'Why does Base64 make data larger?', answer: 'Base64 encoding increases data size by approximately 33%. This is because it represents every 3 bytes of binary data using 4 ASCII characters. Despite this overhead, Base64 is widely used because it ensures data can be safely transmitted through systems that only handle text.' },
]

export default function Base64EncoderDecoderPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Base64 Encoder/Decoder</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Encode text to Base64 or decode Base64 strings back to plain text.</p>
      <Base64Tool />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Paste your text or Base64 string into the input field. Choose whether to encode or decode, and the result appears instantly. Copy the output to your clipboard with one click. Useful for developers working with APIs, data URIs or any system that requires Base64 format.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="base64-encoder-decoder" locale="en" />
    </div>
  )
}

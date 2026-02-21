import { Metadata } from 'next'
import UrlEncodeDecode from '@/components/tools/UrlEncodeDecode'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'URL Encoder/Decoder - Free Online Tool | toolcase',
  description: 'Encode and decode URLs and query strings instantly. Free online URL encoding tool for developers.',
  alternates: { canonical: 'https://toolcase.cc/url-encoder-decoder', languages: { en: 'https://toolcase.cc/url-encoder-decoder', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/url-encoder-decoder' } },
}

const faqs = [
  { question: 'What is URL encoding?', answer: 'URL encoding (also called percent-encoding) replaces special characters in a URL with a percent sign followed by two hexadecimal digits. For example, a space becomes %20 and an ampersand becomes %26. This ensures URLs are transmitted correctly since certain characters have special meaning in URLs.' },
  { question: 'When do I need to URL encode?', answer: 'You need URL encoding when passing special characters in query parameters, form data, or any part of a URL. Common scenarios include encoding search queries, passing user input as URL parameters, and constructing API request URLs that contain spaces or special characters.' },
  { question: 'What is the difference between encodeURI and encodeURIComponent?', answer: 'encodeURI encodes a full URI but preserves characters that have special meaning in URLs (like /, ?, #, &). encodeURIComponent encodes everything except letters, digits and a few special characters, making it suitable for encoding individual query parameter values. This tool uses encodeURIComponent for the most thorough encoding.' },
]

export default function UrlEncoderDecoderPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>URL Encoder/Decoder</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Encode or decode URLs and query string parameters.</p>
      <UrlEncodeDecode />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Paste a URL or text string into the input field. Choose encode to convert special characters to percent-encoded format, or decode to convert a percent-encoded string back to readable text. The result is displayed instantly and can be copied with one click.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="url-encoder-decoder" locale="en" />
    </div>
  )
}

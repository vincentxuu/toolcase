import { Metadata } from 'next'
import HashGenerator from '@/components/tools/HashGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Hash Generator - Free Online Tool | toolcase',
  description: 'Generate MD5, SHA-1, SHA-256 and other hash values from text. Free online hash generator for developers.',
  alternates: { canonical: 'https://toolcase.cc/hash-generator', languages: { en: 'https://toolcase.cc/hash-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/hash-generator' } },
}

const faqs = [
  { question: 'What is a hash function?', answer: 'A hash function takes an input (or message) and returns a fixed-size string of characters, which is typically a hexadecimal number. The same input always produces the same hash, but even a tiny change in the input produces a completely different hash. Hash functions are one-way — you cannot reverse a hash to get the original input.' },
  { question: 'What is the difference between MD5, SHA-1 and SHA-256?', answer: 'MD5 produces a 128-bit (32 hex character) hash and is fast but no longer considered secure for cryptographic purposes. SHA-1 produces a 160-bit (40 hex character) hash and is also deprecated for security use. SHA-256 produces a 256-bit (64 hex character) hash and is currently the standard for security applications like SSL certificates and blockchain.' },
  { question: 'What are common uses for hash values?', answer: 'Hash values are used for verifying file integrity (checking that a download was not corrupted), storing passwords securely (hashing instead of storing plain text), digital signatures, data deduplication, and checksums. They are fundamental building blocks in security and data processing.' },
]

export default function HashGeneratorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Hash Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Generate MD5, SHA-1, SHA-256 and other hash values from any text.</p>
      <HashGenerator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter or paste your text into the input field. The tool instantly generates hash values in multiple formats including MD5, SHA-1 and SHA-256. Click on any hash value to copy it to your clipboard. Useful for verifying data integrity, generating checksums and development work.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="hash-generator" locale="en" />
    </div>
  )
}

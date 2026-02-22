import { Metadata } from 'next'
import JwtEncoder from '@/components/tools/JwtEncoder'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'JWT Encoder - Free Online Tool | toolcase',
  description:
    'Encode and sign JWT (JSON Web Token) tokens with HMAC algorithms. Build tokens from header and payload JSON with client-side signing.',
  alternates: {
    canonical: 'https://toolcase.cc/jwt-encoder',
    languages: {
      en: 'https://toolcase.cc/jwt-encoder',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/jwt-encoder',
    },
  },
}

const faqs = [
  {
    question: 'How does JWT encoding work?',
    answer:
      'JWT encoding takes a header (specifying the algorithm) and a payload (containing claims), Base64URL-encodes both, then creates an HMAC signature using your secret key. The three parts are joined with dots to form the complete token.',
  },
  {
    question: 'Is this safe for production use?',
    answer:
      'This tool is designed for development, testing, and learning purposes. Signing happens entirely in your browser, and no data is sent to any server. However, production JWT tokens should be generated server-side with proper key management.',
  },
  {
    question: 'What algorithms are supported?',
    answer:
      'The tool supports HMAC-based algorithms: HS256 (HMAC with SHA-256), HS384 (HMAC with SHA-384), and HS512 (HMAC with SHA-512). These use the Web Crypto API for secure client-side signing.',
  },
]

export default function JwtEncoderPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'JWT Encoder', url: 'https://toolcase.cc/jwt-encoder' },
        ]}
      />
      <ToolSchema
        name="JWT Encoder"
        description="Encode and sign JWT (JSON Web Token) tokens with HMAC algorithms. Build tokens from header and payload JSON with client-side signing."
        url="https://toolcase.cc/jwt-encoder"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'JWT Encoder' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>JWT Encoder</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Build and sign JWT tokens from header and payload JSON. Enter your claims and secret key to generate a token.
      </p>

      <JwtEncoder />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Edit the header and payload JSON in the input panels. The header should contain the algorithm and token type.
          The payload holds your claims such as subject, name, and expiration. Enter a secret key, select the HMAC
          algorithm, and click &quot;Encode&quot;. The generated JWT token will appear below, color-coded by its three
          parts: header (red), payload (purple), and signature (blue).
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="jwt-encoder" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import RsaKeyGenerator from '@/components/tools/RsaKeyGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'RSA Key Pair Generator - Free Online Tool | toolcase',
  description:
    'Generate RSA key pairs (2048 or 4096 bits) directly in your browser using the Web Crypto API. Export public and private keys in PEM format. Nothing is sent to any server.',
  alternates: {
    canonical: 'https://toolcase.cc/rsa-key-generator',
    languages: {
      en: 'https://toolcase.cc/rsa-key-generator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/rsa-key-generator',
    },
  },
}

const faqs = [
  {
    question: 'What key sizes are available?',
    answer:
      'You can generate 2048-bit or 4096-bit RSA key pairs. 2048-bit keys are suitable for most applications and are faster to generate. 4096-bit keys provide stronger security but take longer to generate.',
  },
  {
    question: 'Are the generated keys secure?',
    answer:
      'Yes. The keys are generated using the Web Crypto API built into your browser, which uses a cryptographically secure random number generator. The keys never leave your device — all generation happens client-side.',
  },
  {
    question: 'What format are the keys in?',
    answer:
      'The public key is exported in SPKI (Subject Public Key Info) format and the private key in PKCS#8 format, both encoded as base64 and wrapped in standard PEM headers. These are compatible with OpenSSL, SSH, and most cryptographic libraries.',
  },
]

export default function RsaKeyGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'RSA Key Pair Generator', url: 'https://toolcase.cc/rsa-key-generator' },
        ]}
      />
      <ToolSchema
        name="RSA Key Pair Generator"
        description="Generate RSA key pairs (2048 or 4096 bits) directly in your browser using the Web Crypto API. Export public and private keys in PEM format. Nothing is sent to any server."
        url="https://toolcase.cc/rsa-key-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'RSA Key Pair Generator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>RSA Key Pair Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Generate RSA public and private key pairs in PEM format — entirely in your browser.
      </p>

      <RsaKeyGenerator />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select the desired key size (2048 or 4096 bits) and click &quot;Generate Key Pair&quot;. The tool
          generates an RSA key pair using the Web Crypto API and displays both the public key and private
          key in PEM format. Use the &quot;Copy&quot; buttons to copy each key to your clipboard. The
          4096-bit option provides stronger security but may take a few seconds longer to generate.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="rsa-key-generator" locale="en" />
    </div>
    </>
  )
}

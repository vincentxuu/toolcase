import { Metadata } from 'next'
import BcryptGenerator from '@/components/tools/BcryptGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Password Hash Generator - Free Online Tool | toolcase',
  description:
    'Generate SHA-256, SHA-384, and SHA-512 hashes from passwords. Supports salt for added security. All processing in your browser.',
  alternates: {
    canonical: 'https://toolcase.cc/bcrypt-generator',
    languages: {
      en: 'https://toolcase.cc/bcrypt-generator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/bcrypt-generator',
    },
  },
}

const faqs = [
  {
    question: 'Why should I hash passwords?',
    answer:
      'Storing passwords as plain text is a major security risk. Hashing converts a password into a fixed-length string that cannot be reversed. Even if a database is compromised, the actual passwords remain protected.',
  },
  {
    question: 'What is a salt and why use one?',
    answer:
      'A salt is a random string prepended to the password before hashing. It ensures that even identical passwords produce different hashes, protecting against rainbow table attacks and making brute-force attacks much harder.',
  },
  {
    question: 'Is my password safe?',
    answer:
      'All hashing happens directly in your browser using the Web Crypto API. Your password never leaves your device — nothing is sent to any server.',
  },
]

export default function BcryptGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Password Hash Generator', url: 'https://toolcase.cc/bcrypt-generator' },
        ]}
      />
      <ToolSchema
        name="Password Hash Generator"
        description="Generate SHA-256, SHA-384, and SHA-512 hashes from passwords. Supports salt for added security. All processing in your browser."
        url="https://toolcase.cc/bcrypt-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Password Hash Generator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Password Hash Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Generate secure SHA-256, SHA-384, or SHA-512 hashes from passwords with optional salt support.
      </p>

      <BcryptGenerator />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter a password in the input field, select a hash algorithm (SHA-256, SHA-384, or SHA-512), and click
          &quot;Generate Hash&quot;. Optionally, enable the salt option to prepend a random or custom salt to the
          password before hashing. The tool generates a random salt for you, or you can enter your own. The resulting
          hash can be copied with one click.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="bcrypt-generator" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import TextEncryptDecrypt from '@/components/tools/TextEncryptDecrypt'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Text Encrypt / Decrypt - Free Online Tool | toolcase',
  description:
    'Encrypt and decrypt text using AES-256-GCM with a password. Secure client-side encryption using the Web Crypto API. Nothing is sent to any server.',
  alternates: {
    canonical: 'https://toolcase.cc/text-encrypt-decrypt',
    languages: {
      en: 'https://toolcase.cc/text-encrypt-decrypt',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text-encrypt-decrypt',
    },
  },
}

const faqs = [
  {
    question: 'What encryption algorithm is used?',
    answer:
      'This tool uses AES-256-GCM (Galois/Counter Mode), one of the strongest symmetric encryption algorithms available. The password is derived using PBKDF2 with 100,000 iterations and SHA-256, ensuring robust protection against brute-force attacks.',
  },
  {
    question: 'Can someone decrypt my text without the password?',
    answer:
      'No. AES-256-GCM is considered computationally infeasible to break without the correct key. Without the exact password used during encryption, the encrypted text cannot be decrypted. Make sure to remember your password — there is no way to recover it.',
  },
  {
    question: 'Is my data sent to any server?',
    answer:
      'No. All encryption and decryption happens entirely in your browser using the Web Crypto API. Your text and password never leave your device. The encrypted output is a base64 string you can safely share or store.',
  },
]

export default function TextEncryptDecryptPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Text Encrypt / Decrypt', url: 'https://toolcase.cc/text-encrypt-decrypt' },
        ]}
      />
      <ToolSchema
        name="Text Encrypt / Decrypt"
        description="Encrypt and decrypt text using AES-256-GCM with a password. Secure client-side encryption using the Web Crypto API. Nothing is sent to any server."
        url="https://toolcase.cc/text-encrypt-decrypt"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Text Encrypt / Decrypt' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Text Encrypt / Decrypt</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Securely encrypt and decrypt text using AES-256-GCM — entirely in your browser.
      </p>

      <TextEncryptDecrypt />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select &quot;Encrypt&quot; or &quot;Decrypt&quot; mode. For encryption, enter your plain text and
          a password, then click &quot;Encrypt&quot; to get a base64-encoded encrypted string. For
          decryption, paste the encrypted base64 text and enter the same password used during encryption,
          then click &quot;Decrypt&quot; to recover the original text. Copy the output using the Copy button.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="text-encrypt-decrypt" locale="en" />
    </div>
    </>
  )
}

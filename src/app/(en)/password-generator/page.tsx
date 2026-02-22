import { Metadata } from 'next'
import PasswordGenerator from '@/components/tools/PasswordGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Password Generator - Free Online Tool | toolcase',
  description: 'Generate strong, random passwords instantly. Customize length and character types. All generation happens in your browser.',
  alternates: { canonical: 'https://toolcase.cc/password-generator', languages: { en: 'https://toolcase.cc/password-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/password-generator' } },
}

const faqs = [
  { question: 'Are the generated passwords secure?', answer: 'Yes. Passwords are generated using the Web Crypto API (crypto.getRandomValues), which provides cryptographically secure random numbers. Nothing is sent to any server.' },
  { question: 'What makes a strong password?', answer: 'A strong password is at least 12 characters long and includes uppercase letters, lowercase letters, numbers, and symbols. Avoid dictionary words and personal information.' },
  { question: 'How long should my password be?', answer: 'We recommend at least 16 characters for important accounts. Longer passwords are exponentially harder to crack.' },
]

export default function PasswordGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Password Generator', url: 'https://toolcase.cc/password-generator' },
        ]}
      />
      <ToolSchema
        name="Password Generator"
        description="Generate strong, random passwords instantly. Customize length and character types. All generation happens in your browser."
        url="https://toolcase.cc/password-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Password Generator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Password Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Generate strong, random passwords with customizable length and character types.</p>
      <PasswordGenerator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Adjust the password length using the slider and toggle character types on or off. Click Generate to create a new password. Use the Copy button to copy it to your clipboard.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="password-generator" locale="en" />
    </div>
    </>
  )
}

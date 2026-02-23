import { Metadata } from 'next'
import PasswordStrengthChecker from '@/components/tools/PasswordStrengthChecker'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Password Strength Checker - Test Password Security | toolcase',
  description: 'Check your password strength instantly. Get detailed feedback on password security with requirements checklist. All checks happen in your browser.',
  alternates: { canonical: 'https://toolcase.cc/everyday/password-strength-checker', languages: { en: 'https://toolcase.cc/everyday/password-strength-checker', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/password-strength-checker' } },
}

const faqs = [
  { question: 'How is password strength calculated?', answer: 'Strength is based on length (8, 12, 16+ characters), character variety (uppercase, lowercase, numbers, symbols), and overall complexity. A score from 0-6 determines if it\'s weak, fair, strong, or very strong.' },
  { question: 'Is my password sent to any server?', answer: 'No. All password checking happens entirely in your browser using JavaScript. Your password never leaves your device.' },
  { question: 'What makes a password strong?', answer: 'A strong password is at least 16 characters long and includes uppercase letters, lowercase letters, numbers, and symbols. Avoid dictionary words, personal information, and common patterns.' },
  { question: 'Should I use this for my real passwords?', answer: 'This tool is helpful for understanding password strength, but never share your actual passwords. Use a password manager to generate and store unique passwords for each account.' },
]

export default function PasswordStrengthCheckerPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Password Strength Checker', url: 'https://toolcase.cc/everyday/password-strength-checker' },
        ]}
      />
      <ToolSchema
        name="Password Strength Checker"
        description="Check your password strength instantly. Get detailed feedback on password security with requirements checklist. All checks happen in your browser."
        url="https://toolcase.cc/everyday/password-strength-checker"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Password Strength Checker' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Password Strength Checker</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Check the strength and security level of your passwords with detailed requirements feedback.</p>
      <PasswordStrengthChecker
        labels={{
          title: 'Password Strength Checker',
          inputPlaceholder: 'Enter your password to check its strength...',
          strength: 'Strength',
          weak: 'Weak',
          fair: 'Fair',
          strong: 'Strong',
          veryStrong: 'Very Strong',
          length: 'Length',
          uppercase: 'Uppercase letters',
          lowercase: 'Lowercase letters',
          numbers: 'Numbers',
          symbols: 'Symbols',
          requirements: 'Requirements',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Simply type or paste your password into the input field. The tool will instantly analyze it and show you the strength level along with which requirements are met. This helps you understand what makes your password strong or weak.</p>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>Password Security Tips</h2>
        <ul style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, paddingLeft: '1.5rem' }}>
          <li>Use at least 16 characters for important accounts</li>
          <li>Include a mix of uppercase, lowercase, numbers, and symbols</li>
          <li>Avoid dictionary words and personal information</li>
          <li>Use unique passwords for each account</li>
          <li>Consider using a password manager to generate and store passwords</li>
          <li>Enable two-factor authentication (2FA) whenever possible</li>
        </ul>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="password-strength-checker" locale="en" />
    </div>
    </>
  )
}

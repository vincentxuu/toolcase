import { Metadata } from 'next'
import WcagColorChecker from '@/components/tools/WcagColorChecker'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'WCAG Color Checker - Accessibility Contrast Ratio Tool | toolcase',
  description: 'Check color contrast ratios for WCAG 2.1 AA and AAA compliance. Ensure your text colors are accessible for all users. Free accessibility tool.',
  alternates: { canonical: 'https://toolcase.cc/css/wcag-color-checker', languages: { en: 'https://toolcase.cc/css/wcag-color-checker', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css/wcag-color-checker' } },
}

const faqs = [
  { question: 'What is WCAG?', answer: 'WCAG (Web Content Accessibility Guidelines) is an international standard for web accessibility. It defines how to make web content more accessible to people with disabilities, including those with visual impairments.' },
  { question: 'What contrast ratio do I need?', answer: 'For WCAG AA level, you need at least 4.5:1 for normal text and 3:1 for large text (18pt+ or 14pt+ bold). For AAA level (enhanced), you need 7:1 for normal text and 4.5:1 for large text.' },
  { question: 'Why is color contrast important?', answer: 'Sufficient color contrast ensures that text is readable for users with low vision, color blindness, or those viewing screens in bright sunlight. It benefits all users, not just those with disabilities.' },
  { question: 'Can I use this for testing my website?', answer: 'Yes! Enter your text (foreground) and background colors to verify they meet accessibility standards. This helps ensure your website is usable for everyone.' },
]

export default function WcagColorCheckerPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'WCAG Color Checker', url: 'https://toolcase.cc/css/wcag-color-checker' },
        ]}
      />
      <ToolSchema
        name="WCAG Color Checker"
        description="Check color contrast ratios for WCAG 2.1 AA and AAA compliance. Ensure your text colors are accessible for all users. Free accessibility tool."
        url="https://toolcase.cc/css/wcag-color-checker"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'WCAG Color Checker' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>WCAG Color Checker</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Check color contrast ratios to ensure your design meets WCAG accessibility standards.</p>
      <WcagColorChecker
        labels={{
          title: 'WCAG Color Checker',
          foreground: 'Foreground (Text)',
          background: 'Background',
          foregroundPlaceholder: '#000000',
          backgroundPlaceholder: '#FFFFFF',
          swap: 'Swap Colors',
          contrastRatio: 'Contrast Ratio',
          wcagAA: 'WCAG AA',
          wcagAAA: 'WCAG AAA',
          normalText: 'Normal Text',
          largeText: 'Large Text (18pt+)',
          pass: 'Pass',
          fail: 'Fail',
          level: 'Level',
          ratio: 'Ratio',
          preview: 'Preview',
          sampleText: 'The quick brown fox jumps over the lazy dog',
          guidelines: 'Accessibility Guidelines',
          guidelineDesc: 'WCAG 2.1 requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (AA level). AAA level requires 7:1 for normal text and 4.5:1 for large text.',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter your foreground (text) and background colors using the color pickers or hex input fields. The tool automatically calculates the contrast ratio and shows whether it passes WCAG AA and AAA standards for both normal and large text. Use the preview section to see how your colors look together.
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="wcag-color-checker" locale="en" />
    </div>
    </>
  )
}

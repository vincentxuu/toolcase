import { Metadata } from 'next'
import FancyTextGenerator from '@/components/tools/FancyTextGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Fancy Text Generator - Unicode Font Styles | toolcase',
  description: 'Generate fancy text with bold, italic, script, fraktur, double-struck, monospace, circled, fullwidth, upside down and small caps Unicode styles. Copy and paste anywhere.',
  alternates: { canonical: 'https://toolcase.cc/fancy-text-generator', languages: { en: 'https://toolcase.cc/fancy-text-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/fancy-text-generator' } },
}

const faqs = [
  { question: 'How does the fancy text generator work?', answer: 'This tool converts your regular text into various Unicode font styles by mapping each character to its corresponding Unicode mathematical or decorative symbol. The output is plain text made of special Unicode characters, not images or custom fonts, so it can be copied and pasted into social media bios, messages and anywhere text is accepted.' },
  { question: 'Will fancy text work on all platforms?', answer: 'Most modern platforms and devices support Unicode characters, so fancy text will display correctly on social media (Instagram, Twitter, Facebook), messaging apps and websites. However, some older systems or specific apps may not render all Unicode styles properly, especially less common ones like Fraktur or double-struck.' },
  { question: 'What styles are available?', answer: 'The generator supports 11 Unicode text styles: Bold Serif, Italic Serif, Bold Italic, Script (cursive), Fraktur (Gothic), Double-struck (outline), Monospace, Circled, Fullwidth, Upside Down and Small Caps. Each style transforms letters and in some cases digits into their Unicode equivalents.' },
]

export default function FancyTextGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Fancy Text Generator', url: 'https://toolcase.cc/fancy-text-generator' },
        ]}
      />
      <ToolSchema
        name="Fancy Text Generator"
        description="Generate fancy text with bold, italic, script, fraktur, double-struck, monospace, circled, fullwidth, upside down and small caps Unicode styles. Copy and paste anywhere."
        url="https://toolcase.cc/fancy-text-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Fancy Text Generator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Fancy Text Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Transform your text into stylish Unicode font variations. Click any result to copy.</p>
      <FancyTextGenerator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Type or paste your text into the input field. The tool instantly generates your text in 11 different Unicode font styles including bold, italic, script, fraktur, monospace and more. Click on any variation to copy it to your clipboard, then paste it into social media profiles, messages, documents or anywhere you want eye-catching text.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="fancy-text-generator" locale="en" />
    </div>
    </>
  )
}

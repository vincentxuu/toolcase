import { Metadata } from 'next'
import LogoGenerator from '@/components/tools/LogoGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Logo Generator - Simple Logo Maker with Canvas | toolcase',
  description: 'Create simple logos with text and shapes. Customize colors, font size, and templates. Download as PNG. Free browser-based logo maker.',
  alternates: { canonical: 'https://toolcase.cc/css/logo-generator', languages: { en: 'https://toolcase.cc/css/logo-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css/logo-generator' } },
}

const faqs = [
  { question: 'What logo templates are available?', answer: 'The tool offers three templates: Text Only (simple text logo), Circle Icon (text with circular icon), and Square Icon (text with square icon). Each template can be customized with your own colors and text.' },
  { question: 'Can I download my logo?', answer: 'Yes! Click the "Download PNG" button to save your logo as a high-resolution PNG image (800x400px). The logo is generated entirely in your browser using HTML5 Canvas.' },
  { question: 'Can I use the logos commercially?', answer: 'Yes, you can use the generated logos for any purpose, including commercial projects. However, keep in mind these are simple designs - for professional branding, consider hiring a designer.' },
  { question: 'Can I change the logo size?', answer: 'The downloaded logo is 800x400px. You can resize it using image editing software or adjust the font size slider before downloading to change the relative text size within the logo.' },
]

export default function LogoGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Logo Generator', url: 'https://toolcase.cc/css/logo-generator' },
        ]}
      />
      <ToolSchema
        name="Logo Generator"
        description="Create simple logos with text and shapes. Customize colors, font size, and templates. Download as PNG. Free browser-based logo maker."
        url="https://toolcase.cc/css/logo-generator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Logo Generator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Logo Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Create simple logos with text and shapes, then download as PNG.</p>
      <LogoGenerator
        labels={{
          title: 'Logo Generator',
          text: 'Logo Text',
          textPlaceholder: 'Your Brand',
          template: 'Template',
          textOnly: 'Text Only',
          circleIcon: 'Circle Icon',
          squareIcon: 'Square Icon',
          fontSize: 'Font Size',
          backgroundColor: 'Background Color',
          textColor: 'Text Color',
          iconColor: 'Icon Color',
          download: 'Download PNG',
          preview: 'Preview',
          customize: 'Customize',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter your brand name or text, select a template (text only, circle icon, or square icon), and customize the colors and font size. The logo preview updates in real-time. When satisfied, click &quot;Download PNG&quot; to save your logo as a high-resolution image file.
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="logo-generator" locale="en" />
    </div>
    </>
  )
}

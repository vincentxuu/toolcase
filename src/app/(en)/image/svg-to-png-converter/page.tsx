import { Metadata } from 'next'
import SvgToPngConverter from '@/components/tools/SvgToPngConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'SVG to PNG Converter - Free Online Tool | toolcase',
  description: 'Convert SVG files to high-quality PNG images instantly. Upload or paste SVG code, choose output scale (1x-4x), preview, and download your PNG.',
  alternates: { canonical: 'https://toolcase.cc/image/svg-to-png-converter', languages: { en: 'https://toolcase.cc/image/svg-to-png-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/image/svg-to-png-converter' } },
}

const faqs = [
  { question: 'Why convert SVG to PNG?', answer: 'While SVG is great for scalability, some platforms and applications only support raster formats like PNG. Converting to PNG ensures compatibility across email clients, social media, and older software.' },
  { question: 'What does the scale option do?', answer: 'The scale option multiplies the output resolution. For example, if your SVG is 100x100 pixels, choosing 2x will produce a 200x200 PNG. Higher scales give crisper images for retina displays or print.' },
  { question: 'Is my SVG data processed securely?', answer: 'Yes. All conversion happens entirely in your browser using the Canvas API. Your SVG files are never uploaded to any server, ensuring complete privacy.' },
]

export default function SvgToPngConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'SVG to PNG Converter', url: 'https://toolcase.cc/image/svg-to-png-converter' },
        ]}
      />
      <ToolSchema
        name="SVG to PNG Converter"
        description="Convert SVG files to high-quality PNG images instantly. Upload or paste SVG code, choose output scale (1x-4x), preview, and download your PNG."
        url="https://toolcase.cc/image/svg-to-png-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'SVG to PNG Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>SVG to PNG Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Upload or paste SVG code and convert it to a high-quality PNG image at your desired scale.</p>
      <SvgToPngConverter />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Upload an SVG file or paste SVG code directly into the text area. Choose your desired output scale (1x through 4x), then click Convert to PNG. Preview the result and download it with one click.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="svg-to-png-converter" locale="en" />
    </div>
    </>
  )
}

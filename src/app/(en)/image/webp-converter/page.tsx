import { Metadata } from 'next'
import WebpConverter from '@/components/tools/WebpConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'WebP Converter - Convert Images to WebP, PNG, JPG | toolcase',
  description: 'Convert images between WebP, PNG, and JPG formats in your browser. Adjust quality and compare file sizes. No upload needed — 100% private.',
  alternates: { canonical: 'https://toolcase.cc/image/webp-converter', languages: { en: 'https://toolcase.cc/image/webp-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/image/webp-converter' } },
}

const faqs = [
  { question: 'Why use WebP format?', answer: 'WebP provides superior compression compared to PNG and JPG, resulting in smaller file sizes with similar visual quality. It supports both lossy and lossless compression, transparency, and animation.' },
  { question: 'Is the conversion done locally?', answer: 'Yes! All processing happens in your browser using the Canvas API. Your images are never uploaded to any server.' },
]

export default function WebpConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'WebP Converter', url: 'https://toolcase.cc/image/webp-converter' },
        ]}
      />
      <ToolSchema
        name="WebP Converter"
        description="Convert images between WebP, PNG, and JPG formats in your browser. Adjust quality and compare file sizes. No upload needed — 100% private."
        url="https://toolcase.cc/image/webp-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'WebP Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>WebP Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert images between WebP, PNG, and JPG formats. Adjust quality and compare file sizes.</p>
      <WebpConverter />
      <FaqSection items={faqs} />
      <RelatedTools current="webp-converter" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import ImageConverter from '@/components/tools/ImageConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Image Format Converter - Free Online Tool | toolcase',
  description:
    'Convert images between PNG, JPEG, WebP, GIF, and BMP formats for free. Fast, private, and entirely browser-based.',
  alternates: {
    canonical: 'https://toolcase.cc/image-converter',
    languages: {
      en: 'https://toolcase.cc/image-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/image-converter',
    },
  },
}

const faqs = [
  {
    question: 'Which image formats are supported?',
    answer:
      'You can convert between PNG, JPEG, WebP, GIF, and BMP. Simply upload an image in any of these formats and choose your desired output format. The tool handles the conversion instantly in your browser.',
  },
  {
    question: 'Will converting my image reduce its quality?',
    answer:
      'Converting between lossless formats (like PNG to BMP) preserves full quality. Converting to lossy formats (like JPEG or WebP) may introduce slight compression artefacts, but you can adjust the quality setting to minimise any visible difference.',
  },
  {
    question: 'Can I convert multiple images at once?',
    answer:
      'Yes, you can upload and convert multiple images in sequence. Each image is processed individually in your browser, so there are no batch-size limits imposed by a server.',
  },
]

export default function ImageConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Image Format Converter', url: 'https://toolcase.cc/image-converter' },
        ]}
      />
      <ToolSchema
        name="Image Format Converter"
        description="Convert images between PNG, JPEG, WebP, GIF, and BMP formats for free. Fast, private, and entirely browser-based."
        url="https://toolcase.cc/image-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Image Format Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Image Format Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Convert images between popular formats like PNG, JPEG, WebP, and more.
      </p>

      <ImageConverter />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Upload an image by dragging it into the drop zone or clicking to browse your files. Select the target format
          from the dropdown menu (PNG, JPEG, WebP, GIF, or BMP). If converting to a lossy format, adjust the quality
          slider as needed. Click &quot;Convert&quot; and the tool will process the image instantly. Once complete,
          click &quot;Download&quot; to save the converted file. No data ever leaves your browser.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="image-converter" locale="en" />
    </div>
    </>
  )
}

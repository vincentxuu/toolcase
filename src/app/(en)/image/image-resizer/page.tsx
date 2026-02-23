import { Metadata } from 'next'
import ImageResizer from '@/components/tools/ImageResizer'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Image Resizer - Free Online Tool | toolcase',
  description:
    'Resize images online for free. Change dimensions while maintaining aspect ratio. Supports PNG, JPEG, and WebP. No uploads — everything runs in your browser.',
  alternates: {
    canonical: 'https://toolcase.cc/image/image-resizer',
    languages: {
      en: 'https://toolcase.cc/image/image-resizer',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/image/image-resizer',
    },
  },
}

const faqs = [
  {
    question: 'Does resizing affect image quality?',
    answer:
      'Enlarging an image beyond its original dimensions may reduce sharpness because the browser must interpolate new pixels. Reducing the size generally preserves quality well. For best results, start with the highest resolution source image available.',
  },
  {
    question: 'What image formats are supported?',
    answer:
      'You can upload any image format supported by your browser, including PNG, JPEG, WebP, GIF, and BMP. The resized output is saved as PNG to preserve quality.',
  },
  {
    question: 'Are my images uploaded to a server?',
    answer:
      'No. All processing happens entirely in your browser using the Canvas API. Your images never leave your device, ensuring complete privacy.',
  },
]

export default function ImageResizerPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Image Resizer', url: 'https://toolcase.cc/image/image-resizer' },
        ]}
      />
      <ToolSchema
        name="Image Resizer"
        description="Resize images online for free. Change dimensions while maintaining aspect ratio. Supports PNG, JPEG, and WebP. No uploads — everything runs in your browser."
        url="https://toolcase.cc/image/image-resizer"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Image Resizer' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Image Resizer</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Resize images to any dimension while optionally preserving the aspect ratio — entirely in your browser.
      </p>

      <ImageResizer />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Click &quot;Upload Image&quot; to select a file from your device. The tool displays the original
          dimensions and file size. Enter new width and height values — with &quot;Lock Aspect Ratio&quot;
          enabled, changing one dimension automatically adjusts the other. Click &quot;Resize&quot; to generate
          the resized image, then preview and download it.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="image-resizer" locale="en" />
    </div>
    </>
  )
}

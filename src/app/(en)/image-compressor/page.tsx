import { Metadata } from 'next'
import ImageCompressor from '@/components/tools/ImageCompressor'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Image Compressor - Free Online Tool | toolcase',
  description:
    'Compress images online for free. Reduce file size of PNG, JPEG, and WebP images while maintaining visual quality. No uploads — everything runs in your browser.',
  alternates: {
    canonical: 'https://toolcase.cc/image-compressor',
    languages: {
      en: 'https://toolcase.cc/image-compressor',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/image-compressor',
    },
  },
}

const faqs = [
  {
    question: 'How much can I reduce the file size?',
    answer:
      'Results vary depending on the image format and content. JPEG images can often be reduced by 50-80% with minimal quality loss. PNG compression typically achieves 20-50% reduction, and WebP images can be compressed even further due to the format\'s efficiency.',
  },
  {
    question: 'Does compression reduce image quality?',
    answer:
      'The tool uses smart compression algorithms that prioritise perceptual quality. At the default setting, most users cannot tell the difference between the original and compressed images. You can adjust the quality slider to find the ideal balance between file size and visual fidelity.',
  },
  {
    question: 'Are my images uploaded to a server?',
    answer:
      'No. All compression happens directly in your browser using client-side processing. Your images never leave your device, making this tool completely private and safe to use with sensitive photos or screenshots.',
  },
]

export default function ImageCompressorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Image Compressor', url: 'https://toolcase.cc/image-compressor' },
        ]}
      />
      <ToolSchema
        name="Image Compressor"
        description="Compress images online for free. Reduce file size of PNG, JPEG, and WebP images while maintaining visual quality. No uploads — everything runs in your browser."
        url="https://toolcase.cc/image-compressor"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Image Compressor' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Image Compressor</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Reduce image file sizes while preserving quality — entirely in your browser.
      </p>

      <ImageCompressor />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Drag and drop an image onto the upload area, or click to select a file from your device. The tool will
          compress the image automatically and show you a before-and-after comparison with the original and compressed
          file sizes. Use the quality slider to adjust the compression level. When you are satisfied, click
          &quot;Download&quot; to save the compressed image. You can process multiple images one after another.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="image-compressor" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import ImageWatermark from '@/components/tools/ImageWatermark'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Image Watermark - Free Online Tool | toolcase',
  description:
    'Add text watermarks to images online for free. Customise text, font size, colour, opacity, and position. Supports tiled watermarks. Everything runs in your browser.',
  alternates: {
    canonical: 'https://toolcase.cc/image-watermark',
    languages: {
      en: 'https://toolcase.cc/image-watermark',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/image-watermark',
    },
  },
}

const faqs = [
  {
    question: 'What positions are available for the watermark?',
    answer:
      'You can place the watermark in the centre, any of the four corners (top-left, top-right, bottom-left, bottom-right), or tile it across the entire image with a diagonal pattern for maximum protection.',
  },
  {
    question: 'Can I adjust the watermark transparency?',
    answer:
      'Yes. Use the opacity slider to set any transparency from 5% to 100%. A value around 30-50% is usually ideal — visible enough to protect your image but subtle enough not to distract from the content.',
  },
  {
    question: 'Are my images uploaded to a server?',
    answer:
      'No. All watermark processing happens entirely in your browser using the Canvas API. Your images stay on your device and are never sent to any server.',
  },
]

export default function ImageWatermarkPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Image Watermark', url: 'https://toolcase.cc/image-watermark' },
        ]}
      />
      <ToolSchema
        name="Image Watermark"
        description="Add text watermarks to images online for free. Customise text, font size, colour, opacity, and position. Supports tiled watermarks. Everything runs in your browser."
        url="https://toolcase.cc/image-watermark"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Image Watermark' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Image Watermark</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Add customisable text watermarks to your images — entirely in your browser.
      </p>

      <ImageWatermark />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Upload an image, then enter your watermark text. Customise the font size, colour, opacity, and
          position. Choose &quot;Tiled&quot; for a repeating diagonal watermark that covers the entire image.
          Click &quot;Apply Watermark&quot; to preview the result, then download the watermarked image.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="image-watermark" locale="en" />
    </div>
    </>
  )
}

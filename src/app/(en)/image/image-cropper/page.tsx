import { Metadata } from 'next'
import ImageCropper from '@/components/tools/ImageCropper'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Image Cropper - Free Online Tool | toolcase',
  description:
    'Crop images online for free with a visual editor. Set custom aspect ratios, resize precisely, and download the cropped result instantly.',
  alternates: {
    canonical: 'https://toolcase.cc/image/image-cropper',
    languages: {
      en: 'https://toolcase.cc/image/image-cropper',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/image/image-cropper',
    },
  },
}

const faqs = [
  {
    question: 'Can I set a specific aspect ratio?',
    answer:
      'Yes. You can choose from common presets like 1:1 (square), 4:3, 16:9, or 3:2, or enter a custom aspect ratio. You can also crop freely without any aspect ratio constraint by selecting the free-form option.',
  },
  {
    question: 'What image formats can I crop?',
    answer:
      'The cropper supports all major image formats including PNG, JPEG, WebP, GIF, and BMP. The output will be saved in the same format as the original unless you choose a different one.',
  },
  {
    question: 'Is the cropping done on the server?',
    answer:
      'No. The entire cropping operation happens in your browser using the HTML Canvas API. Your image is never uploaded to any server, so your files remain completely private.',
  },
]

export default function ImageCropperPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Image Cropper', url: 'https://toolcase.cc/image/image-cropper' },
        ]}
      />
      <ToolSchema
        name="Image Cropper"
        description="Crop images online for free with a visual editor. Set custom aspect ratios, resize precisely, and download the cropped result instantly."
        url="https://toolcase.cc/image/image-cropper"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Image Cropper' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Image Cropper</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Crop and resize your images with precision using a simple visual editor.
      </p>

      <ImageCropper />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Upload an image by dropping it into the editor or clicking to browse. A crop selection box will appear over
          your image — drag the edges or corners to adjust the area you want to keep. Choose a preset aspect ratio or
          enter custom dimensions if needed. When you are happy with the selection, click &quot;Crop&quot; to process
          the image, then &quot;Download&quot; to save the result. All processing is done locally in your browser.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="image-cropper" locale="en" />
    </div>
    </>
  )
}

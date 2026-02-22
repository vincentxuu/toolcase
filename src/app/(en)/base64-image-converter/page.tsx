import { Metadata } from 'next'
import Base64ImageConverter from '@/components/tools/Base64ImageConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Base64 Image Converter - Image to Base64 & Base64 to Image | toolcase',
  description: 'Convert images to Base64 data URLs and decode Base64 back to images. Preview images, view dimensions and file size. Free browser-based tool.',
  alternates: { canonical: 'https://toolcase.cc/base64-image-converter', languages: { en: 'https://toolcase.cc/base64-image-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/base64-image-converter' } },
}

const faqs = [
  { question: 'What is Base64 encoding for images?', answer: 'Base64 encoding converts binary image data into ASCII text format. This allows images to be embedded directly in HTML, CSS, or JSON without separate file requests. The data URI format (data:image/png;base64,...) is commonly used in web development.' },
  { question: 'When should I use Base64 images?', answer: 'Base64 images are useful for small icons, inline SVGs, email templates, or when you need to embed images in CSS/JavaScript. However, they increase file size by ~33% and are not recommended for large images or photos.' },
  { question: 'How do I convert Base64 back to an image?', answer: 'Paste the Base64 string (including the data:image prefix) into the "Paste Base64" field and click Convert. The tool will decode it and display the image preview. You can then right-click the preview to save the image.' },
  { question: 'Is my image data private?', answer: 'Yes! All conversions happen entirely in your browser using JavaScript. Your images are never uploaded to any server, ensuring complete privacy and security.' },
]

export default function Base64ImageConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Base64 Image Converter', url: 'https://toolcase.cc/base64-image-converter' },
        ]}
      />
      <ToolSchema
        name="Base64 Image Converter"
        description="Convert images to Base64 data URLs and decode Base64 back to images. Preview images, view dimensions and file size. Free browser-based tool."
        url="https://toolcase.cc/base64-image-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Base64 Image Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Base64 Image Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert images to Base64 data URLs and preview Base64-encoded images.</p>
      <Base64ImageConverter
        labels={{
          title: 'Base64 Image Converter',
          uploadImage: 'Upload Image',
          pasteBase64: 'Paste Base64 to decode',
          base64Output: 'Base64 Output',
          imagePreview: 'Image Preview',
          convert: 'Convert to Image',
          clear: 'Clear',
          copy: 'Copy',
          copied: 'Copied!',
          imageInfo: 'Image Information',
          fileName: 'File Name',
          fileSize: 'File Size',
          dimensions: 'Dimensions',
          invalidImage: 'Invalid image file',
          invalidBase64: 'Invalid Base64 image data',
          noImage: 'No image loaded',
          selectImage: 'Select an image file to convert to Base64',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
          <strong>Image to Base64:</strong> Click "Select an image file" to upload any image (PNG, JPG, GIF, WebP, etc.). The tool will convert it to a Base64 data URL and display the encoded string. You can copy the Base64 string to use in your HTML, CSS, or JavaScript.
        </p>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          <strong>Base64 to Image:</strong> Paste a Base64 string into the textarea (with or without the data:image prefix) and click "Convert to Image". The tool will decode and display the image preview. Right-click the preview to save the image.
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="base64-image-converter" locale="en" />
    </div>
    </>
  )
}

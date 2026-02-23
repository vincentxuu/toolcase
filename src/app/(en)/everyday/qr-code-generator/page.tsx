import { Metadata } from 'next'
import QrGenerator from '@/components/tools/QrGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'QR Code Generator - Free Online Tool | toolcase',
  description:
    'Generate QR codes from any text, URL, or data instantly. Free online QR code generator with customizable colors and sizes.',
  alternates: {
    canonical: 'https://toolcase.cc/everyday/qr-code-generator',
    languages: {
      en: 'https://toolcase.cc/everyday/qr-code-generator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/qr-code-generator',
    },
  },
}

const faqs = [
  {
    question: 'What is a QR code?',
    answer:
      'A QR (Quick Response) code is a two-dimensional barcode that can store URLs, text, contact information, and other data. It can be scanned by smartphone cameras and QR code reader apps.',
  },
  {
    question: 'What types of data can I encode?',
    answer:
      'You can encode any text including URLs, email addresses, phone numbers, Wi-Fi credentials, plain text, and more. The QR code will automatically adjust its size based on the amount of data.',
  },
  {
    question: 'Can I customize the QR code colors?',
    answer:
      'Yes! You can change both the foreground (dark) and background (light) colors of your QR code using the color pickers. Make sure there is enough contrast between the two colors for reliable scanning.',
  },
  {
    question: 'Is the QR code generated locally?',
    answer:
      'Yes, all QR codes are generated directly in your browser. No data is sent to any server, ensuring your information stays private.',
  },
]

export default function QrCodeGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'QR Code Generator', url: 'https://toolcase.cc/everyday/qr-code-generator' },
        ]}
      />
      <ToolSchema
        name="QR Code Generator"
        description="Generate QR codes from any text, URL, or data instantly. Free online QR code generator with customizable colors and sizes."
        url="https://toolcase.cc/everyday/qr-code-generator"
        category="UtilitiesApplication"
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'QR Code Generator' },
          ]}
        />
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>QR Code Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Enter any text or URL below to generate a QR code instantly.
      </p>

      <QrGenerator />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Generate a QR Code</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Type or paste your text, URL, or data into the input field above. The QR code will be generated automatically
          as you type. You can customize the size (128px to 1024px) and colors to match your brand or preferences.
          Once generated, click &quot;Download PNG&quot; to save the QR code image to your device.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="qr-code-generator" locale="en" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import DigitalSignaturePad from '@/components/tools/DigitalSignaturePad'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Digital Signature Pad - Draw & Download Signature | toolcase',
  description: 'Draw your signature on a digital pad and download it as a PNG image with transparent or white background. Works on desktop and mobile.',
  alternates: { canonical: 'https://toolcase.cc/digital-signature-pad', languages: { en: 'https://toolcase.cc/digital-signature-pad', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/digital-signature-pad' } },
}

const faqs = [
  { question: 'Can I use this on mobile?', answer: 'Yes! The signature pad supports touch input on mobile devices and tablets. You can draw with your finger or a stylus.' },
  { question: 'What format is the signature saved in?', answer: 'The signature is downloaded as a PNG image. You can choose between a transparent background (great for overlaying on documents) or a white background.' },
]

export default function DigitalSignaturePadPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Digital Signature Pad</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Draw your signature and download as PNG. Supports transparent and white backgrounds.</p>
      <DigitalSignaturePad />
      <FaqSection items={faqs} />
      <RelatedTools current="digital-signature-pad" locale="en" />
    </div>
  )
}

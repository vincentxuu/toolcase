import { Metadata } from 'next'
import FaviconGenerator from '@/components/tools/FaviconGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Favicon Generator - Free Online Tool | toolcase',
  description:
    'Generate favicons in all standard sizes from an image or text. Get 16x16, 32x32, 48x48, 180x180, 192x192, and 512x512 icons with ready-to-use HTML tags.',
  alternates: {
    canonical: 'https://toolcase.cc/favicon-generator',
    languages: {
      en: 'https://toolcase.cc/favicon-generator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/favicon-generator',
    },
  },
}

const faqs = [
  {
    question: 'What sizes do I need for a favicon?',
    answer:
      'Modern browsers and devices use different sizes. 16x16 and 32x32 are used by browsers in tabs and bookmarks, 48x48 by Windows site shortcuts, 180x180 by Apple devices (apple-touch-icon), and 192x192 and 512x512 by Android and PWA manifests.',
  },
  {
    question: 'Can I create a favicon from text or an emoji?',
    answer:
      'Yes. Enter any text or emoji (up to 2 characters) in the text input field and click Generate. The tool renders it on a canvas and produces all the required sizes automatically.',
  },
  {
    question: 'How do I add the favicon to my website?',
    answer:
      'Download the generated icons and place them in your website\'s public folder. Then copy the HTML link tags provided and paste them into the <head> section of your HTML. The tags reference each size so browsers can pick the appropriate one.',
  },
]

export default function FaviconGeneratorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Favicon Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Generate favicons in all standard sizes from an image or text — with ready-to-use HTML tags.
      </p>

      <FaviconGenerator />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Upload an image or enter text/emoji as the source for your favicon. Click &quot;Generate Favicons&quot;
          to create all standard sizes (16x16 through 512x512). Preview each size, download them individually,
          and copy the HTML link tags to paste into your website&apos;s &lt;head&gt; section.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="favicon-generator" locale="en" />
    </div>
  )
}

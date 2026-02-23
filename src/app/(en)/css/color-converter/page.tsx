import { Metadata } from 'next'
import ColorConverter from '@/components/tools/ColorConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Color Converter - Free Online Tool | toolcase',
  description: 'Convert colors between HEX, RGB, HSL and other formats. Free online color converter with live preview.',
  alternates: { canonical: 'https://toolcase.cc/css/color-converter', languages: { en: 'https://toolcase.cc/css/color-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css/color-converter' } },
}

const faqs = [
  { question: 'What color formats are supported?', answer: 'The color converter supports HEX (e.g., #FF5733), RGB (e.g., rgb(255, 87, 51)), HSL (e.g., hsl(11, 100%, 60%)) and other common color formats. You can input a color in any format and instantly see it converted to all other formats.' },
  { question: 'What is the difference between HEX and RGB?', answer: 'HEX and RGB represent colors the same way — using red, green and blue components — but in different notation. HEX uses a six-character hexadecimal string (e.g., #FF5733), while RGB uses three decimal numbers from 0 to 255 (e.g., rgb(255, 87, 51)). They are interchangeable and produce the same color.' },
  { question: 'When should I use HSL instead of RGB?', answer: 'HSL (Hue, Saturation, Lightness) is more intuitive for adjusting colors. If you want a lighter or darker shade, you just change the lightness value. If you want a more or less vivid color, adjust saturation. This makes HSL ideal for creating color palettes and themes in CSS.' },
]

export default function ColorConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Color Converter', url: 'https://toolcase.cc/css/color-converter' },
        ]}
      />
      <ToolSchema
        name="Color Converter"
        description="Convert colors between HEX, RGB, HSL and other formats. Free online color converter with live preview."
        url="https://toolcase.cc/css/color-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Color Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Color Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert colors between HEX, RGB, HSL and other formats.</p>
      <ColorConverter />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter a color value in any supported format — HEX, RGB or HSL. The tool will instantly convert it to all other formats and display a live color preview. Click on any converted value to copy it to your clipboard for use in your designs or code.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="color-converter" locale="en" />
    </div>
    </>
  )
}

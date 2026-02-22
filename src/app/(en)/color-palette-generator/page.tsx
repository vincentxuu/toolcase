import { Metadata } from 'next'
import ColorPaletteGenerator from '@/components/tools/ColorPaletteGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Color Palette Generator - Free Online Tool | toolcase',
  description: 'Generate harmonious color palettes from any base color. Complementary, analogous, triadic, split-complementary and monochromatic schemes with one click.',
  alternates: { canonical: 'https://toolcase.cc/color-palette-generator', languages: { en: 'https://toolcase.cc/color-palette-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/color-palette-generator' } },
}

const faqs = [
  { question: 'What color harmony types are available?', answer: 'The palette generator supports five harmony types: Complementary (opposite on the color wheel), Analogous (adjacent hues), Triadic (three evenly spaced hues), Split-Complementary (a base plus two colors adjacent to its complement), and Monochromatic (different lightness values of the same hue).' },
  { question: 'How are the palettes calculated?', answer: 'Palettes are computed using HSL (Hue, Saturation, Lightness) color math. The tool converts your base color to HSL, applies the appropriate hue rotation for each harmony type, and converts back to HEX. This ensures mathematically accurate color relationships.' },
  { question: 'Can I copy individual colors from a palette?', answer: 'Yes. Simply click on any color swatch in the generated palette and its HEX code will be copied to your clipboard instantly. You can then paste it directly into your CSS, design tool, or any other application.' },
]

export default function ColorPaletteGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Color Palette Generator', url: 'https://toolcase.cc/color-palette-generator' },
        ]}
      />
      <ToolSchema
        name="Color Palette Generator"
        description="Generate harmonious color palettes from any base color. Complementary, analogous, triadic, split-complementary and monochromatic schemes with one click."
        url="https://toolcase.cc/color-palette-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Color Palette Generator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Color Palette Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Generate harmonious color palettes from any base color.</p>
      <ColorPaletteGenerator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Pick a base color using the color picker or type a HEX code. The tool instantly generates five types of harmonious palettes: complementary, analogous, triadic, split-complementary, and monochromatic. Click any color swatch to copy its HEX code to your clipboard.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="color-palette-generator" locale="en" />
    </div>
    </>
  )
}

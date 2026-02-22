import { Metadata } from 'next'
import ColorBlindnessSimulator from '@/components/tools/ColorBlindnessSimulator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Color Blindness Simulator - Free Online Tool | toolcase',
  description: 'Simulate how colors appear to people with color vision deficiencies. Preview protanopia, deuteranopia, tritanopia, and more color blindness types instantly.',
  alternates: { canonical: 'https://toolcase.cc/color-blindness-simulator', languages: { en: 'https://toolcase.cc/color-blindness-simulator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/color-blindness-simulator' } },
}

const faqs = [
  { question: 'What types of color blindness does this tool simulate?', answer: 'This tool simulates seven types of color vision deficiency: Protanopia (red-blind), Deuteranopia (green-blind), Tritanopia (blue-blind), Protanomaly (red-weak), Deuteranomaly (green-weak), Tritanomaly (blue-weak), and Achromatopsia (total color blindness). Each uses scientifically-derived color transformation matrices.' },
  { question: 'How accurate is the color blindness simulation?', answer: 'The simulations use Brettel/Vienot color transformation matrices applied in linearized sRGB color space. While no simulation can perfectly replicate the subjective experience of color blindness, these matrices are widely used in accessibility research and provide a reliable approximation.' },
  { question: 'Why should designers use a color blindness simulator?', answer: 'Approximately 8% of men and 0.5% of women have some form of color vision deficiency. By testing your color choices with a simulator, you can ensure your designs remain accessible and distinguishable for all users, avoiding reliance on color alone to convey information.' },
]

export default function ColorBlindnessSimulatorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Color Blindness Simulator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>See how any color appears under different types of color vision deficiency.</p>
      <ColorBlindnessSimulator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter a hex color value or use the color picker to select your color. The tool instantly shows how that color appears to people with seven different types of color vision deficiency. Compare the original color with each simulation to evaluate accessibility. Use the hex values displayed below each swatch for reference in your designs.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="color-blindness-simulator" locale="en" />
    </div>
  )
}

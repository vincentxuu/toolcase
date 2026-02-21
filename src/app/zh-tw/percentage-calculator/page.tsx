import { Metadata } from 'next'
import PercentageCalculator from '@/components/tools/PercentageCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '百分比計算器 - 免費線上工具 | toolcase',
  description: '即時計算百分比。求某數的百分之幾、百分比變化等。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/percentage-calculator', languages: { en: 'https://toolcase.cc/percentage-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/percentage-calculator' } },
}

const faqs = [
  { question: '如何計算百分比？', answer: '求 Y 的 X%，將 Y 乘以 X/100。例如，200 的 25% = 200 × 0.25 = 50。' },
  { question: '如何計算百分比變化？', answer: '百分比變化 = ((新值 - 舊值) / 舊值) × 100。正值表示增加，負值表示減少。' },
  { question: 'X 的 Y% 和 Y 是 X 的百分之幾有什麼不同？', answer: '這是不同的計算。「200 的 25%」= 50。「50 是 200 的百分之幾」= 25%。' },
]

export default function PercentageCalculatorPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>百分比計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>計算百分比、求某數的百分之幾，以及計算百分比變化。</p>
      <PercentageCalculator labels={{ whatIsXPercentOfY: 'Y 的 X% 是多少？', xIsWhatPercentOfY: 'X 是 Y 的百分之幾？', percentChange: '百分比變化', value: '數值', percent: '%', of: '的', is: '是', result: '結果', from: '從', to: '到', change: '變化', increase: '增加', decrease: '減少' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>使用上方三個計算器：求 Y 的 X% 是多少、X 是 Y 的百分之幾，或計算兩個數值之間的百分比變化。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="percentage-calculator" locale="zh-tw" />
    </div>
  )
}

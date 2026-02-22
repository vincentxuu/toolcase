import { Metadata } from 'next'
import AspectRatioCalculator from '@/components/tools/AspectRatioCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '長寬比計算器 - 免費線上工具 | toolcase',
  description: '即時計算並簡化長寬比。鎖定比例、使用 16:9、4:3、1:1 等預設值，快速找出任何解析度的簡化比例。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/aspect-ratio-calculator', languages: { en: 'https://toolcase.cc/aspect-ratio-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/aspect-ratio-calculator' } },
}

const faqs = [
  { question: '什麼是長寬比？', answer: '長寬比是影像或螢幕寬度與高度之間的比例關係。例如 16:9 表示每 16 個寬度單位對應 9 個高度單位。' },
  { question: '鎖定比例功能有什麼用？', answer: '鎖定比例後，當你改變寬度時會自動重新計算高度以維持相同的長寬比，反之亦然。這在調整影像大小時非常實用。' },
  { question: '最常見的長寬比是什麼？', answer: '16:9 是現代顯示器、電視和影片最常用的長寬比。4:3 是傳統電視標準，1:1 則常見於社群媒體貼文。' },
]

export default function AspectRatioCalculatorPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>長寬比計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>計算、簡化並鎖定任何解析度的長寬比，提供常用預設選項。</p>
      <AspectRatioCalculator labels={{ width: '寬度', height: '高度', ratio: '長寬比', lockRatio: '鎖定比例', presets: '預設比例', calculate: '計算', simplifiedRatio: '簡化比例' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入寬度和高度即可立即查看簡化的長寬比。使用「鎖定比例」按鈕可在改變尺寸時維持比例，或點擊預設比例快速套用 16:9、4:3 等常見格式。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="aspect-ratio-calculator" locale="zh-tw" />
    </div>
  )
}

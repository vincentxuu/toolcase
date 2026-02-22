import { Metadata } from 'next'
import NameStrokeCalculator from '@/components/tools/NameStrokeCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '姓名筆畫吉凶查詢 - 姓名學筆畫計算 | toolcase',
  description: '輸入姓名查詢總筆畫數與吉凶判定，含各字筆畫明細。姓名學筆畫分析工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/name-stroke-calculator', languages: { en: 'https://toolcase.cc/name-stroke-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/name-stroke-calculator' } },
}

const faqs = [
  { question: '筆畫數怎麼計算？', answer: '本工具依據常見字典筆畫數計算，部分字以康熙字典為準可能略有差異。' },
  { question: '吉凶判定準嗎？', answer: '姓名筆畫吉凶屬於民俗文化參考，僅供娛樂用途，不應作為重大決策依據。' },
  { question: '可以查英文名嗎？', answer: '此工具目前僅支援中文姓名筆畫查詢，英文字母不會計入筆畫。' },
]

export default function NameStrokeCalculatorPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>姓名筆畫吉凶查詢</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>輸入中文姓名，即時查詢總筆畫數與吉凶判定。</p>
      <NameStrokeCalculator />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="name-stroke-calculator" locale="zh-tw" />
    </div>
  )
}

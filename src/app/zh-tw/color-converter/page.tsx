import { Metadata } from 'next'
import ColorConverter from '@/components/tools/ColorConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '色碼轉換器 - 免費線上工具 | toolcase',
  description: '在 HEX、RGB 和 HSL 色碼格式之間轉換。免費線上色碼轉換器，附即時顏色預覽。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/color-converter', languages: { en: 'https://toolcase.cc/color-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/color-converter' } },
}

const faqs = [
  { question: 'HEX、RGB 和 HSL 有什麼不同？', answer: 'HEX 是十六進位色碼（如 #FF5733），常用於網頁 CSS。RGB 用紅、綠、藍三個數值（0-255）表示顏色。HSL 用色相（0-360度）、飽和度（0-100%）和亮度（0-100%）來描述顏色，更直覺易懂。' },
  { question: '為什麼同一個顏色在不同螢幕上看起來不同？', answer: '這是因為每個螢幕的色彩校正、亮度設定和面板技術不同。專業設計師會使用色彩校正工具來確保螢幕顯示的顏色盡可能準確。在設計網頁時，建議在多種裝置上預覽色彩效果。' },
  { question: '網頁設計中最常用的色碼格式是哪一種？', answer: 'HEX 是網頁設計中最常用的格式，因為它簡潔且被所有瀏覽器支援。不過 RGB 和 HSL 在 CSS 中也可以直接使用，HSL 特別適合需要調整顏色明暗或飽和度的場合。' },
]

export default function ColorConverterPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>色碼轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>在 HEX、RGB 和 HSL 色碼格式之間自由轉換。</p>
      <ColorConverter labels={{ hex: 'HEX', rgb: 'RGB', hsl: 'HSL', preview: '預覽', copy: '複製', copied: '已複製！' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在任一格式的輸入框中輸入色碼值，其他格式會自動轉換並即時顯示。您可以輸入 HEX（如 #FF5733）、RGB（如 255, 87, 51）或 HSL 值，並透過預覽區確認顏色。點擊複製按鈕可快速複製色碼。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="color-converter" locale="zh-tw" />
    </div>
  )
}

import { Metadata } from 'next'
import TypingSpeedTest from '@/components/tools/TypingSpeedTest'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '打字速度測試 - WPM 與準確度 | toolcase',
  description: '使用免費線上打字測試來測試您的打字速度和準確度。即時測量每分鐘字數（WPM）、淨 WPM 和準確度。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/typing-speed-test', languages: { en: 'https://toolcase.cc/typing-speed-test', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/typing-speed-test' } },
}

const faqs = [
  { question: 'WPM 是如何計算的？', answer: '每分鐘字數（WPM）的計算方式是將輸入的總字元數除以 5（標準字長），再除以經過的時間（分鐘）。淨 WPM 會從總 WPM 中扣除錯誤數。' },
  { question: '準確度是什麼意思？', answer: '準確度是正確輸入的字元數佔所有輸入字元的百分比。100% 準確度表示每個字元都輸入正確。' },
  { question: '可以重新開始測試嗎？', answer: '可以，隨時點擊重新開始按鈕即可使用新的隨機文字段落重置測試。' },
]

export default function TypingSpeedTestPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '打字速度測試', url: 'https://toolcase.cc/zh-tw/typing-speed-test' },
        ]}
      />
      <ToolSchema
        name="打字速度測試"
        description="使用免費線上打字測試來測試您的打字速度和準確度。即時測量每分鐘字數（WPM）、淨 WPM 和準確度。"
        url="https://toolcase.cc/zh-tw/typing-speed-test"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '打字速度測試' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>打字速度測試</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>測試您的打字速度和準確度。即時查看 WPM、準確度和詳細結果。</p>
      <TypingSpeedTest labels={{ start: '開始', restart: '重新開始', wpm: 'WPM', accuracy: '準確度', time: '時間', seconds: '秒', typingTest: '打字測試', typeBelow: '在下方輸入', results: '結果', grossWpm: '總 WPM', netWpm: '淨 WPM', correctChars: '正確字元', totalChars: '總字元' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>點擊開始進行打字測試。畫面上會出現一段文字 — 盡可能快速且準確地輸入。計時器會在您開始打字時啟動。WPM、準確度和其他統計數據會即時顯示，測試結束後會有結果總結。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="typing-speed-test" locale="zh-tw" />
    </div>
    </>
  )
}

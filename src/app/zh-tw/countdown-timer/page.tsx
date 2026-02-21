import { Metadata } from 'next'
import CountdownTimer from '@/components/tools/CountdownTimer'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '倒數計時器 - 免費線上工具 | toolcase',
  description: '設定目標日期，即時倒數計時。免費線上倒數計時器，精確顯示天、時、分、秒。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/countdown-timer', languages: { en: 'https://toolcase.cc/countdown-timer', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/countdown-timer' } },
}

const faqs = [
  { question: '倒數計時器可以用在什麼場合？', answer: '倒數計時器適用於各種場合，例如距離考試的天數、專案截止日期、節日活動倒數、產品上市時間等。它可以幫助您掌握剩餘時間，提高時間管理的效率。' },
  { question: '關閉瀏覽器後計時會繼續嗎？', answer: '本計時器是根據您設定的目標日期與目前時間的差距來計算的，所以即使關閉瀏覽器，重新開啟後倒數仍然是正確的。不過，您需要重新設定目標日期。' },
  { question: '倒數計時結束後會怎樣？', answer: '當倒數計時達到目標日期時，計時器會顯示「時間到！」的提示訊息。您可以隨時設定新的目標日期來開始新的倒數計時。' },
]

export default function CountdownTimerPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>倒數計時器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>設定目標日期，精確顯示剩餘天數、時、分、秒。</p>
      <CountdownTimer labels={{ targetDate: '目標日期', days: '天', hours: '時', minutes: '分', seconds: '秒', timesUp: '時間到！', setTarget: '設定目標' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>選擇或輸入一個目標日期和時間，按下「設定目標」按鈕即可開始倒數計時。計時器會即時顯示距離目標日期的天數、小時、分鐘和秒數。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="countdown-timer" locale="zh-tw" />
    </div>
  )
}

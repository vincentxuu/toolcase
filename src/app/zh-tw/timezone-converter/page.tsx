import { Metadata } from 'next'
import TimezoneConverter from '@/components/tools/TimezoneConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '時區轉換器 - 免費線上工具 | toolcase',
  description: '即時轉換不同時區的時間。支援 UTC、EST、PST、GMT、CET、JST、CST 等時區。查看任意兩個時區的當前時間和時差。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/timezone-converter', languages: { en: 'https://toolcase.cc/timezone-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/timezone-converter' } },
}

const faqs = [
  { question: '時區轉換是如何運作的？', answer: '轉換器使用 Intl.DateTimeFormat API 來準確地在時區之間轉換時間，會自動處理日光節約時間（DST）的轉換。' },
  { question: '是否支援日光節約時間？', answer: '是的。轉換器使用瀏覽器內建的時區資料庫，其中包含所有支援時區的 DST 規則。無論是標準時間還是日光節約時間，轉換都是準確的。' },
  { question: '支援哪些時區？', answer: '此工具支援 16 個常用時區，包括 UTC、美國時區（EST、CST、PST）、歐洲時區（GMT、CET）以及亞太時區（JST、CST、KST、SGT、AEST、NZST）。' },
]

export default function TimezoneConverterPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>時區轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>即時轉換不同時區的時間，附帶即時時鐘顯示。</p>
      <TimezoneConverter labels={{
        sourceTimezone: '來源時區',
        targetTimezone: '目標時區',
        date: '日期',
        time: '時間',
        convertedTime: '轉換結果',
        currentTime: '目前時間',
        timeDifference: '時差',
        swap: '交換',
        hours: '小時',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>從下拉選單中選擇來源時區和目標時區。輸入要轉換的日期和時間，轉換結果會即時顯示在下方，同時顯示兩個時區之間的時差。頂部會顯示兩個時區的當前時間，方便快速參考。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="timezone-converter" locale="zh-tw" />
    </div>
  )
}

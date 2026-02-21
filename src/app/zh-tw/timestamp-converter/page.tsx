import { Metadata } from 'next'
import TimestampConverter from '@/components/tools/TimestampConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '時間戳轉換器 - 免費線上工具 | toolcase',
  description: '在 Unix 時間戳和人類可讀日期之間轉換。免費線上時間戳轉換器，提供即時時鐘、相對時間和 ISO 8601 輸出。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/timestamp-converter',
    languages: {
      en: 'https://toolcase.cc/timestamp-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/timestamp-converter',
    },
  },
}

const faqs = [
  {
    question: '什麼是 Unix 時間戳？',
    answer: 'Unix 時間戳（也稱為 Epoch 時間或 POSIX 時間）是自 1970 年 1 月 1 日 00:00:00 UTC 以來經過的秒數。它是跨不同系統和時區表示時間的通用方式。',
  },
  {
    question: '秒和毫秒有什麼區別？',
    answer: 'Unix 時間戳傳統上以秒為單位（10 位數，例如 1700000000）。許多現代系統如 JavaScript 使用毫秒（13 位數，例如 1700000000000）。此工具會自動偵測你使用的格式。',
  },
  {
    question: '工具會處理時區嗎？',
    answer: '工具會同時顯示你的本地時區和 UTC。將日期轉換為時間戳時，它使用瀏覽器的本地時區。UTC 和 ISO 8601 輸出是時區無關的。',
  },
  {
    question: '什麼是 ISO 8601？',
    answer: 'ISO 8601 是日期和時間表示的國際標準（例如 2024-01-15T10:30:00.000Z）。「Z」後綴表示 UTC 時間。此格式廣泛用於 API 和資料交換。',
  },
]

export default function TimestampConverterPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>時間戳轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        在 Unix 時間戳和人類可讀日期之間轉換，附帶即時時鐘。
      </p>

      <TimestampConverter
        labels={{
          copy: '複製',
          copied: '已複製！',
          currentTime: '目前時間',
          unixToDate: 'Unix 時間戳 → 日期',
          dateToUnix: '日期 → Unix 時間戳',
          timestamp: '時間戳',
          date: '日期',
          seconds: '秒',
          milliseconds: '毫秒',
          localTime: '本地時間',
          utcTime: 'UTC 時間',
          iso8601: 'ISO 8601',
          relative: '相對時間',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何轉換時間戳</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          在第一個區塊輸入 Unix 時間戳（秒或毫秒）以轉換為人類可讀的日期。
          或在第二個區塊使用日期選擇器，將特定日期和時間轉換為 Unix 時間戳。
          頂部的即時時鐘顯示當前的 Unix 時間戳，你可以一鍵複製。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="timestamp-converter" locale="zh-tw" />
    </div>
  )
}

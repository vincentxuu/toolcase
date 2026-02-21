import { Metadata } from 'next'
import UuidGenerator from '@/components/tools/UuidGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'UUID 產生器 - 免費線上工具 | toolcase',
  description: '即時產生 UUID v4 與 ULID 唯一識別碼。支援批次產生，免費線上 UUID 產生器。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/uuid-generator', languages: { en: 'https://toolcase.cc/uuid-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/uuid-generator' } },
}

const faqs = [
  { question: 'UUID 和 ULID 有什麼不同？', answer: 'UUID v4 是依照 RFC 4122 標準隨機產生的 128 位元識別碼，沒有內建的排序功能。ULID（通用唯一可排序識別碼）同樣是 128 位元，但前 48 位元編碼了時間戳記，因此 ULID 可依建立時間排序。ULID 使用 Crockford Base32 編碼，不區分大小寫。' },
  { question: 'UUID v4 真的不會重複嗎？', answer: 'UUID v4 使用 122 個隨機位元，可產生約 5.3 x 10^36 種組合。產生兩個相同 UUID 的機率極低——你需要產生大約 2.71 x 10^18 個 UUID 才有 50% 的碰撞機率。在實際應用中，可以視為唯一不重複。' },
  { question: '什麼時候該用 UUID，什麼時候該用 ULID？', answer: '當你需要廣泛支援的標準識別碼且不需要排序時，使用 UUID v4。當你需要可排序的識別碼時——例如作為資料庫主鍵且插入順序很重要，或在分散式系統中需要按時間排序的 ID——使用 ULID。' },
]

export default function UuidGeneratorPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>UUID 產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>為你的應用程式產生 UUID v4 與 ULID 唯一識別碼。</p>
      <UuidGenerator labels={{
        generateUuid: '產生 UUID',
        generateUlid: '產生 ULID',
        copy: '複製',
        copied: '已複製！',
        bulkGenerate: '批次產生',
        version: '版本資訊',
        uuidV4: 'UUID v4（隨機）',
        ulid: 'ULID（可排序）',
        result: '結果',
        bulkResult: '批次結果',
        count: '數量',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>選擇識別碼類型——UUID v4 或 ULID——然後點擊產生按鈕。結果會立即顯示，可一鍵複製到剪貼簿。使用批次產生功能可一次產生 1、5、10 或 50 個識別碼。所有產生過程都在瀏覽器中完成，使用 Web Crypto API。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="uuid-generator" locale="zh-tw" />
    </div>
  )
}

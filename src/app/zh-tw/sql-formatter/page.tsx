import { Metadata } from 'next'
import SqlFormatter from '@/components/tools/SqlFormatter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'SQL 格式化工具 - 免費線上工具 | toolcase',
  description: '即時格式化和美化 SQL 查詢。將關鍵字大寫，加上適當的縮排和換行，讓 SQL 更易閱讀。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/sql-formatter',
    languages: {
      en: 'https://toolcase.cc/sql-formatter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/sql-formatter',
    },
  },
}

const faqs = [
  {
    question: 'SQL 格式化工具有什麼功能？',
    answer: 'SQL 格式化工具會將 SQL 查詢重新排版，加上適當的縮排、換行，並可選擇將 SQL 關鍵字（如 SELECT、FROM、WHERE、JOIN）轉為大寫。這讓複雜的查詢更容易閱讀和除錯。',
  },
  {
    question: '支援哪些 SQL 方言？',
    answer: '此格式化工具處理適用於大多數方言的標準 SQL 語法，包括 MySQL、PostgreSQL、SQL Server、SQLite 和 Oracle。它專注於格式化結構，而非方言特定功能。',
  },
  {
    question: '我的 SQL 安全嗎？',
    answer: '所有處理都在你的瀏覽器中完成。你的 SQL 查詢不會離開你的裝置——沒有任何資料會被傳送到伺服器。',
  },
]

export default function SqlFormatterPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>SQL 格式化工具</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        在下方貼上你的 SQL 查詢，即時格式化並加上適當的縮排、換行和大寫關鍵字。
      </p>

      <SqlFormatter
        labels={{
          format: '格式化',
          clear: '清除',
          copy: '複製',
          copied: '已複製！',
          input: '在此貼上你的 SQL 查詢...',
          output: '格式化後的 SQL 會顯示在這裡...',
          tabSize: '縮排大小',
          uppercase: '關鍵字大寫',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          將你的 SQL 查詢貼到左側面板，然後點擊「格式化」。工具會加上適當的換行和縮排，讓查詢更容易閱讀。
          你可以切換關鍵字大寫的開關，並選擇 2 或 4 個空格的縮排。格式化後的結果可以一鍵複製。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="sql-formatter" locale="zh-tw" />
    </div>
  )
}

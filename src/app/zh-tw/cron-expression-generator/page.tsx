import { Metadata } from 'next'
import CronGenerator from '@/components/tools/CronGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Cron 表達式產生器 - 免費線上工具 | toolcase',
  description: '視覺化建立與理解 Cron 表達式。免費線上 Cron 產生器，提供預設範本、人類可讀說明和便捷編輯。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/cron-expression-generator',
    languages: {
      en: 'https://toolcase.cc/cron-expression-generator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/cron-expression-generator',
    },
  },
}

const faqs = [
  {
    question: '什麼是 Cron 表達式？',
    answer: 'Cron 表達式是由五個欄位組成的字串，用空格分隔，定義自動任務的排程。欄位依序代表：分鐘、小時、月份中的日期、月份和星期中的日期。',
  },
  {
    question: '* 在 Cron 表達式中代表什麼？',
    answer: '星號（*）是萬用字元，表示「每個」值。例如，分鐘欄位的 * 表示「每分鐘」，星期欄位的 * 表示「每天」。',
  },
  {
    question: '*/5 代表什麼意思？',
    answer: '*/N 語法表示「每 N 個單位」。分鐘欄位的 */5 表示「每 5 分鐘」，小時欄位的 */2 表示「每 2 小時」。',
  },
  {
    question: '可以使用範圍和列表嗎？',
    answer: '可以。使用連字號表示範圍（例如 1-5 表示週一到週五），使用逗號表示列表（例如 1,15 表示每月 1 日和 15 日）。',
  },
]

export default function CronExpressionGeneratorPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Cron 表達式產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        使用預設範本和人類可讀說明，視覺化建立 Cron 表達式。
      </p>

      <CronGenerator
        labels={{
          copy: '複製',
          copied: '已複製！',
          minute: '分鐘',
          hour: '小時',
          dayOfMonth: '日期（月）',
          month: '月份',
          dayOfWeek: '星期',
          expression: '表達式',
          description: '說明',
          presets: '預設範本',
          custom: '自訂',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用 Cron 產生器</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          使用五個輸入欄位自訂 Cron 表達式的各部分，或選擇預設範本開始常見的排程。工具會即時提供人類可讀的說明。
          點擊任何預設按鈕快速設定常見模式，然後根據需要修改各個欄位。
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>Cron 表達式語法</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          標準 Cron 表達式有五個欄位：分鐘（0-59）、小時（0-23）、月份中的日期（1-31）、月份（1-12）和星期（0-6，0 代表週日）。
          特殊字元包括 *（每個）、*/N（每 N 個）、N-M（範圍）和 N,M（列表）。此格式被 Unix/Linux 的 crontab、雲端排程器
          （AWS CloudWatch、Google Cloud Scheduler）和 CI/CD 管線廣泛使用。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="cron-expression-generator" locale="zh-tw" />
    </div>
  )
}

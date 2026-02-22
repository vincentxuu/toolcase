import { Metadata } from 'next'
import DueDateCalculator from '@/components/tools/DueDateCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '預產期計算器 - 免費線上工具 | toolcase',
  description: '根據最後一次月經日期計算預產期。追蹤懷孕週數和孕期階段。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/due-date-calculator', languages: { en: 'https://toolcase.cc/due-date-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/due-date-calculator' } },
}

const faqs = [
  { question: '預產期如何計算？', answer: '預產期是從最後一次月經第一天加上 280 天（40 週），並根據月經週期長度調整。' },
  { question: '這個計算器準確嗎？', answer: '這只是估計值。只有約 5% 的寶寶在預產期當天出生。大多數在前後兩週內出生。' },
  { question: '如果我的週期不是 28 天怎麼辦？', answer: '計算器會根據不同的週期長度進行調整。如果你的週期比 28 天長或短，預產期會相應調整。' },
]

export default function DueDateCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '預產期計算器', url: 'https://toolcase.cc/zh-tw/due-date-calculator' },
        ]}
      />
      <ToolSchema
        name="預產期計算器"
        description="根據最後一次月經日期計算預產期。追蹤懷孕週數和孕期階段。"
        url="https://toolcase.cc/zh-tw/due-date-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '預產期計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>預產期計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>估算預產期並追蹤懷孕進度。</p>
      <DueDateCalculator labels={{ lastPeriod: '最後一次月經第一天', cycleLength: '月經週期長度', days: '天', dueDate: '預估預產期', currentWeek: '目前週數', trimester: '孕期', first: '第一孕期', second: '第二孕期', third: '第三孕期', weeksPregnant: '懷孕週數', daysUntilDue: '距離預產期', conception: '預估受孕日', disclaimer: '本工具僅供參考，請諮詢醫療專業人員獲取準確的醫療建議。' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入最後一次月經第一天的日期和平均月經週期長度。計算器會顯示預估預產期、目前懷孕週數和孕期進度。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="due-date-calculator" locale="zh-tw" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import MultiplicationTable from '@/components/tools/MultiplicationTable'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '九九乘法表 - 互動式乘法對照表 | toolcase',
  description: '互動式九九乘法表，支援 1~19 範圍，點擊格子複製算式。適合學生、家長教學使用。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/multiplication-table', languages: { en: 'https://toolcase.cc/multiplication-table', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/multiplication-table' } },
}

const faqs = [
  { question: '九九乘法表的範圍是多少？', answer: '預設為 1×1 到 9×9，也可以切換到 12×12、15×15 或 19×19 的擴充版本。' },
  { question: '如何複製算式？', answer: '點擊表格中的任何格子，算式（如「3 × 7 = 21」）會自動複製到剪貼簿。' },
]

export default function MultiplicationTablePageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '九九乘法表', url: 'https://toolcase.cc/zh-tw/multiplication-table' },
        ]}
      />
      <ToolSchema
        name="九九乘法表"
        description="互動式九九乘法表，支援 1~19 範圍，點擊格子複製算式。適合學生、家長教學使用。"
        url="https://toolcase.cc/zh-tw/multiplication-table"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '九九乘法表' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>九九乘法表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>互動式乘法對照表，點擊格子即可複製算式，支援擴充到 19×19。</p>
      <MultiplicationTable />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="multiplication-table" locale="zh-tw" />
    </div>
    </>
  )
}

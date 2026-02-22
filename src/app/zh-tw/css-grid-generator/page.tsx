import { Metadata } from 'next'
import CssGridGenerator from '@/components/tools/CssGridGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'CSS Grid 產生器 - 免費線上工具 | toolcase',
  description: '視覺化產生 CSS Grid 佈局。設定欄數、列數、間距和欄寬，支援 fr、px 和 auto 單位，即時預覽帶編號的格子。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/css-grid-generator', languages: { en: 'https://toolcase.cc/css-grid-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css-grid-generator' } },
}

const faqs = [
  { question: '什麼是 CSS Grid？', answer: 'CSS Grid 是一種二維佈局系統，可以建立包含行和列的複雜網頁佈局。不同於只能在一個方向上運作的 Flexbox，Grid 讓您同時控制兩個軸向，非常適合頁面佈局和元件格線。' },
  { question: 'fr、px 和 auto 代表什麼意思？', answer: '「fr」單位代表可用空間的比例（例如 1fr 2fr 表示第二欄寬度是第一欄的兩倍）。「px」設定固定的像素寬度。「auto」根據內容自動調整欄寬。您可以自由混合這些單位來建立彈性佈局。' },
  { question: '可以建立多少欄和列？', answer: '此工具支援 1 到 12 欄和 1 到 12 列，涵蓋了絕大多數格線佈局的需求。您可以為每一欄使用 fr、px 或 auto 單位來定義寬度。' },
]

export default function CssGridGeneratorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'CSS Grid 產生器', url: 'https://toolcase.cc/zh-tw/css-grid-generator' },
        ]}
      />
      <ToolSchema
        name="CSS Grid 產生器"
        description="視覺化產生 CSS Grid 佈局。設定欄數、列數、間距和欄寬，支援 fr、px 和 auto 單位，即時預覽帶編號的格子。"
        url="https://toolcase.cc/zh-tw/css-grid-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'CSS Grid 產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>CSS Grid 產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>視覺化建立 CSS Grid 佈局並複製程式碼。</p>
      <CssGridGenerator labels={{
        columns: '欄數',
        rows: '列數',
        columnGap: '欄間距',
        rowGap: '列間距',
        columnWidths: '欄寬設定',
        preview: '預覽',
        cssCode: 'CSS 程式碼',
        copy: '複製',
        copied: '已複製！',
        fr: 'fr',
        px: 'px',
        auto: 'auto',
        unitLabel: '單位',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>用滑桿設定欄數和列數。調整欄間距和列間距來控制間隔。為每一欄選擇 fr（比例）、px（固定）或 auto 單位來定義寬度。視覺化格線預覽會即時更新，顯示帶編號的格子。完成後複製 CSS 程式碼到您的專案中使用。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="css-grid-generator" locale="zh-tw" />
    </div>
    </>
  )
}

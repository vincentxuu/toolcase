import { Metadata } from 'next'
import MarkdownPreview from '@/components/tools/MarkdownPreview'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Markdown 預覽 - 免費線上工具 | toolcase',
  description: '撰寫 Markdown 並即時預覽渲染後的 HTML。免費線上 Markdown 編輯器和預覽工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/dev/markdown-preview', languages: { en: 'https://toolcase.cc/dev/markdown-preview', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/markdown-preview' } },
}

const faqs = [
  { question: '什麼是 Markdown？', answer: 'Markdown 是一種輕量級標記語言，讓你用簡單的語法來格式化文字。它廣泛用於文件、README 檔案、部落格等。常見語法包括 # 代表標題、** 代表粗體、* 代表斜體、- 代表列表。' },
  { question: '預覽會即時更新嗎？', answer: '會的！當你在輸入區域輸入或編輯 Markdown 時，渲染後的 HTML 預覽會即時更新，讓你可以立即看到內容的呈現效果。' },
  { question: '支援哪些 Markdown 功能？', answer: '預覽器支援標準 Markdown 功能，包括標題、粗體、斜體、連結、圖片、程式碼區塊、引用、有序和無序列表、水平線等。' },
]

export default function MarkdownPreviewPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'Markdown 預覽', url: 'https://toolcase.cc/zh-tw/dev/markdown-preview' },
        ]}
      />
      <ToolSchema
        name="Markdown 預覽"
        description="撰寫 Markdown 並即時預覽渲染後的 HTML。免費線上 Markdown 編輯器和預覽工具。"
        url="https://toolcase.cc/zh-tw/dev/markdown-preview"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'Markdown 預覽' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Markdown 預覽</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>撰寫 Markdown 並即時預覽渲染後的 HTML。</p>
      <MarkdownPreview labels={{ input: '輸入 Markdown', preview: '預覽', inputPlaceholder: '在此輸入 Markdown...' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在左側輸入區域輸入或貼上 Markdown 內容，右側會即時顯示渲染後的 HTML 預覽。支援標準 Markdown 語法，包括標題、列表、連結、程式碼區塊等。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="markdown-preview" locale="zh-tw" />
    </div>
    </>
  )
}

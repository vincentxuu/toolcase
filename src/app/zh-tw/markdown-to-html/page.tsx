import { Metadata } from 'next'
import MarkdownToHtml from '@/components/tools/MarkdownToHtml'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Markdown 轉 HTML 轉換器 - 免費線上工具 | toolcase',
  description: '將 Markdown 文字轉換為乾淨的 HTML 原始碼。免費線上 Markdown 轉 HTML 工具，適合開發者與內容創作者使用。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/markdown-to-html', languages: { en: 'https://toolcase.cc/markdown-to-html', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/markdown-to-html' } },
}

const faqs = [
  { question: '什麼是 Markdown？', answer: 'Markdown 是由 John Gruber 於 2004 年建立的輕量級標記語言。它使用簡單的文字格式語法——如 # 表示標題、** 表示粗體、- 表示清單——可輕鬆轉換為 HTML。Markdown 廣泛用於技術文件、README 檔案、論壇及內容管理系統，因為它易讀易寫。' },
  { question: '這個工具和 Markdown 預覽有什麼不同？', answer: 'Markdown 預覽會將你的 Markdown 渲染為格式化的視覺預覽，讓你看到它在瀏覽器中的呈現效果。而這個 Markdown 轉 HTML 工具則輸出由 Markdown 產生的原始 HTML 程式碼。當你需要將 HTML 標記貼到網站、電子郵件模板或接受 HTML 的 CMS 時，請使用此工具。' },
  { question: '支援哪些 Markdown 功能？', answer: '本轉換器支援標題（h1-h6）、粗體、斜體、粗斜體、行內程式碼、圍欄式程式碼區塊（含語言提示）、無序與有序清單、引用區塊、水平線、連結和圖片。它產生乾淨、語義化的 HTML，不含行內樣式或不必要的屬性。' },
]

export default function MarkdownToHtmlPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Markdown 轉 HTML 轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>將 Markdown 文字轉換為乾淨的 HTML 原始碼。</p>
      <MarkdownToHtml labels={{
        inputPlaceholder: '輸入 Markdown 文字...',
        input: 'Markdown',
        output: 'HTML 輸出',
        copy: '複製',
        copied: '已複製！',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在左側面板輸入或貼上 Markdown 文字，對應的 HTML 原始碼會即時顯示在右側面板。點擊複製按鈕可將 HTML 輸出複製到剪貼簿。轉換器支援標題、粗體、斜體、清單、程式碼區塊、引用、連結等語法。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="markdown-to-html" locale="zh-tw" />
    </div>
  )
}

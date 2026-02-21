import { Metadata } from 'next'
import MetaTagGenerator from '@/components/tools/MetaTagGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Meta 標籤產生器 - 免費線上工具 | toolcase',
  description: '產生 SEO 優化的 HTML Meta 標籤，包含標題、描述、Open Graph 和 robots 設定。免費 Meta Tag 產生器。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/meta-tag-generator', languages: { en: 'https://toolcase.cc/meta-tag-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/meta-tag-generator' } },
}

const faqs = [
  { question: 'Meta 標籤對 SEO 有多重要？', answer: 'Meta 標籤是搜尋引擎了解網頁內容的重要依據。標題標籤（title）和描述標籤（meta description）會直接顯示在 Google 搜尋結果中，影響使用者的點擊意願。適當的 Meta 標籤可以提升網站在搜尋結果中的表現。' },
  { question: '標題和描述的建議長度是多少？', answer: '標題建議在 50-60 個字元以內，描述建議在 150-160 個字元以內。超過這個長度的文字在搜尋結果中會被截斷。本工具會即時顯示長度，並提供 Google 搜尋預覽，幫助您控制字數。' },
  { question: 'robots 標籤的 index 和 noindex 有什麼差別？', answer: 'index 允許搜尋引擎索引該頁面，noindex 則告訴搜尋引擎不要將該頁面加入搜尋結果。類似地，follow 允許搜尋引擎追蹤頁面上的連結，nofollow 則不追蹤。一般公開頁面應使用 index, follow。' },
]

export default function MetaTagGeneratorPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Meta 標籤產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>產生 SEO 優化的 HTML Meta 標籤，提升網站搜尋排名。</p>
      <MetaTagGenerator labels={{ pageTitle: '頁面標題', metaDescription: 'Meta 描述', keywords: '關鍵字', author: '作者', robots: '機器人', index: '索引', noindex: '不索引', follow: '追蹤', nofollow: '不追蹤', canonicalUrl: '標準網址', ogImage: 'OG 圖片網址', serpPreview: 'Google 搜尋預覽', generatedCode: '產生的 Meta 標籤', copy: '複製', copied: '已複製！', titleLength: '標題長度', descLength: '描述長度' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>填入頁面標題、描述、關鍵字等資訊，工具會即時產生對應的 HTML Meta 標籤程式碼。您可以在 Google 搜尋預覽區確認在搜尋結果中的顯示效果。設定 robots 標籤控制搜尋引擎的索引行為，填入 OG 圖片網址以優化社群分享效果。完成後一鍵複製程式碼，貼到您網頁的 &lt;head&gt; 區段中。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="meta-tag-generator" locale="zh-tw" />
    </div>
  )
}

import { Metadata } from 'next'
import OpenGraphPreview from '@/components/tools/OpenGraphPreview'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Open Graph 預覽 - 免費線上工具 | toolcase',
  description: '預覽網頁在 Facebook、Twitter 和 LinkedIn 等社群平台分享時的顯示效果，並產生 OG Meta 標籤。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/open-graph-preview', languages: { en: 'https://toolcase.cc/open-graph-preview', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/open-graph-preview' } },
}

const faqs = [
  { question: '什麼是 Open Graph 協定？', answer: 'Open Graph（OG）是 Facebook 提出的協定，讓網頁可以透過 Meta 標籤控制在社群平台分享時的標題、描述和圖片。Twitter、LinkedIn 等平台也支援 OG 標籤，是社群行銷的重要工具。' },
  { question: '為什麼分享的連結沒有顯示圖片？', answer: '通常是因為網頁缺少 og:image 標籤，或圖片網址無法存取。建議圖片尺寸至少為 1200x630 像素，使用 HTTPS 連結，並確保圖片檔案大小不超過 5MB。使用本工具可以事先預覽確認效果。' },
  { question: 'Facebook 和 Twitter 的 OG 標籤有什麼不同？', answer: 'Facebook 使用標準的 og: 標籤，而 Twitter 有自己的 twitter:card 標籤系統。不過 Twitter 在找不到自己的標籤時會自動使用 og: 標籤作為備用。建議兩種都設定以獲得最佳效果。' },
]

export default function OpenGraphPreviewPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Open Graph 預覽</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>預覽網頁在社群平台分享時的顯示效果。</p>
      <OpenGraphPreview labels={{ title: '標題', description: '描述', imageUrl: '圖片網址', url: '網址', siteName: '網站名稱', facebookPreview: 'Facebook 預覽', twitterPreview: 'Twitter 預覽', linkedinPreview: 'LinkedIn 預覽', metaTags: 'Meta 標籤', copy: '複製', copied: '已複製！' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>填入標題、描述、圖片網址和網站資訊，即可即時預覽在 Facebook、Twitter 和 LinkedIn 上分享時的卡片效果。確認預覽滿意後，複製產生的 Meta 標籤程式碼，貼到您網頁的 &lt;head&gt; 區段中。這樣可以確保您的內容在社群平台上有最佳的呈現效果。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="open-graph-preview" locale="zh-tw" />
    </div>
  )
}

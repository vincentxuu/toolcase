import { Metadata } from 'next'
import FaviconGenerator from '@/components/tools/FaviconGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Favicon 產生器 - 免費線上工具 | toolcase',
  description: '從圖片或文字產生所有標準尺寸的 Favicon 圖示，附帶可直接使用的 HTML 標籤。免費線上工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/favicon-generator', languages: { en: 'https://toolcase.cc/favicon-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/favicon-generator' } },
}

const faqs = [
  { question: 'Favicon 需要哪些尺寸？', answer: '現代瀏覽器和裝置使用不同尺寸：16x16 和 32x32 用於瀏覽器分頁和書籤，48x48 用於 Windows 捷徑，180x180 用於 Apple 裝置，192x192 和 512x512 用於 Android 和 PWA。' },
  { question: '可以用文字或表情符號建立 Favicon 嗎？', answer: '可以。在文字輸入欄位中輸入任何文字或表情符號（最多 2 個字元），然後點擊產生。工具會在畫布上渲染並自動產生所有需要的尺寸。' },
  { question: '如何將 Favicon 加入網站？', answer: '下載產生的圖示並放入網站的公開資料夾中，然後複製提供的 HTML 標籤並貼到 HTML 的 <head> 區段中。瀏覽器會自動選擇合適的尺寸。' },
]

export default function FaviconGeneratorPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Favicon 產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>從圖片或文字產生所有標準尺寸的 Favicon 圖示，附帶 HTML 標籤。</p>
      <FaviconGenerator labels={{ uploadImage: '上傳圖片', orUseText: '或使用文字/表情符號', textInput: '文字 / 表情符號', generate: '產生 Favicon', download: '下載', downloadAll: '全部下載', preview: '預覽', htmlTags: 'HTML 標籤', copyTags: '複製標籤', copied: '已複製！', sourceImage: '來源圖片' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>上傳圖片或輸入文字/表情符號作為 Favicon 的來源。點擊「產生 Favicon」建立所有標準尺寸（16x16 到 512x512）。預覽各尺寸效果，個別下載圖示，並複製 HTML 標籤貼到網站的 &lt;head&gt; 區段中。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="favicon-generator" locale="zh-tw" />
    </div>
  )
}

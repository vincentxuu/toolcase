import { Metadata } from 'next'
import ImageConverter from '@/components/tools/ImageConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '圖片格式轉換 - 免費線上工具 | toolcase',
  description: '線上轉換圖片格式，支援 JPEG、PNG、WebP 等格式互轉。免費圖片轉檔工具，快速又簡單。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/image-converter', languages: { en: 'https://toolcase.cc/image-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/image-converter' } },
}

const faqs = [
  { question: '支援哪些圖片格式轉換？', answer: '支援在 JPEG、PNG、WebP 等常見圖片格式之間互相轉換。例如，您可以將 PNG 轉為 JPEG 以減少檔案大小，或將 JPEG 轉為 WebP 以獲得更好的網頁效能。' },
  { question: 'WebP 格式有什麼優勢？', answer: 'WebP 是 Google 開發的圖片格式，相較於 JPEG 和 PNG，在相同畫質下檔案大小更小。目前所有主流瀏覽器都已支援 WebP，非常適合用於網頁和部落格。' },
  { question: '轉換圖片會損失畫質嗎？', answer: '從無損格式（如 PNG）轉為有損格式（如 JPEG）時會有些微畫質損失，但通常肉眼難以察覺。從有損格式轉為無損格式則不會進一步損失畫質，但也無法恢復原本已損失的細節。' },
]

export default function ImageConverterPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>圖片格式轉換</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>輕鬆將圖片轉換為不同格式。</p>
      <ImageConverter labels={{ uploadImage: '上傳圖片', outputFormat: '輸出格式', preview: '預覽', download: '下載', convert: '轉換' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>上傳您要轉換的圖片，選擇目標輸出格式，然後點擊轉換。您可以在預覽區確認結果，滿意後點擊下載即可取得轉換後的圖片。所有處理皆在您的瀏覽器中完成，圖片不會上傳到任何伺服器。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="image-converter" locale="zh-tw" />
    </div>
  )
}

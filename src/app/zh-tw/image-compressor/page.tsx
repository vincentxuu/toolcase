import { Metadata } from 'next'
import ImageCompressor from '@/components/tools/ImageCompressor'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '圖片壓縮 - 免費線上工具 | toolcase',
  description: '線上壓縮圖片檔案大小，支援調整品質與格式。免費圖片壓縮工具，在瀏覽器中即可完成。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/image-compressor', languages: { en: 'https://toolcase.cc/image-compressor', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/image-compressor' } },
}

const faqs = [
  { question: '壓縮圖片會影響畫質嗎？', answer: '壓縮會在檔案大小和畫質之間取得平衡。將品質設定在 70-80% 通常可以大幅減少檔案大小，同時維持肉眼幾乎看不出差異的畫質。您可以透過預覽功能比較壓縮前後的效果。' },
  { question: '支援哪些圖片格式？', answer: '支援常見的圖片格式，包括 JPEG、PNG 和 WebP。您也可以在壓縮時選擇不同的輸出格式，例如將 PNG 轉換為 WebP 以獲得更小的檔案大小。' },
  { question: '圖片會被上傳到伺服器嗎？', answer: '不會。所有圖片壓縮處理完全在您的瀏覽器中進行，圖片不會離開您的裝置，確保您的圖片隱私安全。' },
]

export default function ImageCompressorPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>圖片壓縮</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>壓縮圖片檔案大小，支援調整品質與輸出格式。</p>
      <ImageCompressor labels={{ uploadImage: '上傳圖片', quality: '品質', format: '格式', originalSize: '原始大小', compressedSize: '壓縮後大小', savings: '節省', download: '下載', preview: '預覽', compress: '壓縮' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>點擊上傳圖片或將圖片拖曳到上傳區域，調整品質滑桿和輸出格式後點擊壓縮。工具會顯示原始大小、壓縮後大小及節省的百分比。您可以預覽壓縮效果，滿意後點擊下載。所有處理皆在瀏覽器本機完成，圖片不會上傳到伺服器。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="image-compressor" locale="zh-tw" />
    </div>
  )
}

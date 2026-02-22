import { Metadata } from 'next'
import WebpConverter from '@/components/tools/WebpConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'WebP 轉換器 - WebP、PNG、JPG 格式互轉 | toolcase',
  description: '在瀏覽器中轉換 WebP、PNG 和 JPG 圖片格式。調整品質並比較檔案大小。無需上傳，100% 隱私。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/webp-converter', languages: { en: 'https://toolcase.cc/webp-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/webp-converter' } },
}

const faqs = [
  { question: '為什麼要使用 WebP 格式？', answer: 'WebP 提供比 PNG 和 JPG 更優秀的壓縮效果，在相似的視覺品質下產生更小的檔案大小。支援有損和無損壓縮、透明度和動畫。' },
  { question: '轉換是在本地完成的嗎？', answer: '是的！所有處理都在您的瀏覽器中使用 Canvas API 進行。您的圖片不會上傳到任何伺服器。' },
]

export default function WebpConverterPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>WebP 轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>在 WebP、PNG 和 JPG 格式之間轉換圖片。調整品質並比較檔案大小。</p>
      <WebpConverter labels={{ upload: '上傳圖片', dragDrop: '拖放圖片至此', orClick: '或點擊瀏覽', outputFormat: '輸出格式', quality: '品質', convert: '轉換', download: '下載', reset: '重設', original: '原始', converted: '已轉換', fileSize: '檔案大小' }} />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="webp-converter" locale="zh-tw" />
    </div>
  )
}

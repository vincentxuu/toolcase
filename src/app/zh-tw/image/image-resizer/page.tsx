import { Metadata } from 'next'
import ImageResizer from '@/components/tools/ImageResizer'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '圖片縮放 - 免費線上工具 | toolcase',
  description: '線上調整圖片尺寸，支援鎖定比例與自訂寬高。免費圖片縮放工具，在瀏覽器中即可完成。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/image/image-resizer', languages: { en: 'https://toolcase.cc/image/image-resizer', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/image/image-resizer' } },
}

const faqs = [
  { question: '放大圖片會影響畫質嗎？', answer: '將圖片放大超過原始尺寸可能會導致模糊，因為瀏覽器需要插值產生新的像素。縮小圖片通常能維持良好品質。建議使用最高解析度的原始圖片。' },
  { question: '支援哪些圖片格式？', answer: '支援瀏覽器能讀取的所有格式，包括 PNG、JPEG、WebP、GIF 和 BMP。縮放後的圖片以 PNG 格式輸出，以確保品質。' },
  { question: '圖片會被上傳到伺服器嗎？', answer: '不會。所有處理完全在您的瀏覽器中使用 Canvas API 完成，圖片不會離開您的裝置，確保隱私安全。' },
]

export default function ImageResizerPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '圖片縮放', url: 'https://toolcase.cc/zh-tw/image/image-resizer' },
        ]}
      />
      <ToolSchema
        name="圖片縮放"
        description="線上調整圖片尺寸，支援鎖定比例與自訂寬高。免費圖片縮放工具，在瀏覽器中即可完成。"
        url="https://toolcase.cc/zh-tw/image/image-resizer"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '圖片縮放' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>圖片縮放</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>調整圖片尺寸，支援鎖定比例與自訂寬高。</p>
      <ImageResizer labels={{ uploadImage: '上傳圖片', width: '寬度', height: '高度', lockAspectRatio: '鎖定比例', resize: '縮放', download: '下載', preview: '預覽', originalSize: '原始大小', newSize: '新大小', originalDimensions: '原始尺寸', newDimensions: '新尺寸' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>點擊「上傳圖片」選擇檔案，工具會顯示原始尺寸與檔案大小。輸入新的寬度和高度，啟用「鎖定比例」時，調整一個維度會自動計算另一個。點擊「縮放」產生新圖片，預覽滿意後即可下載。所有處理皆在瀏覽器本機完成。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="image-resizer" locale="zh-tw" />
    </div>
    </>
  )
}

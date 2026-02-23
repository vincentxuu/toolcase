import { Metadata } from 'next'
import ImageCropper from '@/components/tools/ImageCropper'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '圖片裁切 - 免費線上工具 | toolcase',
  description: '線上裁切圖片，支援旋轉和縮放功能。免費圖片裁切工具，輕鬆調整圖片大小和構圖。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/image/image-cropper', languages: { en: 'https://toolcase.cc/image/image-cropper', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/image/image-cropper' } },
}

const faqs = [
  { question: '可以裁切成特定比例嗎？', answer: '可以。工具支援自由裁切以及常用的比例，您可以根據需求選擇 1:1（正方形）、16:9（寬螢幕）、4:3 等比例，非常適合製作社群媒體大頭貼或封面圖片。' },
  { question: '裁切後的圖片品質會下降嗎？', answer: '裁切本身不會降低圖片品質，只是選取圖片的一部分。不過最終輸出的解析度會根據裁切範圍而變小。建議使用高解析度的原始圖片以獲得最佳效果。' },
  { question: '除了裁切還有其他功能嗎？', answer: '除了裁切，還支援旋轉和縮放功能。您可以調整旋轉角度來修正歪斜的照片，也可以縮放來精確控制裁切範圍。' },
]

export default function ImageCropperPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '圖片裁切', url: 'https://toolcase.cc/zh-tw/image/image-cropper' },
        ]}
      />
      <ToolSchema
        name="圖片裁切"
        description="線上裁切圖片，支援旋轉和縮放功能。免費圖片裁切工具，輕鬆調整圖片大小和構圖。"
        url="https://toolcase.cc/zh-tw/image/image-cropper"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '圖片裁切' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>圖片裁切</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>裁切、旋轉和縮放圖片，輕鬆調整構圖。</p>
      <ImageCropper labels={{ uploadImage: '上傳圖片', rotation: '旋轉', scale: '縮放', download: '下載', reset: '重置' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>上傳圖片後，拖曳裁切框來選擇要保留的區域。使用旋轉滑桿調整角度，縮放滑桿調整大小。完成後點擊下載即可取得裁切後的圖片。如果需要重新調整，點擊重置可以回到原始狀態。所有處理皆在瀏覽器本機完成。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="image-cropper" locale="zh-tw" />
    </div>
    </>
  )
}

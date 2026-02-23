import { Metadata } from 'next'
import Base64ImageConverter from '@/components/tools/Base64ImageConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Base64 圖片轉換 - 圖片轉 Base64 與 Base64 轉圖片 | toolcase',
  description: '將圖片轉換為 Base64 資料 URL，或將 Base64 解碼回圖片。預覽圖片、查看尺寸和檔案大小。免費瀏覽器工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/image/base64-image-converter', languages: { en: 'https://toolcase.cc/image/base64-image-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/image/base64-image-converter' } },
}

const faqs = [
  { question: '什麼是圖片的 Base64 編碼？', answer: 'Base64 編碼將二進位圖片資料轉換為 ASCII 文字格式。這樣可以直接將圖片嵌入 HTML、CSS 或 JSON 中，而無需單獨的檔案請求。資料 URI 格式（data:image/png;base64,...）在網頁開發中很常用。' },
  { question: '我應該何時使用 Base64 圖片？', answer: 'Base64 圖片適合用於小圖示、內嵌 SVG、電子郵件模板，或需要在 CSS/JavaScript 中嵌入圖片時。但是，它們會使檔案大小增加約 33%，不建議用於大圖片或照片。' },
  { question: '如何將 Base64 轉回圖片？', answer: '將 Base64 字串（包括 data:image 前綴）貼到「貼上 Base64」欄位中，然後點擊轉換。工具會解碼並顯示圖片預覽。您可以右鍵點擊預覽來儲存圖片。' },
  { question: '我的圖片資料安全嗎？', answer: '是的！所有轉換完全在您的瀏覽器中使用 JavaScript 進行。您的圖片永遠不會上傳到任何伺服器，確保完全的隱私和安全。' },
]

export default function Base64ImageConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: 'Base64 圖片轉換', url: 'https://toolcase.cc/zh-tw/image/base64-image-converter' },
        ]}
      />
      <ToolSchema
        name="Base64 圖片轉換"
        description="將圖片轉換為 Base64 資料 URL，或將 Base64 解碼回圖片。預覽圖片、查看尺寸和檔案大小。免費瀏覽器工具。"
        url="https://toolcase.cc/zh-tw/image/base64-image-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'Base64 圖片轉換' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Base64 圖片轉換</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>將圖片轉換為 Base64 資料 URL，並預覽 Base64 編碼的圖片。</p>
      <Base64ImageConverter
        labels={{
          title: 'Base64 圖片轉換',
          uploadImage: '上傳圖片',
          pasteBase64: '貼上 Base64 進行解碼',
          base64Output: 'Base64 輸出',
          imagePreview: '圖片預覽',
          convert: '轉換為圖片',
          clear: '清除',
          copy: '複製',
          copied: '已複製！',
          imageInfo: '圖片資訊',
          fileName: '檔案名稱',
          fileSize: '檔案大小',
          dimensions: '尺寸',
          invalidImage: '無效的圖片檔案',
          invalidBase64: '無效的 Base64 圖片資料',
          noImage: '未載入圖片',
          selectImage: '選擇要轉換為 Base64 的圖片檔案',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
          <strong>圖片轉 Base64：</strong>點擊「選擇要轉換為 Base64 的圖片檔案」上傳任何圖片（PNG、JPG、GIF、WebP 等）。工具會將其轉換為 Base64 資料 URL 並顯示編碼字串。您可以複製 Base64 字串用於 HTML、CSS 或 JavaScript。
        </p>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          <strong>Base64 轉圖片：</strong>將 Base64 字串貼到文字區域（可包含或不包含 data:image 前綴），然後點擊「轉換為圖片」。工具會解碼並顯示圖片預覽。右鍵點擊預覽以儲存圖片。
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="base64-image-converter" locale="zh-tw" />
    </div>
    </>
  )
}

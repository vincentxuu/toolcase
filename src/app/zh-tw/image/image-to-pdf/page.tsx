import { Metadata } from 'next'
import ImageToPdf from '@/components/tools/ImageToPdf'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '圖片轉 PDF - 免費線上工具 | toolcase',
  description: '將多張圖片合併轉換為 PDF 檔案。免費線上圖片轉 PDF 工具，支援拖曳排序。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/image/image-to-pdf', languages: { en: 'https://toolcase.cc/image/image-to-pdf', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/image/image-to-pdf' } },
}

const faqs = [
  { question: '可以一次轉換多張圖片嗎？', answer: '可以。您可以上傳多張圖片，工具會將所有圖片按順序合併成一個 PDF 檔案。每張圖片會佔一頁，您也可以拖曳調整圖片順序。' },
  { question: '支援哪些圖片格式？', answer: '支援常見的圖片格式，包括 JPEG、PNG、WebP 等。您可以混合不同格式的圖片，工具會統一處理並產生 PDF。' },
  { question: '產生的 PDF 檔案大小會很大嗎？', answer: '檔案大小取決於原始圖片的品質和數量。如果需要較小的 PDF，建議先使用圖片壓縮工具降低圖片大小，再進行轉換。' },
]

export default function ImageToPdfPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '圖片轉 PDF', url: 'https://toolcase.cc/zh-tw/image/image-to-pdf' },
        ]}
      />
      <ToolSchema
        name="圖片轉 PDF"
        description="將多張圖片合併轉換為 PDF 檔案。免費線上圖片轉 PDF 工具，支援拖曳排序。"
        url="https://toolcase.cc/zh-tw/image/image-to-pdf"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '圖片轉 PDF' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>圖片轉 PDF</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>將多張圖片合併轉換為 PDF 檔案。</p>
      <ImageToPdf labels={{ uploadImages: '上傳圖片', addImages: '新增圖片', removeAll: '全部移除', printAsPdf: '列印為 PDF', noImages: '尚未上傳圖片' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>點擊上傳圖片或將圖片拖曳到上傳區域，可以一次上傳多張圖片。上傳後可以拖曳調整順序，或點擊新增圖片繼續添加。確認排列順序後，點擊「列印為 PDF」即可產生 PDF 檔案。如需重新開始，可以點擊「全部移除」清除所有圖片。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="image-to-pdf" locale="zh-tw" />
    </div>
    </>
  )
}

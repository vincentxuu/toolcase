import { Metadata } from 'next'
import PdfTools from '@/components/tools/PdfTools'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'PDF 工具 - 免費線上工具 | toolcase',
  description: '線上檢視 PDF 檔案，查看檔案資訊並下載。免費 PDF 工具，無需安裝任何軟體。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/pdf-tools', languages: { en: 'https://toolcase.cc/pdf-tools', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/pdf-tools' } },
}

const faqs = [
  { question: '這個工具可以做什麼？', answer: '您可以上傳 PDF 檔案查看基本資訊（如檔案名稱和大小），在新分頁中開啟預覽，以及下載檔案。如需合併或拆分 PDF，可以使用瀏覽器內建的列印功能。' },
  { question: 'PDF 檔案會被上傳到伺服器嗎？', answer: '不會。所有操作都在您的瀏覽器中完成，PDF 檔案不會離開您的裝置。您可以安心處理包含機密資訊的文件。' },
  { question: '有檔案大小限制嗎？', answer: '因為處理完全在瀏覽器中進行，實際限制取決於您裝置的記憶體。一般來說，100MB 以內的 PDF 檔案都可以順利處理。非常大的檔案可能會讓瀏覽器運行較慢。' },
]

export default function PdfToolsPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'PDF 工具', url: 'https://toolcase.cc/zh-tw/pdf-tools' },
        ]}
      />
      <ToolSchema
        name="PDF 工具"
        description="線上檢視 PDF 檔案，查看檔案資訊並下載。免費 PDF 工具，無需安裝任何軟體。"
        url="https://toolcase.cc/zh-tw/pdf-tools"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'PDF 工具' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>PDF 工具</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>線上檢視 PDF 檔案資訊，預覽和下載。</p>
      <PdfTools labels={{ uploadPdf: '上傳 PDF', fileName: '檔案名稱', fileSize: '檔案大小', openInNewTab: '在新分頁開啟', download: '下載', note: '提示：如需合併或拆分 PDF，請使用瀏覽器的列印功能。' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>點擊上傳或將 PDF 檔案拖曳到上傳區域。上傳後可以查看檔案名稱和大小等資訊，點擊「在新分頁開啟」可以在瀏覽器中預覽 PDF 內容，也可以直接下載檔案。所有操作都在瀏覽器本機完成，不需要安裝額外軟體。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="pdf-tools" locale="zh-tw" />
    </div>
    </>
  )
}

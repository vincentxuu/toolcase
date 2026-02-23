import { Metadata } from 'next'
import Base64Tool from '@/components/tools/Base64Tool'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Base64 編碼/解碼器 - 免費線上工具 | toolcase',
  description: '線上 Base64 編碼與解碼工具。支援文字和檔案的 Base64 轉換，快速安全。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/dev/base64-encoder-decoder', languages: { en: 'https://toolcase.cc/dev/base64-encoder-decoder', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/base64-encoder-decoder' } },
}

const faqs = [
  { question: '什麼是 Base64 編碼？', answer: 'Base64 是一種將二進位資料轉換為 ASCII 文字的編碼方式。它使用 A-Z、a-z、0-9、+ 和 / 共 64 個字元來表示資料。常用於在電子郵件、URL 或 JSON 中嵌入圖片或其他二進位資料。' },
  { question: 'Base64 是加密嗎？', answer: '不是。Base64 是編碼（encoding），不是加密（encryption）。任何人都可以輕鬆地將 Base64 解碼回原始資料。它的目的是確保資料在傳輸過程中不被損壞，而不是保護資料的安全性。' },
  { question: 'Base64 編碼後檔案會變大嗎？', answer: '是的，Base64 編碼會使資料大小增加約 33%。這是因為每 3 個位元組的資料會被轉換成 4 個 Base64 字元。因此，對於大型檔案，直接傳輸二進位格式通常更有效率。' },
]

export default function Base64ToolPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'Base64 編碼/解碼器', url: 'https://toolcase.cc/zh-tw/dev/base64-encoder-decoder' },
        ]}
      />
      <ToolSchema
        name="Base64 編碼/解碼器"
        description="線上 Base64 編碼與解碼工具。支援文字和檔案的 Base64 轉換，快速安全。"
        url="https://toolcase.cc/zh-tw/dev/base64-encoder-decoder"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'Base64 編碼/解碼器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Base64 編碼/解碼器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>快速進行 Base64 編碼與解碼，支援文字和檔案。</p>
      <Base64Tool labels={{ input: '輸入', output: '輸出', encode: '編碼', decode: '解碼', uploadFile: '上傳檔案', copy: '複製', copied: '已複製！', invalidBase64: '無效的 Base64' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在輸入框中貼上要編碼的文字或 Base64 字串，選擇「編碼」或「解碼」操作。您也可以上傳檔案進行 Base64 編碼。轉換結果可一鍵複製。所有處理都在瀏覽器中完成，資料不會上傳至伺服器。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="base64-encoder-decoder" locale="zh-tw" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import UrlEncodeDecode from '@/components/tools/UrlEncodeDecode'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'URL 編碼/解碼器 - 免費線上工具 | toolcase',
  description: '線上 URL 編碼與解碼工具。將特殊字元轉換為百分比編碼格式，或將編碼還原為可讀文字。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/dev/url-encoder-decoder', languages: { en: 'https://toolcase.cc/dev/url-encoder-decoder', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/url-encoder-decoder' } },
}

const faqs = [
  { question: '什麼是 URL 編碼？', answer: 'URL 編碼（又稱百分比編碼）是將 URL 中不允許使用的字元轉換為 % 加兩位十六進位數字的格式。例如空格會被編碼為 %20，中文字元也會被編碼。這確保 URL 能在所有瀏覽器和伺服器中正確傳輸。' },
  { question: '為什麼需要 URL 編碼？', answer: 'URL 只能包含特定的 ASCII 字元。中文、空格、特殊符號等字元如果直接出現在 URL 中可能會導致錯誤。URL 編碼確保這些字元能被安全地傳輸和正確地解析。例如在 API 請求中傳遞中文參數時就需要編碼。' },
  { question: 'encodeURI 和 encodeURIComponent 有什麼不同？', answer: 'encodeURI 用於編碼完整的 URI，會保留 :、/、?、# 等 URI 結構字元不進行編碼。encodeURIComponent 則會編碼所有特殊字元，適用於編碼 URI 的某個部分（如查詢參數的值）。使用時要根據需求選擇正確的方法。' },
]

export default function UrlEncodeDecodePageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'URL 編碼/解碼器', url: 'https://toolcase.cc/zh-tw/dev/url-encoder-decoder' },
        ]}
      />
      <ToolSchema
        name="URL 編碼/解碼器"
        description="線上 URL 編碼與解碼工具。將特殊字元轉換為百分比編碼格式，或將編碼還原為可讀文字。"
        url="https://toolcase.cc/zh-tw/dev/url-encoder-decoder"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'URL 編碼/解碼器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>URL 編碼/解碼器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>快速進行 URL 編碼與解碼轉換。</p>
      <UrlEncodeDecode labels={{ input: '輸入', output: '輸出', encode: '編碼', decode: '解碼', encodeUri: '編碼 URI', decodeUri: '解碼 URI', copy: '複製', copied: '已複製！' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在輸入框中貼上要編碼的文字或已編碼的 URL 字串，選擇適當的操作按鈕進行轉換。支援一般編碼/解碼和 URI 編碼/解碼兩種模式。轉換結果可一鍵複製到剪貼簿。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="url-encoder-decoder" locale="zh-tw" />
    </div>
    </>
  )
}

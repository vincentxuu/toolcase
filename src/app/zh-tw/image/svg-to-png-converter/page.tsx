import { Metadata } from 'next'
import SvgToPngConverter from '@/components/tools/SvgToPngConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'SVG 轉 PNG 轉換器 - 免費線上工具 | toolcase',
  description: '即時將 SVG 檔案轉換為高品質 PNG 圖片。上傳或貼上 SVG 程式碼，選擇輸出倍率（1x-4x），預覽後下載 PNG。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/image/svg-to-png-converter', languages: { en: 'https://toolcase.cc/image/svg-to-png-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/image/svg-to-png-converter' } },
}

const faqs = [
  { question: '為什麼要將 SVG 轉換為 PNG？', answer: '雖然 SVG 具有良好的縮放性，但某些平台和應用程式僅支援 PNG 等點陣圖格式。轉換為 PNG 可確保在電子郵件、社群媒體和舊版軟體中的相容性。' },
  { question: '倍率選項有什麼作用？', answer: '倍率選項會將輸出解析度乘以相應倍數。例如，若 SVG 為 100x100 像素，選擇 2x 將產生 200x200 的 PNG。較高倍率可為 Retina 螢幕或列印提供更清晰的圖片。' },
  { question: '我的 SVG 資料安全嗎？', answer: '是的。所有轉換完全在您的瀏覽器中使用 Canvas API 進行。您的 SVG 檔案不會上傳到任何伺服器，確保完全的隱私。' },
]

export default function SvgToPngConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'SVG 轉 PNG 轉換器', url: 'https://toolcase.cc/zh-tw/image/svg-to-png-converter' },
        ]}
      />
      <ToolSchema
        name="SVG 轉 PNG 轉換器"
        description="即時將 SVG 檔案轉換為高品質 PNG 圖片。上傳或貼上 SVG 程式碼，選擇輸出倍率（1x-4x），預覽後下載 PNG。"
        url="https://toolcase.cc/zh-tw/image/svg-to-png-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'SVG 轉 PNG 轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>SVG 轉 PNG 轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>上傳或貼上 SVG 程式碼，以您需要的倍率轉換為高品質 PNG 圖片。</p>
      <SvgToPngConverter labels={{ uploadSvg: '上傳 SVG', pasteSvg: '貼上 SVG 程式碼', preview: '預覽', scale: '倍率', convert: '轉換為 PNG', download: '下載 PNG', orPaste: '或在下方貼上 SVG 程式碼', chooseFile: '選擇 SVG 檔案' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>上傳 SVG 檔案或直接在文字區域貼上 SVG 程式碼。選擇所需的輸出倍率（1x 至 4x），然後點擊「轉換為 PNG」。預覽結果後一鍵下載。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="svg-to-png-converter" locale="zh-tw" />
    </div>
    </>
  )
}

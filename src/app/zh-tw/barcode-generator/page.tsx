import { Metadata } from 'next'
import BarcodeGenerator from '@/components/tools/BarcodeGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '條碼產生器 - 免費線上工具 | toolcase',
  description: '線上產生 Code 128 條碼，輸入文字或數字即可建立。可自訂條碼寬度與高度，下載為 PNG 圖片。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/barcode-generator', languages: { en: 'https://toolcase.cc/barcode-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/barcode-generator' } },
}

const faqs = [
  { question: '這個工具產生什麼格式的條碼？', answer: '此工具產生 Code 128（子集 B）條碼，這是最廣泛使用的條碼格式之一。支援所有標準 ASCII 字元，包括字母、數字和常見符號。' },
  { question: '產生的條碼可以掃描嗎？', answer: '可以。產生的條碼遵循 Code 128 標準，可以被任何標準條碼掃描器或手機條碼讀取 App 掃描。建議條碼寬度至少設為 2px 以確保掃描可靠。' },
  { question: '可以編碼的文字最大長度是多少？', answer: 'Code 128 技術上可以編碼任意長度的文字，但過長的字串會產生很寬的條碼，不便列印或掃描。建議將輸入控制在 40 個字元以內。' },
]

export default function BarcodeGeneratorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '條碼產生器', url: 'https://toolcase.cc/zh-tw/barcode-generator' },
        ]}
      />
      <ToolSchema
        name="條碼產生器"
        description="線上產生 Code 128 條碼，輸入文字或數字即可建立。可自訂條碼寬度與高度，下載為 PNG 圖片。"
        url="https://toolcase.cc/zh-tw/barcode-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '條碼產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>條碼產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>從文字或數字產生 Code 128 條碼，下載為 PNG 圖片。</p>
      <BarcodeGenerator labels={{ inputText: '文字 / 數字', barWidth: '條碼寬度', barcodeHeight: '高度', canvasWidth: '畫布寬度', generate: '產生', download: '下載 PNG', preview: '預覽', placeholder: '輸入文字或數字...' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在輸入欄位中輸入要編碼的文字或數字。依需求調整條碼寬度和高度，然後點擊「產生」建立條碼。預覽區域會顯示條碼及其下方的編碼文字。點擊「下載 PNG」儲存條碼圖片。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="barcode-generator" locale="zh-tw" />
    </div>
    </>
  )
}

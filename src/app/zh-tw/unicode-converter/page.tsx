import { Metadata } from 'next'
import UnicodeConverter from '@/components/tools/UnicodeConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Unicode 轉換器 - 免費線上工具 | toolcase',
  description: '編碼與解碼 Unicode 字元。將文字轉換為 Unicode 跳脫序列、HTML 實體、CSS 跳脫和碼位。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/unicode-converter',
    languages: {
      en: 'https://toolcase.cc/unicode-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/unicode-converter',
    },
  },
}

const faqs = [
  {
    question: '什麼是 Unicode？',
    answer: 'Unicode 是一個通用字元編碼標準，為每種語言中的每個字元分配唯一的數字（碼位），包括表情符號和特殊符號。它支援來自 161 種書寫系統的超過 149,000 個字元。',
  },
  {
    question: '支援哪些編碼格式？',
    answer: '此工具支援 Unicode 跳脫序列（\\u0041）、HTML 實體（&#65;）、JavaScript 跳脫、CSS 跳脫和 Unicode 碼位（U+0041）。',
  },
  {
    question: '什麼時候需要轉換 Unicode？',
    answer: 'Unicode 轉換在處理國際化內容、除錯字元編碼問題、在程式碼中插入特殊字元，或為 HTML、CSS 或 JavaScript 等不同編碼環境準備文字時很有用。',
  },
  {
    question: '支援表情符號嗎？',
    answer: '支援！轉換器支援完整的 Unicode 範圍，包括表情符號、中日韓文字、數學符號和其他特殊字元。在需要時，補充字元（碼位高於 U+FFFF）會使用代理對處理。',
  },
]

export default function UnicodeConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'Unicode 轉換器', url: 'https://toolcase.cc/zh-tw/unicode-converter' },
        ]}
      />
      <ToolSchema
        name="Unicode 轉換器"
        description="編碼與解碼 Unicode 字元。將文字轉換為 Unicode 跳脫序列、HTML 實體、CSS 跳脫和碼位。"
        url="https://toolcase.cc/zh-tw/unicode-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'Unicode 轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Unicode 轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        以多種格式編碼和解碼 Unicode 字元。
      </p>

      <UnicodeConverter
        labels={{
          textToUnicode: '文字 → Unicode',
          unicodeToText: 'Unicode → 文字',
          copy: '複製',
          copied: '已複製！',
          clear: '清除',
          inputPlaceholder: '輸入文字或 Unicode...',
          outputPlaceholder: '結果會顯示在這裡...',
          encoding: '編碼',
          htmlEntities: 'HTML 實體',
          jsEscape: 'JS 跳脫',
          cssEscape: 'CSS 跳脫',
          codePoints: '碼位',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用 Unicode 轉換器</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          選擇轉換方向（文字到 Unicode 或 Unicode 到文字）和編碼格式。
          然後在左側面板輸入或貼上你的輸入內容。轉換後的輸出會即時顯示在右側面板。
          你可以隨時切換不同的編碼格式，輸出會自動更新。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="unicode-converter" locale="zh-tw" />
    </div>
    </>
  )
}

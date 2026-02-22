import { Metadata } from 'next'
import JsonToTypescript from '@/components/tools/JsonToTypescript'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'JSON 轉 TypeScript - 免費線上轉換工具 | toolcase',
  description: '即時將 JSON 資料轉換為 TypeScript 介面和型別定義。支援巢狀物件、陣列和可選欄位。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/json-to-typescript',
    languages: {
      en: 'https://toolcase.cc/json-to-typescript',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/json-to-typescript',
    },
  },
}

const faqs = [
  {
    question: 'JSON 轉 TypeScript 轉換器如何運作？',
    answer: '此工具會解析你的 JSON 資料，並為每個欄位推斷 TypeScript 型別。物件會轉換為介面，陣列會根據內容進行型別推斷，原始值會對應到相應的 TypeScript 型別（string、number、boolean、null）。',
  },
  {
    question: '它能處理巢狀物件和陣列嗎？',
    answer: '可以。巢狀物件會自動轉換為獨立的 TypeScript 介面。物件陣列會生成各自的介面型別。此工具能遞迴處理深層巢狀結構。',
  },
  {
    question: '我的資料安全嗎？',
    answer: '所有處理都在你的瀏覽器中完成。你的 JSON 資料不會離開你的裝置——沒有任何資料會被傳送到伺服器。',
  },
]

export default function JsonToTypescriptPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'JSON 轉 TypeScript', url: 'https://toolcase.cc/zh-tw/json-to-typescript' },
        ]}
      />
      <ToolSchema
        name="JSON 轉 TypeScript"
        description="即時將 JSON 資料轉換為 TypeScript 介面和型別定義。支援巢狀物件、陣列和可選欄位。"
        url="https://toolcase.cc/zh-tw/json-to-typescript"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'JSON 轉 TypeScript' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>JSON 轉 TypeScript 轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        在下方貼上你的 JSON 資料，即時生成 TypeScript 介面和型別定義。
      </p>

      <JsonToTypescript
        labels={{
          convert: '轉換',
          clear: '清除',
          copy: '複製',
          copied: '已複製！',
          input: '在此貼上你的 JSON...',
          output: 'TypeScript 介面會顯示在這裡...',
          rootName: '根介面名稱',
          invalidJson: 'JSON 格式錯誤',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          將你的 JSON 資料貼到左側面板，然後點擊「轉換」。工具會在右側面板生成 TypeScript 介面定義。
          你可以使用工具列中的輸入欄位自訂根介面名稱。巢狀物件會自動產生獨立的介面。
          一鍵複製生成的型別，直接用在你的 TypeScript 專案中。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="json-to-typescript" locale="zh-tw" />
    </div>
    </>
  )
}

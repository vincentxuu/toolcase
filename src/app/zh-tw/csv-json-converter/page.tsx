import { Metadata } from 'next'
import CsvJsonConverter from '@/components/tools/CsvJsonConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'CSV JSON 轉換器 - 免費線上工具 | toolcase',
  description: '即時在 CSV 和 JSON 格式之間轉換。支援 CSV 轉 JSON 及 JSON 轉 CSV，所有處理皆在瀏覽器本機完成。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/csv-json-converter', languages: { en: 'https://toolcase.cc/csv-json-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/csv-json-converter' } },
}

const faqs = [
  { question: '如何將 CSV 轉換為 JSON？', answer: '將 CSV 資料貼到輸入區域，選擇「CSV → JSON」方向後點擊轉換。工具會自動將第一行當作欄位名稱，將每一列資料轉換為 JSON 物件，最終產生一個 JSON 陣列供您複製使用。' },
  { question: 'JSON 可以轉回 CSV 嗎？', answer: '可以。切換為「JSON → CSV」方向，貼上一個包含物件的 JSON 陣列，工具會自動將物件的鍵值作為欄位標題，產生對應的 CSV 格式資料。' },
  { question: '我的資料會被上傳到伺服器嗎？', answer: '不會。所有轉換處理完全在您的瀏覽器本機執行，資料不會傳送到任何伺服器，確保您的資料安全與隱私。' },
]

export default function CsvJsonConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'CSV JSON 轉換器', url: 'https://toolcase.cc/zh-tw/csv-json-converter' },
        ]}
      />
      <ToolSchema
        name="CSV JSON 轉換器"
        description="即時在 CSV 和 JSON 格式之間轉換。支援 CSV 轉 JSON 及 JSON 轉 CSV，所有處理皆在瀏覽器本機完成。"
        url="https://toolcase.cc/zh-tw/csv-json-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'CSV JSON 轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>CSV JSON 轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>即時在 CSV 和 JSON 格式之間互相轉換。</p>
      <CsvJsonConverter labels={{ input: '輸入', output: '輸出', csvToJson: 'CSV → JSON', jsonToCsv: 'JSON → CSV', copy: '複製', copied: '已複製！', invalidInput: '無效的輸入' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>選擇轉換方向（CSV → JSON 或 JSON → CSV），將資料貼到輸入區域。如果您的 CSV 不是用逗號分隔，可以選擇其他分隔符號。點擊轉換後，結果會顯示在輸出區域，您可以一鍵複製結果。所有處理皆在瀏覽器本機完成，不會上傳任何資料。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="csv-json-converter" locale="zh-tw" />
    </div>
    </>
  )
}

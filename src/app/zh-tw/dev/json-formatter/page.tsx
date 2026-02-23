import { Metadata } from 'next'
import JsonFormatter from '@/components/tools/JsonFormatter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'JSON 格式化與驗證 - 免費線上工具 | toolcase',
  description: '即時格式化、驗證與美化 JSON 資料。免費線上 JSON 格式化工具，支援語法高亮與錯誤偵測。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/dev/json-formatter',
    languages: {
      en: 'https://toolcase.cc/dev/json-formatter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/json-formatter',
    },
  },
}

const faqs = [
  {
    question: '什麼是 JSON？',
    answer: 'JSON（JavaScript Object Notation）是一種輕量級的資料交換格式，易於人閱讀和撰寫，同時也方便機器解析和生成。它是基於 JavaScript 的子集，廣泛用於 Web API、設定檔和資料儲存。',
  },
  {
    question: '如何驗證 JSON 格式？',
    answer: '將你的 JSON 資料貼到上方的編輯器，點擊「格式化」按鈕。如果 JSON 格式正確，它會自動排版。如果有錯誤，工具會顯示詳細的錯誤訊息。',
  },
  {
    question: '格式化和壓縮有什麼區別？',
    answer: '格式化（美化）會加入空白和縮排讓 JSON 更容易閱讀。壓縮則移除所有不必要的空白以減小檔案大小，適合用在生產環境和 API 回應中。',
  },
  {
    question: '我的資料安全嗎？',
    answer: '所有處理都在你的瀏覽器中完成。你的 JSON 資料不會離開你的裝置——沒有任何資料會被傳送到伺服器。',
  },
]

export default function JsonFormatterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'JSON 格式化與驗證', url: 'https://toolcase.cc/zh-tw/dev/json-formatter' },
        ]}
      />
      <ToolSchema
        name="JSON 格式化與驗證"
        description="即時格式化、驗證與美化 JSON 資料。免費線上 JSON 格式化工具，支援語法高亮與錯誤偵測。"
        url="https://toolcase.cc/zh-tw/dev/json-formatter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'JSON 格式化與驗證' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>JSON 格式化與驗證</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        在下方貼上你的 JSON 資料，即時格式化、驗證與美化。
      </p>

      <JsonFormatter
        labels={{
          format: '格式化',
          minify: '壓縮',
          copy: '複製',
          clear: '清除',
          copied: '已複製！',
          input: '在此貼上你的 JSON...',
          output: '格式化後的結果會顯示在這裡...',
          valid: 'JSON 格式正確',
          invalid: 'JSON 格式錯誤',
          tabSize: '縮排大小',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用 JSON 格式化工具</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          只需將你的 JSON 資料貼到左側編輯面板，然後點擊「格式化」按鈕。工具會即時解析並格式化你的 JSON，加上適當的縮排。
          你可以選擇 2、4 或 8 個空格的縮排。如果 JSON 含有錯誤，工具會顯示確切的問題位置。你也可以使用「壓縮」按鈕來移除所有空白。
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>什麼是 JSON？</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          JSON（JavaScript Object Notation）是一種輕量級的資料交換格式，已成為網路上資料交換的事實標準。
          它源自 JavaScript，但如今是語言無關的，幾乎每種程式語言都支援。JSON 使用人類可讀的文字來表示由鍵值對和陣列組成的資料物件，
          因其簡潔和靈活性而廣泛用於 REST API、設定檔和資料儲存。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="json-formatter" locale="zh-tw" />
    </div>
    </>
  )
}

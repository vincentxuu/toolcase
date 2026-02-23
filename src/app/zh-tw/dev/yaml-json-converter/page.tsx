import { Metadata } from 'next'
import YamlJsonConverter from '@/components/tools/YamlJsonConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'YAML JSON 轉換器 - 免費線上工具 | toolcase',
  description: '即時在 YAML 和 JSON 格式之間轉換。免費線上 YAML/JSON 轉換工具，適用於設定檔轉換。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/dev/yaml-json-converter', languages: { en: 'https://toolcase.cc/dev/yaml-json-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/yaml-json-converter' } },
}

const faqs = [
  { question: 'YAML 和 JSON 有什麼不同？', answer: 'JSON 使用大括號和引號的嚴格語法，適合機器讀取和 API 資料交換。YAML 使用縮排表示層級關係，語法更簡潔易讀，常用於 Docker Compose、Kubernetes 和 CI/CD 等設定檔。兩者可以互相轉換。' },
  { question: '為什麼需要在 YAML 和 JSON 之間轉換？', answer: '有些工具只接受 JSON 格式（如 API 回應），有些只接受 YAML 格式（如 Docker Compose）。開發者經常需要在兩種格式之間轉換來配合不同的工具和服務。' },
  { question: '轉換時會保留註解嗎？', answer: 'YAML 支援註解（以 # 開頭），但 JSON 不支援註解。因此從 YAML 轉為 JSON 時，註解會被移除。從 JSON 轉為 YAML 時則不受影響，因為 JSON 本身就沒有註解。' },
]

export default function YamlJsonConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'YAML JSON 轉換器', url: 'https://toolcase.cc/zh-tw/dev/yaml-json-converter' },
        ]}
      />
      <ToolSchema
        name="YAML JSON 轉換器"
        description="即時在 YAML 和 JSON 格式之間轉換。免費線上 YAML/JSON 轉換工具，適用於設定檔轉換。"
        url="https://toolcase.cc/zh-tw/dev/yaml-json-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'YAML JSON 轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>YAML JSON 轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>即時在 YAML 和 JSON 格式之間互相轉換。</p>
      <YamlJsonConverter labels={{ input: '輸入', output: '輸出', yamlToJson: 'YAML → JSON', jsonToYaml: 'JSON → YAML', copy: '複製', copied: '已複製！', invalidInput: '無效的輸入' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>選擇轉換方向（YAML → JSON 或 JSON → YAML），將資料貼到輸入區域。工具會即時轉換並在輸出區域顯示結果。如果輸入格式有誤，會顯示錯誤提示。轉換完成後可以一鍵複製結果。適合開發者在處理設定檔、API 資料或 CI/CD 配置時使用。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="yaml-json-converter" locale="zh-tw" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import TomlConverter from '@/components/tools/TomlConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'TOML 轉換器 - 免費線上工具 | toolcase',
  description: '即時在 TOML 和 JSON 格式之間轉換。將 TOML 解析為 JSON，或從 JSON 資料生成 TOML，支援雙向轉換。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/dev/toml-converter',
    languages: {
      en: 'https://toolcase.cc/dev/toml-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/toml-converter',
    },
  },
}

const faqs = [
  {
    question: '什麼是 TOML？',
    answer: "TOML（Tom's Obvious Minimal Language）是一種設定檔格式，因其清晰的語意而易於閱讀。它被設計為能明確映射到雜湊表，常用於 Rust（Cargo.toml）、Python（pyproject.toml）和其他專案設定中。",
  },
  {
    question: '支援哪些 TOML 功能？',
    answer: '此轉換器處理常見的 TOML 功能，包括鍵值對、表格（[table]）、表格陣列（[[table]]）、行內表格、陣列、字串（基本和文字型）、整數、浮點數、布林值和日期時間值。',
  },
  {
    question: '我的資料安全嗎？',
    answer: '所有轉換都在你的瀏覽器中完成。你的資料不會離開你的裝置——沒有任何資料會被傳送到伺服器。',
  },
]

export default function TomlConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'TOML 轉換器', url: 'https://toolcase.cc/zh-tw/dev/toml-converter' },
        ]}
      />
      <ToolSchema
        name="TOML 轉換器"
        description="即時在 TOML 和 JSON 格式之間轉換。將 TOML 解析為 JSON，或從 JSON 資料生成 TOML，支援雙向轉換。"
        url="https://toolcase.cc/zh-tw/dev/toml-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'TOML 轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>TOML 轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        在 TOML 和 JSON 格式之間轉換。在下方貼上你的 TOML 或 JSON 資料，進行雙向轉換。
      </p>

      <TomlConverter
        labels={{
          tomlToJson: 'TOML \u2192 JSON',
          jsonToToml: 'JSON \u2192 TOML',
          copy: '複製',
          copied: '已複製！',
          input: '貼上 TOML 或 JSON...',
          output: '轉換結果會顯示在這裡...',
          invalidInput: '輸入格式錯誤',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          將你的 TOML 或 JSON 資料貼到左側面板。點擊「TOML &rarr; JSON」將 TOML 輸入轉換為 JSON 格式，
          或點擊「JSON &rarr; TOML」將 JSON 輸入轉換為 TOML 格式。轉換結果會顯示在右側面板，可以一鍵複製。
          此工具支援表格、陣列、行內表格、字串、數字、布林值和巢狀結構。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="toml-converter" locale="zh-tw" />
    </div>
    </>
  )
}

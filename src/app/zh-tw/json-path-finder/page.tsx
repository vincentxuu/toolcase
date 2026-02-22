import { Metadata } from 'next'
import JsonPathFinder from '@/components/tools/JsonPathFinder'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'JSON 路徑查找器 - 免費線上工具 | toolcase',
  description: '貼上 JSON 並以樹狀檢視探索其結構。點擊任何節點即可取得其 JSON 路徑（點表示法或括號表示法）。一鍵複製路徑到剪貼簿。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/json-path-finder', languages: { en: 'https://toolcase.cc/json-path-finder', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/json-path-finder' } },
}

const faqs = [
  { question: '什麼是 JSON 路徑？', answer: 'JSON 路徑是一個字串表達式，用於識別 JSON 文件中的特定值。例如，$.data[0].name 指的是 "data" 陣列中第一個元素的 "name" 屬性。' },
  { question: '點表示法和括號表示法有什麼區別？', answer: '點表示法（$.data.name）更簡短易讀。括號表示法（$["data"]["name"]）在鍵名包含特殊字元、空格或以數字開頭時是必需的。' },
  { question: '可以瀏覽巢狀的 JSON 結構嗎？', answer: '可以。樹狀檢視支援深層巢狀的物件和陣列。點擊箭頭圖示可以展開或收合節點，點擊任何節點即可查看其完整路徑和值。' },
]

export default function JsonPathFinderPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'JSON 路徑查找器', url: 'https://toolcase.cc/zh-tw/json-path-finder' },
        ]}
      />
      <ToolSchema
        name="JSON 路徑查找器"
        description="貼上 JSON 並以樹狀檢視探索其結構。點擊任何節點即可取得其 JSON 路徑（點表示法或括號表示法）。一鍵複製路徑到剪貼簿。"
        url="https://toolcase.cc/zh-tw/json-path-finder"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'JSON 路徑查找器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>JSON 路徑查找器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>探索 JSON 結構，查找任何值的路徑。</p>
      <JsonPathFinder labels={{
        inputPlaceholder: '在此貼上 JSON...',
        parse: '解析',
        clear: '清除',
        path: '路徑',
        value: '值',
        copied: '已複製！',
        copy: '複製',
        clickNode: '點擊樹狀圖中的節點以查看其路徑',
        dotNotation: '點表示法',
        bracketNotation: '括號表示法',
        invalidJson: '無效的 JSON',
        items: '個項目',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在左側面板貼上 JSON 並點擊解析。右側面板會顯示 JSON 結構的樹狀檢視。點擊任何節點即可查看其點表示法和括號表示法的路徑，以及節點的值。使用複製按鈕將路徑複製到剪貼簿。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="json-path-finder" locale="zh-tw" />
    </div>
    </>
  )
}

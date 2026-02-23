import { Metadata } from 'next'
import JsonDiffComparator from '@/components/tools/JsonDiffComparator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'JSON 差異比較 - 線上比較 JSON 物件 | toolcase',
  description: '比較兩個 JSON 物件並以語法高亮顯示差異。支援統一和分割視圖、JSON 和文字模式比較。免費瀏覽器工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/dev/json-diff', languages: { en: 'https://toolcase.cc/dev/json-diff', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/json-diff' } },
}

const faqs = [
  { question: '如何比較兩個 JSON 物件？', answer: '將原始 JSON 貼到左側文字區域，將修改後的 JSON 貼到右側文字區域。點擊「比較」即可看到以綠色（新增）和紅色（刪除）高亮顯示的差異。' },
  { question: 'JSON 模式和文字模式有什麼區別？', answer: 'JSON 模式解析並比較實際的 JSON 結構，忽略格式化差異。文字模式逐行比較原始文字，適用於 JSON 無效或您想查看格式化變更的情況。' },
  { question: '什麼是統一視圖和分割視圖？', answer: '統一視圖在單一面板中顯示所有變更，使用 + 和 - 前綴。分割視圖並排顯示原始和修改後的 JSON，便於比較。' },
  { question: '我可以在比較前格式化 JSON 嗎？', answer: '可以！點擊每個文字區域上方的「格式化 JSON」按鈕，即可自動縮排和美化您的 JSON，提高可讀性。' },
]

export default function JsonDiffPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: 'JSON 差異比較', url: 'https://toolcase.cc/zh-tw/dev/json-diff' },
        ]}
      />
      <ToolSchema
        name="JSON 差異比較"
        description="比較兩個 JSON 物件並以語法高亮顯示差異。支援統一和分割視圖、JSON 和文字模式比較。免費瀏覽器工具。"
        url="https://toolcase.cc/zh-tw/dev/json-diff"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'JSON 差異比較' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>JSON 差異比較</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>比較兩個 JSON 物件並以語法高亮顯示差異。</p>
      <JsonDiffComparator
        labels={{
          title: 'JSON 差異比較',
          leftJson: '原始 JSON',
          rightJson: '修改後 JSON',
          leftPlaceholder: '在此貼上原始 JSON...',
          rightPlaceholder: '在此貼上修改後 JSON...',
          compare: '比較',
          clear: '清除',
          viewMode: '檢視模式',
          unifiedView: '統一',
          splitView: '分割',
          jsonMode: 'JSON 模式',
          textMode: '文字模式',
          formatJson: '格式化 JSON',
          invalidJson: '無效的 JSON',
          noDifferences: '未找到差異',
          differences: '差異',
          added: '新增',
          removed: '刪除',
          unchanged: '未變更',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
          將您的 JSON 資料貼到左側和右側面板中，然後點擊「比較」以高亮顯示差異。綠色高亮表示新增的內容，紅色高亮表示刪除的內容，未變更的部分保持不高亮。
        </p>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          使用「格式化 JSON」按鈕在比較前美化您的 JSON。根據需要在 JSON 模式（結構比較）和文字模式（逐行比較）之間切換。選擇統一或分割視圖以獲得不同的視覺化偏好。
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="json-diff" locale="zh-tw" />
    </div>
    </>
  )
}

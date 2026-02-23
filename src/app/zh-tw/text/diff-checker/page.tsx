import { Metadata } from 'next'
import DiffChecker from '@/components/tools/DiffChecker'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '文字差異比較 - 免費線上工具 | toolcase',
  description: '比較兩段文字並即時以顏色標示新增、刪除及修改的部分。免費線上 Diff 比較工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/text/diff-checker', languages: { en: 'https://toolcase.cc/text/diff-checker', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text/diff-checker' } },
}

const faqs = [
  { question: '可以比較哪些類型的文字？', answer: '可以比較任何純文字內容，包括程式碼、設定檔、文章、JSON、XML 等。工具會逐行比對原始文字與修改後文字的差異。' },
  { question: '差異是如何顯示的？', answer: '新增的內容以綠色標示，刪除的內容以紅色標示，未變更的行則保持原樣。透過顏色標示，您可以快速找出兩段文字之間的所有差異。' },
  { question: '比較的文字大小有限制嗎？', answer: '工具完全在瀏覽器中執行，沒有伺服器端的大小限制。不過，如果文字超過數萬行，瀏覽器可能會變慢。建議每個輸入控制在 50,000 行以內以獲得最佳效能。' },
]

export default function DiffCheckerPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '文字差異比較', url: 'https://toolcase.cc/zh-tw/text/diff-checker' },
        ]}
      />
      <ToolSchema
        name="文字差異比較"
        description="比較兩段文字並即時以顏色標示新增、刪除及修改的部分。免費線上 Diff 比較工具。"
        url="https://toolcase.cc/zh-tw/text/diff-checker"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '文字差異比較' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>文字差異比較</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>比較兩段文字，即時找出所有差異。</p>
      <DiffChecker labels={{ original: '原始文字', modified: '修改後文字', compare: '比較', added: '新增', removed: '移除', unchanged: '未變更', noChanges: '沒有發現差異' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>將原始文字貼到左側區域，修改後的文字貼到右側區域，然後點擊「比較」按鈕。差異會以顏色標示：綠色表示新增內容，紅色表示刪除內容。適合用來比對程式碼變更、文件版本差異或任何文字內容的修改。所有處理皆在瀏覽器本機完成。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="diff-checker" locale="zh-tw" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import RemoveDuplicates from '@/components/tools/RemoveDuplicates'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '移除重複行 - 免費線上工具 | toolcase',
  description: '快速移除文字中的重複行。支援大小寫區分、空白修剪和排序輸出等選項。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/remove-duplicates', languages: { en: 'https://toolcase.cc/remove-duplicates', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/remove-duplicates' } },
}

const faqs = [
  { question: '「區分大小寫」選項有什麼作用？', answer: '啟用「區分大小寫」時，「Hello」和「hello」會被視為不同的行。關閉時，它們會被視為相同的行，只保留第一次出現的版本。處理資料時請根據需求選擇適當的設定。' },
  { question: '「修剪空白」是什麼意思？', answer: '「修剪空白」會移除每行開頭和結尾的空格和 Tab 字元。這在比較行是否重複時很有用，因為相同內容但前後有不同空白的行會被正確識別為重複行。' },
  { question: '這個工具可以處理多大的文字？', answer: '本工具在瀏覽器中運行，可以處理數千行的文字而不會有效能問題。對於非常大的檔案（超過數十萬行），建議使用命令列工具如 sort 和 uniq 來處理。' },
]

export default function RemoveDuplicatesPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '移除重複行', url: 'https://toolcase.cc/zh-tw/remove-duplicates' },
        ]}
      />
      <ToolSchema
        name="移除重複行"
        description="快速移除文字中的重複行。支援大小寫區分、空白修剪和排序輸出等選項。"
        url="https://toolcase.cc/zh-tw/remove-duplicates"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '移除重複行' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>移除重複行</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>快速移除文字中的重複行，保留不重複的內容。</p>
      <RemoveDuplicates labels={{ input: '輸入', output: '輸出', caseSensitive: '區分大小寫', trimWhitespace: '修剪空白', sortOutput: '排序輸出', originalLines: '原始行數', uniqueLines: '不重複行數', duplicatesRemoved: '移除重複' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>將包含重複行的文字貼到輸入框中，工具會自動移除重複的行。您可以選擇是否區分大小寫、修剪空白或排序輸出結果。處理結果會顯示原始行數、不重複行數和移除的重複行數。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="remove-duplicates" locale="zh-tw" />
    </div>
    </>
  )
}

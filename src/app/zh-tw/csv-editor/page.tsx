import { Metadata } from 'next'
import CsvEditor from '@/components/tools/CsvEditor'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'CSV 編輯器 - 線上編輯 CSV 檔案試算表 | toolcase',
  description: '在視覺化試算表介面中編輯 CSV 檔案。新增、刪除、修改行和列。支援多種分隔符號。下載編輯後的 CSV。免費瀏覽器工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/csv-editor', languages: { en: 'https://toolcase.cc/csv-editor', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/csv-editor' } },
}

const faqs = [
  { question: '如何編輯 CSV 檔案？', answer: '上傳您的 CSV 檔案或貼上 CSV 資料，然後點擊「解析 CSV」。資料將顯示在可編輯的表格中，您可以點擊任何儲存格來修改其內容。使用按鈕來新增或移除行和列。' },
  { question: '支援哪些分隔符號？', answer: '編輯器支援逗號（,）、分號（;）、Tab 鍵和管道符號（|）分隔符號。在解析前從下拉選單中選擇您的分隔符號。不同地區使用不同的分隔符號 - 歐洲通常使用分號，而北美使用逗號。' },
  { question: '我可以新增或移除行和列嗎？', answer: '可以！使用「新增列」和「新增行」按鈕在末尾附加新的行/列。使用「刪除最後一列」和「刪除最後一行」來移除它們。您可以根據需要自由修改表格結構。' },
  { question: '如何儲存編輯後的 CSV？', answer: '點擊「下載 CSV」按鈕將編輯後的資料下載為 CSV 檔案，或使用「複製」按鈕將其複製到剪貼簿。輸出將使用您選擇的分隔符號。' },
]

export default function CsvEditorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: 'CSV 編輯器', url: 'https://toolcase.cc/zh-tw/csv-editor' },
        ]}
      />
      <ToolSchema
        name="CSV 編輯器"
        description="在視覺化試算表介面中編輯 CSV 檔案。新增、刪除、修改行和列。支援多種分隔符號。下載編輯後的 CSV。免費瀏覽器工具。"
        url="https://toolcase.cc/zh-tw/csv-editor"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'CSV 編輯器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>CSV 編輯器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>在試算表介面中視覺化編輯 CSV 檔案，具備完整的編輯功能。</p>
      <CsvEditor
        labels={{
          title: 'CSV 編輯器',
          pasteOrUpload: '貼上或上傳 CSV',
          uploadFile: '上傳 CSV 檔案',
          csvInput: 'CSV 資料',
          inputPlaceholder: '在此貼上 CSV 資料...',
          parse: '解析 CSV',
          clear: '清除',
          download: '下載 CSV',
          copy: '複製',
          copied: '已複製！',
          addRow: '新增列',
          addColumn: '新增行',
          deleteRow: '刪除最後一列',
          deleteColumn: '刪除最後一行',
          hasHeaders: '第一列為標題',
          delimiter: '分隔符號',
          comma: '逗號（,）',
          semicolon: '分號（;）',
          tab: 'Tab 鍵',
          pipe: '管道符號（|）',
          invalidCsv: '無效的 CSV 資料',
          noData: '無資料可顯示',
          pasteInstructions: '貼上 CSV 資料或上傳檔案以開始編輯',
          row: '列',
          column: '行',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
          上傳 CSV 檔案或將 CSV 文字貼到輸入區域。選擇適當的分隔符號（逗號、分號、Tab 鍵或管道符號），如果您的資料有標題列，請勾選「第一列為標題」。點擊「解析 CSV」將資料載入可編輯的表格中。
        </p>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          點擊儲存格並輸入來編輯。使用相應的按鈕新增行或列。完成後，下載編輯後的 CSV 檔案或將資料複製到剪貼簿。此工具完全在您的瀏覽器中運作 - 您的資料永遠不會離開您的裝置。
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="csv-editor" locale="zh-tw" />
    </div>
    </>
  )
}

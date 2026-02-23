import { Metadata } from 'next'
import FontPreview from '@/components/tools/FontPreview'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '字體預覽 - Google Fonts 瀏覽器與預覽工具 | toolcase',
  description: '使用自訂文字預覽和比較 Google 字體。瀏覽 20+ 種熱門字體，涵蓋襯線、無襯線、展示、手寫和等寬字體類別。即時複製字體匯入程式碼。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/css/font-preview', languages: { en: 'https://toolcase.cc/css/font-preview', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css/font-preview' } },
}

const faqs = [
  { question: '如何在我的網站中使用 Google Fonts？', answer: '點擊「複製匯入」以取得 CSS @import 陳述式並將其貼到您的樣式表中。然後點擊「複製 CSS」以取得元素的 font-family 屬性。Google Fonts 可免費用於個人和商業專案。' },
  { question: '我可以自訂預覽文字嗎？', answer: '可以！使用「預覽文字」輸入框輸入任何自訂文字。這有助於您查看實際內容在每種字體中的顯示效果。您也可以調整字體大小滑桿來預覽不同大小。' },
  { question: '有哪些字體類別？', answer: '字體分為無襯線（乾淨、現代）、襯線（傳統、正式）、展示（裝飾性、引人注目）、手寫（手寫體、休閒）和等寬（程式碼、技術）。' },
  { question: '這些字體免費嗎？', answer: '是的！所有 Google Fonts 都是開源的，可在任何專案中免費使用，無論是商業或其他用途。它們針對網頁使用進行了最佳化，載入速度很快。' },
]

export default function FontPreviewPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '字體預覽', url: 'https://toolcase.cc/zh-tw/css/font-preview' },
        ]}
      />
      <ToolSchema
        name="字體預覽"
        description="使用自訂文字預覽和比較 Google 字體。瀏覽 20+ 種熱門字體，涵蓋襯線、無襯線、展示、手寫和等寬字體類別。即時複製字體匯入程式碼。"
        url="https://toolcase.cc/zh-tw/css/font-preview"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '字體預覽' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>字體預覽</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>使用自訂文字預覽 Google 字體並即時複製匯入程式碼。</p>
      <FontPreview
        labels={{
          title: '字體預覽',
          searchPlaceholder: '搜尋字體...',
          previewText: '預覽文字',
          previewPlaceholder: '快速的棕色狐狸跳過懶狗',
          fontSize: '字體大小',
          category: '類別',
          allCategories: '所有類別',
          serif: '襯線',
          sansSerif: '無襯線',
          display: '展示',
          handwriting: '手寫',
          monospace: '等寬',
          copyImport: '複製匯入',
          copyCss: '複製 CSS',
          copied: '已複製！',
          showingFonts: '顯示',
          noResults: '找不到字體',
          variants: '變體',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          按類別瀏覽字體或按名稱搜尋。輸入自訂預覽文字以查看您的內容顯示效果。調整字體大小滑桿以測試不同大小的可讀性。點擊「複製匯入」以取得 Google Fonts CSS 匯入，然後點擊「複製 CSS」以取得樣式表的 font-family 屬性。
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="font-preview" locale="zh-tw" />
    </div>
    </>
  )
}

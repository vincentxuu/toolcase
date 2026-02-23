import { Metadata } from 'next'
import IconSearchClient from '@/components/tools/IconSearchClient'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '圖示搜尋 - 瀏覽 Lucide React 圖示 | toolcase',
  description: '搜尋並複製 Lucide React 圖示，即時預覽。自訂大小、筆觸寬度和顏色。複製圖示名稱或 JSX 程式碼。超過 1000 個圖示可用。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/css/icon-search', languages: { en: 'https://toolcase.cc/css/icon-search', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css/icon-search' } },
}

const faqs = [
  { question: '如何在 React 中使用這些圖示？', answer: '使用 "npm install lucide-react" 安裝 lucide-react，然後按名稱匯入圖示。點擊「複製 JSX」可取得包含您自訂大小、筆觸和顏色設定的即用程式碼。' },
  { question: '我可以自訂圖示外觀嗎？', answer: '可以！使用頂部的控制項調整大小（12-96px）、筆觸寬度（1-4）和顏色。預覽會即時更新，複製的 JSX 包含您的自訂設定。' },
  { question: '有多少圖示可用？', answer: '此工具提供對整個 Lucide 圖示庫的存取，其中包含超過 1,000 個高品質、一致的圖示。所有圖示都是開源的，可免費使用。' },
  { question: '複製名稱和 JSX 有什麼區別？', answer: '複製名稱只給您圖示元件名稱（例如「Home」）供手動匯入。複製 JSX 給您完整的元件標籤，其屬性已根據您的自訂設定。' },
]

export default function IconSearchPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '圖示搜尋', url: 'https://toolcase.cc/zh-tw/css/icon-search' },
        ]}
      />
      <ToolSchema
        name="圖示搜尋"
        description="搜尋並複製 Lucide React 圖示，即時預覽。自訂大小、筆觸寬度和顏色。複製圖示名稱或 JSX 程式碼。超過 1000 個圖示可用。"
        url="https://toolcase.cc/zh-tw/css/icon-search"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '圖示搜尋' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>圖示搜尋</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>瀏覽、自訂並複製 Lucide React 圖示，附即時預覽。</p>
      <IconSearchClient
        labels={{
          title: '圖示搜尋',
          searchPlaceholder: '搜尋圖示...',
          iconName: '圖示名稱',
          copyName: '複製名稱',
          copyJsx: '複製 JSX',
          copySvg: '複製 SVG',
          copied: '已複製！',
          totalIcons: '總圖示數',
          showingIcons: '顯示',
          noResults: '找不到圖示',
          size: '大小',
          strokeWidth: '筆觸寬度',
          color: '顏色',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
          按名稱搜尋圖示（例如「home」、「user」、「settings」）。使用頂部的控制項調整大小、筆觸寬度和顏色。點擊「複製名稱」只複製圖示名稱，或點擊「複製 JSX」複製包含您自訂設定的完整 React 元件標籤。
        </p>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          要在您的 React 專案中使用，請安裝 lucide-react：<code style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>npm install lucide-react</code>。然後匯入並使用圖示：<code style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>import {'{ Home }'} from &apos;lucide-react&apos;</code>
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="icon-search" locale="zh-tw" />
    </div>
    </>
  )
}

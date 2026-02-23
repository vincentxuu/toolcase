import { Metadata } from 'next'
import HtmlColorReference from '@/components/tools/HtmlColorReference'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'HTML 顏色代碼表 - 所有命名顏色與十六進位代碼 | toolcase',
  description: '瀏覽所有 140+ 個 HTML 命名顏色與十六進位代碼。可搜尋的顏色參考圖表，適用於網頁開發和設計。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/css/html-color-reference', languages: { en: 'https://toolcase.cc/css/html-color-reference', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css/html-color-reference' } },
}

const faqs = [
  { question: '什麼是 HTML 命名顏色？', answer: 'HTML 命名顏色是預定義的顏色名稱，可以在 CSS 和 HTML 中使用，而不是十六進位代碼。例如，您可以使用「red」而不是「#FF0000」。HTML 和 CSS 中有 140+ 個標準化的命名顏色。' },
  { question: '可以在 CSS 中使用這些顏色名稱嗎？', answer: '可以！所有這些顏色名稱都可以直接在 CSS 屬性中使用，如 color、background-color、border-color 等。例如：color: tomato; 或 background-color: lightblue;' },
  { question: '十六進位代碼比顏色名稱更好嗎？', answer: '十六進位代碼可讓您使用數百萬種顏色，而命名顏色限於 140+。但是，命名顏色對於常見顏色更易讀和記憶。使用任何能讓您的代碼更清晰的方式。' },
]

export default function HtmlColorReferencePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: 'HTML 顏色代碼表', url: 'https://toolcase.cc/zh-tw/css/html-color-reference' },
        ]}
      />
      <ToolSchema
        name="HTML 顏色代碼表"
        description="瀏覽所有 140+ 個 HTML 命名顏色與十六進位代碼。可搜尋的顏色參考圖表，適用於網頁開發和設計。"
        url="https://toolcase.cc/zh-tw/css/html-color-reference"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'HTML 顏色代碼表' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>HTML 顏色代碼表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>瀏覽所有 HTML 命名顏色及其十六進位代碼，適用於網頁開發和設計。</p>
      <HtmlColorReference
        labels={{
          title: 'HTML 顏色代碼表',
          searchPlaceholder: '搜尋顏色名稱或十六進位代碼...',
          colorName: '顏色名稱',
          hexCode: '十六進位代碼',
          copy: '複製',
          copied: '已複製！',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>瀏覽顏色網格或使用搜尋框查找特定顏色。點擊複製按鈕以複製十六進位代碼。每個顏色顯示其名稱、視覺預覽和十六進位值。</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="html-color-reference" locale="zh-tw" />
    </div>
    </>
  )
}

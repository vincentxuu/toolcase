import { Metadata } from 'next'
import LogoGenerator from '@/components/tools/LogoGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Logo 產生器 - 使用 Canvas 的簡單 Logo 製作工具 | toolcase',
  description: '使用文字和形狀建立簡單的 Logo。自訂顏色、字體大小和模板。下載為 PNG。免費瀏覽器 Logo 製作工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/css/logo-generator', languages: { en: 'https://toolcase.cc/css/logo-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css/logo-generator' } },
}

const faqs = [
  { question: '有哪些 Logo 模板可用？', answer: '工具提供三種模板：純文字（簡單文字 Logo）、圓形圖示（帶圓形圖示的文字）和方形圖示（帶方形圖示的文字）。每個模板都可以使用您自己的顏色和文字進行自訂。' },
  { question: '我可以下載我的 Logo 嗎？', answer: '可以！點擊「下載 PNG」按鈕將您的 Logo 儲存為高解析度 PNG 圖片（800x400px）。Logo 完全在您的瀏覽器中使用 HTML5 Canvas 生成。' },
  { question: '我可以商業使用這些 Logo 嗎？', answer: '可以，您可以將生成的 Logo 用於任何目的，包括商業專案。但請記住，這些是簡單的設計 - 對於專業品牌，請考慮僱用設計師。' },
  { question: '我可以更改 Logo 大小嗎？', answer: '下載的 Logo 為 800x400px。您可以使用圖片編輯軟體調整大小，或在下載前調整字體大小滑桿以更改 Logo 中文字的相對大小。' },
]

export default function LogoGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: 'Logo 產生器', url: 'https://toolcase.cc/zh-tw/css/logo-generator' },
        ]}
      />
      <ToolSchema
        name="Logo 產生器"
        description="使用文字和形狀建立簡單的 Logo。自訂顏色、字體大小和模板。下載為 PNG。免費瀏覽器 Logo 製作工具。"
        url="https://toolcase.cc/zh-tw/css/logo-generator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'Logo 產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Logo 產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>使用文字和形狀建立簡單的 Logo，然後下載為 PNG。</p>
      <LogoGenerator
        labels={{
          title: 'Logo 產生器',
          text: 'Logo 文字',
          textPlaceholder: '您的品牌',
          template: '模板',
          textOnly: '純文字',
          circleIcon: '圓形圖示',
          squareIcon: '方形圖示',
          fontSize: '字體大小',
          backgroundColor: '背景顏色',
          textColor: '文字顏色',
          iconColor: '圖示顏色',
          download: '下載 PNG',
          preview: '預覽',
          customize: '自訂',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          輸入您的品牌名稱或文字，選擇模板（純文字、圓形圖示或方形圖示），並自訂顏色和字體大小。Logo 預覽會即時更新。滿意後，點擊「下載 PNG」將您的 Logo 儲存為高解析度圖片檔案。
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="logo-generator" locale="zh-tw" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import CssTextShadowGenerator from '@/components/tools/CssTextShadowGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '文字陰影產生器 - 免費線上工具 | toolcase',
  description: '視覺化產生 CSS text-shadow。調整偏移、模糊、顏色和透明度，支援多重陰影圖層和即時預覽。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/css-text-shadow-generator', languages: { en: 'https://toolcase.cc/css-text-shadow-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css-text-shadow-generator' } },
}

const faqs = [
  { question: 'text-shadow 支援哪些參數？', answer: 'CSS text-shadow 接受水平偏移、垂直偏移、模糊半徑和顏色。偏移值控制陰影的水平和垂直位移。模糊控制柔化程度。與 box-shadow 不同，text-shadow 不支援擴展和內陰影。' },
  { question: '可以新增多重文字陰影嗎？', answer: '可以。點擊「新增陰影」按鈕即可在同一文字上疊加多層陰影。每層陰影都有獨立的偏移、模糊、顏色和透明度控制。多重陰影會以逗號分隔輸出在 CSS 中。' },
  { question: '如何建立發光文字效果？', answer: '將兩個偏移值都設為 0，增大模糊半徑（10-20px），並使用明亮的顏色搭配完全不透明。可以疊加多層不同模糊值的陰影以增強發光效果。' },
]

export default function CssTextShadowGeneratorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '文字陰影產生器', url: 'https://toolcase.cc/zh-tw/css-text-shadow-generator' },
        ]}
      />
      <ToolSchema
        name="文字陰影產生器"
        description="視覺化產生 CSS text-shadow。調整偏移、模糊、顏色和透明度，支援多重陰影圖層和即時預覽。"
        url="https://toolcase.cc/zh-tw/css-text-shadow-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '文字陰影產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>文字陰影產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>視覺化產生 CSS text-shadow，支援多重陰影圖層。</p>
      <CssTextShadowGenerator labels={{
        offsetX: '水平偏移',
        offsetY: '垂直偏移',
        blur: '模糊',
        color: '顏色',
        opacity: '透明度',
        addShadow: '新增陰影',
        removeShadow: '移除',
        preview: '預覽',
        cssCode: 'CSS 程式碼',
        copy: '複製',
        copied: '已複製！',
        shadow: '陰影',
        previewText: '預覽文字',
        fontSize: '字體大小',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入預覽文字並調整字體大小滑桿。使用水平/垂直偏移、模糊和透明度的滑桿來塑造文字陰影效果。使用顏色選擇器選取陰影顏色。新增更多陰影圖層可建立發光或外框等複雜效果。即時預覽會顯示您的陰影效果。完成後複製 CSS 程式碼。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="css-text-shadow-generator" locale="zh-tw" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import CssFlexboxPlayground from '@/components/tools/CssFlexboxPlayground'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'CSS Flexbox 互動練習場 - 免費線上工具 | toolcase',
  description: '互動式 CSS Flexbox 練習場。調整 flex-direction、justify-content、align-items、flex-wrap 和 gap，即時視覺化預覽。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/css-flexbox-playground', languages: { en: 'https://toolcase.cc/css-flexbox-playground', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css-flexbox-playground' } },
}

const faqs = [
  { question: '什麼是 CSS Flexbox？', answer: 'CSS Flexbox（彈性盒子佈局）是一種一維佈局系統，用於在行或列中排列項目。它可以輕鬆分配空間、對齊項目和處理動態尺寸，無需使用浮動或定位技巧。' },
  { question: '可以控制哪些屬性？', answer: '此練習場讓您調整五個關鍵的 flex 容器屬性：flex-direction（行/列及其反向）、justify-content（主軸對齊）、align-items（交叉軸對齊）、flex-wrap（單行或多行）和 gap（項目間距）。您也可以變更子項目數量。' },
  { question: '什麼時候該用 Flexbox 而不是 CSS Grid？', answer: 'Flexbox 適合一維佈局，即在單一行或列中排列項目。CSS Grid 適合二維佈局，需要同時控制行和列。它們互相補充，可以在同一專案中搭配使用。' },
]

export default function CssFlexboxPlaygroundPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'CSS Flexbox 互動練習場', url: 'https://toolcase.cc/zh-tw/css-flexbox-playground' },
        ]}
      />
      <ToolSchema
        name="CSS Flexbox 互動練習場"
        description="互動式 CSS Flexbox 練習場。調整 flex-direction、justify-content、align-items、flex-wrap 和 gap，即時視覺化預覽。"
        url="https://toolcase.cc/zh-tw/css-flexbox-playground"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'CSS Flexbox 互動練習場' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>CSS Flexbox 互動練習場</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>即時實驗 CSS Flexbox 屬性並查看視覺化結果。</p>
      <CssFlexboxPlayground labels={{
        flexDirection: 'flex-direction',
        justifyContent: 'justify-content',
        alignItems: 'align-items',
        flexWrap: 'flex-wrap',
        gap: 'gap',
        childCount: '子元素數量',
        preview: '預覽',
        cssCode: 'CSS 程式碼',
        copy: '複製',
        copied: '已複製！',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>使用下拉選單變更 flex-direction、justify-content、align-items 和 flex-wrap。調整 gap 滑桿和子元素數量。觀察彩色方塊如何隨著屬性變更而在預覽區重新排列。取得想要的佈局後，複製 CSS 程式碼即可使用。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="css-flexbox-playground" locale="zh-tw" />
    </div>
    </>
  )
}

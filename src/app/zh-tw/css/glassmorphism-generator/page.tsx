import { Metadata } from 'next'
import GlassmorphismGenerator from '@/components/tools/GlassmorphismGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '毛玻璃效果產生器 - 免費線上工具 | toolcase',
  description: '使用 CSS 建立精美的毛玻璃效果。調整模糊、透明度、邊框透明度和飽和度，即時預覽。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/css/glassmorphism-generator', languages: { en: 'https://toolcase.cc/css/glassmorphism-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css/glassmorphism-generator' } },
}

const faqs = [
  { question: '什麼是毛玻璃效果（Glassmorphism）？', answer: 'Glassmorphism 是一種 UI 設計趨勢，使用半透明背景搭配毛玻璃模糊效果。它依靠 CSS 的 backdrop-filter 來模糊元素後方的內容，營造出層次豐富的深度感，是現代介面設計中流行的視覺風格。' },
  { question: 'backdrop-filter 在所有瀏覽器都能用嗎？', answer: 'backdrop-filter 已被所有現代瀏覽器支援，包括 Chrome、Firefox、Safari 和 Edge。產生的程式碼包含 -webkit-backdrop-filter 前綴以確保更廣泛的相容性。對於舊版瀏覽器，背景色會作為優雅的降級方案。' },
  { question: '如何自訂毛玻璃效果？', answer: '使用滑桿調整模糊量（越高越霧化）、透明度（越低越通透）、邊框透明度（控制玻璃邊緣可見度）和飽和度（增強或減弱背後的色彩）。選擇背景色可以為玻璃面板加上色調。' },
]

export default function GlassmorphismGeneratorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '毛玻璃效果產生器', url: 'https://toolcase.cc/zh-tw/css/glassmorphism-generator' },
        ]}
      />
      <ToolSchema
        name="毛玻璃效果產生器"
        description="使用 CSS 建立精美的毛玻璃效果。調整模糊、透明度、邊框透明度和飽和度，即時預覽。"
        url="https://toolcase.cc/zh-tw/css/glassmorphism-generator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '毛玻璃效果產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>毛玻璃效果產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>建立 CSS 毛玻璃效果並即時預覽。</p>
      <GlassmorphismGenerator labels={{
        blurAmount: '模糊量',
        transparency: '透明度',
        borderOpacity: '邊框透明度',
        saturation: '飽和度',
        backgroundColor: '背景色',
        preview: '預覽',
        cssCode: 'CSS 程式碼',
        copy: '複製',
        copied: '已複製！',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>調整模糊量、透明度、邊框透明度和飽和度的滑桿。使用取色器選擇背景色。預覽區域會在彩色形狀上方顯示毛玻璃卡片，讓您即時看到霧化效果。完成後複製 CSS 程式碼到您的專案中使用。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="glassmorphism-generator" locale="zh-tw" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import CssClipPathGenerator from '@/components/tools/CssClipPathGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'CSS 裁切路徑產生器 - 免費線上工具 | toolcase',
  description: '視覺化產生 CSS clip-path 形狀。提供圓形、橢圓、三角形、多邊形、五邊形、六邊形和星形預設，即時預覽。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/css-clip-path-generator', languages: { en: 'https://toolcase.cc/css-clip-path-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css-clip-path-generator' } },
}

const faqs = [
  { question: '什麼是 CSS clip-path？', answer: 'CSS clip-path 屬性可以將元素裁切為特定形狀，隱藏定義區域以外的所有內容。它支援基本形狀如 circle()、ellipse() 和 polygon()，讓您建立非矩形的版面配置和創意視覺效果。' },
  { question: '有哪些形狀可以使用？', answer: '此工具提供七種預設形狀：圓形、橢圓形、三角形、多邊形（梯形）、五邊形、六邊形和星形。圓形和橢圓形有可調整的半徑參數。多邊形類形狀使用計算座標點生成。' },
  { question: 'clip-path 在所有瀏覽器都能用嗎？', answer: '帶有基本形狀的 CSS clip-path 在所有現代瀏覽器中都有良好的支援，包括 Chrome、Firefox、Safari 和 Edge。建議在目標瀏覽器上進行測試。注意 clip-path 不會影響元素的佈局，它只改變視覺上呈現的內容。' },
]

export default function CssClipPathGeneratorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'CSS 裁切路徑產生器', url: 'https://toolcase.cc/zh-tw/css-clip-path-generator' },
        ]}
      />
      <ToolSchema
        name="CSS 裁切路徑產生器"
        description="視覺化產生 CSS clip-path 形狀。提供圓形、橢圓、三角形、多邊形、五邊形、六邊形和星形預設，即時預覽。"
        url="https://toolcase.cc/zh-tw/css-clip-path-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'CSS 裁切路徑產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>CSS 裁切路徑產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>使用預設模板建立 CSS clip-path 形狀並即時預覽。</p>
      <CssClipPathGenerator labels={{
        shape: '形狀',
        circle: '圓形',
        ellipse: '橢圓形',
        triangle: '三角形',
        polygon: '多邊形',
        pentagon: '五邊形',
        hexagon: '六邊形',
        star: '星形',
        radius: '半徑',
        radiusX: '水平半徑',
        radiusY: '垂直半徑',
        preview: '預覽',
        cssCode: 'CSS 程式碼',
        copy: '複製',
        copied: '已複製！',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>從按鈕中選擇形狀預設。圓形和橢圓形可以用滑桿調整半徑。預覽區域會即時顯示裁切後的形狀。複製 CSS clip-path 程式碼即可在樣式表中使用。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="css-clip-path-generator" locale="zh-tw" />
    </div>
    </>
  )
}

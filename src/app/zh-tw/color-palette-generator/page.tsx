import { Metadata } from 'next'
import ColorPaletteGenerator from '@/components/tools/ColorPaletteGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '色彩調色盤產生器 - 免費線上工具 | toolcase',
  description: '從任意基礎顏色產生和諧配色方案。支援互補色、類似色、三角色、分裂互補色和單色調配色，一鍵生成。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/color-palette-generator', languages: { en: 'https://toolcase.cc/color-palette-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/color-palette-generator' } },
}

const faqs = [
  { question: '有哪些色彩和諧類型可以使用？', answer: '調色盤產生器支援五種和諧類型：互補色（色輪上的對立色）、類似色（相鄰色相）、三角色（三個等距色相）、分裂互補色（基礎色加上互補色的兩個相鄰色）和單色調（同一色相的不同明度變化）。' },
  { question: '配色方案是如何計算的？', answer: '調色盤使用 HSL（色相、飽和度、亮度）色彩數學運算。工具會將您的基礎色轉換為 HSL 格式，依照各和諧類型進行適當的色相旋轉，再轉換回 HEX 色碼。這確保了數學上精確的色彩關係。' },
  { question: '可以複製調色盤中的單一顏色嗎？', answer: '可以。只需點擊任何一個色塊，其 HEX 色碼就會立即被複製到剪貼簿。您可以直接貼到 CSS 樣式表、設計工具或其他應用程式中使用。' },
]

export default function ColorPaletteGeneratorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '色彩調色盤產生器', url: 'https://toolcase.cc/zh-tw/color-palette-generator' },
        ]}
      />
      <ToolSchema
        name="色彩調色盤產生器"
        description="從任意基礎顏色產生和諧配色方案。支援互補色、類似色、三角色、分裂互補色和單色調配色，一鍵生成。"
        url="https://toolcase.cc/zh-tw/color-palette-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '色彩調色盤產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>色彩調色盤產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>從任意基礎顏色產生和諧配色方案。</p>
      <ColorPaletteGenerator labels={{
        baseColor: '基礎色',
        complementary: '互補色',
        analogous: '類似色',
        triadic: '三角色',
        splitComplementary: '分裂互補色',
        monochromatic: '單色調',
        copy: '複製',
        copied: '已複製！',
        clickToCopy: '點擊色塊即可複製 HEX 色碼',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>使用取色器選擇基礎色或直接輸入 HEX 色碼。工具會即時產生五種和諧配色方案：互補色、類似色、三角色、分裂互補色和單色調。點擊任何色塊即可將其 HEX 色碼複製到剪貼簿。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="color-palette-generator" locale="zh-tw" />
    </div>
    </>
  )
}

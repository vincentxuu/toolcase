import { Metadata } from 'next'
import BorderRadiusGenerator from '@/components/tools/BorderRadiusGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '圓角產生器 - 免費線上工具 | toolcase',
  description: '視覺化產生 CSS border-radius，獨立控制每個角落。連結或獨立調整四角、即時預覽形狀並複製 CSS 程式碼。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/css/border-radius-generator', languages: { en: 'https://toolcase.cc/css/border-radius-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css/border-radius-generator' } },
}

const faqs = [
  { question: 'border-radius 有什麼作用？', answer: 'CSS border-radius 屬性可以將元素的角落變成圓角。您可以設定單一值套用到四個角落，或為每個角落（左上、右上、右下、左下）設定不同的值，建立不對稱的圓角造型。' },
  { question: '連結/取消連結切換有什麼作用？', answer: '當角落連結時，改變一個值會同時更新所有四個角落。取消連結後可以獨立控制每個角落，適合建立藥丸形狀、有機形態或其他創意造型。' },
  { question: 'border-radius 的最大值是多少？', answer: 'border-radius 可以設定任意像素值。在正方形元素上使用 50% 會建立完美的圓形。此工具支援最高 200px，足以應付大多數使用情境。' },
]

export default function BorderRadiusGeneratorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '圓角產生器', url: 'https://toolcase.cc/zh-tw/css/border-radius-generator' },
        ]}
      />
      <ToolSchema
        name="圓角產生器"
        description="視覺化產生 CSS border-radius，獨立控制每個角落。連結或獨立調整四角、即時預覽形狀並複製 CSS 程式碼。"
        url="https://toolcase.cc/zh-tw/css/border-radius-generator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '圓角產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>圓角產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>視覺化設計 CSS border-radius，獨立控制每個角落並複製程式碼。</p>
      <BorderRadiusGenerator labels={{
        topLeft: '左上',
        topRight: '右上',
        bottomRight: '右下',
        bottomLeft: '左下',
        linkCorners: '連結所有角落',
        preview: '預覽',
        cssCode: 'CSS 程式碼',
        copy: '複製',
        copied: '已複製！',
        allCorners: '所有角落',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>使用滑桿或數字輸入框設定每個角落的圓角半徑。切換連結按鈕可以同時調整所有角落或獨立調整。預覽方塊會即時更新。滿意後複製 CSS 程式碼即可使用。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="border-radius-generator" locale="zh-tw" />
    </div>
    </>
  )
}

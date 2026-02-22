import { Metadata } from 'next'
import GradientGenerator from '@/components/tools/GradientGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'CSS 漸層產生器 - 免費線上工具 | toolcase',
  description: '使用視覺化編輯器建立漂亮的 CSS 漸層。支援線性和放射狀漸層，可自訂多個色彩停駐點，即時預覽。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/gradient-generator', languages: { en: 'https://toolcase.cc/gradient-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/gradient-generator' } },
}

const faqs = [
  { question: '可以建立哪些類型的漸層？', answer: '您可以建立線性漸層（可自訂 0 到 360 度的角度）和放射狀漸層（從中心向外擴散的圓形漸層）。兩種類型都支援兩個以上的色彩停駐點，可放置在漸層的任意位置。' },
  { question: '如何新增更多色彩停駐點？', answer: '點擊「新增色彩停駐點」按鈕即可新增停駐點。每個停駐點都有獨立的取色器、HEX 輸入框和位置滑桿（0-100%）。您可以新增任意數量的停駐點，當有兩個以上時可以移除任一個。' },
  { question: '如何使用產生的 CSS 程式碼？', answer: '點擊 CSS 程式碼旁的複製按鈕，產生的程式碼包含完整的 background 屬性和漸層值。直接貼到您的樣式表中即可使用。所有現代瀏覽器都支援 CSS 漸層，無需瀏覽器前綴。' },
]

export default function GradientGeneratorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'CSS 漸層產生器', url: 'https://toolcase.cc/zh-tw/gradient-generator' },
        ]}
      />
      <ToolSchema
        name="CSS 漸層產生器"
        description="使用視覺化編輯器建立漂亮的 CSS 漸層。支援線性和放射狀漸層，可自訂多個色彩停駐點，即時預覽。"
        url="https://toolcase.cc/zh-tw/gradient-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'CSS 漸層產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>CSS 漸層產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>使用視覺化編輯器建立漂亮的 CSS 漸層並複製程式碼。</p>
      <GradientGenerator labels={{
        type: '漸層類型',
        linear: '線性',
        radial: '放射狀',
        angle: '角度',
        colorStops: '色彩停駐點',
        addStop: '新增色彩停駐點',
        remove: '移除',
        preview: '預覽',
        cssCode: 'CSS 程式碼',
        copy: '複製',
        copied: '已複製！',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>選擇線性或放射狀漸層。線性漸層可用滑桿調整角度。新增或移除色彩停駐點並設定位置。即時預覽會隨時更新。滿意後點擊複製按鈕取得 CSS 程式碼。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="gradient-generator" locale="zh-tw" />
    </div>
    </>
  )
}

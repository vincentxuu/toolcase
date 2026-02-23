import { Metadata } from 'next'
import BoxShadowGenerator from '@/components/tools/BoxShadowGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '方塊陰影產生器 - 免費線上工具 | toolcase',
  description: '視覺化產生 CSS box-shadow。調整偏移、模糊、擴展、顏色和透明度，支援多重陰影和內陰影模式。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/css/box-shadow-generator', languages: { en: 'https://toolcase.cc/css/box-shadow-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css/box-shadow-generator' } },
}

const faqs = [
  { question: 'box-shadow 支援哪些參數？', answer: 'CSS box-shadow 接受水平偏移、垂直偏移、模糊半徑、擴展半徑和顏色。偏移值控制陰影的水平和垂直位移。模糊控制柔化程度。擴展可以放大或縮小陰影。還可以切換 inset 關鍵字來建立內陰影。' },
  { question: '可以新增多重陰影嗎？', answer: '可以。點擊「新增陰影」按鈕即可在同一元素上疊加多層陰影。每層陰影都有獨立的偏移、模糊、擴展、顏色、透明度和內陰影控制。多重陰影會以逗號分隔輸出在 CSS 中。' },
  { question: '如何建立柔和的現代風格陰影？', answer: '建立柔和的現代風格陰影，建議使用較小的偏移值（如 0px 4px）、適中的模糊（16-24px）、不使用擴展，並設定較低的透明度（0.1-0.2）。也可以疊加兩層不同模糊值的陰影以增加層次感。' },
]

export default function BoxShadowGeneratorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '方塊陰影產生器', url: 'https://toolcase.cc/zh-tw/css/box-shadow-generator' },
        ]}
      />
      <ToolSchema
        name="方塊陰影產生器"
        description="視覺化產生 CSS box-shadow。調整偏移、模糊、擴展、顏色和透明度，支援多重陰影和內陰影模式。"
        url="https://toolcase.cc/zh-tw/css/box-shadow-generator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '方塊陰影產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>方塊陰影產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>視覺化產生 CSS box-shadow，支援多重陰影圖層。</p>
      <BoxShadowGenerator labels={{
        offsetX: '水平偏移',
        offsetY: '垂直偏移',
        blur: '模糊',
        spread: '擴展',
        color: '顏色',
        opacity: '透明度',
        inset: '內陰影',
        addShadow: '新增陰影',
        removeShadow: '移除',
        preview: '預覽',
        cssCode: 'CSS 程式碼',
        copy: '複製',
        copied: '已複製！',
        shadow: '陰影',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>調整水平/垂直偏移、模糊、擴展和透明度的滑桿來塑造陰影效果。選擇顏色並可選擇切換為內陰影。新增更多陰影圖層可建立複雜效果。即時預覽方塊會顯示您的陰影效果。完成後複製 CSS 程式碼。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="box-shadow-generator" locale="zh-tw" />
    </div>
    </>
  )
}

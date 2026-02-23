import { Metadata } from 'next'
import TextToHandwriting from '@/components/tools/TextToHandwriting'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '文字轉手寫 - 免費線上工具 | toolcase',
  description: '將打字文字轉換為手寫風格圖片。可選擇字體大小、墨水顏色和紙張樣式。免費下載 PNG 圖片。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/text/text-to-handwriting', languages: { en: 'https://toolcase.cc/text/text-to-handwriting', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text/text-to-handwriting' } },
}

const faqs = [
  { question: '手寫風格使用什麼字型？', answer: '工具使用通用的「cursive」字型族，會對應到您作業系統上的手寫風格字型（如 Windows 上的 Segoe Script 或 macOS 上的 Apple Chancery）。不同裝置上的效果可能略有不同。' },
  { question: '可以選擇不同的紙張樣式嗎？', answer: '可以。提供三種紙張樣式：白紙、橫線紙（如筆記本，附紅色邊線）和方格紙。紙張背景會連同文字一起渲染到畫布上。' },
  { question: '輸出的效果像真正的手寫嗎？', answer: '工具使用草書字型並為每行加入微小的隨機位置偏移來模擬手寫。雖然無法完美複製自然手寫，但對大多數用途而言能產生令人信服的手寫外觀。' },
]

export default function TextToHandwritingPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '文字轉手寫', url: 'https://toolcase.cc/zh-tw/text/text-to-handwriting' },
        ]}
      />
      <ToolSchema
        name="文字轉手寫"
        description="將打字文字轉換為手寫風格圖片。可選擇字體大小、墨水顏色和紙張樣式。免費下載 PNG 圖片。"
        url="https://toolcase.cc/zh-tw/text/text-to-handwriting"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '文字轉手寫' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>文字轉手寫</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>將打字文字轉換為手寫風格圖片，可自訂紙張和墨水選項。</p>
      <TextToHandwriting labels={{ inputText: '文字', fontSize: '字體大小', inkColor: '墨水顏色', paperColor: '紙張樣式', paperWhite: '白紙', paperLined: '橫線紙', paperGrid: '方格紙', generate: '產生', download: '下載 PNG', preview: '預覽', placeholder: '在此輸入文字...' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在文字區域中輸入或貼上文字。選擇字體大小、墨水顏色和紙張樣式（白紙、橫線紙或方格紙）。點擊「產生」以手寫風格字型在選定的紙張背景上渲染文字。預覽效果後點擊「下載 PNG」儲存圖片。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="text-to-handwriting" locale="zh-tw" />
    </div>
    </>
  )
}

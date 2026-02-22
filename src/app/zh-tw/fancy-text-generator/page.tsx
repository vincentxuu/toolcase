import { Metadata } from 'next'
import FancyTextGenerator from '@/components/tools/FancyTextGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '花式文字產生器 - Unicode 字體樣式 | toolcase',
  description: '產生各種花式文字，包含粗體、斜體、手寫體、哥特體、雙線體、等寬、圓圈、全形、上下顛倒和小型大寫字母等 Unicode 樣式。可複製貼上至任何地方。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/fancy-text-generator', languages: { en: 'https://toolcase.cc/fancy-text-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/fancy-text-generator' } },
}

const faqs = [
  { question: '花式文字產生器是如何運作的？', answer: '此工具透過將每個字元對應到相應的 Unicode 數學或裝飾符號，將一般文字轉換為各種 Unicode 字體樣式。輸出結果是由特殊 Unicode 字元組成的純文字，而非圖片或自訂字體，因此可以複製貼上到社群媒體個人簡介、訊息及任何接受文字的地方。' },
  { question: '花式文字在所有平台上都能顯示嗎？', answer: '大多數現代平台和裝置都支援 Unicode 字元，因此花式文字可以在社群媒體（Instagram、Twitter、Facebook）、通訊應用程式和網站上正常顯示。不過，某些較舊的系統或特定應用程式可能無法正確呈現所有 Unicode 樣式，尤其是較少見的哥特體或雙線體。' },
  { question: '有哪些可用的樣式？', answer: '產生器支援 11 種 Unicode 文字樣式：粗體襯線、斜體襯線、粗斜體、手寫體（草書）、哥特體、雙線體（空心）、等寬字體、圓圈字、全形字、上下顛倒和小型大寫字母。每種樣式都會將字母（某些情況下包括數字）轉換為對應的 Unicode 字元。' },
]

export default function FancyTextGeneratorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '花式文字產生器', url: 'https://toolcase.cc/zh-tw/fancy-text-generator' },
        ]}
      />
      <ToolSchema
        name="花式文字產生器"
        description="產生各種花式文字，包含粗體、斜體、手寫體、哥特體、雙線體、等寬、圓圈、全形、上下顛倒和小型大寫字母等 Unicode 樣式。可複製貼上至任何地方。"
        url="https://toolcase.cc/zh-tw/fancy-text-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '花式文字產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>花式文字產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>將您的文字轉換為多種 Unicode 字體變體。點擊任一結果即可複製。</p>
      <FancyTextGenerator labels={{ inputText: '輸入文字', placeholder: '在此輸入文字...', copied: '已複製！', clickToCopy: '點擊複製' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在輸入框中輸入或貼上文字，工具會即時產生 11 種不同的 Unicode 字體樣式，包括粗體、斜體、手寫體、哥特體、等寬字體等。點擊任一變體即可複製到剪貼簿，然後貼到社群媒體個人檔案、訊息、文件或任何您想要引人注目文字的地方。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="fancy-text-generator" locale="zh-tw" />
    </div>
    </>
  )
}

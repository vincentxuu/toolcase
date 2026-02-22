import { Metadata } from 'next'
import ColorBlindnessSimulator from '@/components/tools/ColorBlindnessSimulator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '色盲模擬器 - 免費線上工具 | toolcase',
  description: '模擬色覺障礙者看到的顏色效果。即時預覽紅色盲、綠色盲、藍色盲等各種色覺缺陷類型。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/color-blindness-simulator', languages: { en: 'https://toolcase.cc/color-blindness-simulator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/color-blindness-simulator' } },
}

const faqs = [
  { question: '這個工具可以模擬哪些類型的色盲？', answer: '本工具可模擬七種色覺缺陷類型：紅色盲（Protanopia）、綠色盲（Deuteranopia）、藍色盲（Tritanopia）、紅色弱（Protanomaly）、綠色弱（Deuteranomaly）、藍色弱（Tritanomaly）以及全色盲（Achromatopsia）。每種類型都使用科學推導的色彩轉換矩陣。' },
  { question: '色盲模擬的準確度如何？', answer: '模擬使用 Brettel/Vienot 色彩轉換矩陣，在線性化 sRGB 色彩空間中運算。雖然沒有任何模擬能完美複製色盲的主觀體驗，但這些矩陣廣泛應用於無障礙研究，能提供可靠的近似效果。' },
  { question: '為什麼設計師應該使用色盲模擬器？', answer: '約有 8% 的男性和 0.5% 的女性患有某種形式的色覺缺陷。透過模擬器測試您的配色方案，可以確保設計對所有使用者都保持可辨識性，避免僅依賴顏色來傳達資訊。' },
]

export default function ColorBlindnessSimulatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '色盲模擬器', url: 'https://toolcase.cc/zh-tw/color-blindness-simulator' },
        ]}
      />
      <ToolSchema
        name="色盲模擬器"
        description="模擬色覺障礙者看到的顏色效果。即時預覽紅色盲、綠色盲、藍色盲等各種色覺缺陷類型。"
        url="https://toolcase.cc/zh-tw/color-blindness-simulator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '色盲模擬器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>色盲模擬器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>查看任何顏色在不同色覺缺陷類型下的呈現效果。</p>
      <ColorBlindnessSimulator labels={{
        inputColor: '輸入顏色',
        originalColor: '原始顏色',
        simulatedColors: '模擬顏色',
        protanopia: '紅色盲（Protanopia）',
        deuteranopia: '綠色盲（Deuteranopia）',
        tritanopia: '藍色盲（Tritanopia）',
        protanomaly: '紅色弱（Protanomaly）',
        deuteranomaly: '綠色弱（Deuteranomaly）',
        tritanomaly: '藍色弱（Tritanomaly）',
        achromatopsia: '全色盲（Achromatopsia）',
        hexValue: 'HEX 值',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入十六進制色碼或使用取色器選擇顏色。工具會即時顯示該顏色在七種不同色覺缺陷類型下的呈現效果。將原始顏色與每種模擬結果進行比較，評估設計的無障礙性。參考每個色塊下方顯示的十六進制色碼進行設計調整。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="color-blindness-simulator" locale="zh-tw" />
    </div>
    </>
  )
}

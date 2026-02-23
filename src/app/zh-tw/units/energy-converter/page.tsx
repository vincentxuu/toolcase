import { Metadata } from 'next'
import EnergyConverter from '@/components/tools/EnergyConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '能量轉換器 - J、kJ、cal、kcal、Wh、kWh、BTU | toolcase',
  description: '在能量單位之間轉換，包括焦耳、千焦、卡路里、千卡、瓦時、千瓦時、BTU、呎磅和電子伏特。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/units/energy-converter', languages: { en: 'https://toolcase.cc/units/energy-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/units/energy-converter' } },
}

const faqs = [
  { question: '支援哪些能量單位？', answer: '轉換器支援焦耳（J）、千焦（kJ）、卡路里（cal）、千卡（kcal）、瓦時（Wh）、千瓦時（kWh）、BTU、呎磅（ft-lbf）和電子伏特（eV）。' },
  { question: '卡路里和千卡有什麼區別？', answer: '一千卡（kcal）等於 1000 卡路里（cal）。食品標籤上顯示的「大卡」實際上就是千卡。1 kcal = 4184 焦耳。' },
  { question: '如何將千瓦時轉換為焦耳？', answer: '1 千瓦時等於 3,600,000 焦耳。只需將千瓦時乘以 3,600,000 即可得到焦耳值。' },
]

export default function EnergyConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '能量轉換器', url: 'https://toolcase.cc/zh-tw/units/energy-converter' },
        ]}
      />
      <ToolSchema
        name="能量轉換器"
        description="在能量單位之間轉換，包括焦耳、千焦、卡路里、千卡、瓦時、千瓦時、BTU、呎磅和電子伏特。"
        url="https://toolcase.cc/zh-tw/units/energy-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '能量轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>能量轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>在所有常用能量單位之間即時轉換。</p>
      <EnergyConverter labels={{ value: '數值', from: '從', result: '轉換結果', enterValue: '輸入數值' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入數值並從下拉選單中選擇來源能量單位。所有其他能量單位的等效值將即時顯示在下方。轉換器使用焦耳作為基礎單位以確保轉換精確。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="energy-converter" locale="zh-tw" />
    </div>
    </>
  )
}

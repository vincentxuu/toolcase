import { Metadata } from 'next'
import UnitConverter from '@/components/tools/UnitConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '溫度轉換器 - 免費線上工具 | toolcase',
  description:
    '在攝氏、華氏和克氏溫度之間輕鬆轉換。免費線上溫度轉換器，即時顯示結果。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/temperature-converter',
    languages: {
      en: 'https://toolcase.cc/temperature-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/temperature-converter',
    },
  },
}

const faqs = [
  {
    question: '攝氏和華氏如何換算？',
    answer:
      '攝氏轉華氏的公式為：°F = °C × 9/5 + 32。例如，攝氏 100 度等於華氏 212 度（水的沸點）。華氏轉攝氏則是：°C = (°F - 32) × 5/9。',
  },
  {
    question: '什麼是克氏溫度（Kelvin）？',
    answer:
      '克氏溫度是國際單位制 (SI) 中的熱力學溫度單位。克氏 0 度（即絕對零度）等於攝氏 -273.15 度，是理論上最低的溫度。將攝氏溫度加上 273.15 即可得到克氏溫度。',
  },
  {
    question: '日常生活中該用哪種溫度單位？',
    answer:
      '台灣和全球大部分國家使用攝氏 (°C) 作為日常溫度單位。美國則主要使用華氏 (°F)。克氏 (K) 主要用於科學研究領域。本工具可以幫助您在三種溫標之間快速轉換。',
  },
]

export default function TemperatureConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '溫度轉換器', url: 'https://toolcase.cc/zh-tw/temperature-converter' },
        ]}
      />
      <ToolSchema
        name="溫度轉換器"
        description="在攝氏、華氏和克氏溫度之間輕鬆轉換。免費線上溫度轉換器，即時顯示結果。"
        url="https://toolcase.cc/zh-tw/temperature-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '溫度轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>溫度轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        即時在攝氏、華氏和克氏溫度之間進行轉換。
      </p>

      <UnitConverter unitType="temperature" defaultFrom={0} defaultTo={1} defaultValue={100} labels={{ from: '從', to: '到', swap: '交換', result: '結果' }} />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          從「從」下拉選單中選擇來源溫度單位，再從「到」下拉選單中選擇目標溫度單位。輸入要轉換的溫度值，結果會即時顯示。您也可以點擊交換按鈕來反轉轉換方向。支援攝氏 (°C)、華氏 (°F) 和克氏 (K) 三種溫標。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="temperature-converter" locale="zh-tw" />
    </div>
    </>
  )
}

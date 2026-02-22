import { Metadata } from 'next'
import UnitConverter from '@/components/tools/UnitConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '速度轉換器 - 免費線上工具 | toolcase',
  description:
    '在公里/時、英里/時、公尺/秒、節等單位之間輕鬆轉換。免費線上速度轉換器，即時顯示結果。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/speed-converter',
    languages: {
      en: 'https://toolcase.cc/speed-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/speed-converter',
    },
  },
}

const faqs = [
  {
    question: '公里/時和英里/時如何換算？',
    answer:
      '1 公里/時 (km/h) 大約等於 0.621371 英里/時 (mph)。反過來，1 英里/時大約等於 1.60934 公里/時。例如，時速 100 公里大約等於時速 62.14 英里。',
  },
  {
    question: '什麼是節 (Knot)？',
    answer:
      '節 (Knot) 是航海和航空中常用的速度單位，1 節等於每小時 1 海里，約為 1.852 公里/時或 0.514 公尺/秒。這個單位在國際航運和氣象領域廣泛使用。',
  },
  {
    question: '台灣的速限通常是多少？',
    answer:
      '台灣使用公里/時 (km/h) 作為速度單位。一般市區道路速限為 50 km/h，快速道路約 80-110 km/h，國道高速公路通常為 100-110 km/h。使用本工具可以快速將這些速度換算成其他單位。',
  },
]

export default function SpeedConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '速度轉換器', url: 'https://toolcase.cc/zh-tw/speed-converter' },
        ]}
      />
      <ToolSchema
        name="速度轉換器"
        description="在公里/時、英里/時、公尺/秒、節等單位之間輕鬆轉換。免費線上速度轉換器，即時顯示結果。"
        url="https://toolcase.cc/zh-tw/speed-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '速度轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>速度轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        即時在各種速度單位之間進行轉換。
      </p>

      <UnitConverter unitType="speed" defaultFrom={1} defaultTo={2} defaultValue={100} labels={{ from: '從', to: '到', swap: '交換', result: '結果' }} />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          從「從」下拉選單中選擇來源單位，再從「到」下拉選單中選擇目標單位。輸入要轉換的數值，結果會即時顯示。您也可以點擊交換按鈕來反轉轉換方向。支援的單位包括公尺/秒、公里/時、英里/時、節和英尺/秒。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="speed-converter" locale="zh-tw" />
    </div>
    </>
  )
}

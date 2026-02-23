import { Metadata } from 'next'
import UnitConverter from '@/components/tools/UnitConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '時間單位轉換器 - 免費線上工具 | toolcase',
  description:
    '在毫秒、秒、分鐘、小時、天、週、月、年等單位之間輕鬆轉換。免費線上時間單位轉換器，即時顯示結果。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/units/time-converter',
    languages: {
      en: 'https://toolcase.cc/units/time-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/units/time-converter',
    },
  },
}

const faqs = [
  {
    question: '一天有幾秒？',
    answer:
      '一天有 86,400 秒。計算方式為：24 小時 x 60 分鐘 x 60 秒 = 86,400 秒。一週有 604,800 秒，一年（365 天）有 31,536,000 秒。',
  },
  {
    question: '月和年的換算是怎麼計算的？',
    answer:
      '本轉換器以 1 個月 = 30 天、1 年 = 365 天作為換算基準。實際上每個月的天數不同（28-31 天），閏年也有 366 天，但此標準化數值適用於大多數一般估算。',
  },
  {
    question: '毫秒在什麼情境下會用到？',
    answer:
      '毫秒 (ms) 常用於電腦科學和網路領域，例如網頁載入速度、API 回應時間、動畫幀率等。1 秒等於 1000 毫秒。例如，200 ms 的回應時間代表 0.2 秒，對網站而言是相當快速的表現。',
  },
]

export default function TimeConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '時間單位轉換器', url: 'https://toolcase.cc/zh-tw/units/time-converter' },
        ]}
      />
      <ToolSchema
        name="時間單位轉換器"
        description="在毫秒、秒、分鐘、小時、天、週、月、年等單位之間輕鬆轉換。免費線上時間單位轉換器，即時顯示結果。"
        url="https://toolcase.cc/zh-tw/units/time-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '時間單位轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>時間單位轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        即時在各種時間單位之間進行轉換。
      </p>

      <UnitConverter unitType="time" defaultFrom={3} defaultTo={1} defaultValue={1} labels={{ from: '從', to: '到', swap: '交換', result: '結果' }} />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          從「從」下拉選單中選擇來源單位，再從「到」下拉選單中選擇目標單位。輸入要轉換的數值，結果會即時顯示。您也可以點擊交換按鈕來反轉轉換方向。支援的單位包括毫秒、秒、分鐘、小時、天、週、月和年。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="time-converter" locale="zh-tw" />
    </div>
    </>
  )
}

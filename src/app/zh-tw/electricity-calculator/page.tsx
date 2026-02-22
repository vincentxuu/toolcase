import { Metadata } from 'next'
import ElectricityCalculator from '@/components/tools/ElectricityCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '電費計算器 - 免費線上工具 | toolcase',
  description: '計算電器的用電成本。輸入瓦數、使用時間和電價，即可查看每日、每月和每年的電費。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/electricity-calculator', languages: { en: 'https://toolcase.cc/electricity-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/electricity-calculator' } },
}

const faqs = [
  { question: '如何查看電器的瓦數？', answer: '查看電器或其電源供應器上的標籤，通常會標示瓦數（W）或電壓（V）和電流（A）。如果只有伏特和安培，將它們相乘即可得到瓦數（W = V × A）。您也可以在網路上查詢該型號的規格。' },
  { question: '什麼是度電（kWh）？', answer: '度電（千瓦時，kWh）是能量的單位，代表使用 1,000 瓦的功率持續一小時所消耗的電量。例如，一個 100W 的燈泡運作 10 小時就消耗 1 度電。您的電費帳單就是根據消耗的度數計算的。' },
  { question: '如何降低電費？', answer: '改用節能電器和 LED 燈泡、不用時拔掉插頭、使用定時器和智慧插座、調整空調溫度設定。即使是每天減少一小時冷氣使用，一年下來也能省下不少電費。' },
]

export default function ElectricityCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '電費計算器', url: 'https://toolcase.cc/zh-tw/electricity-calculator' },
        ]}
      />
      <ToolSchema
        name="電費計算器"
        description="計算電器的用電成本。輸入瓦數、使用時間和電價，即可查看每日、每月和每年的電費。"
        url="https://toolcase.cc/zh-tw/electricity-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '電費計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>電費計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>計算電器每日、每月和每年的用電成本。</p>
      <ElectricityCalculator labels={{ deviceName: '裝置名稱', wattage: '瓦數 (W)', hoursPerDay: '每日使用時數', daysPerMonth: '每月使用天數', electricityRate: '電價 ($/kWh)', addDevice: '新增裝置', remove: '移除', device: '裝置', dailyKwh: '每日度數', monthlyKwh: '每月度數', dailyCost: '每日電費', monthlyCost: '每月電費', yearlyCost: '每年電費', totalCosts: '總計費用', perKwh: '/度' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在上方設定電價，然後新增您的電器設備。為每個設備輸入瓦數、每日使用時數和每月使用天數。計算器會顯示每個設備的耗電量和費用，以及所有設備的總計。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="electricity-calculator" locale="zh-tw" />
    </div>
    </>
  )
}

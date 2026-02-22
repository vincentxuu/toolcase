import { Metadata } from 'next'
import UnitConverter from '@/components/tools/UnitConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '長度轉換器 - 免費線上工具 | toolcase',
  description:
    '在公尺、公里、英里、英尺、英寸等單位之間輕鬆轉換。免費線上長度轉換器，即時顯示結果。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/length-converter',
    languages: {
      en: 'https://toolcase.cc/length-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/length-converter',
    },
  },
}

const faqs = [
  {
    question: '一公尺等於幾英尺？',
    answer:
      '一公尺大約等於 3.28084 英尺。反過來說，一英尺等於 0.3048 公尺。公尺是國際單位制 (SI) 中長度的基本單位。',
  },
  {
    question: '公里和英里如何換算？',
    answer:
      '要將公里換算成英里，將數值乘以 0.621371。例如 10 公里大約等於 6.21 英里。本轉換器會自動為您計算。',
  },
  {
    question: '公制和英制長度單位有什麼差別？',
    answer:
      '公制單位（毫米、公分、公尺、公里）以十的冪次為基礎，轉換簡單直覺。英制單位（英寸、英尺、碼、英里）的換算因子各不相同（1 英尺 = 12 英寸、1 碼 = 3 英尺、1 英里 = 1760 碼）。全球大部分國家使用公制，而美國主要使用英制。',
  },
]

export default function LengthConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '長度轉換器', url: 'https://toolcase.cc/zh-tw/length-converter' },
        ]}
      />
      <ToolSchema
        name="長度轉換器"
        description="在公尺、公里、英里、英尺、英寸等單位之間輕鬆轉換。免費線上長度轉換器，即時顯示結果。"
        url="https://toolcase.cc/zh-tw/length-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '長度轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>長度轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        即時在公制與英制長度單位之間進行轉換。
      </p>

      <UnitConverter unitType="length" defaultFrom={2} defaultTo={3} defaultValue={1000} labels={{ from: '從', to: '到', swap: '交換', result: '結果' }} />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          從「從」下拉選單中選擇來源單位，再從「到」下拉選單中選擇目標單位。輸入要轉換的數值，結果會即時顯示。您也可以點擊交換按鈕來反轉轉換方向。支援的單位包括毫米、公分、公尺、公里、英寸、英尺、碼和英里。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="length-converter" locale="zh-tw" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import UnitConverter from '@/components/tools/UnitConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '重量轉換器 - 免費線上工具 | toolcase',
  description:
    '在公斤、磅、盎司、公克等單位之間輕鬆轉換。免費線上重量轉換器，即時顯示結果。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/weight-converter',
    languages: {
      en: 'https://toolcase.cc/weight-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/weight-converter',
    },
  },
}

const faqs = [
  {
    question: '一公斤等於幾磅？',
    answer:
      '一公斤大約等於 2.20462 磅。反過來說，一磅大約等於 0.453592 公斤。公斤是國際單位制 (SI) 中質量的基本單位。',
  },
  {
    question: '盎司和公克怎麼換算？',
    answer:
      '一盎司等於大約 28.3495 公克。若要將盎司換算成公克，只需將盎司數乘以 28.3495。本轉換器會自動為您完成計算。',
  },
  {
    question: '公噸和英噸有什麼不同？',
    answer:
      '公噸（Metric Ton）等於 1000 公斤，是全球大部分地區使用的標準。英噸（Long Ton）約等於 1016 公斤，主要在英國使用。美噸（Short Ton）則等於約 907 公斤，主要在美國使用。',
  },
]

export default function WeightConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '重量轉換器', url: 'https://toolcase.cc/zh-tw/weight-converter' },
        ]}
      />
      <ToolSchema
        name="重量轉換器"
        description="在公斤、磅、盎司、公克等單位之間輕鬆轉換。免費線上重量轉換器，即時顯示結果。"
        url="https://toolcase.cc/zh-tw/weight-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '重量轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>重量轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        即時在公制與英制重量單位之間進行轉換。
      </p>

      <UnitConverter unitType="weight" defaultFrom={2} defaultTo={3} defaultValue={1} labels={{ from: '從', to: '到', swap: '交換', result: '結果' }} />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          從「從」下拉選單中選擇來源單位，再從「到」下拉選單中選擇目標單位。輸入要轉換的數值，結果會即時顯示。您也可以點擊交換按鈕來反轉轉換方向。支援的單位包括毫克、公克、公斤、磅、盎司、英石和公噸。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="weight-converter" locale="zh-tw" />
    </div>
    </>
  )
}

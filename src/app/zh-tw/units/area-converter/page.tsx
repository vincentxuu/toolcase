import { Metadata } from 'next'
import UnitConverter from '@/components/tools/UnitConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '面積轉換器 - 免費線上工具 | toolcase',
  description:
    '在平方公尺、坪、公頃、英畝、平方英尺等單位之間輕鬆轉換。支援台灣常用的坪數換算，免費線上面積轉換器。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/units/area-converter',
    languages: {
      en: 'https://toolcase.cc/units/area-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/units/area-converter',
    },
  },
}

const faqs = [
  {
    question: '一坪等於幾平方公尺？',
    answer:
      '一坪大約等於 3.30579 平方公尺。坪是台灣和日本常用的面積單位，在台灣的房地產交易中非常普遍。例如，30 坪的房子大約等於 99.17 平方公尺。',
  },
  {
    question: '平方公尺和坪如何互相換算？',
    answer:
      '平方公尺換算成坪：將平方公尺除以 3.30579。坪換算成平方公尺：將坪數乘以 3.30579。例如，100 平方公尺大約等於 30.25 坪。本轉換器預設即為平方公尺轉坪的換算。',
  },
  {
    question: '公頃和英畝有什麼差別？',
    answer:
      '公頃 (hectare) 是公制面積單位，1 公頃等於 10,000 平方公尺。英畝 (acre) 是英制面積單位，1 英畝大約等於 4,046.86 平方公尺。因此 1 公頃大約等於 2.471 英畝。',
  },
]

export default function AreaConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '面積轉換器', url: 'https://toolcase.cc/zh-tw/units/area-converter' },
        ]}
      />
      <ToolSchema
        name="面積轉換器"
        description="在平方公尺、坪、公頃、英畝、平方英尺等單位之間輕鬆轉換。支援台灣常用的坪數換算，免費線上面積轉換器。"
        url="https://toolcase.cc/zh-tw/units/area-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '面積轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>面積轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        即時在各種面積單位之間進行轉換，支援台灣常用的坪 (Ping) 數換算。
      </p>

      <UnitConverter unitType="area" defaultFrom={0} defaultTo={6} defaultValue={100} labels={{ from: '從', to: '到', swap: '交換', result: '結果' }} />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          從「從」下拉選單中選擇來源單位，再從「到」下拉選單中選擇目標單位。輸入要轉換的數值，結果會即時顯示。您也可以點擊交換按鈕來反轉轉換方向。支援的單位包括平方公尺、平方公里、平方英尺、平方碼、英畝、公頃和坪。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="area-converter" locale="zh-tw" />
    </div>
    </>
  )
}

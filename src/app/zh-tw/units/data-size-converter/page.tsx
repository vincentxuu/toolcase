import { Metadata } from 'next'
import UnitConverter from '@/components/tools/UnitConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '資料大小轉換器 - 免費線上工具 | toolcase',
  description:
    '在 Bytes、KB、MB、GB、TB、PB 等單位之間輕鬆轉換。免費線上資料大小轉換器，即時顯示結果。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/units/data-size-converter',
    languages: {
      en: 'https://toolcase.cc/units/data-size-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/units/data-size-converter',
    },
  },
}

const faqs = [
  {
    question: '1 GB 等於幾 MB？',
    answer:
      '在二進位制中，1 GB 等於 1024 MB。在十進位制中（硬碟廠商常用），1 GB 等於 1000 MB。本轉換器採用二進位制（1024 為基數）進行計算，這是電腦系統中最常見的標準。',
  },
  {
    question: 'KB、MB、GB、TB 之間的關係是什麼？',
    answer:
      '在二進位制中：1 KB = 1024 Bytes、1 MB = 1024 KB、1 GB = 1024 MB、1 TB = 1024 GB、1 PB = 1024 TB。每一級都是前一級的 1024 倍。',
  },
  {
    question: '為什麼硬碟實際容量比標示的少？',
    answer:
      '硬碟廠商使用十進位制（1 GB = 1000 MB），而電腦作業系統使用二進位制（1 GB = 1024 MB）。因此，一顆標示 1 TB 的硬碟在作業系統中會顯示約 931 GB。這不是容量缺少，只是計算方式不同。',
  },
]

export default function DataSizeConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '資料大小轉換器', url: 'https://toolcase.cc/zh-tw/units/data-size-converter' },
        ]}
      />
      <ToolSchema
        name="資料大小轉換器"
        description="在 Bytes、KB、MB、GB、TB、PB 等單位之間輕鬆轉換。免費線上資料大小轉換器，即時顯示結果。"
        url="https://toolcase.cc/zh-tw/units/data-size-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '資料大小轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>資料大小轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        即時在各種數位儲存容量單位之間進行轉換。
      </p>

      <UnitConverter unitType="dataSize" defaultFrom={3} defaultTo={2} defaultValue={1} labels={{ from: '從', to: '到', swap: '交換', result: '結果' }} />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          從「從」下拉選單中選擇來源單位，再從「到」下拉選單中選擇目標單位。輸入要轉換的數值，結果會即時顯示。您也可以點擊交換按鈕來反轉轉換方向。支援的單位包括 Bytes、KB、MB、GB、TB 和 PB。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="data-size-converter" locale="zh-tw" />
    </div>
    </>
  )
}

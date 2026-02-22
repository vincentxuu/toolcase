import { Metadata } from 'next'
import UnitConverter from '@/components/tools/UnitConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '體積轉換器 - 免費線上工具 | toolcase',
  description:
    '在公升、毫升、加侖、杯、液量盎司等單位之間輕鬆轉換。免費線上體積轉換器，即時顯示結果。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/volume-converter',
    languages: {
      en: 'https://toolcase.cc/volume-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/volume-converter',
    },
  },
}

const faqs = [
  {
    question: '一公升等於幾毫升？',
    answer:
      '一公升等於 1000 毫升。公升 (L) 和毫升 (mL) 都是公制體積單位，換算非常簡單，只需乘以或除以 1000。',
  },
  {
    question: '美式加侖和公升如何換算？',
    answer:
      '一美式加侖 (US Gallon) 大約等於 3.78541 公升。要將加侖換算成公升，只需乘以 3.78541。請注意，英式加侖 (Imperial Gallon) 約為 4.546 公升，與美式加侖不同。',
  },
  {
    question: '烹飪時常用的體積單位有哪些？',
    answer:
      '烹飪中常用的體積單位包括茶匙 (Teaspoon, 約 5 mL)、湯匙 (Tablespoon, 約 15 mL) 和杯 (Cup, 美式約 237 mL)。本轉換器支援這些單位的快速換算，方便您在料理時使用。',
  },
]

export default function VolumeConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '體積轉換器', url: 'https://toolcase.cc/zh-tw/volume-converter' },
        ]}
      />
      <ToolSchema
        name="體積轉換器"
        description="在公升、毫升、加侖、杯、液量盎司等單位之間輕鬆轉換。免費線上體積轉換器，即時顯示結果。"
        url="https://toolcase.cc/zh-tw/volume-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '體積轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>體積轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        即時在各種體積與容量單位之間進行轉換。
      </p>

      <UnitConverter unitType="volume" defaultFrom={1} defaultTo={0} defaultValue={1} labels={{ from: '從', to: '到', swap: '交換', result: '結果' }} />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          從「從」下拉選單中選擇來源單位，再從「到」下拉選單中選擇目標單位。輸入要轉換的數值，結果會即時顯示。您也可以點擊交換按鈕來反轉轉換方向。支援的單位包括毫升、公升、杯、液量盎司、加侖、湯匙和茶匙。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="volume-converter" locale="zh-tw" />
    </div>
    </>
  )
}

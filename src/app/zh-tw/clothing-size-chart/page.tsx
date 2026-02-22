import { Metadata } from 'next'
import ClothingSizeChart from '@/components/tools/ClothingSizeChart'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '衣服尺寸對照表 - 台灣/美國/歐洲/日本尺碼換算 | toolcase',
  description: '男女裝國際尺碼對照表，含台灣、美國、歐洲、英國、日本尺碼換算。上衣與下身分別對照。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/clothing-size-chart', languages: { en: 'https://toolcase.cc/clothing-size-chart', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/clothing-size-chart' } },
}

const faqs = [
  { question: '各國尺碼怎麼換算？', answer: '不同國家使用不同的尺碼系統。例如台灣/美國用 S、M、L，歐洲用數字（如 38、40），日本用號數（如 7、9）。本表提供常見對應值。' },
  { question: '尺碼對照表準確嗎？', answer: '本表為國際通用近似值，實際尺碼會因品牌、版型、材質不同而有差異，建議購買前參考各品牌的尺寸表。' },
  { question: '胸圍和腰圍怎麼量？', answer: '胸圍：用軟尺繞過胸部最豐滿處水平量一圈。腰圍：在自然腰線（約肚臍位置）水平量一圈。' },
]

export default function ClothingSizeChartPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '衣服尺寸對照表', url: 'https://toolcase.cc/zh-tw/clothing-size-chart' },
        ]}
      />
      <ToolSchema
        name="衣服尺寸對照表"
        description="男女裝國際尺碼對照表，含台灣、美國、歐洲、英國、日本尺碼換算。上衣與下身分別對照。"
        url="https://toolcase.cc/zh-tw/clothing-size-chart"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '衣服尺寸對照表' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>衣服尺寸對照表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>台灣、美國、歐洲、英國、日本尺碼對照，含男女裝上衣與下身。</p>
      <ClothingSizeChart />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="clothing-size-chart" locale="zh-tw" />
    </div>
    </>
  )
}

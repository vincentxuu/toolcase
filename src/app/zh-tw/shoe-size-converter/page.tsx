import { Metadata } from 'next'
import ShoeSizeConverter from '@/components/tools/ShoeSizeConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '鞋碼轉換器 - 美規、歐規、英規、日規 | toolcase',
  description: '在美規、歐規、英規和日規鞋碼之間轉換。附完整尺碼對照表供參考。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/shoe-size-converter', languages: { en: 'https://toolcase.cc/shoe-size-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/shoe-size-converter' } },
}

const faqs = [
  { question: '不同系統之間的鞋碼是精確的嗎？', answer: '鞋碼轉換是近似值，因為每個系統使用不同的測量基準。此對照表提供常見的對應值，但實際合腳度可能因品牌而異。' },
  { question: '支援哪些尺碼系統？', answer: '轉換器支援美規男鞋、美規女鞋、歐規、英規和日規（公分）尺碼系統。' },
]

export default function ShoeSizeConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '鞋碼轉換器', url: 'https://toolcase.cc/zh-tw/shoe-size-converter' },
        ]}
      />
      <ToolSchema
        name="鞋碼轉換器"
        description="在美規、歐規、英規和日規鞋碼之間轉換。附完整尺碼對照表供參考。"
        url="https://toolcase.cc/zh-tw/shoe-size-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '鞋碼轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>鞋碼轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>在美規、歐規、英規和日規鞋碼之間轉換，附完整對照表。</p>
      <ShoeSizeConverter labels={{ size: '尺碼', system: '系統', gender: '性別', men: '男', women: '女', result: '轉換結果' }} />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="shoe-size-converter" locale="zh-tw" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import TwHouseTax from '@/components/tools/TwHouseTax'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '房屋稅稅率表 - 自住/非自住/營業用稅率 | toolcase',
  description: '房屋稅稅率對照表，含自住1.2%、非自住累進稅率（囤房稅2.0）、營業用3%，及計算方式說明。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/tw-house-tax', languages: { en: 'https://toolcase.cc/tw-house-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-house-tax' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>房屋稅稅率表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>房屋稅各使用類別稅率對照，含自住、非自住（囤房稅2.0累進）、營業用稅率及計算說明。</p>
      <TwHouseTax />
      <RelatedTools current="tw-house-tax" locale="zh-tw" />
    </div>
  )
}

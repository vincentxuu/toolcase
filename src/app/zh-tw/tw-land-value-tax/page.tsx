import { Metadata } from 'next'
import TwLandValueTax from '@/components/tools/TwLandValueTax'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '地價稅稅率表 - 累進稅率與自用住宅優惠 | toolcase',
  description: '地價稅累進稅率（10‰~55‰）與自用住宅優惠稅率（2‰）一覽，含重要申請日期與課稅說明。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/tw-land-value-tax', languages: { en: 'https://toolcase.cc/tw-land-value-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-land-value-tax' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>地價稅稅率表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>地價稅累進稅率（10‰~55‰）與自用住宅優惠稅率（2‰），含各用地類型特別稅率及重要資訊。</p>
      <TwLandValueTax />
      <RelatedTools current="tw-land-value-tax" locale="zh-tw" />
    </div>
  )
}

import { Metadata } from 'next'
import TwGiftTax from '@/components/tools/TwGiftTax'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '贈與稅級距表 - 稅率與年度免稅額試算 | toolcase',
  description: '贈與稅三級累進稅率（10%/15%/20%）級距表，每人每年免稅額244萬元，含快速試算功能。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/tw-gift-tax', languages: { en: 'https://toolcase.cc/tw-gift-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-gift-tax' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>贈與稅級距表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>贈與稅三級累進稅率（10%、15%、20%），每人每年免稅額244萬元，含年度贈與稅試算。</p>
      <TwGiftTax />
      <RelatedTools current="tw-gift-tax" locale="zh-tw" />
    </div>
  )
}

import { Metadata } from 'next'
import TwEstateTax from '@/components/tools/TwEstateTax'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '遺產稅級距表 - 稅率、免稅額與扣除額 | toolcase',
  description: '遺產稅三級累進稅率（10%/15%/20%）級距表，含免稅額、各項扣除額與快速試算功能。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/tw-estate-tax', languages: { en: 'https://toolcase.cc/tw-estate-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-estate-tax' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>遺產稅級距表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>遺產稅三級累進稅率（10%、15%、20%），含免稅額1,333萬、各項扣除額一覽與快速試算。</p>
      <TwEstateTax />
      <RelatedTools current="tw-estate-tax" locale="zh-tw" />
    </div>
  )
}

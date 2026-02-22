import { Metadata } from 'next'
import TwSupplementaryNhiPremium from '@/components/tools/TwSupplementaryNhiPremium'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '二代健保補充保費 - 費率門檻與試算 | toolcase',
  description: '二代健保補充保費費率2.11%，單次給付超過2萬元即需扣繳。含股利、兼職、租金等各類所得扣費說明與試算。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/tw-supplementary-nhi-premium', languages: { en: 'https://toolcase.cc/tw-supplementary-nhi-premium', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-supplementary-nhi-premium' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>二代健保補充保費</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>二代健保補充保費費率2.11%，含各類所得扣費門檻（股利、兼職、租金等）與快速試算。</p>
      <TwSupplementaryNhiPremium />
      <RelatedTools current="tw-supplementary-nhi-premium" locale="zh-tw" />
    </div>
  )
}

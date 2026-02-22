import { Metadata } from 'next'
import TwOccupationalAccidentInsurance from '@/components/tools/TwOccupationalAccidentInsurance'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '職災保險費率表 - 行業別費率一覽 | toolcase',
  description: '勞工職業災害保險行業別費率表（0.04%~0.92%），全額雇主負擔，含給付項目說明。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/tw-occupational-accident-insurance', languages: { en: 'https://toolcase.cc/tw-occupational-accident-insurance', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-occupational-accident-insurance' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>職災保險費率表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>勞工職業災害保險行業別費率表，全額由雇主負擔，含各項給付說明。</p>
      <TwOccupationalAccidentInsurance />
      <RelatedTools current="tw-occupational-accident-insurance" locale="zh-tw" />
    </div>
  )
}

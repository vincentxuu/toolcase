import { Metadata } from 'next'
import TwLaborInsurance from '@/components/tools/TwLaborInsurance'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '勞保投保級距表 - 勞保保費分級與試算 | toolcase',
  description: '勞工保險投保薪資分級表，含費率組成說明（勞保10.5%+就保1%）、勞工自付與雇主負擔金額查詢。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/tw-labor-insurance', languages: { en: 'https://toolcase.cc/tw-labor-insurance', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-labor-insurance' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>勞保投保級距表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>勞工保險投保薪資分級表，含費率組成（普通事故10.5%+就保1%）、勞工自付20%與雇主負擔70%金額查詢。</p>
      <TwLaborInsurance />
      <RelatedTools current="tw-labor-insurance" locale="zh-tw" />
    </div>
  )
}

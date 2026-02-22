import { Metadata } from 'next'
import TwNationalPension from '@/components/tools/TwNationalPension'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '國民年金 - 保險費率與給付項目一覽 | toolcase',
  description: '國民年金保險費率10%、月投保金額19,761元，含各身分別保費補助比例與老年年金、身障年金等給付項目。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/tw-national-pension', languages: { en: 'https://toolcase.cc/tw-national-pension', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-national-pension' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>國民年金</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>國民年金保險費率、各身分別保費補助比例，以及老年年金、身障年金、遺屬年金等給付項目一覽。</p>
      <TwNationalPension />
      <RelatedTools current="tw-national-pension" locale="zh-tw" />
    </div>
  )
}

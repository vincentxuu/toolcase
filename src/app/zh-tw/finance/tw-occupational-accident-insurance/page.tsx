import { Metadata } from 'next'
import TwOccupationalAccidentInsurance from '@/components/tools/TwOccupationalAccidentInsurance'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '職災保險費率表 - 行業別費率一覽 | toolcase',
  description: '勞工職業災害保險行業別費率表（0.04%~0.92%），全額雇主負擔，含給付項目說明。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/finance/tw-occupational-accident-insurance', languages: { en: 'https://toolcase.cc/finance/tw-occupational-accident-insurance', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/tw-occupational-accident-insurance' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '職災保險費率表', url: 'https://toolcase.cc/zh-tw/finance/tw-occupational-accident-insurance' },
        ]}
      />
      <ToolSchema
        name="職災保險費率表"
        description="勞工職業災害保險行業別費率表（0.04%~0.92%），全額雇主負擔，含給付項目說明。"
        url="https://toolcase.cc/zh-tw/finance/tw-occupational-accident-insurance"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '職災保險費率表' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>職災保險費率表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>勞工職業災害保險行業別費率表，全額由雇主負擔，含各項給付說明。</p>
      <TwOccupationalAccidentInsurance />
      <RelatedTools current="tw-occupational-accident-insurance" locale="zh-tw" />
    </div>
    </>
  )
}

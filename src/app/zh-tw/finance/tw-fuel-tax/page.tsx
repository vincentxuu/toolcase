import { Metadata } from 'next'
import TwFuelTax from '@/components/tools/TwFuelTax'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '汽車燃料費 - 汽機車燃料使用費對照表 | toolcase',
  description: '汽車燃料使用費徵收金額對照表，含汽車（全年/每季）與機車燃料費，依排氣量分級。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/finance/tw-fuel-tax', languages: { en: 'https://toolcase.cc/finance/tw-fuel-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/tw-fuel-tax' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '汽車燃料費', url: 'https://toolcase.cc/zh-tw/finance/tw-fuel-tax' },
        ]}
      />
      <ToolSchema
        name="汽車燃料費"
        description="汽車燃料使用費徵收金額對照表，含汽車（全年/每季）與機車燃料費，依排氣量分級。"
        url="https://toolcase.cc/zh-tw/finance/tw-fuel-tax"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '汽車燃料費' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>汽車燃料使用費</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>汽車與機車燃料使用費徵收金額對照表，依排氣量分級，含全年及每季費用。</p>
      <TwFuelTax />
      <RelatedTools current="tw-fuel-tax" locale="zh-tw" />
    </div>
    </>
  )
}

import { Metadata } from 'next'
import TwLandValueTax from '@/components/tools/TwLandValueTax'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '地價稅稅率表 - 累進稅率與自用住宅優惠 | toolcase',
  description: '地價稅累進稅率（10‰~55‰）與自用住宅優惠稅率（2‰）一覽，含重要申請日期與課稅說明。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/finance/tw-land-value-tax', languages: { en: 'https://toolcase.cc/finance/tw-land-value-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/tw-land-value-tax' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '地價稅稅率表', url: 'https://toolcase.cc/zh-tw/finance/tw-land-value-tax' },
        ]}
      />
      <ToolSchema
        name="地價稅稅率表"
        description="地價稅累進稅率（10‰~55‰）與自用住宅優惠稅率（2‰）一覽，含重要申請日期與課稅說明。"
        url="https://toolcase.cc/zh-tw/finance/tw-land-value-tax"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '地價稅稅率表' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>地價稅稅率表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>地價稅累進稅率（10‰~55‰）與自用住宅優惠稅率（2‰），含各用地類型特別稅率及重要資訊。</p>
      <TwLandValueTax />
      <RelatedTools current="tw-land-value-tax" locale="zh-tw" />
    </div>
    </>
  )
}

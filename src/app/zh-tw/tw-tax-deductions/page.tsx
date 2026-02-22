import { Metadata } from 'next'
import TwTaxDeductions from '@/components/tools/TwTaxDeductions'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '免稅額與扣除額一覽 - 報稅扣除項目完整對照 | toolcase',
  description: '113年度綜合所得稅免稅額、標準/列舉扣除額、特別扣除額完整對照表，含基本生活費差額說明。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/tw-tax-deductions', languages: { en: 'https://toolcase.cc/tw-tax-deductions', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-tax-deductions' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '免稅額與扣除額一覽', url: 'https://toolcase.cc/zh-tw/tw-tax-deductions' },
        ]}
      />
      <ToolSchema
        name="免稅額與扣除額一覽"
        description="113年度綜合所得稅免稅額、標準/列舉扣除額、特別扣除額完整對照表，含基本生活費差額說明。"
        url="https://toolcase.cc/zh-tw/tw-tax-deductions"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '免稅額與扣除額一覽' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>免稅額與扣除額一覽</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>113年度綜合所得稅免稅額、標準扣除額、列舉扣除額、特別扣除額完整對照表。</p>
      <TwTaxDeductions />
      <RelatedTools current="tw-tax-deductions" locale="zh-tw" />
    </div>
    </>
  )
}

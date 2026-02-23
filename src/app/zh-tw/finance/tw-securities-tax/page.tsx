import { Metadata } from 'next'
import TwSecuritiesTax from '@/components/tools/TwSecuritiesTax'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '證券交易稅率表 - 股票/ETF/期貨稅率 | toolcase',
  description: '證券交易稅率一覽：股票千分之三、ETF千分之一、期貨交易稅等，含快速試算與股票投資相關稅費說明。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/finance/tw-securities-tax', languages: { en: 'https://toolcase.cc/finance/tw-securities-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/tw-securities-tax' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '證券交易稅率表', url: 'https://toolcase.cc/zh-tw/finance/tw-securities-tax' },
        ]}
      />
      <ToolSchema
        name="證券交易稅率表"
        description="證券交易稅率一覽：股票千分之三、ETF千分之一、期貨交易稅等，含快速試算與股票投資相關稅費說明。"
        url="https://toolcase.cc/zh-tw/finance/tw-securities-tax"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '證券交易稅率表' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>證券交易稅率表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>股票、ETF、期貨等證券交易稅率對照表，含快速試算與投資相關稅費一覽。</p>
      <TwSecuritiesTax />
      <RelatedTools current="tw-securities-tax" locale="zh-tw" />
    </div>
    </>
  )
}

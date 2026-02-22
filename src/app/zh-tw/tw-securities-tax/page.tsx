import { Metadata } from 'next'
import TwSecuritiesTax from '@/components/tools/TwSecuritiesTax'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '證券交易稅率表 - 股票/ETF/期貨稅率 | toolcase',
  description: '證券交易稅率一覽：股票千分之三、ETF千分之一、期貨交易稅等，含快速試算與股票投資相關稅費說明。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/tw-securities-tax', languages: { en: 'https://toolcase.cc/tw-securities-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-securities-tax' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>證券交易稅率表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>股票、ETF、期貨等證券交易稅率對照表，含快速試算與投資相關稅費一覽。</p>
      <TwSecuritiesTax />
      <RelatedTools current="tw-securities-tax" locale="zh-tw" />
    </div>
  )
}

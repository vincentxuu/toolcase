import { Metadata } from 'next'
import TwRetirementIncomeTax from '@/components/tools/TwRetirementIncomeTax'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '退職所得免稅額 - 課稅規則與試算 | toolcase',
  description: '退職所得免稅額計算規則，含一次領取（定額免稅/半數課稅/全數課稅）與分期領取年金免稅額，及歷年對照表。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/tw-retirement-income-tax', languages: { en: 'https://toolcase.cc/tw-retirement-income-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-retirement-income-tax' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>退職所得免稅額</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>退職所得課稅規則，含一次領取免稅額試算（定額免稅/半數課稅/全數課稅）與分期領取年金免稅額。</p>
      <TwRetirementIncomeTax />
      <RelatedTools current="tw-retirement-income-tax" locale="zh-tw" />
    </div>
  )
}

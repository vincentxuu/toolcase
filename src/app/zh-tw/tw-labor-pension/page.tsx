import { Metadata } from 'next'
import TwLaborPension from '@/components/tools/TwLaborPension'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '勞退提繳級距表 - 月提繳分級與自願提繳 | toolcase',
  description: '勞工退休金月提繳分級表，雇主每月提繳不低於6%，勞工可自願提繳1~6%並享所得稅遞延優惠。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/tw-labor-pension', languages: { en: 'https://toolcase.cc/tw-labor-pension', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-labor-pension' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>勞退提繳級距表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>勞工退休金月提繳分級表，含雇主提繳（6%）與自願提繳（0~6%）試算。</p>
      <TwLaborPension />
      <RelatedTools current="tw-labor-pension" locale="zh-tw" />
    </div>
  )
}

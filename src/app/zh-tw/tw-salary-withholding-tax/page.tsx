import { Metadata } from 'next'
import TwSalaryWithholdingTax from '@/components/tools/TwSalaryWithholdingTax'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '薪資扣繳稅額表 - 每月薪資所得扣繳對照 | toolcase',
  description: '薪資所得扣繳稅額表（114年度適用），含居住者與非居住者扣繳率對照，輸入月薪即可查詢每月扣繳金額。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/tw-salary-withholding-tax', languages: { en: 'https://toolcase.cc/tw-salary-withholding-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-salary-withholding-tax' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>薪資扣繳稅額表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>每月薪資所得扣繳稅額對照表，含居住者與非居住者扣繳率，輸入月薪即可查詢每月扣繳金額。</p>
      <TwSalaryWithholdingTax />
      <RelatedTools current="tw-salary-withholding-tax" locale="zh-tw" />
    </div>
  )
}

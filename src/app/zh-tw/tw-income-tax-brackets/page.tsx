import { Metadata } from 'next'
import TwIncomeTaxBrackets from '@/components/tools/TwIncomeTaxBrackets'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '綜合所得稅級距表 - 113年度稅率級距與累進差額 | toolcase',
  description: '台灣綜合所得稅級距表（113年度/2024適用），5%~40%累進稅率、累進差額速算公式，含快速試算功能。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/tw-income-tax-brackets', languages: { en: 'https://toolcase.cc/tw-income-tax-brackets', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-income-tax-brackets' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '綜合所得稅級距表', url: 'https://toolcase.cc/zh-tw/tw-income-tax-brackets' },
        ]}
      />
      <ToolSchema
        name="綜合所得稅級距表"
        description="台灣綜合所得稅級距表（113年度/2024適用），5%~40%累進稅率、累進差額速算公式，含快速試算功能。"
        url="https://toolcase.cc/zh-tw/tw-income-tax-brackets"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '綜合所得稅級距表' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>綜合所得稅級距表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>113年度（2024年）台灣綜合所得稅級距表，含5%~40%累進稅率、累進差額與速算公式，以及快速試算功能。</p>
      <TwIncomeTaxBrackets />
      <RelatedTools current="tw-income-tax-brackets" locale="zh-tw" />
    </div>
    </>
  )
}
